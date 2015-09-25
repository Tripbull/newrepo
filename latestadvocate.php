<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
if($_REQUEST['case'] == 3 || $_REQUEST['case'] == 4){
	$hadreturn = 0;
	$result = mysql_query("SELECT campaignId as placeId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 24 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
			if(mysql_num_rows($result)){
				$hadreturn = 1;
			}else{
				$result = mysql_query("SELECT campaignId as placeId,count(campaignId) as sum FROM advocates_all WHERE date > DATE_SUB(NOW(), INTERVAL 336 HOUR) AND date <= NOW() group by campaignId order by sum desc") or die(mysql_error());
				if(mysql_num_rows($result)){
					$hadreturn = 1;
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
				if($_REQUEST['case'] == 3){
					?>		
					<div class="sysPinItemContainer pin">
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
					}else{
				?>
					<div class="sysPinItemContainer pin clear">
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
			}
		 }	 		
}else{
	$result = mysql_query("SELECT campaignId FROM advocates_all group by campaignId order by id desc LIMIT 20") or die(mysql_error());
	if(mysql_num_rows($result)){
		while($campaignID = mysql_fetch_object($result)){
		$placeId = $campaignID->campaignId;
		if($connect->tableIsExist('sharedlink_'.$placeId)){
		$sql = "SELECT l.id, p.businessName as organization, p.nicename, p.city, p.country,l.subscribe,l.businessName, g.state, d.description, cam.category,cam.tag1,cam.tag2,c.backgroundImg,v.link FROM businessList AS l
		INNER JOIN businessProfile AS p ON p.profilePlaceId = l.id
		INNER JOIN businessDescription AS d ON d.descPlaceId = l.id
		INNER JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		INNER JOIN campaigndetails AS cam ON cam.posterId = l.id
		INNER JOIN businessvanitylink AS v ON v.placeId = l.id
		INNER JOIN businessCustom AS c ON c.customPlaceId = l.id 
		WHERE l.id =  $placeId LIMIT 20";
	$notresultFeature =  mysql_query($sql) or die(mysql_error());
	if(mysql_num_rows($notresultFeature)){
	while($camrow = mysql_fetch_object($notresultFeature)){
		$placeId = $camrow->id;$advocates=0;
		$resultAve = mysql_query("SELECT count(b.id) as advocates FROM `sharedlink_$placeId` as a INNER JOIN businessplace_$placeId as b ON b.id = a.`feedbackId`");
		if(mysql_num_rows($resultAve)){
			$rowAvg = mysql_fetch_object($resultAve);
			$advocates = $rowAvg->advocates;
		}
		$resultFollow = mysql_query("SELECT email FROM businessCustomer_$placeId WHERE follow=1 AND email <> '' GROUP BY email") or die(mysql_error());
		$follow = 0;
		if(mysql_num_rows($resultFollow))
			$follow = mysql_num_rows($resultFollow);
		$bgback = json_decode($camrow->backgroundImg);
		if($bgback){
	if($_REQUEST['case'] == 1){	
		if($camrow->subscribe){
	?>		
	<div class="sysPinItemContainer pin">
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
	}else{
		if($camrow->subscribe){
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
	}
	}
	}
	}
}
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