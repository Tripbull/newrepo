<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$imgrotate = new fucn();
if(isset($_REQUEST['p'])){
	$nice = strtolower($_REQUEST['p']);
	$sql = "SELECT c.backgroundImg FROM businessProfile AS p
			LEFT JOIN businessCustom AS c ON c.customPlaceId = p.profilePlaceId
			WHERE p.nicename =  '$nice'
			LIMIT 1";
	$result1 = mysql_query($sql);
	$row = mysql_fetch_object($result1);
	$bckbg = json_decode($row->backgroundImg);
	list($width, $height) = getimagesize($bckbg->bckimage);
	$srcimg = $bckbg->bckimage;
	if($width > 820)
		$width = 820;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/">
<head>

<?php
echo '<title></title>';
$path = '';	
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<link href="css/bootstrap.css" rel="stylesheet" media="all">
<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
<link href="css/campaign.css" media="screen" rel="stylesheet" type="text/css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link type="text/css" rel="stylesheet" href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/scriptcam.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/rate.js"></script>
	<script type="text/javascript" src="js/webcam.js"></script>
	<script type="text/javascript" src="js/exif.js"></script>
<link rel="Shortcut Icon" href="images/Logo/ico/Icon_2.ico" type="image/x-icon">
<!--<script src="//load.sumome.com/" data-sumo-site-id="9e98d0a1ee03ad7942ebac5144759f147aafe068a407e46486c26b9a207c4300" async="async"></script>-->
</head>
<body>
<div id="shared-like-page" data-dom-cache="false" data-role="page" data-prefetch="false">
<div id="fb-root"></div>
<?php
$redirectpage = '#';
?>
<div id="vdesktop">
	<div class="header">
		<div class="HeaderContainer">
			<div class="d-logo"><a href="/" rel="follow" class="Pinme"><img alt="camrally.com" src="<?=$path?>images/Logo/Logo_2-small.png" /></a></div>
		</div>
	</div>
</div>
<div id="vmobile">
	<div class="m-header">
		<div class="logo"><a href="/"><img src="<?=$path?>images/Logo/Logo_1-small.png" alt="img" width="130" height="auto"></a></div>
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
<div class="ColumnContainer">
	<div class="wrapheader" style="border:1px solid red;overflow:hidden;">
	    <div class="MerchantHead" style="max-width:<?=$width+380?>px;">
			<a href="<?=$redirectpage?>" rel="follow"><div class="xclose"></div></a>
			<div style="overflow:hidden;padding-bottom:10px">
			<!-- campaign page -->
				
		
				<div class="new-btn-selfie"><div style="text-align:center;"><div class="wrapbtn"><span class="btn-take-isselfie"><span class="wraptext">Post Your Photo or Selfie!</span></span></div><div style="display: inline-block;vertical-align: middle;height: 50px;margin:9px 0px 0px auto;"><p style="margin:0px !important;font-size:12px !important;">Powered by</p><div style="width:90px;margin-top:3px;"><img src="images/Logo/Logo_white_1camp.png" style="width:85%;height:auto"></div></div></div></div>
			<div style="position:absolute;opacity:0;overflow:hidden;">
				<div style="position:absolute;font-family:myriadpro;">.</div>
				<div style="position:absolute;font-family:Lato-Light;">.</div>
				<div style="position:absolute;font-family:myriadproit;">.</div>
				<canvas id="canvas-image" style="position:absolute;"></canvas>
				<canvas id="canvas-image-test" style="position:absolute;"></canvas>
				<canvas id="canvas-resize" style="position:absolute;"></canvas>
			</div>
				<!--
				<div class="camp-wrapper">
					<div class="left">
						<img class="campaign-image" src="" alt="campaign poster" onload="campaign_poster()" />
					</div>
					<div class="right">
						<div class="wrapbtn-com"><span class="btn-take-isselfie-com"><a class="wraptext-com" style="text-decoration:none;color: #fff;" href="<?='http://camrally.com/'.$nice.'.html'?>" target="_blank">Campaign details</a></span></div>
						<div class="fb-comments" data-href="<?=$curDomain.'app/campaign.html?p='.$nice.'&s='.$type;?>" mobile="true" data-numposts="5" data-colorscheme="light"></div>
					</div> 
				</div> -->
				
				<div class="clear"></div>
				<div style="margin:0 auto;width:100%;max-width:<?=$width+390?>px;">
					  <div class="left text-center" style="max-width:<?=$width?>px;">
						<img src="<?=$srcimg;?>" width="<?=$width?>" height="<?=$height?>"  alt="selfie photo" />
					  </div>
					 <div class="right">
							<div class="wrapbtn-com"><span class="btn-take-isselfie-com"><a class="wraptext-com" style="text-decoration:none;color: #fff;" href="<?='http://camrally.com/'.$nice.'.html'?>" target="_blank">Campaign details</a></span></div>
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
			<!-- end of campaign code -->		
		</div>
		</div>
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