<?php
/*
include_once('class/class.main.php');
$link = strtolower($_REQUEST['link']);
$connect = new db();
$connect->db_connect();
$con =  new fucn();
$result = mysql_query("SELECT s.id,s.source,s.link,s.label,p.nicename FROM businessshorturl as s LEFT JOIN businessProfile AS p ON p.profilePlaceId = s.placeId WHERE link = '{$link}'");
header("HTTP/1.1 301 Moved Permanently");
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	if(trim($row->label) != '')
		echo $goingto = 'app/rateone.html?p='. $row->nicename .'&s='.$row->source.'&label='.$row->id; //urlencode 
	else
		echo $goingto = 'app/rateone.html?p='. $row->nicename .'&s='.$row->source;
}else
	$goingto = 'https://www.tabluu.com'; 
$connect->db_connect();
header("Location: {$goingto}");
exit();*/
//if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start();//page compressed
include_once('class/class.main.php');
$link = strtolower($_REQUEST['link']);
$connect = new db();
$connect->db_connect();
$con =  new fucn();
$imgrotate = new fucn();
//echo '<!--<p>'"SELECT s.id,s.source,s.link,s.label,p.nicename,v.link as vlink,g.productId,g.state FROM businessProfile AS p LEFT JOIN businessvanitylink AS v ON v.placeId = p.profilePlaceId LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId LEFT JOIN businessshorturl as s ON s.placeId = p.profilePlaceId WHERE s.link = '{$link}' OR v.link = '{$link}' OR p.nicename = '{$link}'".'</p>-->';
$result = mysql_query("SELECT s.id,s.source,s.link,s.label,p.nicename,v.link as vlink,g.productId,g.state FROM businessProfile AS p LEFT JOIN businessvanitylink AS v ON v.placeId = p.profilePlaceId LEFT JOIN businessList AS l ON l.id = p.profilePlaceId LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId LEFT JOIN businessshorturl as s ON s.placeId = p.profilePlaceId WHERE s.link = '{$link}' OR v.link = '{$link}' OR p.nicename = '{$link}'") or die(mysql_error());
//$row = mysql_fetch_object($result);
//print_r($row);
//die();
$domain = 'http://camrally.com';
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	if($row->state == 'canceled' || $row->state == 'unpaid'){
		header("HTTP/1.0 404 Not Found");
		header('Location: '.$domain);
		die();
	}else{
		if($row->link == $link){
			if(trim($row->label) != '')
				echo $goingto = $domain.'/app/rateone.html?p='. $row->nicename .'&s='.$row->source.'&label='.$row->id; //urlencode 
			else
				echo $goingto = $domain.'/app/rateone.html?p='. $row->nicename .'&s='.$row->source;
			//header("HTTP/1.1 301 Moved Permanently");
			header("Location: {$goingto}");
			die();
		}else if($row->vlink == $link){
			if($row->productId == $connect->basicID || $row->productId == $connect->basic24 || $row->productId == $connect->basic12 || $row->productId == $connect->freever){
				//$goingto = 'https://www.tabluu.com/'.$row->nicename.'.html';
				header("HTTP/1.1 301 Moved Permanently");
				$goingto = $domain.'/'.$row->nicename.'.html'; 
				header("Location: {$goingto}");
				die();
			}else{
				//header("HTTP/1.1 301 Moved Permanently");
				$nice = $row->nicename;
				include_once('app/pinme.php');
				die();
			}
		}else if($row->nicename == $link){
			//header("HTTP/1.1 301 Moved Permanently");
			if(trim($row->vlink) != '' && $row->productId != $connect->basicID && $row->productId != $connect->basic24 && $row->productId != $connect->basic12 && $row->productId != $connect->freever){
					header("HTTP/1.1 301 Moved Permanently");
					$goingto = $domain.$row->vlink;
					header("Location: {$goingto}");
					die();
			}else{
				$nice = $row->nicename;
				include_once('app/pinme.php');
				die();
			}
		}
	}
}else{
	header("HTTP/1.0 404 Not Found");
	$goingto = $domain; 
	header("Location: {$goingto}");
	die();
}	
$connect->db_connect();
//header("Location: {$goingto}");
die();
?>
