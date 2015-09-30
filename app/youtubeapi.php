<?php

// GET NEW REFRESH TOKEN START (DO NOT REMOVE!!!)
// $redirectUri = urlencode('http://camrally.com/app/youtubeapi.html');
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
//   'redirect_uri' => 'http://camrally.com/app/youtubeapi.html', //this doesn't do anything, but it's validated so i needs to match what you've been using  
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
		$_SESSION['typeVid'] = $_REQUEST['name'];
		$_SESSION['titleVid'] = $_REQUEST['videotitle'];
		$_SESSION['videotypeVid'] = $_REQUEST['videotype'];
		$get_info = get_video_upload_info();
	}

	$redirectUri = urlencode('http://camrally.com/staging/youtubeapi.html');

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
		     //'<yt:private/>',  
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
<!DOCTYPE html>
<html>
	<head>
		<title>Upload Videos</title>
		<link type="text/css" rel="stylesheet" href="css/style.css" />
		<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
		<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
		<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    	<script src="http://malsup.github.com/jquery.form.js"></script>
		<script type="text/javascript" src="js/dialog.js"></script>
        <script>
        	var resizeTimeout,getVideoId,getStatus, getPlaceId, getTypevid, getTitleVid, getUrlVid;

			$(document).ready(function(){
        		$('#browsevid').click(function(e){e.preventDefault();$('#filevid').click();});
        		$('#urlvid').click(function(){showLoader();setUrl();});

				$('#filevid').on('change',function(){
					showLoader();
					$('#frmvid').submit();
				});	

				getStatus = getParameter('status');
				getVideoId = getParameter('id');
				if(getStatus == '200' && getVideoId != 'false')
				{
					setVideo('https://www.youtube.com/watch?v=' + getVideoId);
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
        		getVideotypeVid = $('#videotypeVid').val();
        		getUrlVid = urlVid;

        		if(getVideotypeVid == 'gallery')
        		{
        			getTypevid = $('#typeVid').val();
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+getPlaceId+'&typevid='+getTypevid+'&imgurlvid='+getUrlVid+'&imgtitlevid='+getTitleVid+'&opt=saveVid',async: false,success:function(returnUrl){
						if(getUrlVid == returnUrl)
						{
							window.close();
						}
					}});
        		}
        		else
        		{
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+getPlaceId+'&imgurlvid='+getUrlVid+'&opt=setcustom&case=11',async: false,success:function(returnUrl){
						window.close();
					}});

        		}
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
				//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
				if (window.File){
					var ftype = $('#filevid')[0].files[0].type; // get file type

					switch(ftype){
						case 'video/mov':
						case 'video/mp4':
						case 'video/avi':
						case 'video/wmv':
						case 'video/flv':
							return true;
						break;
						default: alertBox('unsupported file type','Please upload only mov, mp4, avi, wmv, flv file types');
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
				}, 500);//to prevent the events fire twice
		    }
        </script>
	</head>
	<body style="overflow:hidden;">
		<div id="ytupload" style="margin:15px;position:absolute;width:93%;height:100%;">
			<input type="hidden" value="<?=$_SESSION['placeIdVid']?>" name="placeIdVid" id="placeIdVid" />
			<input type="hidden" value="<?=$_SESSION['typeVid']?>" name="typeVid" id="typeVid" />
			<input type="hidden" value="<?=$_SESSION['titleVid']?>" name="titleVid" id="titleVid" />
			<input type="hidden" value="<?=$_SESSION['videotypeVid']?>" name="videotypeVid" id="videotypeVid" />
		<?php 
			if(isset($_REQUEST['id']))
			{ ?>
				<p class="url">Video successfully uploaded!!!</p>
		<?php }
			else
			{ ?>
				<p class="url">Enter a Youtube URL</p>
				<input type="text" style="margin-top:5px;width:70%;" data-clear-btn="true" name="txtvideourl" id="txtvideourl" value="" placeholder="Youtube video URL">
				<button class="ui-btn" id="urlvid">Enter</button>
				<p class="or">or</p>
				<p class="browse">click browse to upload a video</p>
				<p class="note" style="font-size:11.5px;color:#9C9797;">(Maximum file size is 2GB.)</p>
				<p class="note" style="font-size:11.5px;color:#9C9797;">(It may take a few minutes before the video becomes available for viewing.)</p>
				<form id="frmvid" action="<?=$get_info['post_url'] . '?nexturl=' . $redirectUri;?>" method="post" enctype="multipart/form-data" onsubmit="return beforeSubmitvid();">
					<div style="height:0px">
					<button class="ui-btn" id="browsevid">Browse</button><br>
					<input type="file" name="filevid" style="visibility:hidden;height:0px;width:0px;" id="filevid" value="">
					</div>
					<input type="hidden" value="<?=$get_info['upload_token']?>" name="token" id="token" />
				</form>	
		 <?php 
			} ?>
		</div>
	 </body>
 </html>