<?php
include_once('class/class.main.php');
$db = new db();
/*
note:
	type of account: 
		normal = 0
		alpha = 1
		beta = 2
	suspended account:
		1 = suspended
		0 = not suspended
*/
$db->db_connect();

$result = mysql_query("SELECT `gId`, `email`, `expiration`, `created`, `timezone`, `type`, `suspend` FROM `businessUserGroup` WHERE suspend = 0 AND type = 1");
$arrayId = array();
while($row = mysql_fetch_object($result)){ // after 
	$today =  date('Y-m-d H:i:s');
	array_push($arrayId,$row->gId);
	$user_tz = (($row->timezone == 'none' || $row->timezone == '') ? 'Asia/Singapore' : $row->timezone);//'America/Chicago';
	$server_tz = 'UTC';
	$schedule_date = new DateTime($today, new DateTimeZone($server_tz) );
	$schedule_date->setTimeZone(new DateTimeZone($user_tz));
	$tmztoday =  $schedule_date->format('Y-m-d H:i:s');
	$expired = $row->expiration;
	$expired_date = new DateTime($expired, new DateTimeZone($server_tz) );
	$expired_date->setTimeZone(new DateTimeZone($user_tz));
	$tmzexpired =  $expired_date->format('Y-m-d H:i:s');
	if(strtotime($tmztoday) > strtotime($tmzexpired)){
		$email = $row->email;
		$subject = "We're sorry! Your Tabluu account is suspended.";
		$body = '<p>Account email: '. $email .'<br/>Your Tabluu account is suspended for the following reasons:<p>Subscription expired.</p>
				<p>Please contact Tabluu support if you wish to appeal this suspension.</p>
				<p>Thank you!</p>
				<p>Tabluu Support</p>';
		sendEmail($email,$subject,$body);
		$groupid = $row->gId;
		$date = date('Y-m-d H:i:s');
		mysql_query("UPDATE businessUserGroup SET reason='Subscription expired.',suspend=1,datesuspend='$date' WHERE gId = '$groupid'") or die(mysql_error());
	}
}

function sendEmail($email,$subject,$body){
	require_once 'class/class.phpmailer2.php';
	$connect = new db();
	$mail = new PHPMailer;
	$mail->IsAmazonSES();
	$mail->AddAmazonSESKey($connect->aws_access_key_id, $connect->aws_secret_key);                            // Enable SMTP authentication
	$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
	$mail->From = 'support@tabluu.com';
	$mail->FromName = 'Tabluu Support';
	$mail->Subject = $subject;
	$mail->AltBody = $body;
	$mail->Body = $body; 
	$mail->AddAddress($email);
	$mail->addBCC("support@tabluu.com");
	//if($rows->permission > 0)
		//$mail->addBCC($rows->usermail);
	//$mail->AddAddress('robert.garlope@gmail.com');	
	$mail->Send();
	$mail->ClearAllRecipients();
	return;
}
/*
echo $today =  date('Y-m-d H:i:s a');//date('Y-m-d');
echo '<br/>';
$user_tz = 'Asia/Singapore';//'America/Chicago';
$server_tz = 'UTC';

$schedule_date = new DateTime($today, new DateTimeZone($server_tz) );
$schedule_date->setTimeZone(new DateTimeZone($user_tz));
$datetoconvert =  $schedule_date->format('Y-m-d H:i:s');
$next_due_date = strtotime($datetoconvert.' + 12 Months');
echo '<br/>';
echo date('Y-m-d H:i:s a', $next_due_date);
$db->db_disconnect(); */


?>
