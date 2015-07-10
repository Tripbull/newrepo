<?php
session_start();
  //check if this is an ajax request OR user session is not setting up
if (!isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}

$filename = '/' . rand() .'.jpg';
$UploadDirectory    = 'images/shared/'.$_POST['placeId'];
if (!file_exists($UploadDirectory))
		mkdir($UploadDirectory); 

echo $source = $UploadDirectory.$filename;

$img = $_POST['dataUrl'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$input = base64_decode($img);

$result = file_put_contents($source, $input);

?>