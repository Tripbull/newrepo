<?php
$sql = "SELECT p.profilePlaceId, l.businessName, p.category,p.nicename, p.longitude, p.latitude, p.address, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.linkedinURL, p.twitterURL, p.showmap, p.booknowlabel, p.booknow,p.email as pemail, l.subscribe, u.productId,u.state,u.email,cam.btntext, d.description,c.button,c.reviewPost,c.logo FROM businessProfile AS p
LEFT JOIN businessList AS l ON l.id = p.profilePlaceId
LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId
LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
WHERE p.nicename =  '$nice'
LIMIT 1";

$result1 = mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_object($result1);
$placeId = $row->profilePlaceId;
$photoDomain = '';//'http://camrally.com/';
$image_alt = $row->businessName . ' @ Camrally';

if($connect->liteID == $row->productId)
	$businessTitle = $row->businessName . ' @ Camrally';
else
	$businessTitle = $row->businessName .', '.$row->address.' '.$row->city.', '.$row->zip.' '.$row->country. ' @ Camrally';
$domainpath = '';
if($row->state == 'canceled' || $row->state == 'unpaid'){
	header("HTTP/1.0 404 Not Found");
	header('Location: http://camrally.com');
	exit;
}
function htmldecode($str){
	$remove = array("\n", "\r\n", "\r", "<br />", "</p>");
	$remove2 = array("<span>", "</span>");
    $str = str_replace($remove,' ', $str);
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
$shortchar = 330;$shortchar2= 250;
$descAll = strip_tags(htmldecode($row->description));
$btntxt = '';
if($row->button != ''){
	$btnarray = json_decode($row->button);
	if(isset($btnarray->btnwidget[0]))
		$btntxt = $btnarray->btnwidget[0];
} 
if(strlen($descAll) > $shortchar ){
	$desc = mb_strcut($descAll,0,$shortchar). '...' .' <a class="fancybox" href="#showmoredesc"><img style="width: 20px;height: auto;margin-left: 5px;position: absolute;" src="' . $path . 'images/zoomin.png" ></a>';
}else
	$desc = strip_tags(htmldecode($row->description));

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/">
<head>

<?php
echo '<title>'. $businessTitle . '</title>';
	if($row->state == 'active' && $row->subscribe > 0)
		echo '<meta name="robots" content="index, follow" />';
	else 
		echo '<meta name="robots" content="noindex, nofollow" />';	
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta name="description" content="See the latest <?php echo $row->businessName?> Camrally advocates.">
<meta name="keywords" content="<?php echo $row->businessName?> Camrally advocates, <?php echo $row->businessName?>">
<meta name="title" content="<?php echo $row->businessName?> - Camrally">
<link href="<?=$path?>css/bootstrap.css" rel="stylesheet" media="all">
<link href="<?=$path?>css/face/main.css" media="screen" rel="stylesheet" type="text/css" />
<!--[if IE 7]> <link href="<?=$path?>css/face/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if IE 8]> <link href="<?=$path?>css/face/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<link href="<?=$path?>js/source/jquery.fancybox.css?v=2.1.5" media="screen" rel="stylesheet" type="text/css" />
<link rel="Shortcut Icon" href="<?=$path?>images/Logo/ico/Icon_2.ico" type="image/x-icon">
<script type="text/javascript" src="<?=$path?>js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="<?=$path?>js/jquery.masonry.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/jquery.ae.image.resize.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/app.js"></script>
<script type="text/javascript" src="<?=$path?>js/web.js"></script>
<script type="text/javascript" src="<?=$path?>js/bootstrap.min.js"></script> 
<script src="//load.sumome.com/" data-sumo-site-id="9e98d0a1ee03ad7942ebac5144759f147aafe068a407e46486c26b9a207c4300" async="async"></script>
<script type="text/javascript" src="<?=$path?>js/css3-mediaqueries.js"></script>
</head>
<body>
<div id="overlay" class="hide"></div>
<div class="vdesktop">
<input type="hidden" name="placeid" id="placeid" value="<?php echo $placeId ?>" />
<input type="hidden" name="path" id="path" value="<?php echo $path ?>" />

<?php require_once('browser_detection.php'); ?>

<a name="top"></a>
<div class="header">
    <div class="HeaderContainer">
        <div class="d-logo"><a href="/" class="Pinme"><img alt="camrally.com" src="<?=$path?>images/Logo/Logo_2-small.png" /></a></div>
    </div>		
</div>
<div class="ColumnContainer">
<!--CONTENT STARTS HERE-->
<div id="wrapheader">
	<div class="MerchantHead">
		<?php
		$hadTable = $connect->tableIsExist('businessCustomer_'.$placeId);
		if($hadTable){
			//$resultFollow = mysql_query();
			//echo mysql_num_rows($resultFollow);
			//die();
			$resultFollow = mysql_query("SELECT email FROM businessCustomer_$placeId WHERE follow=1 GROUP BY email") or die(mysql_error());
			$follow = 0;
			if(mysql_num_rows($resultFollow))
				$follow = mysql_num_rows($resultFollow);	
			$resultimg = mysql_query("SELECT count(id) as imgtotal FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' AND path <> '' LIMIT 8") or die(mysql_error());
			$totalimg = mysql_fetch_object($resultimg);
		}
		$logo = json_decode($row->logo);
		?>
		<div class="left">
			<div style="text-align:center;"><img class="resizeme" src="<?php echo ($logo != '' ? ($logo->dLogo == "images/desktop_default.png" ? $path.'images/default-logo.png' : $path.$logo->dLogo) : $path.'images/default-logo.png') ?>" alt="Merchant Logo" align="center" />
			<div class="follow"></div>
			<?php
			$booksite = '';
			if($hadTable){
				//echo '<div class="follow">'.$follow->followTotal .' followers</div>';
				$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId` AND hideimg = 0");
				if(mysql_num_rows($resultAve)){
					$rowAvg = mysql_fetch_object($resultAve);				
				}
			}
			$campaignsite = 'http://camrally.com/app/campaign.html?p='.$row->nicename;
			?>
			</div>
		</div>
		<div class="right">
			<div id="parent" style="padding-top:15px;">
			<div id="right">
				<?php 
			if($hadTable){
			?>
			 <div class="btnwrap">
				<div style="clear:both;text-align:right;">
					<div class="btn-take-isselfie1"><a style="text-decoration:none;color: #fff;" href="<?=$campaignsite?>"><?php echo ($btntxt == '' ? 'Join Now!' : $btntxt)  ?></a></div>
					<?php
					if($connect->liteID != $row->productId){
						if($row->booknow){
							$booksite = (strstr($row->booknow,'http') ? (strstr($row->booknow,'&s=b') ? 'http://camrally.com/app/campaign.html?p='.$row->nicename : $row->booknow) : 'http://'.(strstr($row->booknow,'&s=b') ? 'http://camrally.com/app/campaign.?p='.$row->nicename : $row->booknow));
						}
						if($booksite){
						?>
						<div class="btn-take-isselfie"><a style="text-decoration:none;color: #fff;" href="<?=$booksite?>" target="_blank"><?php echo ($row->booknowlabel == '' ? 'Take action today!' : $row->booknowlabel)  ?></a></div>
						<div class="clear" style="padding-top:5px"></div>
					<?php
						}
					}
					?>
					
					<!--<span style="font-weight:normal;text-decoration:none;color: #777;font-size:14px;margin-right: 15px;"><?php//echo $rowAvg->totalAvg .' advocates' ?></span> -->
				</div>
			</div>
			<?php
			}
			?>
			</div>
			<div id="left">
				<span class="title-name"><?php echo $row->businessName?><iframe src="http://www.facebook.com/plugins/like.php?app_id=148972192103323&amp;href=http://camrally.com/<?php echo $_REQUEST['link']?>&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px; position:relative; top:1px;margin-left:10px" ></iframe></span><br/> <span style="font-weight:bold;color: #576A6E;font-size:12px;"><i><?=formatWithSuffix($rowAvg->advocates)?> advocates, <?=formatWithSuffix($follow)?> followers</i></span>
			</div>	
		</div>
		<div class="devider">
			<hr/>
		</div>
		<div style="width:100%;height: auto;overflow: hidden;">
				<?php
				
			if($hadTable){
				$latestrev =  mysql_query("SELECT * FROM businessplace_$placeId WHERE source = 'fb' AND hideimg = 0 ORDER BY id DESC LIMIT 3");
				if(mysql_num_rows($latestrev)){
			?>	
			<div class="reviews">
				<h1 style="color: #ccc;font-size: 10px;font-weight: bold;">Latest advocates:</h1>
				<div class="clear" style="height:10px"></div>
				<?php
				while($rev = mysql_fetch_object($latestrev)){
					$fbsrc =  "http://graph.facebook.com/$rev->userId/picture?type=small";
				?>
				<div class="Pinmesnips">
					  <span><img src="<?php echo $fbsrc ?>" width="30" height="30" alt="fb profile" /></span>
					  <span class="pinmesnipsuser"><?php echo $rev->userName; ?></span>
				</div>
				<?php
				} ?>
			</div>
			<?php
			  }
			}
			?>
			<div class="textDesc">
				<?php
				echo (trim($desc) != '' ? '<p class="desctext">'.$desc.'</p>' : '');
				if($connect->liteID != $row->productId)
					echo '<p class="addtext">'.$row->address.' '.$row->city.', '.$row->zip.' '.$row->country.($row->contactNo != '' ? ', Tel: '.$row->contactNo : '').'</p>';
			  ?>
			</div>
		</div>
	</div>
</div>
	<?php
	$w=0;
	$widthmenu = "width:100%";

		if($row->websiteURL){$w++;
			$website = (strstr($row->websiteURL,'http') ? $row->websiteURL : 'http://'.$row->websiteURL);
		}	
		if($row->facebookURL){$w++;
			$fbsite = (strstr($row->facebookURL,'http') ? $row->facebookURL : 'http://'.$row->facebookURL);
		}	
		if($row->linkedinURL){$w++;
			$linkedin = (strstr($row->linkedinURL,'http') ? $row->linkedinURL : 'http://'.$row->linkedinURL);
		}	
		if($row->twitterURL){$w++;
			$twitter = (strstr($row->twitterURL,'http') ? $row->twitterURL : 'http://'.$row->twitterURL);
		}	
		if($row->showmap)
			$w++;
		$w++; //count for showcase or review tab	
		$w++;
		if($w == 1)
			$widthmenu = "width:50%";
        else if($w == 2)
			$widthmenu = "width:33.3%";
		else if($w == 3)
			$widthmenu = "width:25%";	
		else if($w == 4)
			$widthmenu = "width:20%";
		else if($w == 5)
			$widthmenu = "width:16.66%";	
		else if($w == 6)
			$widthmenu = "width:14.25%";
		else if($w == 7)
			$widthmenu = "width:12.5%";
		else if($w == 8)
			$widthmenu = "width:12.5%";	
			
	?>

	<div id="nav">
		<ul>
			<?php
				$hideshowcase = '';$hideavocate = '';$m_showcaseactive = '';$m_advocateactive = '';
				echo '<li class="sub-comment" style="'.$widthmenu.'"><a href="#" ><div class="menupadding">Comments</div></a></li>';
				echo '<li style="'.$widthmenu.'"><a href="#" target="_blank" class="mailto"><div class="menupadding">Contact Us</div></a></li>';
				if($rowAvg->advocates > $totalimg->imgtotal){ //shows the advocates
					$hideshowcase='hide';$m_advocateactive='activeMenu';
					$class = 'li-showcase';
					$textadvo = 'Gallery';
				}else{ //shows the product images
					$hideavocate = 'hide';$m_showcaseactive='activeMenu';
					$class = 'li-advocate';
					$textadvo = 'Posts';
				}
				echo '<li id="li-showhide" class="'.$class.'" style="'.$widthmenu.'"><a href="#" target="_blank" ><div class="menupadding textadvo">'. $textadvo .'</div></a></li>';
				if($row->websiteURL)	
					echo '<li style="'.$widthmenu.'"><a href="'.$website.'" target="_blank"><div class="menupadding">Website</div></a></li>';	
				if($row->facebookURL)
					echo '<li style="'.$widthmenu.'"><a href="'.$fbsite.'" target="_blank"><div class="menupadding">Facebook</div></a></li>';
				if($row->linkedinURL)	
					echo '<li style="'.$widthmenu.'"><a href="'.$linkedin.'" target="_blank"><div class="menupadding">LinkedIn</div></a></li>';	
				if($row->twitterURL)	
					echo '<li style="'.$widthmenu.'"><a href="'.$twitter.'" target="_blank"><div class="menupadding">Twitter</div></a></li>';	
				if($row->showmap)
					echo '<li style="'.$widthmenu.'"><a href="'.$path.'showmap.php?id='.$placeId.'" rel="nofollow" class="fancybox fancybox.iframe"><div class="menupadding">Map</div></a></li>';	
					
			?>
		</ul>
	</div>
</div>    
    <div class="clear"></div>
	<div id="comment" class="hide">
		<!--<div class="loader">f</div>-->
	    <?php
			$curDomain = 'http://camrally.com/app/';
			if($connect->istest)
				$curDomain = 'http://camrally.com/staging/';
		?>
		<div class="fb-comments" data-href="<?=$curDomain.$link?>" mobile="true" data-numposts="5" data-colorscheme="light"></div>
	</div>
   <div id="masoncontainer">
   <!-- advocates images -->   
	<div class="advocateimg  <?=$hideavocate?>">
	<div id="campin-advocate" class="pinList center">
		<div class="pinList center">
			<?php
			$offset=0;$limit=50;
			$timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
			$timezone = $timezone->timezone;
			$resultFeature =  mysql_query("SELECT SQL_CALC_FOUND_ROWS b.id, b.userName, b.userId, b.source, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE feature = 1 ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			$numberOfRowsfeature = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
			$totalPagesfeature = ceil($numberOfRowsfeature / $limit);
			echo '<input type="hidden" value="'.$numberOfRowsfeature.'" name="numberoffeature" id="numberoffeature" />';
			echo '<input type="hidden" value="'.$totalPagesfeature.'" name="totalfeature" id="totalfeature" />';
			while($rowrate = mysql_fetch_object($resultFeature)){
				if($rowrate->hideimg < 1)
				{
					if($rowrate->link != null)
						include('reviewshtml.php');
				}
			}
			$notresultFeature =  mysql_query("SELECT SQL_CALC_FOUND_ROWS b.id, b.userName, b.userId, b.source, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE feature = 0 ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			$numberOfRows = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
			$totalPages = ceil($numberOfRows / $limit);
			echo '<input type="hidden" value="'.$numberOfRows.'" name="numberofRows" id="numberofRows" />';
			echo '<input type="hidden" value="'.$totalPages.'" name="advocatepages" id="advocatepages" />';
				if($numberOfRowsfeature <= 20){
					while($rowrate = mysql_fetch_object($notresultFeature)){
						if($rowrate->hideimg < 1 )
						{
							if($rowrate->link != null)
								include('reviewshtml.php');
						}
					}
				}
			?>
		</div>
    </div>

		<div class="morebtn clear loadmorefeaturebtn hide">Load more...</div>
		<div class="morebtn clear loadmorebtn hide">Load more...</div>
		<div class="clear" style="padding:15px 0"></div>
	</div>
	<!-- end advocate code -->
	  <!-- product images -->
    <div id="campin-showimage" class="showcaseimg pinList center <?=$hideshowcase?>">
		<div class="pinList center">
			<?php
		$array_product1 = array();$j=0;
		$resultproduct1 = mysql_query("SELECT id,placeId,video_id,title,url,name FROM businessVideos AS ps WHERE placeId =$placeId AND video_id <> '' ORDER BY id ASC LIMIT 10") or die(mysql_error());
		while($row4 = mysql_fetch_object($resultproduct1)){
			$src1 = 'http://i.ytimg.com/vi/' . $row4->video_id . '/0.jpg';	
			$url1 = 'http://www.youtube.com/embed/' . $row4->video_id . '?autoplay=1';	
			?>		
			<div class="sysPinItemContainer pin">
				<p class="description sysPinDescr"><?php echo $row4->title ?></p>

				<div style="text-align:center;"><a class="fancybox fancybox.iframe" href="<?php echo $url1; ?>" title=""><img class="pinImage" src="<?php echo $src1; ?>" alt="<?php echo $row4->title ?>" /></a></div>
				<p class="RateCount" style="padding-top:5px;"><?php echo $row4->url; ?></p>
			</div>
			<?php
		}	
			?>
		<?php
		$array_product = array();$j=0;
		$resultproduct = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' AND path <> '' ORDER BY id ASC LIMIT 10") or die(mysql_error());
		while($row3 = mysql_fetch_object($resultproduct)){
			$src = $path.$row3->path;		
			?>		
			<div class="sysPinItemContainer pin">
				<p class="description sysPinDescr"><?php echo $row3->title ?></p>

				<div style="text-align:center;"><a class="showproductsimg" href="<?php echo $src; ?>" title=""><img class="pinImage" src="<?php echo $src; ?>" alt="<?php echo $row3->title ?>" /></a></div>
				<p class="RateCount" style="padding-top:5px;"><?php echo $row3->description; ?></p>
			</div>
			<?php
		}	
			?>
		</div>
	</div>
   <!-- end product code -->
    </div>
</div>

<!--CONTENT ENDS HERE-->
</div>
<div class="vmobile">
	<div class="main_wrapper"> 
        <div class="m-header">
            <div class="logo"><a href="/"><img src="images/Logo/Logo_1-small.png" alt="img" width="130" height="auto"></a></div>
			<header>
			<nav class="navbar navbar-default" role="navigation"> 
			  <!-- Brand and toggle get grouped for better mobile display -->
			  <div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div>
			  <!-- Collect the nav links, forms, and other content for toggling -->
			  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav pull-right">
				  <?php
				  echo '<li><a href="#" rel="nofollow" class="m-btncomment">Comments</a></li>';
					if($row->contactNo)	
						echo '<li><a href="tel:'.$row->contactNo.'" target="_blank">Call Us</a></li>';
					if($row->showmap)
				       echo '<li><a href="'.$path.'showmap.php?id='.$placeId.'" rel="nofollow" class="color-button fancybox fancybox.iframe">Map</a></li>';
					if($row->websiteURL)
						echo '<li><a href="'.(strstr($row->websiteURL,'http') ? $row->websiteURL : 'http://'.$row->websiteURL) .'"  target="_blank">Website</a></li>';
					if($row->facebookURL)
						echo '<li><a href="'. (strstr($row->facebookURL,'http') ? $row->facebookURL : 'http://'.$row->facebookURL) .'"  target="_blank">Facebook Page</a></li>';	
					if($row->linkedinURL)
						echo '<li><a href="'. (strstr($row->linkedinURL,'http') ? $row->linkedinURL : 'http://'.$row->linkedinURL) .'"  target="_blank">LinkedIn Page</a></li>';
					if($row->twitterURL)
						echo '<li><a href="'. (strstr($row->twitterURL,'http') ? $row->twitterURL : 'http://'.$row->twitterURL) .'"  target="_blank">Twitter Page</a></li>';
					?>
					<li><a href="/">Camrally.com</a></li>
							  
				</ul>
			  </div>
			  <!-- /.navbar-collapse --> 
			</nav>
		</header>
			<!--<a href="#socialmenu" rel="nofollow" class="fancybox"><div class="topleftmenu"> <span class="mobile_search"></span></div></a>-->
		</div>	 
		
		<div id="topmenu">
			<ul>
				<li class="borderright <?=$m_showcaseactive?>" id="showcase"><a href="#">Gallery</a></li>
				<li class="<?=$m_advocateactive?>" id="top-reviews"><a href="#">Posts</a></li>
			</ul>
		</div>  
			<div class="MerchantWrapper">
				 <div class="MerchantHead">
					  <div style="padding:10px 0;width:176px:height:176px;">
					  <img class="resizeme" src="<?php echo ($logo != '' ? ($logo->dLogo == "images/desktop_default.png" ? 'images/default-logo.png' : $path.$logo->dLogo) : $path.'images/default-logo.png') ?>" alt="Merchant Logo" align="center" />
					  </div>
					  <div class="clear btitle" style="color: #777;">
					  <?php echo $row->businessName ?><iframe src="http://www.facebook.com/plugins/like.php?app_id=148972192103323&amp;href=http://camrally.com/<?php echo $_REQUEST['link']?>&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px; position:relative; top:1px;margin-left:10px" ></iframe>
					  </div>
					  <?php
					  if($hadTable){
						?>
						 <div style="margin-top:5px;">
						 <span style="font-weight:bold;color: #777;font-size:12px;"><i><?=formatWithSuffix($rowAvg->advocates)?> advocates, <?=formatWithSuffix($follow)?> followers</i></span>
						 </div>
						 <?php
						}
						?>
						<?php
						$shortchar = 180;
						$descAll = strip_tags(htmldecode($row->description));
						if(strlen($descAll) > $shortchar ){
							$desc = mb_strcut($descAll,0,$shortchar) .'... <a class="fancybox" href="#showmoredesc"><img style="width: 20px;height: auto;margin-left: 5px;position: absolute;" src="' . $path . 'images/zoomin.png" ></a>';
						}else
							$desc = strip_tags(htmldecode($row->description));
						?>
						<div class="m_desc">
							<?php
							echo (trim($desc) != '' ? '<p class="desctext">'.$desc.'</p>' : '');
							if($connect->liteID != $row->productId)
								echo '<p class="addtext" style="margin-top:0px;padding-top:0px">'.$row->address.' '.$row->city.', '.$row->zip.' '.$row->country.($row->contactNo != '' ? ', Tel: '.$row->contactNo : '').'</p>';
						?>
						</div>
					  <div class="" style="">
					  <?php
					  echo '<div class="clear" style="padding:5px 0"></div>';
					echo '<a href="'.$campaignsite.'"  class="color-button"><span>' .($btntxt == '' ? 'Join Now!' : $btntxt) . '</span></a>'; 
					echo '<div class="clear" style="padding:5px 0"></div>';
                    if($connect->liteID != $row->productId){
						if($booksite){
							echo '<a href="'.$booksite.'"  class="color-button" target="_blank"><span>' .($row->booknowlabel == '' ? 'Take action today!' : $row->booknowlabel) . '</span></a>'; 
							echo '<div class="clear" style="padding:5px 0"></div>';
						}
					}					
					?>
					  </div>    
				</div>
				<div class="m-comment hide" style="width:93%;margin:5px auto 0;">		
					<?php
						$curDomain = 'http://camrally.com/app/';
						if($connect->istest)
							$curDomain = 'http://camrally.com/staging/';
					?>
					<div class="fb-comments" data-href="<?=$curDomain.$link?>" mobile="true" data-numposts="5" data-colorscheme="light"></div>
				</div>
				<div class="m-images">
                <div id="m_productImages" class="<?=$hideshowcase?>" style="margin-top:5px;" >
					<div class="pinList center">
				<?php
					if(mysql_num_rows($resultproduct1))
						mysql_data_seek($resultproduct1, 0);
					while($row4 = mysql_fetch_object($resultproduct1)){
						$src1 = 'http://i.ytimg.com/vi/' . $row4->video_id . '/0.jpg';	
						$url1 = 'http://www.youtube.com/embed/' . $row4->video_id . '?autoplay=1';	
						?>		
						<div class="sysPinItemContainer pin">
							<p class="description sysPinDescr"><?php echo $row4->title ?></p>

							<div style="text-align:center;"><a class="fancybox fancybox.iframe" href="<?php echo $url1; ?>" title=""><img class="pinImage" src="<?php echo $src1; ?>" alt="<?php echo $row4->title ?>" /></a></div>
							<p class="RateCount" style="padding-top:5px;"><?php echo $row4->url; ?></p>
						</div>
						<?php
					}	
						?>
					<?php
						if(mysql_num_rows($resultproduct))
							mysql_data_seek($resultproduct, 0);
						while($row3 = mysql_fetch_object($resultproduct)){
						$src = $path.$row3->path;	
						?>		
						<div class="sysPinItemContainer pin">
							<p class="description sysPinDescr"><?php echo $row3->title ?></p>

							<div style="text-align:center;"><a class="showproductsimg" href="<?php echo $src; ?>" title=""><img class="pinImage" src="<?php echo $src; ?>" alt="<?php echo $row3->title ?>" /></a></div>
							<p class="RateCount" style="padding-top:5px;"><?php echo $row3->description; ?></p>
						</div>
					<?php
					}
					?>
				</div>
				</div>
            	<div id="m_reviews" class="<?=$hideavocate?>" style="margin-top:5px;">
					<?php
						if(mysql_num_rows($resultFeature))
							mysql_data_seek($resultFeature, 0);
						while($rowrate = mysql_fetch_object($resultFeature)){
							if($rowrate->hideimg < 1){
								if($rowrate->link != null)
									include('m_reviewshtml.php');
							}	
						}
						if($numberOfRowsfeature <= 20){
							if(mysql_num_rows($notresultFeature))
								mysql_data_seek($notresultFeature, 0);
							while($rowrate = mysql_fetch_object($notresultFeature)){
								if($rowrate->hideimg < 1){
									if($rowrate->link != null)
										include('m_reviewshtml.php');
								}	
							}	
						}
					?>
				</div>
				</div>
				<div style="height:5px"></div>
        </div>
  <!--CONTENT ENDS HERE-->     
    </div>
</div>
<div id="socialmenu" style="text-align:center;display: none;">
	<ul>
	<?php
		if($row->websiteURL)
			echo '<li><a href="'.(strstr($row->websiteURL,'http') ? $row->websiteURL : 'http://'.$row->websiteURL) .'"  target="_blank">Website</a></li>';
		if($row->facebookURL)
			echo '<li><a href="'. (strstr($row->facebookURL,'http') ? $row->facebookURL : 'http://'.$row->facebookURL) .'"  target="_blank">Facebook Page</a></li>';	
		if($row->linkedinURL)
			echo '<li><a href="'. (strstr($row->linkedinURL,'http') ? $row->linkedinURL : 'http://'.$row->linkedinURL) .'"  target="_blank">LinkedIn Page</a></li>';
		if($row->twitterURL)
			echo '<li><a href="'. (strstr($row->twitterURL,'http') ? $row->twitterURL : 'http://'.$row->twitterURL) .'"  target="_blank">Twitter Page</a></li>';
		if($booksite)
			echo '<li><a href="'.$booksite.'" target="_blank">' . ($row->booknowlabel == '' ? 'Book Now' : $row->booknowlabel) . '</a></li>'; 		
		if($row->contactNo)	
			echo '<li><a href="tel:'.$row->contactNo.'" target="_blank">Call Us</a></li>'
		?>
		<li><a href="/">Camrally.com</a></li>
	</ul>
</div>   
<?php
if(strlen($row->description) > $shortchar ){
?>
	<div id="showmoredesc" style="display: none;width:80%;max-width:1000px;color:#000">
	<?php echo htmldecode2($row->description); ?>
</div>
<?php
}
function htmldecode2($str){
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
function formatWithSuffix($input)
{ 
    $suffixes = array('', 'k', 'm', 'g', 't');
    $suffixIndex = 0;
    while(abs($input) >= 1000 && $suffixIndex < sizeof($suffixes)){
        $suffixIndex++;
        $input /= 1000;
    }
    return (
        $input > 0
            // precision of 3 decimal places
            ? floor($input * 1000) / 1000
            : ceil($input * 1000) / 1000
        )
        . $suffixes[$suffixIndex];
}
?> 

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=148972192103323";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</body>
</html>