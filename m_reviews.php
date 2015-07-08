<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$imgrotate = new fucn();
$placeId = $_REQUEST['placeId'];
$addnewfield = mysql_query("SHOW COLUMNS FROM `businessCustom` LIKE 'isselfie'") or die(mysql_error());
if(mysql_num_rows($addnewfield) < 1)
	mysql_query("ALTER TABLE `businessCustom`  ADD `isselfie` TINYINT NOT NULL DEFAULT '0'  AFTER `fbpost`");
$sql = "SELECT c.item2Rate,c.selectedItems,c.reviewPost,c.logo,c.isselfie FROM businessCustom AS c WHERE c.customPlaceId = $placeId LIMIT 1";
$result1 = mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_object($result1);
$path = $connect->path;
$topostFB = json_decode($row->reviewPost);
$questionDefault = array('How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again','How valuable is our web service to you?_Value Proposition','For the value provided, how attractive is our pricing?_Price Attractiveness','How likely are you to recommend this website to your friends?_Recommended');
$arrayItem2Rate= json_decode($row->item2Rate);
$arraySelectedItem = json_decode($row->selectedItems);
$ratingTextTemp = array();
	if($arrayItem2Rate){
		if(is_object($arrayItem2Rate)){
			for($i=0;$i<count($arrayItem2Rate->rows);$i++){
				for($j=0;$j<count($arraySelectedItem->rows);$j++){		
					$name = explode('_',$arrayItem2Rate->rows[$i]->data);
					if($arraySelectedItem->rows[$j]->data == $name[1]){
					   $ratingTextTemp[] = $name[1];
					}
				}
			}			
		}else{
			for($i=0;$i<count($arrayItem2Rate);$i++){
				for($j=0;$j<count($arraySelectedItem);$j++){		
					$name = explode('_',$arrayItem2Rate[$i]);
					if($arraySelectedItem[$j] == $name[1]){
					   $ratingTextTemp[] = $name[1];
					}
				}
			}
			for($i=0;$i<count($questionDefault);$i++){
				for($j=0;$j<count($arraySelectedItem);$j++){		
					$name = explode('_',$questionDefault[$i]);
					if($arraySelectedItem[$j] == $name[1]){
						array_push($ratingTextTemp,$name[1]);
					}
				}
			}
		}
	}else{
		for($i=0;$i<count($questionDefault);$i++){
			for($j=0;$j<count($arraySelectedItem);$j++){		
				$name = explode('_',$questionDefault[$i]);
				if($arraySelectedItem[$j] == $name[1]){
					array_push($ratingTextTemp,$name[1]);
				}
			}
		}
	}
$offset = $_REQUEST['offset'];
$limit = $_REQUEST['limit'];
$hadTable = $connect->tableIsExist('businessplace_'.$placeId);
$timezone ='';
if($hadTable){
    $timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
	$timezone = $timezone->timezone;
	$table = 'sharedlink_'.$placeId;
	$hadTable = $connect->tableIsExist($table);
	if($hadTable < 1){
		$sql1 = " CREATE TABLE IF NOT EXISTS `{$table}` (
		`id` int(11) NOT NULL,
		  `feedbackId` int(11) NOT NULL,
		  `fbId` bigint(20) NOT NULL,
		  `link` varchar(50) NOT NULL,
		  `pathimg` varchar(200) NOT NULL,
		  `isshared` tinyint(4) NOT NULL DEFAULT '0',
		  `ave` double NOT NULL,
		  `comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
		  `datecreated` datetime NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
		$sql2 = "ALTER TABLE `{$table}` ADD PRIMARY KEY (`id`), ADD KEY `feedbackId` (`feedbackId`,`link`), ADD KEY `fbId` (`fbId`);";
		mysql_query($sql1);
		mysql_query($sql2);
		mysql_query("ALTER TABLE `{$table}` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT");
	}
	$addhidefield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
	if(mysql_num_rows($addhidefield) < 1)
		mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
	$addfeafield = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
	if(mysql_num_rows($addfeafield) < 1) 
		mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
	if($_REQUEST['case'] < 2){
		$resultFeature =  mysql_query("SELECT b.id, b.rated1, b.rated2, b.rated3, b.rated4, b.rated5, b.rated6, b.rated7, b.aveRate, b.comment, b.userName, b.userId, b.source, b.labelId, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE source = 'fb' AND feature=1 ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
		if( mysql_num_rows($resultFeature)){
			while($rowrate = mysql_fetch_object($resultFeature)){
				include_once('m_reviewshtml.php');
			}
		}else
			echo 0;
	}else{
		//$result = mysql_query("SELECT * FROM businessplace_$placeId WHERE feature = 1 AND source = 'fb'") or die(mysql_error());
		// DUPLICATE FIX
		$result =  mysql_query("SELECT b.id, b.rated1, b.rated2, b.rated3, b.rated4, b.rated5, b.rated6, b.rated7, b.aveRate, b.comment, b.userName, b.userId, b.source, b.labelId, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id INNER JOIN (SELECT Userid, MAX(Date) as Date FROM businessplace_$placeId WHERE feature = 1 AND source = 'fb' GROUP BY UserId) AS MAX USING (Userid, Date) ORDER BY date") or die(mysql_error());
		
		if(mysql_num_rows($result) > 0){
			$offset = ($offset > 0 ? $offset-1 : $offset); 
		}
			
		//$resultFeature =  mysql_query("SELECT * FROM businessplace_$placeId WHERE source = 'fb' AND feature=0 ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
		// DUPLICATE FIX
		$resultFeature =  mysql_query("SELECT b.id, b.rated1, b.rated2, b.rated3, b.rated4, b.rated5, b.rated6, b.rated7, b.aveRate, b.comment, b.userName, b.userId, b.source, b.labelId, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id INNER JOIN (SELECT Userid, MAX(Date) as Date FROM businessplace_$placeId WHERE feature = 0 AND source = 'fb' GROUP BY UserId) AS MAX USING (Userid, Date) ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
		if( mysql_num_rows($resultFeature)){
			while($rowrate = mysql_fetch_object($resultFeature)){
				include('m_reviewshtml.php');
			}
		}else
			echo 0;
	}
}
?>
