<?php
require_once 'class/class.phpmailer2.php';
include_once('class/class.main.php');
$connect = new db();
$name = $_REQUEST['name'];
$email = $_REQUEST['email'];
$subject = $_REQUEST['subject'];
$message = $_REQUEST['message'];
$setting = $_REQUEST['setting'];
//Tabluu Contact Page
//Affiliate Contact Page
$message = "<p>name: ".$name."</p>" . "<p>subject: ".$subject."</p>" . "<p>message: ".$message."</p>";
$mail = new PHPMailer;
$mail->IsAmazonSES();
$mail->AddAmazonSESKey($connect->aws_access_key_id, $connect->aws_secret_key);
$mail->CharSet =	"UTF-8";                      // SMTP secret 
if($setting){
	$mail->From = 'support@camrally.com';
	$mail->FromName =  'Tabluu Contact Page';
	$mail->AddAddress("support@camrally.com");
}else{
	$mail->From = 'affiliates@camrally.com';
	$mail->FromName =  'Affiliate Contact Page';
	$mail->AddAddress("affiliates@camrally.com");
}
$mail->Subject = $subject;
$mail->AltBody = $message;
$mail->Body = $message; 
$mail->addBCC($email);
$mail->AddReplyTo($email);
$mail->Send();
?>
