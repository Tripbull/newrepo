<?php

include_once('app/class/class.main.php');
$link = strtolower($_REQUEST['link']);
$connect = new db();
$connect->db_connect();
$con =  new fucn();
$imgrotate = new fucn();

$result = mysql_query("SELECT p.profilePlaceId,s.link,p.nicename,v.link as vlink,g.productId,g.state FROM businessProfile AS p LEFT JOIN businessvanitylink AS v ON v.placeId = p.profilePlaceId LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId LEFT JOIN businesslitelink as s ON s.placeId = p.profilePlaceId WHERE v.link = '{$link}' OR s.link = '{$link}' OR p.nicename = '{$link}'") or die(mysql_error());
//$row = mysql_fetch_object($result);
//print_r($row);
//die();
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	if($row->state == 'canceled' || $row->state == 'unpaid'){
		header("HTTP/1.0 404 Not Found");
		header('Location: http://camrally.com');
		die();
	}else{
		$nice = $row->nicename;
		$path = '../'.$connect->path;
		include_once('app/pinme.php');
		die();
	}
}else{
	header("HTTP/1.0 404 Not Found");
	$goingto = 'http://camrally.com'; 
	header("Location: {$goingto}");
	die();
}	
$connect->db_connect();
//header("Location: {$goingto}");
die();
?>
