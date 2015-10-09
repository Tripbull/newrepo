<?php

// GET NEW REFRESH TOKEN START (DO NOT REMOVE!!!)
// $redirectUri = urlencode('http://camrally.com/app/videoAdvocate.html');
// $scope = urlencode('https://gdata.youtube.com');

// $url = 'https://accounts.google.com/o/oauth2/auth?client_id=412216158543-2uktl2tm6mejq2q9dl9l1rpu6a4upra3.apps.googleusercontent.com&redirect_uri='.$redirectUri.'&scope='.$scope.'&response_type=code&access_type=offline&approval_prompt=force';

// if(!isset($_REQUEST['code']))
// {
// 	header("Location: " . $url);
// }
// //using PHP cUrl  
// $curl = curl_init( 'https://accounts.google.com/o/oauth2/token' );  
// $post_fields = array(  
//   'code'     => $_REQUEST['code'],  
//   'client_id'   => '412216158543-2uktl2tm6mejq2q9dl9l1rpu6a4upra3.apps.googleusercontent.com',  
//   'client_secret' => 'vFVpxX-auwFZ-CrdRoGVN1Lp',  
//   'redirect_uri' => 'http://camrally.com/app/videoAdvocate.html', //this doesn't do anything, but it's validated so i needs to match what you've been using  
//   'grant_type'  => 'authorization_code' 
// );  
 
// curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);  
// curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);  
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
// curl_setopt($curl, CURLOPT_POST, 1);  
// curl_setopt($curl, CURLOPT_HEADER, 0);  
// curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post_fields));
  
// curl_setopt($curl, CURLOPT_HTTPHEADER, array(  
//   'Content-Type: application/x-www-form-urlencoded' 
// )); 
 
// //send request  
// $response = curl_exec($curl); 
 
