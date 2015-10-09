<?php

// Call set_include_path() as needed to point to your client library.
require_once 'Google/autoload.php';
require_once 'Google/Client.php';
require_once 'Google/Service/YouTube.php';
session_start();

$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();  
$getStatus = '';

$placeId = $_REQUEST['placeId'];
$videourl = $_REQUEST['url'];
$title = '';


defined('__DIR__') or define('__DIR__', dirname(__FILE__));
/*
 * You can acquire an OAuth 2.0 client ID and client secret from the
 * {{ Google Cloud Console }} <{{ https://cloud.google.com/console }}>
 * For more information about using OAuth 2.0 to access Google APIs, please see:
 * <https://developers.google.com/youtube/v3/guides/authentication>
 * Please ensure that you have enabled the YouTube Data API for your project.
 */
$OAUTH2_CLIENT_ID = '412216158543-2uktl2tm6mejq2q9dl9l1rpu6a4upra3.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = 'vFVpxX-auwFZ-CrdRoGVN1Lp';

$client = new Google_Client();
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setScopes('https://www.googleapis.com/auth/youtube');
$redirect = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'],
    FILTER_SANITIZE_URL);
$client->setRedirectUri('http://camrally.com/staging/resumable_upload.html?placeId='.$placeId.'&url='.$videourl);
$client->setAccessType('offline');

// Define an object that will be used to make all API requests.
$youtube = new Google_Service_YouTube($client);

if (isset($_GET['code'])) {
  if (strval($_SESSION['state']) !== strval($_GET['state'])) {
    die('The session state did not match.');
  }

  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: ' . $redirect);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

// Check to ensure that the access token was successfully acquired.
if ($client->getAccessToken()) {
  try{
    
    if ($client->isAccessTokenExpired()) { 
      //Retrieve token from database
      $result = mysql_query("SELECT token FROM CREDENTIALS WHERE service = 'youtube'");//check if source is existed
      if(mysql_num_rows($result)){ // existed update it
        $row = mysql_fetch_object($result); 
        $refreshToken =  $row->token; 
      }       
      //Here's where the magical refresh_token comes into play
      $client->refreshToken($refreshToken);
    }

    // REPLACE this value with the path to the file you are uploading.
    $videoPath = __DIR__.'/images/shared/'.$placeId.'/'.$videourl;


    $sql = "SELECT p.profilePlaceId, p.nicename, l.businessName, l.subscribe,u.state,v.link,cam.brand, cam.tag1, cam.tag2 FROM businessProfile AS p
    LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
    LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
    LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
    LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
    LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
    WHERE p.profilePlaceId =  {$placeId}
    LIMIT 1";
    $result1 = mysql_query($sql) or die(mysql_error());
    $row = mysql_fetch_object($result1);

    if($title == '')
    {
      $title = $row->businessName . ' advocate';
    }

    // Create a snippet with title, description, tags and category ID
    // Create an asset resource and set its snippet metadata and type.
    // This example sets the video's title, description, keyword tags, and
    // video category.
    $snippet = new Google_Service_YouTube_VideoSnippet();
    $snippet->setTitle($title);
    $snippet->setDescription($row->businessName . ' -- ' . strtolower($row->tag1) . ' ' . strtolower($row->tag2) . ' by ' . $row->brand . ' ' . 'http://camrally.com/app/user/' . $nice);
    $snippet->setTags(array($row->businessName, "Camrally", "Campaign"));

    // Numeric video category. See
    // https://developers.google.com/youtube/v3/docs/videoCategories/list 
    $snippet->setCategoryId("22");

    // Set the video's status to "public". Valid statuses are "public",
    // "private" and "unlisted".
    $status = new Google_Service_YouTube_VideoStatus();
    $status->privacyStatus = "private";

    // Associate the snippet and status objects with a new video resource.
    $video = new Google_Service_YouTube_Video();
    $video->setSnippet($snippet);
    $video->setStatus($status);

    // Specify the size of each chunk of data, in bytes. Set a higher value for
    // reliable connection as fewer chunks lead to faster uploads. Set a lower
    // value for better recovery on less reliable connections.
    $chunkSizeBytes = 1 * 1024 * 1024;

    // Setting the defer flag to true tells the client to return a request which can be called
    // with ->execute(); instead of making the API call immediately.
    $client->setDefer(true);

    // Create a request for the API's videos.insert method to create and upload the video.
    $insertRequest = $youtube->videos->insert("status,snippet", $video);

    // Create a MediaFileUpload object for resumable uploads.
    $media = new Google_Http_MediaFileUpload(
        $client,
        $insertRequest,
        'video/*',
        null,
        true,
        $chunkSizeBytes
    );
    $media->setFileSize(filesize($videoPath));


    // Read the media file and upload it chunk by chunk.
    $status = false;
    $handle = fopen($videoPath, "rb");
    while (!$status && !feof($handle)) {
      $chunk = fread($handle, $chunkSizeBytes);
      $status = $media->nextChunk($chunk);
    }

    fclose($handle);

    // If you want to make other calls after the file upload, set setDefer back to false
    $client->setDefer(false);

    $htmlBody .= "<h3>Uploading to Youtube</h3><img src='images/original.gif'>";
    $getStatus = $status['id'];
         // $status['snippet']['title']
         // $status['id']);

    } catch (Google_Service_Exception $e) {
      $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
          htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
      $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
          htmlspecialchars($e->getMessage()));
    }

    $_SESSION['token'] = $client->getAccessToken();
    
    $array = json_decode($client->getAccessToken(), true);
    $query = mysql_query('UPDATE CREDENTIALS SET token="'.$array['refresh_token'].'"') or die(mysql_error());
} else {
  // If the user hasn't authorized the app, initiate the OAuth flow
  $state = mt_rand();
  $client->setState($state);
  $_SESSION['state'] = $state;

  $authUrl = $client->createAuthUrl();
  $htmlBody = <<<END
  <h3>Authorization Required</h3>
  <p>You need to <a href="$authUrl">authorize access</a> before proceeding.<p>
END;
}
?>

<!doctype html>
<html>
<head>
<title>Uploading to Youtube</title>
  <script>
    function loadLink()
    {
      var closeLink = document.getElementById('close-link');
      closeLink.click();
    }
    function CloseMySelf(sender) {
        try {
          window.opener.HandlePopupResultVid(sender.getAttribute("ytresult"));
        }
        catch (err) {}
        window.close();
        return false;
    }
  </script>
</head>
<body onload="loadLink()">
  <?=$htmlBody?>
  <a id='close-link' href='#' ytresult='<?=$getStatus?>' onclick='return CloseMySelf(this);'>&nbsp;</a>
</body>
</html>
