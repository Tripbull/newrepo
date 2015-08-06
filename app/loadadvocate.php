<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$path = $connect->path;
$offset=$_REQUEST['offset'];$limit=$_REQUEST['limit'];$placeId =$_REQUEST['placeId'];$feature =$_REQUEST['feature'];
$timezone = mysql_fetch_object(mysql_query("SELECT u.timezone FROM businessList as l LEFT JOIN businessUserGroup AS u ON u.gId = l.userGroupId WHERE l.id = $placeId LIMIT 1"));
$timezone = $timezone->timezone;
if($feature > 0)
	$feature = 'feature ='. $feature;
else
	$feature = 1;
$resultFeature =  mysql_query("SELECT b.userName, b.userId, b.source, b.feedsource, b.photo_url, b.date, b.hideimg, b.feature,s.link,s.isshared FROM businessplace_$placeId as b LEFT JOIN sharedlink_$placeId AS s ON s.feedbackId = b.id WHERE {$feature} ORDER BY date DESC LIMIT $offset,$limit") or die(mysql_error());
while($rowrate = mysql_fetch_object($resultFeature)){
	if($rowrate->hideimg < 1 && $rowrate->hideimg != null)
	{
		include('reviewshtml.php');
	}
} 
$connect->db_disconnect();
?>