// print_r($response); 
// GET NEW REFRESH TOKEN END

	session_start();

	$ur_session = rand(0, 15);
	$_SESSION['session']=$ur_session;
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();  
	if(isset($_REQUEST['placeId']))
	{
		$_SESSION['placeIdVid'] = $_REQUEST['placeId'];
		$_SESSION['titleVid'] = $_REQUEST['videotitle'];
		$get_info = get_video_upload_info();
	}

	$redirectUri = urlencode('http://camrally.com/staging/videoAdvocate.html');

	function get_video_upload_info()  
	{  
	   	//get youtube access token  
	   	$access_token = get_access_token();  

		$sql = "SELECT p.profilePlaceId, p.nicename, l.businessName, l.subscribe,u.state,v.link,cam.brand, cam.tag1, cam.tag2 FROM businessProfile AS p
		LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
		LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
		LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
		LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
		LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
		WHERE p.profilePlaceId =  {$_SESSION['placeIdVid']}
		LIMIT 1";
		$result1 = mysql_query($sql) or die(mysql_error());
		$row = mysql_fetch_object($result1);

		$title = $_REQUEST['videotitle'];
		if($title == '')
		{
			$title = $row->businessName . ' Video';
		}

		//create a video obj with temp info  
		$video_title  = $title;  
		$video_desc   = $row->businessName . ' -- ' . strtolower($row->tag1) . ' ' . strtolower($row->tag2) . ' by ' . $row->brand . ' ' . 'http://camrally.com/' . $row->nicename . '.html';  
		$video_keywords = $row->businessName . ', ' . 'Camrally, Campaign';  
	 
		//setup request body as xml  
		$xml_str = implode('', array(  
		 '<?xml version="1.0"?>',  
		 '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:yt="http://gdata.youtube.com/schemas/2007">',  
		   '<media:group>',  
		     '<media:title type="plain">' . $video_title . '</media:title>',  
		     '<media:description type="plain">' . $video_desc . '</media:description>',  
		     '<media:category scheme="http://gdata.youtube.com/schemas/2007/categories.cat">Animals</media:category>',  
		     '<media:keywords>' . $video_keywords . '</media:keywords>',  
		     '<yt:unlisted/>',  
		     '<yt:accessControl action="list" permission="denied"/>', //causes the video to be unlisted  
		   '</media:group>',  
		 '</entry>'));

		//use curl to call youtube api  
		$ch = curl_init( 'http://gdata.youtube.com/action/GetUploadToken' );  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		curl_setopt($ch, CURLOPT_HEADER, 0);

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
		 'Authorization: Bearer ' . $access_token,  
		 'GData-Version: 2',  
		 'X-GData-Key: key=AI39si4ZlJR_8DWIfv_VchkxZn4R3NJ0NzVli9zFkoc35FCP83ps_exV2Qe8v5zSkbxRDw3_TPbuOpWeuN_bhaAl3UzOfk-CJA',  
		 'Content-Type: application/atom+xml; charset=UTF-8' 
		));

		curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_str);  

		//send request  
		$xml_response = curl_exec($ch);  

		//close connection  
		curl_close($ch); 

		$result = simplexml_load_string( $xml_response ); 
		if( $result->getName() === 'errors' )  
		{  
		 return array('post_url' => 'broke', 'upload_token' => 'not_a_real_token');     
		}  
		return array('post_url' => (string) $result->url, 'upload_token' => (string) $result->token);  
	}  

	function get_access_token()  
	{  
		$ch = curl_init( 'https://accounts.google.com/o/oauth2/token' );  
		$post_fields = array(  
		 'client_id'   => '412216158543-2uktl2tm6mejq2q9dl9l1rpu6a4upra3.apps.googleusercontent.com',  
		 'client_secret' => 'vFVpxX-auwFZ-CrdRoGVN1Lp',  
		 'refresh_token' => '1/kJW6PXs0hQsewo36L5MfNjKP0evkTTyfE3MaCpezXd8',  
		 'grant_type'  => 'refresh_token' 
		);  

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		curl_setopt($ch, CURLOPT_POST, 1);  
		curl_setopt($ch, CURLOPT_HEADER, 0);  
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields)); 

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
		 'Content-Type: application/x-www-form-urlencoded' 
		));  

		//send request  
		$response = json_decode( curl_exec($ch) );  

		curl_close($ch);  
		return $response->access_token;  
	} 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>Upload Videos</title>
		<link type="text/css" rel="stylesheet" href="css/style.css" />
		<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
		<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
		<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    	<script src="http://malsup.github.com/jquery.form.js"></script>
		<script type="text/javascript" src="js/dialog.js"></script>
        <script>
        	var resizeTimeout, getVideoId, getStatus, getPlaceId, getTitleVid, getUrlVid;

			$(document).ready(function(){
        		$('#browsevid').click(function(){$('#filevid').click();});
        		$('#urlvid').click(function(){showLoader();setUrl();});
        		$('#takevid').click(function(){
        			showLoader();

					if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
					{
						$('#filevid').attr('capture', 'camera');
						$('#filevid').click();
					}
					else
					{
						recVid();
					}
        		});

				$('#filevid').on('change',function(){
					showLoader();
					$('#frmvid').submit();
				});	

				getStatus = getParameter('status');
				getVideoId = getParameter('id');
				if(getStatus == '200' && getVideoId != 'false')
				{
					setVideo('https://www.youtube.com/watch?v='+getVideoId);
				}
        	});

			function showLoader(){loader = jQuery('<div id="overlay"> </div><div class="ZebraDialogOverlay" style="position: fixed; left: 0px; top: 0px; opacity: 0.5;"></div>');loader.appendTo(document.body);}
			function hideLoader(){$( "#overlay" ).remove();$( ".ZebraDialogOverlay" ).remove();}

        	function setUrl()
        	{
				txtvideourl=$('#txtvideourl').val();
				var n = txtvideourl.indexOf("youtube");
				if(txtvideourl == '')
				{
					alertBox('Youtube URL error','Youtube URL is empty!');	
					hideLoader();
				}
				else if(n < 0)
				{
					alertBox('Youtube URL error','Please enter a valid Youtube URL!');
					hideLoader();
				}
				else
				{
					setVideo(txtvideourl);
				}
        	}       	

        	function setVideo(urlVid)
        	{
        		getPlaceId = $('#placeIdVid').val();
        		getTitleVid = $('#titleVid').val();

				var n = urlVid.indexOf("=");
				getUrlVid = urlVid.substr(n+1);

				parent.HandlePopupResultVid(getUrlVid);
        	}

        	function recVid()
        	{
				parent.HandlePopupResultRecVid();
        	}

        	function cancelVid()
        	{
				parent.HandleCancel();
        	}

        	function getParameter(theParameter) { 
			  var params = window.location.search.substr(1).split('&');
			 
			  for (var i = 0; i < params.length; i++) {
			    var p=params[i].split('=');
				if (p[0] == theParameter) {
				  return decodeURIComponent(p[1]);
				}
			  }
			  return false;
			}

			function beforeSubmitvid(){
				
				parent.HandleOpacity();
				//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
				if (window.File){
					var ftype = $('#filevid')[0].files[0].type; // get file type

					switch(ftype){
						case 'video/mov':
						case 'video/mp4':
						case 'video/avi':
						case 'video/wmv':
						case 'video/flv':
						case 'video/webm':
						case 'video/quicktime':
							return true;
						break;
						default: alertBox('unsupported file type','Please upload only mov, mp4, avi, wmv, flv, webm file types');
							hideLoader();	
							return false;
					}

				}else{
				   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');
				   hideLoader();	
				   return false;
				}
			}

			function alertBox(title,message){
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function(){ 
					$.box_Dialog(message, {
						'type':     'question',
						'title':    '<span class="color-gold">'+title+'<span>',
						'center_buttons': true,
						'show_close_button':false,
						'overlay_close':false,
						'buttons':  [{caption: 'okay'}]
					});	
					$('.ZebraDialog').css('width', '200px');
					$('.ZebraDialog').css('min-width', '200px');
					$('.ZebraDialog').css('left', '25px');
				}, 500);//to prevent the events fire twice
		    }
        </script>
	</head>
	<body style="overflow:hidden;">
		<div id="ytupload" style="width:100%;height:100%;">
			<input type="hidden" value="<?=$_SESSION['placeIdVid']?>" name="placeIdVid" id="placeIdVid" />
			<input type="hidden" value="<?=$_SESSION['titleVid']?>" name="titleVid" id="titleVid" />
			<p class="record">Record a video</p>
			<button class="ui-btn" id="takevid">Camera</button>
			<p class="or">or</p>
			<p class="url">enter a Youtube URL</p>
			<input type="text" style="margin-top:5px;width:90%;font-size:13px;" data-clear-btn="true" name="txtvideourl" id="txtvideourl" value="" placeholder="Youtube video URL">
			<button class="ui-btn" id="urlvid">Enter</button>
			<p class="or">or</p>
			<p class="browse">click browse to upload a video</p>
			<p class="note" style="font-size:10.5px;color:#9C9797;">(Maximum file size is 2GB. It may take a few minutes before the video becomes available.)</p>
			<button class="ui-btn" id="browsevid">Browse</button>
			<form id="frmvid" action="<?=$get_info['post_url'] . '?nexturl=' . $redirectUri;?>" method="post" enctype="multipart/form-data" onsubmit="return beforeSubmitvid();" style="width:50px;">
				<div style="height:0px">
				<input type="file" name="filevid" style="visibility:hidden;height:0px;width:0px;" id="filevid" value="" accept="video/*">
				</div>
				<input type="hidden" value="<?=$get_info['upload_token']?>" name="token" id="token" />
			</form>	
			<p class="cancel" style="cursor:pointer;text-decoration:underline !important;margin-top: 10px;font-size: 13px;" onclick="cancelVid()">Cancel</p>
		</div>
	 </body>
 </html>