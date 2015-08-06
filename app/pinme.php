<?php
$sql = "SELECT p.profilePlaceId, l.businessName, p.category,p.nicename, p.longitude, p.latitude, p.address, p.city, p.country, p.zip, p.contactNo, p.facebookURL, p.websiteURL, p.linkedinURL, p.twitterURL, p.showmap, p.booknowlabel, p.booknow,p.email as pemail, l.subscribe, u.productId,u.state,u.email,cam.btntext, d.description, c.item2Rate,c.selectedItems,c.reviewPost,c.logo FROM businessProfile AS p
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
$path = $connect->path;
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
if(strlen($descAll) > $shortchar ){
	$desc = mb_strcut($descAll,0,$shortchar) .' <a class="fancybox" href="#showmoredesc"><img style="width: 20px;height: auto;margin-left: 5px;position: absolute;" src="' . $path . 'images/zoomin.png" ></a>';
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
<meta name="description" content="Interested in going to <?php echo $row->businessName?>? See the latest <?php echo $row->businessName?> Camrally advocates first.">
<meta name="keywords" content="<?php echo $row->businessName?> Camrally advocates, <?php echo $row->businessName?>">
<meta name="title" content="<?php echo $row->businessName?> - Camrally">
<link href="<?=$path?>css/face/main.css" media="screen" rel="stylesheet" type="text/css" />
<!--[if IE 7]> <link href="<?=$path?>css/face/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if IE 8]> <link href="<?=$path?>css/face/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<link href="<?=$path?>js/source/jquery.fancybox.css?v=2.1.5" media="screen" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?=$path?>js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="<?=$path?>js/jquery.masonry.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/jquery.ae.image.resize.min.js"></script>
<script type="text/javascript" src="<?=$path?>js/app.js"></script>
<script type="text/javascript" src="<?=$path?>js/web.js"></script>
<script src="//load.sumome.com/" data-sumo-site-id="9e98d0a1ee03ad7942ebac5144759f147aafe068a407e46486c26b9a207c4300" async="async"></script>
<script type="text/javascript" src="<?=$path?>js/css3-mediaqueries.js"></script>
<link rel="Shortcut Icon" href="<?=$path?>images/Logo/ico/Icon_2.ico" type="image/x-icon">
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
			$resultFollow = mysql_query("SELECT COUNT(follow) as followTotal FROM businessCustomer_$placeId WHERE follow=1") or die(mysql_error());
			if(mysql_num_rows($resultFollow))
				$follow = mysql_fetch_object($resultFollow);
			$resultimg = mysql_query("SELECT count(id) as imgtotal FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' AND path <> '' LIMIT 8") or die(mysql_error());
			$totalimg = mysql_fetch_object($resultimg);
		}
		$logo = json_decode($row->logo);
		?>
		<div class="left">
			<div style="text-align:center;"><img class="resizeme" src="<?php echo ($logo != '' ? ($logo->dLogo == "images/desktop_default.png" ? $path.'images/default-logo.png' : $path.$logo->dLogo) : $path.'images/default-logo.png') ?>" alt="Merchant Logo" align="center" />
			<div class="follow"></div>
			<?php
			if($hadTable){
				//echo '<div class="follow">'.$follow->followTotal .' followers</div>';
				$resultAve = mysql_query("SELECT count(id) as totalAvg FROM businessplace_$placeId WHERE 1 ORDER BY id DESC");
				if(mysql_num_rows($resultAve)){
					$rowAvg = mysql_fetch_object($resultAve);
					if($row->booknow){
						$booksite = (strstr($row->booknow,'http') ? $row->booknow : 'http://'.$row->booknow);
					}else{
						$booksite = 'http://camrally.com/app/campaign.html?p='.$row->nicename.'&s=b';
					}
				}	
			}
			?>
			</div>
		</div>
		<div class="right">
			<div style="width:100%;padding-top:15px;">
			 <div class="FLeft" style="max-width:400px"><span class="title-name"><?php echo $row->businessName?></span><br/> <span style="font-weight:bold;color: #576A6E;font-size:12px;"><?=$rowAvg->totalAvg?> advocates, <?=$follow->followTotal?> followers</span></div>
			 <?php 
		if($hadTable){
			
			?>
			 <div style="float:right;padding-right:10px;">
				<div style="clear:both;text-align:right;">
					<div class="btn-take-isselfie"><a style="text-decoration:none;color: #fff;" href="<?=$booksite?>" target="_blank"><?php echo ($row->btntext == '' ? 'Post Your Photo or Selfie!' : $row->btntext)  ?></a></div>
					<div class="clear" style="padding-top:5px"></div>
					<!--<span style="font-weight:normal;text-decoration:none;color: #777;font-size:14px;margin-right: 15px;"><?php//echo $rowAvg->totalAvg .' advocates' ?></span> -->
				</div>
			</div>
		<?php
		}
		?>
		</div>
		<div class="devider">
			<hr/>
		</div>
		<div style="width:100%;height: auto;overflow: hidden;">
				<?php
				
			if($hadTable){
				$latestrev =  mysql_query("SELECT * FROM businessplace_$placeId WHERE source = 'fb' ORDER BY id DESC LIMIT 3");
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
		if($connect->liteID != $row->productId){
			if($row->booknow){$w++;
				$booksite = (strstr($row->booknow,'http') ? $row->booknow : 'http://'.$row->booknow);
			}else{$w++;
				$booksite = 'http://camrally.com/app/campaign.html?p='.$row->nicename.'&s=b';
			}
		}
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
	?>

	<div id="nav">
		<ul>
			<?php
				$hideshowcase = '';$hideavocate = '';
				echo '<li style="'.$widthmenu.'"><a href="#" target="_blank" class="mailto"><div class="menupadding">Contact Us</div></a></li>';
				if($rowAvg->totalAvg > $totalimg->imgtotal){ //shows the advocates
					$hideshowcase='hide';
					$class = 'li-showcase';
					$textadvo = 'Campaign Images';
				}else{ //shows the product images
					$hideavocate = 'hide';
					$class = 'li-advocate';
					$textadvo = 'Advocates';
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
				if($connect->liteID != $row->productId){
				if($booksite)
					echo '<li style="'.$widthmenu.'"><a href="'.$booksite.'" target="_blank"><div class="menupadding">' . ($row->booknowlabel == '' ? 'Book Now' : $row->booknowlabel) . '</div></a></li>';
				}	
			?>
		</ul>
	</div>
</div>    
    <div class="clear"></div>

   <div id="masoncontainer">
   <!-- advocates images -->   
	<div class="advocateimg  <?=$hideavocate?>">
	<div id="campin-advocate" class="pinList center">
		<div class="pinList center">
			<?php
			$offset=0;$limit=50;
			$timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
			$timezone = $timezone->timezone;
			$resultFeature =  mysql_query("SELECT SQL_CALC_FOUND_ROWS b.userName, b.userId, b.source, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE  feature = 1 AND source = 'fb' ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			$numberOfRowsfeature = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
			$totalPagesfeature = ceil($numberOfRowsfeature / $limit);
			echo '<input type="hidden" value="'.$numberOfRowsfeature.'" name="numberoffeature" id="numberoffeature" />';
			echo '<input type="hidden" value="'.$totalPagesfeature.'" name="totalfeature" id="totalfeature" />';
			while($rowrate = mysql_fetch_object($resultFeature)){
				if($rowrate->hideimg < 1 && $rowrate->hideimg != null)
				{
					include('reviewshtml.php');
				}
			}
			$notresultFeature =  mysql_query("SELECT SQL_CALC_FOUND_ROWS b.userName, b.userId, b.source, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE 1 ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
			$numberOfRows = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
			$totalPages = ceil($numberOfRows / $limit);
			echo '<input type="hidden" value="'.$numberOfRows.'" name="numberofRows" id="numberofRows" />';
			echo '<input type="hidden" value="'.$totalPages.'" name="advocatepages" id="advocatepages" />';
				if($numberOfRowsfeature <= 20){
					while($rowrate = mysql_fetch_object($notresultFeature)){
						if($rowrate->hideimg < 1 && $rowrate->hideimg != null)
						{
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
		$array_product = array();$j=0;
		$resultproduct = mysql_query("SELECT id,placeId,path,title,description,name FROM businessImages AS ps WHERE placeId =$placeId AND name <> 'fbImg' AND path <> '' ORDER BY id ASC LIMIT 10") or die(mysql_error());
		while($row3 = mysql_fetch_object($resultproduct)){
			//$src = $path.$row3->path;
			//$array_product[$j]['src'] = $src;
			//$array_product[$j]['title'] = $row3->title;
			//$array_product[$j++]['description'] = $row3->description;			
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
        <a name="top"></a>    
        <div class="header">
            <div class="logo"><a href="/"><img src="<?=$path?>images/Logo/Logo_2-small.png" > </a></div>
			<a href="#socialmenu" rel="nofollow" class="fancybox"><div class="topleftmenu"> <span class="mobile_search"></span></div></a>
		</div>	 
		<div id="topmenu">
			<ul>
				<li class="borderright" id="showcase"><a href="#">Campaign Images</a></li>
				<li class="activeMenu" id="top-reviews"><a href="#">Advocates</a></li>
			</ul>
		</div>    
			<div class="MerchantWrapper">
				 <div class="MerchantHead">
					  <div style="padding:10px 0;width:176px:height:176px;">
					  <img class="resizeme" src="<?php echo ($logo != '' ? ($logo->dLogo == "images/desktop_default.png" ? 'images/default-logo.png' : $path.$logo->dLogo) : $path.'images/default-logo.png') ?>" alt="Merchant Logo" align="center" />
					  </div>
					  <div class="clear btitle" style="color: #777;">
					  <?php echo $row->businessName ?>
					  </div>
					  <?php
					  if($hadTable){
						?>
						 <div style="margin-top:5px;">
						 
						 <span style="font-weight:bold;color: #777;font-size:12px;"><i><?=$rowAvg->totalAvg?> advocates, <?=$follow->followTotal?> followers</i></span>
						 </div>
						 <?php
						}
						?>
					</div>
						<?php
						$shortchar = 200;
						$descAll = strip_tags(htmldecode($row->description));
						if(strlen($descAll) > $shortchar ){
							$desc = mb_strcut($descAll,0,$shortchar) .' <a class="fancybox" href="#showmoredesc"><img style="width: 20px;height: auto;margin-left: 5px;position: absolute;" src="' . $path . 'images/zoomin.png" ></a>';
						}else
							$desc = strip_tags(htmldecode($row->description));
						?>
						<div class="m_desc">
							<?php
							if($connect->liteID != $row->productId)
								echo '<p class="addtext">'.$row->address.' '.$row->city.', '.$row->zip.' '.$row->country.($row->contactNo != '' ? ', Tel: '.$row->contactNo : '').'</p>';
						?>
						</div>
					  <div class="" style="">
					  <?php
					  echo '<div class="clear" style="padding:5px 0"></div>';	
					if($connect->liteID != $row->productId){
					if($booksite){
						echo '<a href="'.$booksite.'"  class="color-button" target="_blank"><span>' .($row->booknowlabel == '' ? 'POST Your Photo!' : $row->booknowlabel) . '</span></a>'; 
						echo '<div class="clear" style="padding:5px 0"></div>';
					}
					}
					if($row->contactNo){
						echo '<a href="tel:'.$row->contactNo.'"  class="color-button" target="_blank">Call Us</a>'; 
						echo '<div class="clear" style="padding:5px 0"></div>';
					}if($row->showmap){
						echo '<a href="'.$path.'showmap.php?id='.$placeId.'" rel="nofollow" class="color-button fancybox fancybox.iframe">Map</a>';
					echo '<div class="clear" style="padding:5px 0"></div>';
                    }					
					?>
					  </div>    
				</div>
			</div>	
                <div id="m_productImages" class="hide" style="margin-top:5px;" >
					<div class="pinList center">
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
            	<div id="m_reviews" style="margin-top:5px;">
					<?php
						if(mysql_num_rows($resultFeature))
							mysql_data_seek($resultFeature, 0);
						while($rowrate = mysql_fetch_object($resultFeature))
							include('m_reviewshtml.php');
						
						if($numberOfRowsfeature <= 20){
							if(mysql_num_rows($notresultFeature))
								mysql_data_seek($notresultFeature, 0);
							while($rowrate = mysql_fetch_object($notresultFeature))
								include('m_reviewshtml.php');
						}
					?>
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
		<li><a href="/">camrally.com</a></li>
	</ul>
</div>   
<?php
if(strlen($row->description) > $shortchar ){
?>
	<div id="showmoredesc" style="display: none;max-width:400px;">
	<p><?php echo $row->description; ?></p>
</div>
<?php
}
?>
</body>
</html>