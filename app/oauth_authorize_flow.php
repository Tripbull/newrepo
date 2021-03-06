<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start();//page compressed
include_once('class/class.main.php');
session_start();

require 'oauth/tmhOAuth.php';

$tmhOAuth = new tmhOAuth( array(
'consumer_key' => 'FEzO9pyjucmvgRpj6S250pA5f',
'consumer_secret' => 'tgqcUcIwVhfLwNm3AuANXe4lZRisFlNJ61Fs2B4PfzEjbUtrbY'
));

// we use the session ($_SESSION) to store the temporary request token issue to us by Twitter

function php_self($dropqs=true) {
  $protocol = 'http';
  if (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) == 'on') {
    $protocol = 'https';
  } elseif (isset($_SERVER['SERVER_PORT']) && ($_SERVER['SERVER_PORT'] == '443')) {
    $protocol = 'https';
  }

  $url = sprintf('%s://%s%s',
    $protocol,
    $_SERVER['SERVER_NAME'],
    $_SERVER['REQUEST_URI']
  );

  $parts = parse_url($url);

  $port = $_SERVER['SERVER_PORT'];
  $scheme = $parts['scheme'];
  $host = $parts['host'];
  $path = @$parts['path'];
  $qs   = @$parts['query'];

  $port or $port = ($scheme == 'https') ? '443' : '80';

  if (($scheme == 'https' && $port != '443')
      || ($scheme == 'http' && $port != '80')) {
    $host = "$host:$port";
  }
  $url = "$scheme://$host$path";
  if ( ! $dropqs)
    return "{$url}?{$qs}";
  else
    return $url;
}


function error($msg) {
  var_dump($msg);
}

function uri_params() {
  $url = parse_url($_SERVER['REQUEST_URI']);
  $params = array();
  if(isset($url['query']))
  {
    foreach (explode('&', $url['query']) as $p) {
      if($p != "")
      {
        list($k, $v) = explode('=', $p);
        $params[$k] =$v; 
      }
    }
  }
  return $params;
}

function request_token($tmhOAuth) {
  $code = $tmhOAuth->apponly_request(array(
    'without_bearer' => true,
    'method' => 'POST',
    'url' => $tmhOAuth->url('oauth/request_token', ''),
    'params' => array(
      'oauth_callback' => php_self(false),
    ),
  ));

  if ($code != 200) {
    error("There was an error communicating with Twitter. {$tmhOAuth->response['response']}");
    return;
  }

  // store the params into the session so they are there when we come back after the redirect
  $_SESSION['oauth'] = $tmhOAuth->extract_params($tmhOAuth->response['response']);

  // check the callback has been confirmed
  if ($_SESSION['oauth']['oauth_callback_confirmed'] !== 'true') 
  {
    error('The callback was not confirmed by Twitter so we cannot continue.');
    return;
  } 
  else 
  {
    $url = $tmhOAuth->url('oauth/authorize', '') . "?force_login=true&oauth_token={$_SESSION['oauth']['oauth_token']}";
    header("Location: " . $url);
  }
}

function access_token($tmhOAuth) {
  $params = uri_params();
  if ($params['oauth_token'] !== $_SESSION['oauth']['oauth_token']) {
    error('The oauth token you started with doesn\'t match the one you\'ve been redirected with. do you have multiple tabs open?');
    return;
  }

  if (!isset($params['oauth_verifier'])) {
    error('The oauth verifier is missing so we cannot continue. did you deny the appliction access?');
    return;
  }

  // update with the temporary token and secret
  $tmhOAuth->reconfigure(array_merge($tmhOAuth->config, array(
    'token'  => $_SESSION['oauth']['oauth_token'],
    'secret' => $_SESSION['oauth']['oauth_token_secret'],
  )));

  $code = $tmhOAuth->user_request(array(
    'method' => 'POST',
    'url' => $tmhOAuth->url('oauth/access_token', ''),
    'params' => array(
      'oauth_verifier' => trim($params['oauth_verifier']),
    )
  ));

  if ($code == 200) {
    $oauth_creds = $tmhOAuth->extract_params($tmhOAuth->response['response']);
    verify_credentials($tmhOAuth, htmlspecialchars($oauth_creds['oauth_token']), htmlspecialchars($oauth_creds['oauth_token_secret']));
  }
  else
  {
    error("There was an error communicating with Twitter. {$tmhOAuth->response['response']}");
    return;
  }
}

