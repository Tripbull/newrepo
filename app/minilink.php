<?php

include_once('class/class.main.php');
$link = strtolower($_REQUEST['link']);
$connect = new db();
$connect->db_connect();
$con =  new fucn();
$imgrotate = new fucn();

$result = mysql_query("SELECT s.id,s.source,s.link,s.label,p.nicename,v.link as vlink,g.productId,g.state FROM businessProfile AS p LEFT JOIN businessvanitylink AS v ON v.placeId = p.profilePlaceId LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId LEFT JOIN businessshorturl as s ON s.placeId = p.profilePlaceId WHERE s.link = '{$link}' OR v.link = '{$link}' OR p.nicename = '{$link}'") or die(mysql_error());

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
		if($row->link == $link){
			if($row->source == 1 || $row->source == 'b')
				echo $goingto = 'http://camrally.com/staging/campaign.html?p='. $row->nicename;
			else
				echo $goingto = 'http://camrally.com/staging/campaign.html?p='. $row->nicename .'&s='.$row->source;
			//header("HTTP/1.1 301 Moved Permanently");
			header("Location: {$goingto}");
			die();
		}else if($row->vlink == $link){
			if(strpos($_SERVER['REQUEST_URI'], 'html')){
				header("HTTP/1.0 404 Not Found");
				//$goingto = 'http://camrally.com/staging/'.$row->vlink; 
				//header("Location: {$goingto}");
				echo '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
					<html><head>
					<title>404 Not Found</title>
					</head><body>
					<h1>Not Found</h1>
					<p>The requested URL '.$_SERVER['REQUEST_URI'].' was not found on this server.</p>
					</body></html>';
				die();
			}else{
				$nice = $row->nicename;
				$path = $connect->path;
				include_once('pinme.php');
				die();
			}
		}else if($row->nicename == $link){
			if(trim($row->vlink) != ''){
				header("HTTP/1.1 301 Moved Permanently");
				$goingto = 'http://camrally.com/staging/'.$row->vlink;
				header("Location: {$goingto}");
				die();	
			}else{
				$nice = $row->nicename;
				$path = $connect->path;
				include_once('pinme.php');
				die();
			}
		}
	}
}else{
	$goingto = 'http://camrally.com'; 
	header("Location: {$goingto}");
	die();
}	
$connect->db_connect();
//header("Location: {$goingto}");
die();
?>
