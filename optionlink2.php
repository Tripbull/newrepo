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
require_once('header.html'); 
$sql = "SELECT l.id, p.city, p.country,l.subscribe,l.businessName, cam.category FROM businessList AS l
INNER JOIN campaigndetails AS cam ON cam.posterId = l.id
INNER JOIN businessProfile AS p ON p.profilePlaceId = l.id AND p.city <> '' AND p.country <> ''
WHERE l.subscribe =1 group by cam.category";
$catresult =  mysql_query($sql) or die(mysql_error());				
?>
<div class="fundwrap-content">
	<div id="nav2">
		<?php
		$active = 'active-li';
		if((isset($_REQUEST['category']) && trim($_REQUEST['category']) != '') || (isset($_REQUEST['city']) && trim($_REQUEST['city']) != '') || (isset($_REQUEST['country']) && trim($_REQUEST['country']) != ''))
			$active = '';
		?>
		<ul>
			<li class="borderright <?=$active?> trending mwidth"><a href="#">Trending</a></li>
			<li class="latest borderright2 mwidth"><a href="#">Latest</a></li>
			<li class="mwidth d-dropmenu">
				<div style="text-align:center;padding-top:6px">
					<div class="btn-group" role="group" aria-label="...">
					  <div class="btn-group" role="group">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  Category
						  <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<?php
								while($catrow = mysql_fetch_object($catresult)){
									if(trim($catrow->category) != ''){
									//echo $_REQUEST['category']) .'=='. trim($catrow->category);
									$dropmenuActive = (trim((isset($_REQUEST['category']) ? $_REQUEST['category'] : '')) == trim($catrow->category) ? 'class="active"' : '');
									echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?category='.urlencode($catrow->category).'">'.$catrow->category.'</a></li>';
									}
								}
							?>
						  
						</ul>
					  </div>
					  <div class="btn-group" role="group">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  City
						  <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<?php
								mysql_data_seek($catresult, 0);
								$isarray = array('t');
								while($catrow = mysql_fetch_object($catresult)){
									if(trim($catrow->city) != ''){
									if(!in_array($catrow->city,$isarray)){
										array_push($isarray,$catrow->city);
										$dropmenuActive = (trim((isset($_REQUEST['city']) ? $_REQUEST['city'] :'')) == trim($catrow->city) ? 'class="active"' : '');
										echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?city='.urlencode($catrow->city).'">'.$catrow->city.'</a></li>';
									}
									}
								}
							?>
						</ul>
					  </div>
					  <div class="btn-group" role="group">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  Country
						  <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
						  <?php
								mysql_data_seek($catresult, 0);
								$isarray = array();
								while($catrow = mysql_fetch_object($catresult)){
									if(trim($catrow->country) != ''){
									if(!in_array($catrow->country,$isarray)){
										array_push($isarray,$catrow->country);
										$dropmenuActive = (trim((isset($_REQUEST['country']) ? $_REQUEST['country'] : '')) == trim($catrow->country) ? 'class="active"' : '');
										echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?country='.urlencode($catrow->country).'">'.$catrow->country.'</a></li>';
									}
									}
								}
							?>
						</ul>
					  </div>
					  <!--
					  <div class="btn-group">
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div> -->
					</div>
			</div>
			</li>
		</ul>
	</div>
	<div id="m-nav" class="m-dropmenu">
		<div class="btn-group" role="group" aria-label="...">
		  <div class="btn-group" role="group">
			<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  Category
			  <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
			  <?php
					mysql_data_seek($catresult, 0);
					while($catrow = mysql_fetch_object($catresult)){
						if(trim($catrow->category) != ''){
						$dropmenuActive = (trim((isset($_REQUEST['category']) ? $_REQUEST['category'] : '')) == trim($catrow->category) ? 'class="active"' : '');
						echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?category='.urlencode($catrow->category).'">'.$catrow->category.'</a></li>';
						}
					}
				?>
			</ul>
		  </div>
		  <div class="btn-group" role="group">
			<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  City
			  <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
			  <?php
				mysql_data_seek($catresult, 0);
				$isarray = array();
				while($catrow = mysql_fetch_object($catresult)){
					if(trim($catrow->city) != ''){
					if(!in_array($catrow->city,$isarray)){
						array_push($isarray,$catrow->city);
						$dropmenuActive = (trim((isset($_REQUEST['city']) ? $_REQUEST['city'] :'')) == trim($catrow->city) ? 'class="active"' : '');
						echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?city='.urlencode($catrow->city).'">'.$catrow->city.'</a></li>';
				   }
				   }
				}
			?>
			</ul>
		  </div>
		  <div class="btn-group" role="group">
			<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  Country
			  <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
			  <?php
					mysql_data_seek($catresult, 0);
					$isarray = array();
					while($catrow = mysql_fetch_object($catresult)){
						if(trim($catrow->country) != ''){
							if(!in_array($catrow->country,$isarray)){
								array_push($isarray,$catrow->country);
								$dropmenuActive = (trim((isset($_REQUEST['country']) ? $_REQUEST['country'] : '')) == trim($catrow->country) ? 'class="active"' : '');
								echo '<li '.$dropmenuActive.'><a href="'.$_SERVER['PHP_SELF'].'?country='.urlencode($catrow->country).'">'.$catrow->country.'</a></li>';
							}
						}
					}
				?>
			</ul>
		  </div>
		</div>
	</div>
	<div class="d-content">
