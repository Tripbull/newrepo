<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="EQez1wVJd5ruzADIL1OQrBMh391ORWp8Nzfkpkhpso8" />
<title>Camrally - Your photo campaign can change the world!</title>
<meta name="title" content="Camrally is an awesome photo campaign service to help you rally advocates for anything!">
<meta name="keywords" content="fund raising, photo contests, brand awareness, new product launch, fanbase building, interest groups, event promotions and marketing promotions">
<meta name="description" content="Create a photo or selfie campaign in 10 mins & rally advocates for any cause, brand, product, service, anything at all!">
<link href="css/bootstrap.css" rel="stylesheet" media="all">
<style type="css/text">
</style>
<link href="css/style.css" rel="stylesheet" media="all">
<link href="app/js/source/jquery.fancybox.css?v=2.1.5" media="screen" rel="stylesheet" type="text/css" />
<link type="text/css" media="all" rel="stylesheet" href="css/dialog.css" >
<link rel="Shortcut Icon" href="http://camrally.com/images/Icons/ico/favicon.ico" type="image/x-icon">
<!--<script src="//load.sumome.com/" data-sumo-site-id="83d0035cb9e786112f858edefc4bc4aef74cdbf55010766f0ae97f9b7c25c962" async="async"></script>-->
<?php //include_once("analyticstracking.php") ?>

</head>

<body style="overflow-x:hidden;background-color:#e9e9e9;">
<?php  
require_once('header.html'); ?>
<div class="fundwrap-content">
	<div id="nav">
		<ul>
			<li class="borderright active-li trending" style="width:50%"><a href="#">Trending</a></li>
			<li class="latest" style="width:50%"><a href="#">Latest</a></li>
		</ul>
	</div>
	<div class="d-content">
<!-- trending campaign -->
    <div class="clear trend-campaign pinList center" >
		<?php
		$hadreturn = 0;
		$result = mysql_query("SELECT campaignId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 24 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
		if(mysql_num_rows($result)){
			$hadreturn = 1;
		}else{
			$result = mysql_query("SELECT campaignId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 336 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
			if(mysql_num_rows($result)){
				$hadreturn = 1;
			}	
		}
		if($hadreturn){
			while($campaignID = mysql_fetch_object($result)){
			$placeId = $campaignID->campaignId;
			$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId`");
			$rowAvg = mysql_fetch_object($resultAve);
			$sql = "SELECT l.id, p.businessName as organization, p.nicename, p.city, p.country,l.subscribe,l.businessName, g.state, d.description, cam.category,cam.tag1,cam.tag2,c.backgroundImg,v.link FROM businessList AS l
			LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
			LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
			LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
			LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
			LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
			LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
			WHERE l.id =  $placeId LIMIT 1";
			$notresultFeature =  mysql_query($sql) or die(mysql_error());
			$camrow = mysql_fetch_object($notresultFeature);
			$bgback = json_decode($camrow->backgroundImg);
			if($camrow->subscribe){
					?>		
					<div class="sysPinItemContainer pin clear">
						<p class="description sysPinDescr fblink"><?=$camrow->businessName?></p>
						<div style="text-align:center;">
							<a href="http://camrally.com/<?=$camrow->link?>" target="_blank"><img class="pinImage" src="app/<?=$bgback->bckimage?>" alt="campaign image"/></a>
						</div>
							<div style="padding:5px;">
							    <i><?=$camrow->tag1?> <?=$camrow->tag2?></i>
								<div style="color:#8e8e8e">
								<?php 
								$shortchar= 100;
								$descAll = strip_tags(htmldecode($camrow->description));
								if(strlen($descAll) > $shortchar ){
									$desc = mb_strcut($descAll,0,$shortchar). '...';
								}else
									$desc = strip_tags(htmldecode($camrow->description));
								if($desc){
								 echo '<div class="clear" style="padding-top:5px"></div>';
									echo $desc;
								}		
								?>
								<div class="clear" style="padding-top:5px"></div>
								<?=$rowAvg->advocates?> Advocates	
								</div>
							</div>
					</div>
					<?php
				}		
			}
		 }	
		?>
	</div>
<!-- end trending campaign code -->
	<div class="latest-shared pinList center clear hide">
		
	</div>
	</div> <!-- desktop -->
	<div class="m-content clear">
		<div class="m-trend-campaign">
	<?php
		if(mysql_num_rows($result)){
			mysql_data_seek($result, 0);
			while($campaignID = mysql_fetch_object($result)){
			$placeId = $campaignID->campaignId;
			$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId`");
			$rowAvg = mysql_fetch_object($resultAve);
			$sql = "SELECT l.id, p.businessName as organization, p.nicename, p.city, p.country,l.subscribe,l.businessName, g.state, d.description, cam.category,cam.tag1,cam.tag2,c.backgroundImg,v.link FROM businessList AS l
			LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
			LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
			LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
			LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
			LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
			LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
			WHERE l.id =  $placeId LIMIT 1";
			$notresultFeature =  mysql_query($sql) or die(mysql_error());
			$camrow = mysql_fetch_object($notresultFeature);
			$bgback = json_decode($camrow->backgroundImg);
			if($camrow->subscribe){
	?>
		<div class="sysPinItemContainer pin">
			<div style="width:auto;">
			<div class="description sysPinDescr fblink"><?=$camrow->businessName?></div>
			<div style="margin:0 auto;width:200px;">
				<a href="http://camrally.com/<?=$camrow->link?>" target="_blank"><img class="pinImage" src="app/<?=$bgback->bckimage?>" alt="campaign image"/></a>
			</div>
				<div style="padding:5px;">
					<i><?=$camrow->tag1?> <?=$camrow->tag2?></i>
					<div style="color:#8e8e8e">
					<?php 
					$shortchar= 100;
					$descAll = strip_tags(htmldecode($camrow->description));
					if(strlen($descAll) > $shortchar ){
						$desc = mb_strcut($descAll,0,$shortchar). '...';
					}else
						$desc = strip_tags(htmldecode($camrow->description));
					if($desc){
					 echo '<div class="clear" style="padding-top:5px"></div>';
						echo $desc;
					}	
					?>
					<div class="clear" style="padding-top:5px"></div>
					<?=$rowAvg->advocates?> Advocates	
					</div>
				</div>
			</div>
		</div>
		<?php
		}
		}
		}
		?>
		</div>
		<!-- end trending campaign code -->
		<div class="m-latest-shared center clear hide">
			
		</div>
	</div><!-- mobile -->
</div>
<div class="bottom-campaign-link">
    <div style="text-align:center;font-size:16px;padding:10px;display:block;">
        <a href="/"><div class="txtfund" style="text-align:center;margin:0 auto"><span style="font-weight:bold;text-decoration:underline">Camrally.com</span> is currently raising funds. Click here to help us change the world!</div></a>
    </div>		
</div>
<div class="widthDiv" style="opacity:0;position:absolute;font-size:16px !important;font-weight: bold;white-space: nowrap;font-family: OpenSansRegular;"></div>
<div class="clear"></div>
<?php require_once('footer.html'); ?>
<script type="text/javascript" src="js/jquery.js"></script> 
<script type="text/javascript" src="app/js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="app/js/jquery.masonry.min.js"></script>
<script type="text/javascript" src="app/js/bootstrap.min.js"></script> 
<script type="text/javascript" src="app/js/app.js"></script>
<script type="text/javascript" src="js/dialog.js"></script>
<script type="text/javascript" src="js/fundlink.js"></script>
</body>
</html>
<?php
$connect->db_disconnect();
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
?>