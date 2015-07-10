<?php
session_start();
  //check if this is an ajax request OR user session is not setting up
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !isset($_SESSION['session'])){
	echo 'access is forbidden';
	die();
}
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$opt = $_REQUEST['opt'];
switch($opt){
	case 'btngetcoupon':
		$result = mysql_query("SELECT * FROM `businessClockcounter` WHERE 1 ") or die(mysql_error());
		$row = mysql_fetch_object($result);
		echo $row->accounts.'_'.$row->accountleft;
	break;	
	case 'emaillist':
		$name = $_REQUEST['txtname'];$email = $_REQUEST['txtemail'];
		/*insert the new user to email list sendy*/
		$time = time();
		$list_id = 58; //compulsory
		//$r = mysql_query("SELECT userID FROM lists WHERE id = $list_id");
		//$row = mysql_fetch_object($r);
		mysql_query('INSERT INTO subscribers (userID, email, name, custom_fields, list, timestamp) VALUES (1, "'.$email.'", "'.$name.'", "", '.$list_id.', '.$time.')') or die(mysql_error());	
	break;


	
}
$connect->db_disconnect();
?>
