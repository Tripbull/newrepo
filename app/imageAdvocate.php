<?php

	session_start();

	$ur_session = rand(0, 15);
	$_SESSION['session']=$ur_session;
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();  
	if(isset($_REQUEST['placeId']))
	{
		$_SESSION['placeIdVid'] = $_REQUEST['placeId'];
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
        	var resizeTimeout, getPlaceId, getUrlImg, txtimageurl, checktype;

			$(document).ready(function(){
        		$('#browseimg').click(function(){showLoader();setBrowse();});
        		$('#urlimg').click(function(){showLoader();setUrl();});
        		$('#takeimg').click(function(){showLoader();setImage();});
        	});

			function showLoader(){loader = jQuery('<div id="overlay"> </div><div class="ZebraDialogOverlay" style="position: fixed; left: 0px; top: 0px; opacity: 0.5;"></div>');loader.appendTo(document.body);}
			function hideLoader(){$( "#overlay" ).remove();$( ".ZebraDialogOverlay" ).remove();}

        	function setUrl()
        	{
				txtimageurl=$('#txtimageurl').val();
				checktype = checkFiletype(txtimageurl);

				if(txtimageurl == '')
				{
					alertBox('Image URL error','Image URL is empty!');	
					hideLoader();
				}
				else if(checktype == 0)
				{
					alertBox('Image URL error','Please upload only gif, png, bmp, jpg, jpeg file types');	
					hideLoader();
				}
				else
				{
        			getPlaceId = $('#placeIdVid').val();
					var p = 'placeId='+getPlaceId+'&image_url='+txtimageurl; 
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=setUrlImage&'+p,success:function(returnText){
						
						if(returnText == 'max file size')
						{
							alertBox('Image URL error','Maximum file size is 1MB!');	
							hideLoader();
						}
						else if(returnText == 'error')
						{
							alertBox('Image URL error','There\'s an error uploading the file, please try again!');	
							hideLoader();

						}
						else
						{
							try {
							  window.opener.HandlePopupResultImgUrl(returnText);
							}
							catch (err) {}
							window.close();
						}
					}});
				}
        	}       	

        	function checkFiletype(getUrl)
        	{
				var fileArray = ['png', 'gif', 'jpeg', 'jpg', 'bmp', 'pjpeg'];
				var n = 0;

				for(i=0; i<fileArray.length;i++)
				{
					n = getUrl.indexOf(fileArray[i]);

					if(n >= 0)
					{
						n++;
					}
				}

				return n;
        	}

        	function setBrowse()
        	{
				try {
				  window.opener.HandlePopupResultImgBrowse();
				}
				catch (err) {}
				window.close();
        	}


        	function setImage()
        	{
				try {
				  window.opener.HandlePopupResultImgSet();
				}
				catch (err) {}
				window.close();
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
			<p class="take">Take a photo</p>
			<button class="ui-btn" id="takeimg">Camera</button>
			<p class="or">or</p>
			<p class="url">enter your image URL</p>
			<input type="text" style="margin-top:5px;width:70%;" data-clear-btn="true" name="txtimageurl" id="txtimageurl" value="" placeholder="Image URL">
			<button class="ui-btn" id="urlimg">Enter</button>
			<p class="or">or</p>
			<p class="browse">click browse to upload an image</p>
			<p class="note" style="font-size:11.5px;color:#9C9797;text-align:left !important;">*(Maximum file size is 1MB.)</p>
			<button class="ui-btn" id="browseimg">Browse</button>
		</div>
	 </body>
 </html>