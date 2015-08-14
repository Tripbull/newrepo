<?php

include_once('app/class/class.main.php');
$link = strtolower($_REQUEST['link']);
$connect = new db();
$connect->db_connect();
$con =  new fucn();
$imgrotate = new fucn();

$result = mysql_query("SELECT s.id,s.source,s.link,s.label,p.nicename,v.link as vlink,lite.link as litelink,g.productId,g.state FROM businessProfile AS p LEFT JOIN businessvanitylink AS v ON v.placeId = p.profilePlaceId LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId LEFT JOIN businessshorturl as s ON s.placeId = p.profilePlaceId LEFT JOIN businesslitelink as lite ON lite.placeId = p.profilePlaceId WHERE s.link = '{$link}' OR v.link = '{$link}' OR p.nicename = '{$link}'") or die(mysql_error());

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
				$goingto = 'http://camrally.com/app/campaign.html?p='. $row->nicename;
			else
				$goingto = 'http://camrally.com/app/campaign.html?p='. $row->nicename .'&s='.$row->source;
			header("Location: {$goingto}");
			die();
		}else if($row->vlink == $link){
			if($row->productId == $connect->liteID){
				header("HTTP/1.1 301 Moved Permanently");
				$goingto = 'http://camrally.com/c/'.$row->vlink; 
				header("Location: {$goingto}");
				die();
			}else{
				if(($row->productId == $connect->basicID || $row->productId == $connect->proID) && strpos($_SERVER['REQUEST_URI'], 'html')){
					header("HTTP/1.1 301 Moved Permanently");
					$goingto = 'http://camrally.com/'.$row->vlink; 
					header("Location: {$goingto}");
					die();
				}else{
					$nice = $row->nicename;
					$path = $connect->path;
					include_once('app/pinme.php');
					die();
				}
			}
		}else if($row->nicename == $link){
			if(trim($row->vlink) != ''){
					if($row->productId == $connect->basicID || $row->productId == $connect->proID){
						header("HTTP/1.1 301 Moved Permanently");
						$goingto = 'http://camrally.com/'.$row->vlink;
						header("Location: {$goingto}");
						die();
					}else{
						if(!strpos($_SERVER['REQUEST_URI'], 'html')){
							header("HTTP/1.1 301 Moved Permanently");
							$goingto = 'http://camrally.com/'.$row->nicename .'.html';
							header("Location: {$goingto}");
							die();
						}else{
							if($row->litelink){
								header("HTTP/1.1 301 Moved Permanently");
								$goingto = 'http://camrally.com/c/'.$row->litelink;
								header("Location: {$goingto}");
								die();	
							}else{
								$nice = $row->nicename;
								$path = $connect->path;
								include_once('app/pinme.php');
								die();
							}
						}
					}	
			}else{
				if(!strpos($_SERVER['REQUEST_URI'], 'html')){
					header("HTTP/1.1 301 Moved Permanently");
					$goingto = 'http://camrally.com/'.$row->nicename .'.html';
					header("Location: {$goingto}");
					die();
				}else{
					if($row->litelink){
						header("HTTP/1.1 301 Moved Permanently");
						$goingto = 'http://camrally.com/c/'.$row->litelink;
						header("Location: {$goingto}");
						die();	
					}else{
						$nice = $row->nicename;
						$path = $connect->path;
						include_once('app/pinme.php');
						die();
					}
				}
			}
		}
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