<!-- trending campaign -->
	<div class="clear">
    <div class="trend-campaign pinList center" style="min-width:236px">
		<?php
		$hadreturn = 0;
		if((isset($_REQUEST['category']) && trim($_REQUEST['category']) != '') || (isset($_REQUEST['city']) && trim($_REQUEST['city']) != '') || (isset($_REQUEST['country']) && trim($_REQUEST['country']) != '')){
			if(isset($_REQUEST['city'])){
				$search = $_REQUEST['city'];
				//echo "SELECT p.profilePlaceId as placeId FROM businessProfile as p WHERE p.city LIKE '%$search%'";
				$result = mysql_query("SELECT p.profilePlaceId as placeId FROM businessProfile as p WHERE p.city LIKE '%$search%'") or die(mysql_error());
				if(mysql_num_rows($result))
					$hadreturn = 1;
			}else if(isset($_REQUEST['country'])){		
				$search = $_REQUEST['country'];
				$result = mysql_query("SELECT p.profilePlaceId as placeId FROM businessProfile as p WHERE p.country LIKE '%$search%'") or die(mysql_error());
				if(mysql_num_rows($result))
					$hadreturn = 1;
			}else if(isset($_REQUEST['category'])){
				$search = $_REQUEST['category'];
				$result = mysql_query("SELECT c.posterId as placeId,c.category FROM campaigndetails as c WHERE c.category LIKE '%$search%'") or die(mysql_error());
				if(mysql_num_rows($result))
					$hadreturn = 1;	
			}
		}else{
			$result = mysql_query("SELECT campaignId as placeId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 24 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
			if(mysql_num_rows($result)){
				$hadreturn = 1;
			}else{
				$result = mysql_query("SELECT campaignId as placeId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 336 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
				if(mysql_num_rows($result)){
					$hadreturn = 1;
				}	
			}
		}	
		
		if($hadreturn){
			while($campaignID = mysql_fetch_object($result)){
			$placeId = $campaignID->placeId;$advocates=0;
			if($connect->tableIsExist('sharedlink_'.$placeId)){
			$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId`") or die(mysql_error());
			if(mysql_num_rows($resultAve)){
				$rowAvg = mysql_fetch_object($resultAve);
				$advocates = $rowAvg->advocates;
			}
			$resultFollow = mysql_query("SELECT email FROM businessCustomer_$placeId WHERE follow=1 AND email <> '' GROUP BY email") or die(mysql_error());
			$follow = 0;
			if(mysql_num_rows($resultFollow))
				$follow = mysql_num_rows($resultFollow);
			$sql = "SELECT l.id, p.businessName as organization, p.nicename, p.city, p.country,l.subscribe,l.businessName, g.state, d.description, cam.category,cam.tag1,cam.tag2,c.backgroundImg,v.link FROM businessList AS l
			LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
			LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
			LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
			LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
			LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
			LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
			WHERE l.id =  $placeId LIMIT 1";
			$notresultFeature =  mysql_query($sql) or die(mysql_error());
			if(mysql_num_rows($notresultFeature)){
			$camrow = mysql_fetch_object($notresultFeature);	
			if($camrow->subscribe){
				$bgback = json_decode($camrow->backgroundImg);
			?>
					<div class="sysPinItemContainer pin clear">
						<p class="description sysPinDescr fblink"><?=$camrow->businessName?></p>
						<div style="text-align:center;">
							<a href="http://camrally.com/app/campaign.html?p=<?=$camrow->nicename?>" target="_blank"><img class="pinImage" src="app/<?=$bgback->bckimage?>" alt="campaign image"/></a>
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
								<?=$advocates?> advocates, <?=$follow?> followers
								</div>
							</div>
					</div>
					<?php
				}
				}
			 }		
			}
		 }	 
		?>
	</div>
	</div>
<!-- end trending campaign code -->
	<div class="latest-shared pinList center clear hide" style="min-width:236px">
		
	</div>
	</div> <!-- desktop -->
	<div class="m-content clear">
		<div class="m-trend-campaign">
	<?php
		if($hadreturn){
			mysql_data_seek($result, 0);
			while($campaignID = mysql_fetch_object($result)){
			$placeId = $campaignID->placeId;$advocates=0;
			if($connect->tableIsExist('sharedlink_'.$placeId)){
			$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId`");
			if(mysql_num_rows($resultAve)){
				$rowAvg = mysql_fetch_object($resultAve);
				$advocates = $rowAvg->advocates;
			}
			$resultFollow = mysql_query("SELECT email FROM businessCustomer_$placeId WHERE follow=1 AND email <> '' GROUP BY email") or die(mysql_error());
			$follow = 0;
			if(mysql_num_rows($resultFollow))
				$follow = mysql_num_rows($resultFollow);
			$sql = "SELECT l.id, p.businessName as organization, p.nicename, p.city, p.country,l.subscribe,l.businessName, g.state, d.description, cam.category,cam.tag1,cam.tag2,c.backgroundImg,v.link FROM businessList AS l
			LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
			LEFT JOIN businessDescription AS d ON d.descPlaceId = l.id
			LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
			LEFT JOIN campaigndetails AS cam ON cam.posterId = l.id
			LEFT JOIN businessvanitylink AS v ON v.placeId = l.id
			INNER JOIN businessCustom AS c ON c.customPlaceId = l.id
			WHERE l.id =  $placeId LIMIT 1";
			$notresultFeature =  mysql_query($sql) or die(mysql_error());
			$camrow = mysql_fetch_object($notresultFeature);
			if($camrow->subscribe){
				$bgback = json_decode($camrow->backgroundImg);
	?>
		<div class="sysPinItemContainer pin">
			<div style="width:auto;">
			<div class="description sysPinDescr fblink"><?=$camrow->businessName?></div>
			<div style="margin:0 auto;width:200px;">
				<a href="http://camrally.com/app/campaign.html?p=<?=$camrow->nicename?>" target="_blank"><img class="pinImage" src="app/<?=$bgback->bckimage?>" alt="campaign image"/></a>
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
					<?=$advocates?> advocates, <?=$follow?> followers
					</div>
				</div>
			</div>
		</div>
		<?php
		}
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