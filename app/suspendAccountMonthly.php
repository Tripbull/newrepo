<?php
include_once('class/class.main.php');
$db = new db();
$connector = new fucn ();
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
$addhidefield = mysql_query("SHOW COLUMNS FROM `businessUserGroup` LIKE 'monthlyrun'");
if(mysql_num_rows($addhidefield) < 1)
	mysql_query("ALTER TABLE `businessUserGroup` ADD `monthlycheck` datetime NOT NULL");
	
$sql = 'SELECT g.created, g.timezone, g.gId, g.email, g.datesuspend,g.monthlycheck
FROM `businessUserGroup` AS g
WHERE g.suspend =0
AND g.type >0';

$result = mysql_query($sql) or die(mysql_error());
$i= 0;
while($row = mysql_fetch_object($result)){
		$today =  date('Y-m-d H:i:s');
		//array_push($arrayId,$row->gId);
		$user_tz = (($row->timezone == 'none' || $row->timezone == '') ? 'Asia/Singapore' : $row->timezone);//'America/Chicago';
		$server_tz = 'UTC';
		$schedule_date = new DateTime($today, new DateTimeZone($server_tz) );
		$schedule_date->setTimeZone(new DateTimeZone($user_tz));
		$tmztoday =  $schedule_date->format('Y-m-d H:i:s');
		if(strtotime($row->monthlycheck) > 0)
			$created = $row->monthlycheck;
		else
			$created = $row->created;
		$expired_date = new DateTime($created, new DateTimeZone($server_tz) );
		$expired_date->setTimeZone(new DateTimeZone($user_tz));
		$tmzcreated =  $expired_date->format('Y-m-d H:i:s').' + 1 Months';	
		if(strtotime($tmztoday) > strtotime($tmzcreated)){
		  // echo "SELECT id,COUNT(userGroupId) as total FROM `businessList` WHERE userGroupId = {$row->gId}";
			$listresult = mysql_query("SELECT id,COUNT(userGroupId) as total FROM `businessList` WHERE userGroupId = {$row->gId}") or die(mysql_query());
			if(mysql_num_rows($listresult)){
                $row2 = mysql_fetch_object($listresult);
				if($row2->total < 2){
					$hadTable = $db->tableIsExist('businessplace_'.$row2->id);
					$date = date('Y-m-d H:i:s');
					$str = "fewer than 20 unique reviewers per month";
					$groupId = $row->gId;
					$email = $row->email;
					$subject = "We're sorry! Your Tabluu account is suspended.";
					$body = '<p>Account email: '. $email .'<br/>Your Tabluu account is suspended for the following reasons:<p>fewer than 20 unique reviewers per month</p>
					<p>Please contact Tabluu support if you wish to appeal this suspension.</p>
					<p>Thank you!</p>
					<p>Tabluu Support</p>';
					if($hadTable){
					   //echo "SELECT COUNT(DISTINCT(`userId`)) AS reviews FROM `businessplace_{$row2->id}` WHERE `userId` <> '' AND date > '{$created}'";
						$totalresult = mysql_query("SELECT COUNT(DISTINCT(`userId`)) AS reviews FROM `businessplace_{$row2->id}` WHERE `userId` <> '' AND date > '{$created}'");
						$res = mysql_fetch_object($totalresult);
						if($res->reviews < 20){
							mysql_query("UPDATE businessUserGroup SET reason='$str',suspend=1,datesuspend='{$date}' WHERE gId = {$groupId}");
							sendEmail($email,$subject,$body);
							$next_due_date = strtotime(date('Y-m-d H:i:s').' + 1 Months');
							$due_date = date('Y-m-d H:i:s a', $next_due_date);
							mysql_query("UPDATE businessUserGroup SET monthlycheck='{$due_date}' WHERE gId = {$groupId}");
						}else{
							$next_due_date = strtotime(date('Y-m-d H:i:s').' + 1 Months');
							$due_date = date('Y-m-d H:i:s a', $next_due_date);
							mysql_query("UPDATE businessUserGroup SET monthlycheck='$due_date' WHERE gId = '$groupId'");							
						}
					}else{
						mysql_query("UPDATE businessUserGroup SET reason='$str',suspend=1,datesuspend='$date' WHERE gId = $groupId");
						sendEmail($email,$subject,$body);		
					}
			  }	
			}
		}
	}


function sendEmail($email,$subject,$body){
	require_once 'class/class.phpmailer2.php';
	$connect = new db();
	$mail = new PHPMailer;
	$mail->IsAmazonSES();
	$mail->AddAmazonSESKey($connect->aws_access_key_id, $connect->aws_secret_key);                            // Enable SMTP authentication
	$mail->CharSet	  =	"UTF-8";                      // SMTP secret 
	$mail->From = 'support@camrally.com';
	$mail->FromName = 'Tabluu Support';
	$mail->Subject = $subject;
	$mail->AltBody = $body;
	$mail->Body = $body; 
	$mail->AddAddress($email);
	$mail->addBCC("support@camrally.com");
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
