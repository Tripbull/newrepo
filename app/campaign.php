<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$nice = $_REQUEST['p'];
$type = (isset($_REQUEST['s']) ? $_REQUEST['s'] : '');
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$istest = $connect->istest;
if(isset($_REQUEST['p'])){
	$nice = strtolower($_REQUEST['p']);
	$sql = "SELECT c.backgroundImg,cam.tag1, cam.tag2,l.businessName FROM businessProfile AS p
			LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
			LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
			LEFT JOIN campaigndetails AS cam ON cam.posterId = p.profilePlaceId
			WHERE p.nicename =  '$nice'
			LIMIT 1";
	$result1 = mysql_query($sql);
	$row = mysql_fetch_object($result1);
	$bckbg = json_decode($row->backgroundImg);
	$srcimg = $bckbg->bckimage;
	$businessTitle = $row->businessName .' - '.$row->tag1.' '.$row->tag2;
	if($istest){
		$curDomain = 'http://camrally.com/staging/';	
		$redirectpage = 'http://camrally.com/staging/'.$nice.'.html';
	}else{
		$curDomain = 'http://camrally.com/';
	   $redirectpage = 'http://camrally.com/'.$nice.'.html';
	}	
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/">
<head>

<?php
echo '<title>'.$businessTitle.'</title>';
?>
<meta name="robots" content="index, follow"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<link href="css/bootstrap.css" rel="stylesheet" media="all">
<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<link href="css/campaign.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="http://vjs.zencdn.net/4.12.12/video-js.css" rel="stylesheet">
	<link href="css/videojs.record.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/scriptcam.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/rate.js"></script>
	<script type="text/javascript" src="js/webcam.js"></script>
	<script src="http://vjs.zencdn.net/4.12.12/video.js"></script>
	<script src="http://cdn.webrtc-experiment.com/RecordRTC.js"></script>
	<script type="text/javascript" src="js/videojs.record.js"></script>
	<script type="text/javascript" src="js/exif.js"></script>
<link rel="Shortcut Icon" href="images/Logo/ico/Icon_2.ico" type="image/x-icon">
<script src="//load.sumome.com/" data-sumo-site-id="9e98d0a1ee03ad7942ebac5144759f147aafe068a407e46486c26b9a207c4300" async="async"></script>
</head>
<body>
<div id="fb-root"></div>
<div id="shared-like-page" style="overflow:visible" data-dom-cache="false" data-role="page" data-prefetch="false">
<div id="vdesktop">
	<div class="header">
		<div class="HeaderContainer">
			<div class="d-logo"><a href="/" rel="follow" class="Pinme"><img alt="camrally.com" src="images/Logo/Logo_2-small.png" /></a></div>
		</div>
	</div>
</div>
<div id="vmobile">
	<div class="m-header">
		<div class="logo"><a href="/"><img src="images/Logo/Logo_1-small.png" alt="img" width="130" height="auto"></a></div>
		<header>
			<nav class="navbar navbar-default" role="navigation"> 
			  <div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div>
			  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav pull-right">
					<li><a href="/">Camrally.com</a></li>
				</ul>
			  </div>
			</nav>
		</header>
	</div>
	<div id="topmenu">
		<ul>
			<li class="borderright" id="showcase"><a href="#">Gallery</a></li>
			<li class="activeMenu" id="top-reviews"><a href="#">Posts</a></li>
		</ul>
	</div>
</div>		
<div class="overlay"> </div>
	  <div class="MerchantHead" style="width:90%">
		<a href="#" rel="follow"><div class="xclose goescampage"></div></a>
		<div style="overflow:hidden;">
			<!-- campaign page -->
				<div class="new-btn-selfie"><div style="text-align:center;"><div class="wrapbtn"><span class="btn-take-isselfie"><span class="wraptext"></span></span></div><div style="display: inline-block;vertical-align: middle;height: 50px;margin:9px 0px 0px auto;"><p style="margin:0px !important;font-size:12px !important;">Powered by</p><div style="width:90px;margin-top:3px;"><img src="images/Logo/Logo_white_1camp.png" style="width:85%;height:auto"></div></div></div></div>
			<div style="position:absolute;opacity:0;overflow:hidden;">
				<div style="position:absolute;font-family:myriadpro;">.</div>
				<div style="position:absolute;font-family:Lato-Light;">.</div>
				<div style="position:absolute;font-family:myriadproit;">.</div>
				<canvas id="canvas-image" style="position:absolute;"></canvas>
				<canvas id="canvas-image-test" style="position:absolute;"></canvas>
				<canvas id="canvas-resize" style="position:absolute;"></canvas>
			</div>
				<div class="clear"></div>
				<div class="wrapleftright" style="margin:0 auto;width:100%;">
					  <div class="left text-center">
					    <?php
						if(strstr($srcimg,'image')){
						?>
						<img src="<?=$srcimg;?>" style="height:auto;width:auto;max-height:500px"  alt="selfie photo" />
						<?php
						}else{
						?>
						<!--<iframe class="campaign-video" height="360" style="min-width:200px" frameborder="0" src=""></iframe>-->
						<div class="fluidMedia">
							<iframe src="http://www.youtube.com/embed/<?=$srcimg?>?autoplay=1" class="iframeshare" frameborder="0"> </iframe>
						</div>
						<?php
						}
						?>
					  </div>
					 <div class="right" style="overflow-y:visible;text-align:left">
							<div style="padding:15px 0;clear:both">
							<iframe src="http://www.facebook.com/plugins/like.php?app_id=148972192103323&amp;href=<?php echo $curDomain.'campaign.html?p='.$nice?>&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px; position:relative; top:1px;" ></iframe>
							</div>
							<div class="fb-comments" data-href="<?=$curDomain.'app/campaign.html?p='.$nice.($type != '' ? '&s='.$type : '')?>" mobile="true" data-numposts="5" data-colorscheme="light"></div>
					  </div> 
				</div>
				<div class="content-wrap">
					<div role="main" class="ui-content">
						<div class="ratewrap">
							<div class="hide isselfie">
							<input type="hidden" id="nicename" name="nicename" value="<?php echo $_REQUEST['p']?>" />
							<form id="frmtakeselfie" style="visibility:hidden;height:0px" action="setPhoto.php" method="post" enctype="multipart/form-data" >
								<input type="file" name="fileselfie" style="visibility:hidden;height:0px" id="fileselfie" accept="image/*" />
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
			<!-- end of campaign code -->		
		</div>
	</div>
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