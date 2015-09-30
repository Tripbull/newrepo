<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$nice = $_REQUEST['p'];
$type = (isset($_REQUEST['s']) ? isset($_REQUEST['s']) : '');
$istest = true;
if($istest){
   $curDomain = 'http://camrally.com/';
   $cur = 'http://camrally.com/';
}else
	$curDomain = '../';	

include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$sql = "SELECT p.profilePlaceId,cam.brand, cam.tag1, cam.tag2,l.businessName FROM businessProfile AS p LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN campaigndetails AS cam ON cam.posterId = p.profilePlaceId WHERE p.nicename =  '$nice' LIMIT 1";
$result = mysql_query($sql);
$row = mysql_fetch_object($result);
$businessTitle = $row->businessName .' - '.$row->tag1.' '.$row->tag2;
$placeId = $row->profilePlaceId;

$hadTable = $connect->tableIsExist('businessCustomer_'.$placeId);
if($hadTable){
	$resultAve = mysql_query("SELECT count(id) as totalAvg FROM businessplace_$placeId WHERE 1 ORDER BY id DESC");
	if(mysql_num_rows($resultAve)){
		$rowAvg = mysql_fetch_object($resultAve);
	}	
}

$connect->db_disconnect();
?>
<!DOCTYPE html>
<html> 
<head>
	<title><?php echo $businessTitle ?></title>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<!--[if lt IE 9]>
    <script src="js/excanvas.js"></script>
	<![endif]-->
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/scriptcam.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/rate.js"></script>
	<script type="text/javascript" src="js/webcam.js"></script>
	<script type="text/javascript" src="js/exif.js"></script>
	<link rel="Shortcut Icon" href="images/Logo/ico/Icon_2.ico" type="image/x-icon">
	<script src="//load.sumome.com/" data-sumo-site-id="83d0035cb9e786112f858edefc4bc4aef74cdbf55010766f0ae97f9b7c25c962" async="async"></script>
</head>
<body>
	<!--
	<div class="hide top-button-selfie"><div style="text-align:center;"><div style="display: inline-block;vertical-align: middle;height: 50px;margin:8px 0px 0px auto;"><p style="margin:0px !important;font-size:12px !important;">Powered by</p><img src="images/tabluu-logo-mono-xsmall.png"></div><span style="display: inline-block;margin-left: auto;margin-right: 20px;" class="btn-take-isselfie">Your Selfie Now!</span></div></div> -->

	<div class="top-button-selfie"><div style="text-align:center;"><div class="wrapbtn"><span class="btn-take-isselfie"><span class="wraptext">Join the Rally</span></span></div><div style="display: inline-block;vertical-align: middle;height: 50px;margin:9px 0px 0px auto;"><p style="margin:0px !important;font-size:12px !important;">Powered by</p><div style="width:90px;margin-top:3px;"><img src="images/Logo/Logo_white_1camp.png" style="width:85%;height:auto"></div></div></div></div>
	<div style="position:absolute;opacity:0;overflow:hidden;">
		<div style="position:absolute;font-family:myriadpro;">.</div>
		<div style="position:absolute;font-family:Lato-Light;">.</div>
		<div style="position:absolute;font-family:myriadproit;">.</div>
		<canvas id="canvas-image" style="position:absolute;"></canvas>
		<canvas id="canvas-image-test" style="position:absolute;"></canvas>
		<canvas id="canvas-resize" style="position:absolute;"></canvas>
	</div>
	<div id="fb-root"></div>

	<div class="rate" id="rateone" data-dom-cache="false" data-role="page" data-prefetch="false">
		<div class="camp-wrapper">
			<div class="left">
			 	<img class="campaign-image" src="" alt="campaign poster" onload="campaign_poster()" />
      			<iframe class="campaign-video" width="640" height="360" frameborder="0" src="" onload="campaign_video()"></iframe>
			</div>
			<div class="right">
			    <!--
				<div class="wrapbtn-com"><span class="btn-take-isselfie-com"><a class="wraptext-com" style="text-decoration:none;color: #fff;" href="<?='http://camrally.com/'.$nice.'.html'?>" target="_blank">Campaign details</a></span></div>-->
				<div class="fb-like" data-href="<?=$curDomain.'newcam.html?p='.$nice?>" data-layout="standard" data-action="like" data-show-faces="false" data-share="false"></div>
				<div class="fb-comments" data-href="<?=$curDomain.'app/campaign.html?p='.$nice.'&s='.$type;?>" mobile="true" data-numposts="5" data-colorscheme="light"></div>
			</div> 
		</div>
		<div class="content-wrap">
			<div role="main" class="ui-content">
				<div class="ratewrap">
					<div class="hide isselfie">
							
					<input type="hidden" id="nicename" name="nicename" value="<?php echo $_REQUEST['p']?>" />
					<form id="frmtakeselfie" style="visibility:hidden;height:0px" action="setPhoto.php" method="post" enctype="multipart/form-data" >
						<input type="file" name="fileselfie" style="visibility:hidden;height:0px" id="fileselfie" accept="image/*" capture="camera" />
						<input type="hidden" value="" name="selfieId" id="selfieId" />
					</form>
					<div class="hide">
						<div id="modal-cam">
							<div class="cam-frame">
								<div id="screen"></div>
								<canvas id="canvas" style="position:absolute;z-index:-1;" width="640" height="480"></canvas>
								<div class="snapshotbutton">
									<div class="snapshot hide">
										<a href="#" data-rel="back" class="cancelsnap">cancel</a>
										<div class="btnseparator"></div>
										<a href="#" data-rel="back" class="takesnap">snap</a>
									</div>
									<div class="usesnap hide">
										<a href="#" data-rel="back" class="cancelsnap">discard</a>
										<div class="btnseparator"></div>
										<a href="#" data-rel="back" class="use">use</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div><!-- /content -->
</div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=148972192103323";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script> 
</body>
</html>