function verify_credentials($tmhOAuth, $get_token, $get_secret)
{
  // update with the new token and secret
  $tmhOAuth->reconfigure(array_merge($tmhOAuth->config, array(
    'token'  => $get_token,
    'secret' => $get_secret
  )));

  $code = $tmhOAuth->user_request(array(
    'url' => $tmhOAuth->url('1.1/account/verify_credentials'),
    'params' => array(
      'include_email' => 'true'
    )
  ));

  if ($code == 200) {
    $data = json_decode($tmhOAuth->response['response'], true);
    $_SESSION['twitresult'] = 'allowed';
    $_SESSION['twitemail'] = $data['email'];
    $_SESSION['twitname'] = $data['name'];
    $_SESSION['twitscreenname'] = $data['screen_name'];
    tweet_photo($tmhOAuth);
  }
  else
  {
    error("There was an error communicating with Twitter. {$tmhOAuth->response['response']}");
    return;
  }
}

function tweet_photo($tmhOAuth)
{
  $connect = new db();
  $connect->db_connect();
  $nice = strtolower($_REQUEST['l']);
  $splitID = explode('-',$nice);

  $sql = "SELECT s.pathimg, p.profilePlaceId, p.nicename, l.businessName, l.subscribe,u.state,v.link,cam.brand, cam.tag1, cam.tag2 FROM businessProfile AS p
  LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
  LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
  LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
  LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
  LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
  LEFT JOIN sharedlink_{$splitID[1]} AS s ON s.link = '{$nice}'
  WHERE p.profilePlaceId =  {$splitID[1]}
  LIMIT 1";
  $result1 = mysql_query($sql) or die(mysql_error());
  $row = mysql_fetch_object($result1);
  $dir = __DIR__.'/'.$row->pathimg;
  $getpath = explode('/',$row->pathimg);

  $params = array(
    'media[]' => "@{$dir};type={'jpg'};filename={$getpath[3]}",
    'status'  => $row->businessName . ' -- ' . strtolower($row->tag1) . ' ' . strtolower($row->tag2) . ' by ' . $row->brand . ' ' . 'http://camrally.com/app/user/' . $nice
  );
  
  $code = $tmhOAuth->user_request(array(
    'method' => 'POST',
    'url' => $tmhOAuth->url("1.1/statuses/update_with_media"),
    'params' => $params,
    'multipart' => true
  ));

  if ($code == 200)
  {
    $data = json_decode($tmhOAuth->response['response'], true);
  }
  else
  {
    error("There was an error communicating with Twitter. {$tmhOAuth->response['response']}");
    return;
  }
}

$params = uri_params();
if (!isset($params['oauth_token']) && !isset($params['denied'])) {
  // Step 1: Request a temporary token and
  // Step 2: Direct the user to the authorize web page
  request_token($tmhOAuth);
} else {
  // Step 3: This is the code that runs when Twitter redirects the user to the callback. Exchange the temporary token for a permanent access token
  access_token($tmhOAuth);
}
?>
<html>
    <head>
        <script>
          function loadLink()
          {
            var closeLink = document.getElementById('close-link');
            closeLink.click();
          }
          function CloseMySelf(sender) {
              try {
                  window.opener.HandlePopupResult(sender.getAttribute("twitresult"),sender.getAttribute("twitemail"),sender.getAttribute("twitname"),sender.getAttribute("twitscreenname"));
              }
              catch (err) {}
              window.close();
              return false;
          }
        </script>
    </head>
    <body onload="loadLink()">
      <?php 
        if($_SESSION['twitresult'] == 'allowed') 
        { 
            echo '<a id="close-link" href="#" twitresult="' . $_SESSION['twitresult'] . '" twitemail="' . $_SESSION['twitemail'] . '" twitname="' . $_SESSION['twitname'] . '" twitscreenname="' . $_SESSION['twitscreenname']. '" onclick="return CloseMySelf(this);">&nbsp;</a>';
        }
        else
        {
            echo '<a id="close-link" href="#" twitresult="' . $_SESSION['twitresult'] . '" twitemail="" twitname="" twitscreenname="" onclick="return CloseMySelf(this);">&nbsp;</a>';

        }
      ?>
    </body>
</html>