<?php
session_start();
  //check if this is an ajax request OR user session is not setting up
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || !isset($_SESSION['session'])){
	//echo 'access is forbidden';
	//die();
}
include_once('class/class.textToImage.php');
include_once("class/class.resizephoto.php");
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$remove =  new fucn();
$opt = $_REQUEST['opt'];
$data = array(); 

switch($opt){
	case 'generateshorturl':
		$placeId = $_REQUEST['placeId'];$source = $_REQUEST['source'];$label = encodequote($_REQUEST['label']);
		$link = checkshortULR();
		$result = mysql_query("SELECT id,source FROM businessshorturl WHERE source = '{$source}' AND placeId = {$placeId}");//check if source is existed
		if(mysql_num_rows($result)){ // existed update it
			$row = mysql_fetch_object($result);
			mysql_query("UPDATE businessshorturl SET link = '{$link}', source = '{$source}', label='{$label}' WHERE id = {$row->id}");
		}else
			$query = mysql_query("INSERT INTO businessshorturl SET link = '{$link}',placeId = {$placeId}, source = '{$source}', label='{$label}'");
		$imagesArray['source_'.$source]['link'] = $link;
		$imagesArray['source_'.$source]['source'] = $source;
		$imagesArray['source_'.$source]['label'] = $label;
		echo json_encode($imagesArray);
	break;
	case 'generatesharedurl':
		$placeId = $_REQUEST['placeId'];$photo_url = $_REQUEST['photo_url'];
		$table = 'sharedlink_'.$placeId;
		$date = date('Y-m-d H:i:s');
		$link = checksharedURL($table,$placeId);
		mysql_query("INSERT INTO {$table} SET link = '{$link}',pathimg = '{$photo_url}',datecreated='{$date}'");
		$lastId = mysql_insert_id();
		echo $link .'_'.$lastId;
	break;
	case 'generatedurlremove':
		$placeId = $_REQUEST['placeId'];$sharedId = $_REQUEST['sharedId'];
		$table = 'sharedlink_'.$placeId;
        $hadTable = $connect->tableIsExist($table);
		if($hadTable){
			mysql_query("DELETE FROM {$table} WHERE id = {$sharedId}");	
		}
	break;
	case 'checkvanity':
		$placeId = $_REQUEST['placeId'];$str = $_REQUEST['str'];
		$link = $remove->cleanurl($str);
		$result = mysql_query("SELECT id FROM businessvanitylink WHERE link = '{$link}'");//check if source is existed
		if(mysql_num_rows($result)){ // existed update it
			echo '';
		}else
			echo $link;
		
	break;
	case 'updatevanity':
		$placeId = $_REQUEST['placeId'];
		if($_REQUEST['case'] == 1){
			$str = $_REQUEST['str'];
			$link = $remove->cleanurl($str);
			$result = mysql_query("SELECT id FROM businessvanitylink WHERE link = '{$link}'");//check if source is existed
			if(mysql_num_rows($result)){ // existed update it
				echo 'exist';
			}else{
				$result = mysql_query("SELECT id FROM businessvanitylink WHERE placeId = {$placeId}");//check if source is existed
				if(mysql_num_rows($result))
					mysql_query("UPDATE businessvanitylink SET link = '{$link}' WHERE placeId = {$placeId}");
				else
					$query = mysql_query("INSERT INTO businessvanitylink SET link = '{$link}',placeId = {$placeId}") or die(mysql_error());
				echo $link;
			}
		}else if($_REQUEST['case'] == 2){
			mysql_query("UPDATE businessvanitylink SET link = '' WHERE placeId = {$placeId}");
		}else if($_REQUEST['case'] == 3){
			$str = $_REQUEST['str'];
			$link = $remove->cleanurl($str);
			$result = mysql_query("SELECT id FROM businesslitelink WHERE link = '{$link}'");//check if source is existed
			if(mysql_num_rows($result)){ // existed update it
				echo 'exist';
			}else{
				$result = mysql_query("SELECT id FROM businesslitelink WHERE placeId = {$placeId}");//check if source is existed
				if(mysql_num_rows($result))
					mysql_query("UPDATE businesslitelink SET link = '{$link}' WHERE placeId = {$placeId}");
				else
					$query = mysql_query("INSERT INTO businesslitelink SET link = '{$link}',placeId = {$placeId}") or die(mysql_error());
				echo $link;
			}
		}else if($_REQUEST['case'] == 4){
			mysql_query("UPDATE businesslitelink SET link = '' WHERE placeId = {$placeId}");
		}	
	break;
	case 'setLoc':
		$userId = $_REQUEST['key'];
		$name = mysql_real_escape_string($_REQUEST['name']);
		$gId = $_REQUEST['groudId'];$subs = $_REQUEST['subscribe'];$label = $_REQUEST['label'];
		$query = mysql_query("INSERT INTO businessList SET userGroupId = $gId, businessName = '{$name}', subscribe={$subs},label='{$label}'");
		if(mysql_affected_rows()){
			 $lastId = mysql_insert_id();
			 $val = checknicename();	
			 mysql_query("INSERT INTO businessProfile SET profilePlaceId = $lastId,nicename='$val', showmap=0");
			 $defaultLogo ='';$defaultimg='';
			 mysql_query("INSERT INTO businessCustom SET customPlaceId = $lastId, logo = '$defaultLogo',backgroundcolor = '#7F7F7F',backgroundFont = '#3b3a26'");
			 mysql_query("INSERT INTO businessImages (placeId,path,title,description,name) VALUES($lastId,'','','','fbImg'),($lastId,'{$defaultimg}','','','webImg'),($lastId,'{$defaultimg}','','','webImg2'),($lastId,'{$defaultimg}','','','webImg3'),($lastId,'{$defaultimg}','','','webImg4'),($lastId,'{$defaultimg}','','','webImg5'),($lastId,'','','','webImg6'),($lastId,'','','','webImg7'),($lastId,'','','','webImg8')");
			 mysql_query("INSERT INTO campaigndetails SET posterId = $lastId");
			 mysql_query("INSERT INTO businessDescription SET descPlaceId = $lastId");
		     echo $lastId;
			 feedbacktable($lastId);
		}else
			echo 0;
	break;
	case 'delLoc':
		$placeId = $_REQUEST['key'];
		$sql = "DELETE l,p,d,h,c,img,short,v,lite FROM businessList AS l LEFT JOIN businessProfile as p ON p.profilePlaceId=l.id LEFT JOIN businessDescription as d ON d.descPlaceId = l.id LEFT JOIN campaigndetails as h ON h.posterId=l.id LEFT JOIN businessCustom as c ON c.customPlaceId = l.id LEFT JOIN businessvanitylink as v ON v.placeId = c.customPlaceId LEFT JOIN businesslitelink as lite ON lite.placeId = c.customPlaceId LEFT JOIN businessImages as img ON img.placeId = $placeId LEFT JOIN businessshorturl as short ON short.placeId = $placeId WHERE l.id = $placeId ";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();
			$src = 'images/shared/'.$placeId;
			$remove->delete_dir($src);
			$src = 'images/profile/'.$placeId;
			$remove->delete_dir($src);
		}else
			echo 0; 
		mysql_query("DROP TABLE IF EXISTS businessplace_$placeId");
		mysql_query("DROP TABLE IF EXISTS businessCustomer_$placeId");
		mysql_query("DROP TABLE IF EXISTS sharedlink_$placeId");	
	break;
	case 'setFeature':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$check = $_REQUEST['check'];
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'feature'") or die(mysql_error());
		if(mysql_num_rows($result)){
			mysql_query("UPDATE `businessplace_$placeId` SET feature=$check WHERE id = $id");
		}else{
			$result = mysql_query("ALTER TABLE `businessplace_$placeId` ADD `feature` TINYINT NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				mysql_query("UPDATE `businessplace_$placeId` SET feature=$check WHERE id = $id");
		}
	break;
	case 'setHideSelfie':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$check = $_REQUEST['check'];
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'hideimg'") or die(mysql_error());
		if(mysql_num_rows($result)){
			mysql_query("UPDATE `businessplace_$placeId` SET hideimg=$check WHERE id = $id");
		}else{
			$result = mysql_query("ALTER TABLE `businessplace_$placeId` ADD `hideimg` TINYINT NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				mysql_query("UPDATE `businessplace_$placeId` SET hideimg=$check WHERE id = $id");
		}
	break;	
	case 'profile':
		$placeId = $_REQUEST['placeId'];
		$txtname = mysql_real_escape_string($_REQUEST['txtorg']);$txtadd = mysql_real_escape_string($_REQUEST['txtadd']);$txtcity = mysql_real_escape_string($_REQUEST['txtcity']);$txtcountry = mysql_real_escape_string($_REQUEST['txtcountry']);$txtzip = mysql_real_escape_string($_REQUEST['txtzip']);$txtpho = mysql_real_escape_string($_REQUEST['txtpho']);$txtfb = mysql_real_escape_string($_REQUEST['txtfb']);$txtweb = mysql_real_escape_string($_REQUEST['txtweb']);$txtemail = mysql_real_escape_string($_REQUEST['txtproemail']);$txtlink = mysql_real_escape_string($_REQUEST['txtlink']);$txttwit = mysql_real_escape_string($_REQUEST['txttwit']);$txtbooknowlabel = mysql_real_escape_string($_REQUEST['txtbooknowlabel']);$txtbooknow = mysql_real_escape_string($_REQUEST['txtbooknow']);$lng = $_REQUEST['lng'];$lat = $_REQUEST['lat'];
		//mysql_query("UPDATE businessList SET businessName='$txtname', label='{$txtlabel}' WHERE id = $placeId");
		$sql = "UPDATE businessProfile SET businessName='$txtname', address='$txtadd', city='$txtcity', country='$txtcountry', zip='$txtzip', contactNo='$txtpho', facebookURL='$txtfb', websiteURL='$txtweb', booknowlabel='$txtbooknowlabel', booknow='$txtbooknow', email='$txtemail', latitude=$lat, longitude=$lng WHERE profilePlaceId = $placeId";
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
		$gid = $_REQUEST['groupId'];
		$timezone = $_REQUEST['timezone'];
		mysql_query("UPDATE businessUserGroup SET timezone='$timezone'  WHERE gId = '$gid'");
	break;	
	case 'updatemap':
		$placeId = $_REQUEST['placeId'];$lat = $_REQUEST['lat'];$lng = $_REQUEST['lng'];
		$sql = "UPDATE businessProfile SET longitude=$lng,latitude=$lat WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();			
		}else
			echo 0;
	break;
	case 'handheld':
		$placeId = $_REQUEST['placeId'];$val = $_REQUEST['val'];	
		$sql = "UPDATE businessCustom SET handheld=$val WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());;
	break;
	case 'eAlert': // update send feedback email alert
		$placeId = $_REQUEST['placeId'];
		$emails = json_encode(array('emails'=>explode(',',$_REQUEST['multi-email']),'is_alert'=>$_REQUEST['radioalert'],'indiRate'=>$_REQUEST['indiRate'],'alertType'=>$_REQUEST['aleftfor'],'average'=>$_REQUEST['average']));
		$sql = "UPDATE businessCustom SET email_alert='".$emails."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());
	break;
	case 'fblink': // update format facebook post link
		$txtFBPost = mysql_real_escape_string($_REQUEST['txtFBPost']);$postdesc = mysql_real_escape_string($_REQUEST['postdesc']);$placeId = $_REQUEST['placeId'];
		$sql = "UPDATE businessCustom SET fbpost='".json_encode(array('fbpost'=>$txtFBPost,'postdesc'=>$postdesc))."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());
	break;
	case 'savePhotobooth': // update format facebook post link
		$placeId = $_REQUEST['placeId'];
		$UploadDirectory    = 'images/shared/upload/';
		$input = file_get_contents('php://input');
		echo $file = $UploadDirectory .  rand()  . '.jpg';
       $result = file_put_contents($file, $input);
		//echo $success ? 1 : 0;
		//$sql = "UPDATE businessCustom SET fbpost='".mysql_real_escape_string($link)."' WHERE customPlaceId = $placeId";	
		//mysql_query($sql) or die(mysql_error());
	break;
	case 'print': // update format facebook post link
		$placeId = $_REQUEST['placeId'];
		$selfie = array2json(array('noselfie1'=>mysql_real_escape_string(encodequote($_REQUEST['noselfie1'])),'noselfie2'=>mysql_real_escape_string(encodequote($_REQUEST['noselfie2'])),'noselfie3'=>mysql_real_escape_string(encodequote($_REQUEST['noselfie3'])),'selfiex1'=>mysql_real_escape_string(encodequote($_REQUEST['selfiex1'])),'selfiex2'=>mysql_real_escape_string(encodequote($_REQUEST['selfiex2'])),'selfiex3'=>mysql_real_escape_string(encodequote($_REQUEST['selfiex3']))));
		$sql = "UPDATE businessCustom SET printvalue='".$selfie."' WHERE customPlaceId = $placeId";	
		mysql_query($sql) or die(mysql_error());

	break;	
	//txtname=&txtphone=&txtemail=&txtaddition=
	case 'poorRating': // poor rating message in feedback
	   //ALTER TABLE  `businessplace_1000` ADD  `poorrate` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL AFTER  `photo_url` ;
	    $questionDefault = array('How would you rate our staff based on how welcoming and friendly they were towards you?_Service Friendliness','Do you feel that you were provided service in a timely manner?_Service Timeliness','How would you rate the attentiveness of our service?_Service Attentiveness','How would you rate our overall service?_Overall Service','Was this experience worth the amount you paid?_Value for Money','Please rate our location._Location','Please rate our facilities._Facilities','How comfortable was your stay?_Comfort','How would you rate our property in terms of cleanliness?_Cleanliness','How would you rate the overall quality of your meal?_Quality of Meal','How would you rate the overall taste of your meal?_Taste of Meal','Do you feel that there were enough options for you to choose?_Variety','How likely are you to recommend us to your friends and loved ones?_Likelihood to Recommend','How likely are you to visit us again?_Likelihood to Visit Again','How valuable is our web service to you?_Value Proposition','For the value provided, how attractive is our pricing?_Price Attractiveness','How likely are you to recommend this website to your friends?_Recommended');
	    $placeId = $_REQUEST['placeId'];$lastId = $_REQUEST['lastId'];
		$poor = array2json(array('email'=>$_REQUEST['txtemail'],'name'=>$_REQUEST['txtname'],'contact'=>$_REQUEST['txtphone'],'additional'=>$_REQUEST['txtaddition']));
		$result = mysql_query("SHOW COLUMNS FROM `businessplace_$placeId` LIKE 'poorrate'") or die(mysql_error());
		if(mysql_num_rows($result)){
			$sql = "UPDATE businessplace_$placeId SET poorrate='".mysql_real_escape_string($poor)."' WHERE id = $lastId";
		}else{
			mysql_query("ALTER TABLE `businessplace_$placeId` ADD `poorrate` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL") or die(mysql_error());
			if(mysql_affected_rows())
				$sql = "UPDATE businessplace_$placeId SET poorrate='".mysql_real_escape_string($poor)."' WHERE id = $lastId";
		}			
		mysql_query($sql) or die(mysql_error());
		$custom = mysql_query("SELECT item2Rate,selectedItems FROM businessCustom WHERE customPlaceId = $placeId");
		$row = mysql_fetch_object($custom);
		$arrayItem2Rate = array();
		if($row->item2Rate != '')
			$arrayItem2Rate = json_decode($row->item2Rate);
		$arraySelectedItem = json_decode($row->selectedItems);
		$ratingTextTemp = array();
		if($arrayItem2Rate){
			if(is_object($arrayItem2Rate)){
				for($i=0;$i<count($arrayItem2Rate->rows);$i++){
					for($j=0;$j<count($arraySelectedItem->rows);$j++){		
						$name = explode('_',$arrayItem2Rate->rows[$i]->data);
						if($arraySelectedItem->rows[$j]->data == $name[1]){
						   $ratingTextTemp[] = $name[1];
						}
					}
				}				
			}else{
				for($i=0;$i<count($arrayItem2Rate);$i++){
					for($j=0;$j<count($arraySelectedItem);$j++){		
						$name = explode('_',$arrayItem2Rate[$i]);
						if($arraySelectedItem[$j] == $name[1]){
						   $ratingTextTemp[] = $name[1];
						}
					}
				}
				for($i=0;$i<count($questionDefault);$i++){
					for($j=0;$j<count($arraySelectedItem);$j++){
						$name = explode('_',$questionDefault[$i]);
						if($arraySelectedItem[$j] == $name[1]){
							array_push($ratingTextTemp,$name[1]);
						}
					}
				}
			}
			
		}else{
			for($i=0;$i<count($questionDefault);$i++){
				for($j=0;$j<count($arraySelectedItem);$j++){
					$name = explode('_',$questionDefault[$i]);
					if($arraySelectedItem[$j] == $name[1]){
						array_push($ratingTextTemp,$name[1]);
					}
				}
			}
		}
		$totalRate = count($ratingTextTemp); 
		if($totalRate == 1){
			$fields = "rated1, aveRate, comment";
		}else if($totalRate == 2){
			$fields = "rated1, rated2, aveRate, comment";
		}else if($totalRate == 3){
			$fields = "rated1, rated2, rated3, aveRate, comment";
		}else if($totalRate == 4){
			$fields = "rated1, rated2, rated3, rated4, aveRate, comment";
		}else if($totalRate == 5){
			$fields = "rated1, rated2, rated3, rated4, rated5, aveRate, comment";
		}else if($totalRate == 6){
			$fields = "rated1, rated2, rated3, rated4, rated5, rated6, aveRate, comment";
		}else if($totalRate == 7){
			$fields = "rated1, rated2, rated3, rated4, rated5, rated6, rated7, aveRate, comment";
		}
	
		$rateresult = mysql_query("SELECT $fields FROM businessplace_$placeId WHERE id = $lastId");
		$rate = mysql_fetch_array($rateresult);
		$j = 0;$comm= '';
		$body = "<p>Date: ". date('d-M-Y') . '<p>';
		$rating = "Ratings:<br/>";
		foreach($ratingTextTemp as $val)
			$rating = $rating. $val.': '.$rate[$j++] .'/5<br/>';
			$rating = $rating.'Average: '.$rate['aveRate'];
		
		if($rate['comment'] != '')
			$comm = '<p>Comment:<br/>'.$rate['comment'].'</p>';
		
		$info = '<p>Customer info:<br/>Name: '.$_REQUEST['txtname'].'<br/>Phone Number: '.$_REQUEST['txtphone'].'<br/>'.($_REQUEST['txtemail'] !='' ? 'Email: '.$_REQUEST['txtemail'] : '').'</p>'.($_REQUEST['txtaddition'] != '' ? '<p>Additional Info:<br/>'.$_REQUEST['txtaddition'] : '').'</p>';
		$body = $body.$rating.$comm.$info;
		$sql = "SELECT c.email_alert FROM businessCustom AS c
		WHERE c.customPlaceId =  $placeId
		LIMIT 1";
		$result = mysql_query($sql);
		$row = mysql_fetch_object($result);
		$email = json_decode($row->email_alert);
		$subject = "Tabluu - Poor Rating Alert!";
		foreach($email->emails as $val){
			$email = trim($val);
			sendEmail($email,$subject,$body);
		}
	break;	
	case 'onLoc':
		$placeId = $_REQUEST['key'];
		$sql = "UPDATE businessList SET subscribe=1 WHERE id = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();
		}else
			echo 0;
	break;
	case 'adduser':
		$groupID = $_REQUEST['groupID'];
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = $_REQUEST['email'];
		$id = $_REQUEST['id'];
		$permission = $_REQUEST['permission'];
		$pwd =  rand_string(6);
		//echo "INSERT INTO businessUsers SET userGroupId =$groupID,fname='$fname',lname='$lname',pwd='".md5($pwd)."',email='$email',permission=$permission,created='".date('Y-m-d h:i:s')."'";
		mysql_query("INSERT INTO businessUsers SET userGroupId =$groupID,fname='$fname',lname='$lname',pwd='".md5($pwd)."',email='$email',permission=$permission,created='".date('Y-m-d h:i:s')."'") or die(mysql_error());
		$result = mysql_query("SELECT fname,lname FROM businessUsers WHERE id=$id LIMIT 1");
		$row = mysql_fetch_object($result);	
		$subject = 'camrally.com - user invitation link';
		$body = 'Hi '.$fname .',
				<p>You have been invited by '.$row->fname.' '.$row->lname.' to join camrally.com as a user/administrator.</p>
				<p>Please go to: <a href="http://camrally.com">camrally.com</a><br/>
				Login using the following details:</p>
				<p>Username: '. $email .'<br/>Password: ' .$pwd. '</p>
				<p>You may change the password provided by updating the User Admin section.</p>
				<p>Thank you!<br/>
				Tabluu Support</p>
				';	
		 sendEmail($email,$subject,$body);
	break;	
	case 'offLoc':
		$placeId = $_REQUEST['key'];
		$sql = "UPDATE businessList SET subscribe=0 WHERE id = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}else
			echo 0;
	break;
	case 'updatepwd':
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = mysql_real_escape_string($_REQUEST['email']);
		$pwd = mysql_real_escape_string($_REQUEST['pwd']);
		$id = $_REQUEST['id'];
		$sql = "UPDATE businessUsers SET fname='$fname',lname='$lname',pwd='".$pwd."',email='$email' WHERE id = $id";	
		mysql_query($sql);
		echo (mysql_affected_rows() ? 1 : 0);
		//$sql = "UPDATE businessUserGroup SET fname='$fname',lname='$lname',pwd='".$pwd."',email='$email' WHERE id = $id";	
		//mysql_query($sql);
	break;
	case 'selfieonly':
		$addnewfield = mysql_query("SHOW COLUMNS FROM `businessCustom` LIKE 'isselfie'") or die(mysql_error());
		if(mysql_num_rows($addnewfield) < 1)
			mysql_query("ALTER TABLE `businessCustom`  ADD `isselfie` TINYINT NOT NULL DEFAULT '0'  AFTER `fbpost`");
		$placeId = $_REQUEST['placeId'];
		mysql_query("UPDATE businessCustom SET isselfie=1 WHERE customPlaceId = {$placeId}");	
	break;
	case 'webwidget':
		$arr = json_encode(array('top'=>$_REQUEST['top'],'bot'=>$_REQUEST['bot']));
		$placeId = $_REQUEST['placeId'];
		$sql = "UPDATE businessCustom SET webwidget='{$arr}' WHERE customPlaceId = {$placeId}";	
		mysql_query($sql);
	break;
	case 'signup':
		include_once('class/class.cookie.php');
		$fname = mysql_real_escape_string($_REQUEST['fname']);
		$lname = mysql_real_escape_string($_REQUEST['lname']);
		$email = mysql_real_escape_string($_REQUEST['email']);
		$pwd = mysql_real_escape_string($_REQUEST['pwd']);
		$date = date('Y-m-d H:i:s');$plan = $connect->liteID;
		$result = mysql_query("INSERT INTO businessUserGroup SET productId=". $plan .", email='$email',state='active',addLoc=0,created='$date',type=0,expiration=''") or die(mysql_error());
		$groupId = mysql_insert_id();
		echo json_encode(array('type'=>$plan,'groupId'=>$groupId));
		$sql = "INSERT INTO businessUsers SET userGroupId=$groupId,fname='$fname',lname='$lname',pwd='".$pwd."',email='$email'";
		mysql_query($sql) or die(mysql_error());
		$lastid = mysql_insert_id();
		$cookie = new cookie();
		$cookie->setCookie( $lastid );
				//$time = time();
				//$name =$fname.' '.$lname; //optional
				//$join_date = round(time()/60)*60;
				//mysql_query('INSERT INTO subscribers (userID, email, name, custom_fields, list, timestamp, join_date) VALUES (1, "'.$email.'", "'.$name.'", "", 2, '.$time.', '.$join_date.')');
	break;
	case 'wizardsetupdone':
		$placeid = $_REQUEST['placeId'];
		$sql = "UPDATE  `businessList` SET  `setup` =  1 WHERE  `id` = $placeid";
		mysql_query($sql) or die(mysql_error());
	break;
	case 'texthour':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$result = mysql_query("SELECT id FROM businessOpeningHours WHERE openingPlaceId = $placeId");
		if(mysql_num_rows($result))
			$sql = "UPDATE businessOpeningHours SET opening='".mysql_real_escape_string($val)."' WHERE openingPlaceId =". $placeId;	
		else
			$sql = "INSERT INTO businessOpeningHours SET openingPlaceId = $placeId, opening='".mysql_real_escape_string($val)."'";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'textdesc':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$result = mysql_query("SELECT id FROM businessDescription WHERE descPlaceId = $placeId");
		if(mysql_num_rows($result))	
			$sql = "UPDATE businessDescription SET description='".mysql_real_escape_string($val)."' WHERE descPlaceId =".$placeId;
        else
			$sql = "INSERT INTO businessDescription SET descPlaceId = $placeId,  description='".mysql_real_escape_string($val)."'";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;	
	case 'flip':
		$placeId = $_REQUEST['placeId'];
		$val = $_REQUEST['val'];
		$sql = "UPDATE businessProfile SET showmap=$val WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'nicename':
		$placeId = $_REQUEST['placeId'];
		//$val = $_REQUEST['nicename'];
		echo $val = checknicename();
		$sql = "UPDATE businessProfile SET nicename='$val' WHERE profilePlaceId = $placeId";	
		mysql_query($sql);
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}
	break;
	case 'setcredit':
		$gid = $_REQUEST['gid'];
		$credit = $_REQUEST['credit'];
		echo $val = json_encode(array('date'=>date('Y-m-d'),'credits'=>$credit));
		$sql = "UPDATE businessUserGroup SET credits='$val' WHERE gId = $gid";	
		mysql_query($sql);

	break;
	case 'sendEmail2Client':
		$placeId = $_REQUEST['placeId'];$cases = $_REQUEST['cases'];
		require_once 'class/class.phpmailer2.php';
		$mail = new PHPMailer;
		$sql = "SELECT p.email,p.businessName,p.nicename,g.email as gmail FROM businessList AS l
		LEFT JOIN businessProfile AS p ON p.profilePlaceId = l.id
		LEFT JOIN businessUserGroup AS g ON g.gId = l.userGroupId
		LEFT JOIN businessCustom AS c ON c.customPlaceId = l.id
		WHERE l.id =  $placeId
		LIMIT 1";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)){
			$rows = mysql_fetch_object($result);
			$email = $rows->email;
			if(trim($rows->email))
				$email = $rows->gmail;
			if($cases < 1){
				$name = trim($_REQUEST['name']); 
				//$subject = 'A Tabluu user,'.($name != '' ? ' '.$name.' ' : ' ').'posted a feedback / review of '.$rows->businessName.'!';
				$subject = 'You\'ve got feedback for '.$rows->businessName.'!';
				$body = '<p>Login to your Tabluu account and manage your feedback / reviews now!<br/><a href="http://camrally.com">http://camrally.com</a></p><p>Or check your Tabluu page for the latest updates:<br/><a href="http://camrally.com/'.$rows->nicename.'.html">http://camrally.com/'.$rows->nicename.'.html</a></p>'; 
			}else{
				$subject = 'You have a new follower for '.$rows->businessName.'!';
				$body = '<p>See what\'s changed at your Customer Advocacy (Tabluu) page:<br/><a href="http://camrally.com/'.$rows->nicename.'.html">http://camrally.com/'.$rows->nicename.'.html</a></p>
				<p>Or login to camrally.com to manage your reviews.</p>
				<p>Happy Tabluu-ing!</p>
				<p>Cheers,<br/>
				Tabluu Support</p>';
			}
			 sendEmail($email,$subject,$body);
		}
	break;
	case 'getImgData':
		$id = $_REQUEST['placeId'];
		$bresult = mysql_query("SELECT `businessName`, `address`, `city`, `country`, `zip`, `contactNo` FROM `businessProfile` WHERE `profilePlaceId` = $id");
		$row = mysql_fetch_array($bresult);
		echo json_encode($row);
	break;
	case 'savecampaign':
		 $userName = $_REQUEST['userName'];$userId = $_REQUEST['userId'];$photo_url =$_REQUEST['photo_url'];$id = $_REQUEST['placeId'];$date = date('Y-m-d H:i:s');$email = $_REQUEST['email'];$source = $_REQUEST['source'];$param = $_REQUEST['param'];$sharedId = explode("_",$_REQUEST['sharedId']);
		$table = 'sharedlink_'.$id;	
			
		$query = mysql_query('INSERT INTO businessplace_'.$id.' SET userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
		$last_Id = mysql_insert_id();
		mysql_query("UPDATE {$table} SET feedbackId = {$last_Id},fbId = 0,isshared=1 WHERE id = {$sharedId[1]}") or die(mysql_error());
	break;
	case 'ratesave':
		 $userName = $_REQUEST['userName'];$userId = $_REQUEST['userId'];$photo_url =$_REQUEST['photo_url'];$id = $_REQUEST['placeId'];$date = date('Y-m-d H:i:s');$email = $_REQUEST['email'];$source = $_REQUEST['source'];$param = $_REQUEST['param'];$data = $_REQUEST['data'];$sharedId = explode("_",$_REQUEST['sharedId']);
		$table = 'sharedlink_'.$id;	
			
		$query = mysql_query('INSERT INTO businessplace_'.$id.' SET userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",source="'.$source .'",date="'.$date.'",feedsource="'.$param.'"') or die(mysql_error());
		$last_Id = mysql_insert_id();
		$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET source=1,userId="'.$userId.'",name="'.$userName.'",email="'.$email.'"') or die(mysql_error());
		$lastId = mysql_insert_id();
		mysql_query("UPDATE {$table} SET feedbackId = {$last_Id},fbId = {$userId},isshared=1 WHERE id = {$sharedId[1]}");
		echo $last_Id.'_'.$lastId; 
	break;
	case 'photoshare':
		$rated1 = $_REQUEST['rated1'];$rated2 = $_REQUEST['rated2'];$rated3 = $_REQUEST['rated3'];$rated4 = $_REQUEST['rated4'];$rated5 = $_REQUEST['rated5'];$rated6 = $_REQUEST['rated6'];$rated7 = $_REQUEST['rated7'];$aveRated = $_REQUEST['aveRate'];$comment = $_REQUEST['comment']; $userName = $_REQUEST['userName'];$userId = $_REQUEST['userId'];$photo_url = $_REQUEST['photo_url'];$id = $_REQUEST['placeId'];$date = date('Y-m-d h:i:s');$email = $_REQUEST['email'];
		$data = $_REQUEST['data'];$source = $_REQUEST['source'];
		$query = mysql_query('INSERT INTO photoshare SET placeId = '.$id.',rated1='.$rated1.',rated2='.$rated2.',rated3='.$rated3.',rated4='.$rated4.',rated5='.$rated5.',rated6='.$rated6.',rated7='.$rated7.',aveRate='.$aveRated.',userName="'.$userName.'",userId="'.$userId.'",photo_url="'.$photo_url.'",comment = "'.mysql_real_escape_string($comment).'",source="'.$source.'",date="'.$date.'"') or die(mysql_error());
	break;	
	case 'follow':
		$id = $_REQUEST['placeId'];
	    switch($_REQUEST['case']){
			case 1:
				$email = mysql_real_escape_string($_REQUEST['email']);
				$query = mysql_query('INSERT INTO businessCustomer_'.$id.' SET follow=1,email="'.$email.'"') or die(mysql_error());
			break;
			case 2:
				$lastId = $_REQUEST['lastId'];
				mysql_query("UPDATE businessCustomer_$id SET follow=1 WHERE id = $lastId") or die(mysql_error());
			break;
		}
		
	break;	
	case 'sendEmail':
		$objId = array2json(explode(',',$_REQUEST['objId']));
		$subject = $_REQUEST['subject'];
		$body = $_REQUEST['body'];
		$gId = $_REQUEST['gid'];
		$query = mysql_query('INSERT INTO businessMail SET body = "'.mysql_real_escape_string($body).'", subject = "'.$subject.'", groupId='.$gId) or die(mysql_error());
		if(mysql_affected_rows()){
			$lastId = mysql_insert_id();
			$query = mysql_query('INSERT INTO email2process SET emailID = '.$lastId.', placesId = "'.$objId.'"') or die(mysql_error());
		}
		
	break;
	case 'userparam':
		$objId = array2json(explode(',',$_REQUEST['objId']));
		$userId = $_REQUEST['userId'];
		mysql_query("UPDATE businessUsers SET params='".$objId."' WHERE id = $userId");
		$groupID = $_REQUEST['groupID'];$list=array();$i=0;
		$sql = "SELECT u.id, u.userGroupId, u.fname, u.lname, u.permission, u.params, u.email FROM businessUsers AS u
		WHERE u.userGroupId =  $groupID ORDER BY permission ASC";
		$result = mysql_query($sql);
		while($row = mysql_fetch_object($result)){
			$list[$i]['fname'] = $row->fname;
			$list[$i]['id'] = $row->id;
			$list[$i]['lname'] = $row->lname;
			$list[$i]['permission'] = $row->permission;
			$list[$i]['param'] = $row->params;
			$list[$i++]['email'] = $row->email;
			
		}
		echo json_encode($list);		
	break;
	case 'detailscampaign':
			$placeId = $_REQUEST['placeId'];
			$tagline1 = mysql_real_escape_string($_REQUEST['txtcamp1']);$tagline2 = mysql_real_escape_string($_REQUEST['txtcamp2']);$namecampaign = mysql_real_escape_string($_REQUEST['namecampaign']);$txtbrand = mysql_real_escape_string($_REQUEST['txtbrand']);$category = mysql_real_escape_string($_REQUEST['select-category']);$txtbtnselfie = mysql_real_escape_string($_REQUEST['txtbtnselfie']);
			mysql_query("UPDATE campaigndetails SET brand= '{$txtbrand}',tag1= '{$tagline1}',tag2= '{$tagline2}',category= '{$category}',btntext= '{$txtbtnselfie}' WHERE posterId = {$placeId}") or die(mysql_error());
			mysql_query("UPDATE  `businessList` SET  `businessName` =  '{$namecampaign}' WHERE  `id` = {$placeId}");	
	break;	
	case 'redirectpage':
		$placeId = $_REQUEST['placeId'];$selected = $_REQUEST['selected'];
		mysql_query("UPDATE businessCustom SET redirect= {$selected} WHERE customPlaceId = {$placeId}") or die(mysql_error());
		if($_REQUEST['case'] == 0){
			$txtwebsite = mysql_real_escape_string($_REQUEST['txtwebsite']);	
			mysql_query("UPDATE businessProfile SET websiteURL='{$txtwebsite}' WHERE profilePlaceId = $placeId");	
		}
	break;	
	case 'setcustom':
		$placeId = $_REQUEST['placeId'];$case = $_REQUEST['case'];$sql='';
		if($case ==1)
			$sql = "UPDATE businessCustom SET logo= '' WHERE customPlaceId = $placeId";
		else if($case ==2)
			$sql = "UPDATE businessCustom SET backgroundImg= '' WHERE customPlaceId = $placeId";
		else if($case ==3){
		   $color = $_REQUEST['color'];
			$sql = "UPDATE businessCustom SET backgroundcolor= '#$color' WHERE customPlaceId = $placeId";
		}else if($case ==4){
		   $color = $_REQUEST['color'];
			$sql = "UPDATE businessCustom SET backgroundFont= '#$color' WHERE customPlaceId = $placeId";
		}else if($case ==5){
		   $txtvpoor = encodequote($_REQUEST['txtvpoor']);$txtpoor = encodequote($_REQUEST['txtpoor']);$txtfair = encodequote($_REQUEST['txtfair']);$txtgood = encodequote($_REQUEST['txtgood']);$txtexc = encodequote($_REQUEST['txtexc']);
		   $obj = array('vpoor' => $txtvpoor, 'poor' => $txtpoor, 'fair' => $txtfair, 'good' => $txtgood, 'excellent' => $txtexc);
			//echo json_encode($obj);
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET ratingText= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==6){
		   $obj =  array('btnshare' => array(encodequote($_REQUEST['txt-share'])),'share' => array(encodequote($_REQUEST['txtshare1']),encodequote($_REQUEST['txtshare2'])),'logout' => array(encodequote($_REQUEST['txt-logout'])),'follow' => array(encodequote($_REQUEST['follow-no']),encodequote($_REQUEST['follow-yes'])),'cambtnoption' => array(encodequote($_REQUEST['btncam1']),encodequote($_REQUEST['btncam2']),encodequote($_REQUEST['btncam3']),encodequote($_REQUEST['btncam4'])),'campdetails' => array(encodequote($_REQUEST['txt-camdetails'])));
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET button= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==7){
		   $obj = array('logoutT' => encodequote($_REQUEST['txtbox9']),'logoutB' => encodequote($_REQUEST['txtbox10']),'followT' => encodequote($_REQUEST['txtbox11']),'followB' => encodequote($_REQUEST['txtbox12']), 'share' => encodequote($_REQUEST['txtbox3']), 'shareB' => encodequote($_REQUEST['txtbox22']), 'sharedT' => encodequote($_REQUEST['txtbox26']), 'sharedB' => encodequote($_REQUEST['txtbox27']));
			$json = array2json($obj);
			$sql = "UPDATE businessCustom SET messageBox= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==8){
			$obj='';
			if($_REQUEST['check'] != ''){
				$obj = explode(',',$_REQUEST['check']);
				echo $json = array2json($obj);
			}
			$sql = "UPDATE businessCustom SET selectedItems= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==9){
			$obj='';$json='';
			if($_REQUEST['check']){
				$obj = explode(',',$_REQUEST['check']);
				echo $json = array2json($obj);
			}
			$sql = "UPDATE businessCustom SET item2Rate= '".$json."' WHERE customPlaceId = $placeId";
		}else if($case ==10){
			$obj = array('posted'=>$_REQUEST['posted'],'percent'=>$_REQUEST['percent']);
			echo $json = array2json($obj);
			$sql = "UPDATE businessCustom SET reviewPost= '".$json."' WHERE customPlaceId = $placeId";
		}	
		mysql_query($sql) or die(mysql_error());	
		if(mysql_affected_rows()){
			//echo mysql_affected_rows();		
		}//else
			//echo 0;			
	break;
	
	case 'delImg':
		$placeId = $_REQUEST['placeId'];$id = $_REQUEST['id'];$sql='';
		$sql = "UPDATE businessImages SET path= '',title='',description='' WHERE placeId = $placeId AND id = $id";
		mysql_query($sql) or die(mysql_error());
		if(mysql_affected_rows()){
			echo mysql_affected_rows();		
		}else
			echo 0;
	break;	
	case 'createTable':
		$id = $_REQUEST['placeId'];
		mysql_query("TRUNCATE TABLE businessplace_$id");
		mysql_query("TRUNCATE TABLE sharedlink_$id");
		mysql_query("TRUNCATE TABLE businessCustomer_$id");
		//feedbacktable($id);
	break;
	case 'updatetimezone':   //Joan Villamor Timezone
		$id = $_REQUEST['groupId'];
		$timezone = $_REQUEST['timezone'];
		mysql_query("UPDATE businessUserGroup SET timezone='$timezone'  WHERE gId = '$id'");
	break;	
}

$connect->db_disconnect();

function sendEmail($email,$subject,$body,$cc_email=''){
	require_once 'class/class.phpmailer2.php';
	include_once('class/class.main.php');
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
	if($cc_email != '')
		$mail->AddAddress($cc_email);
	$mail->AddAddress($email);
	//if($rows->permission > 0)
		//$mail->addBCC($rows->usermail);
	//$mail->AddAddress('robert.garlope@gmail.com');	
	$mail->Send();
	return;
}
function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
	$str = '';
	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}
	return $str;
}	

function encodequote($str){
	$str = str_replace('"','<double>',str_replace("'",'<quote>',$str));
	$str = str_replace(",",'<comma>',$str);
	return $str;
}
function htmldecode($str){
	$str = str_replace("|one","&amp;",$str);
	$str = str_replace("|two","&lt;",$str);
	$str = str_replace("|three","&gt;",$str);
	$str = str_replace("|four","&quot;",$str);
	return str_replace("|five","#",$str);
}
function greyscale($file){
	//$file = 'profile.jpg';   
	// This sets it to a .jpg, but you can change this to png or gif if that is what you are working with 
	//header('Content-type: image/jpeg');   
	// Get the dimensions 
	list($width, $height) = getimagesize($file);   
	// Define our source image 
	 $source = imagecreatefromjpeg($file);   
	 // Creating the Canvas  
	 $bwimage= imagecreate($width, $height);   
	 //Creates the 256 color palette 
	 for ($c=0;$c<256;$c++)  { $palette[$c] = imagecolorallocate($bwimage,$c,$c,$c); }  
	 //Creates yiq function 
	 function yiq($r,$g,$b)  { return (($r*0.299)+($g*0.587)+($b*0.114)); }
	//Reads the origonal colors pixel by pixel  
	for ($y=0;$y<$height;$y++)  { for ($x=0;$x<$width;$x++)  { $rgb = imagecolorat($source,$x,$y); $r = ($rgb >> 16) & 0xFF; $g = ($rgb >> 8) & 0xFF; $b = $rgb & 0xFF;  
	//This is where we actually use yiq to modify our rbg values, and then convert them to our grayscale palette 
	$gs = yiq($r,$g,$b); imagesetpixel($bwimage,$x,$y,$palette[$gs]); } }   
	// Outputs a jpg image, but you can change this to png or gif if that is what you are working with 
	//imagejpeg($bwimage); 
	imagejpeg($bwimage, $file);
	imagedestroy($source);
	return;
}
function checkshortULR(){
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();
	$con =  new fucn();
	$link = strtolower($con->rand_string( 6 ));
	$result = mysql_query("SELECT id,source FROM businessshorturl WHERE link = '{$link}'");//check if link is existed
	if(mysql_num_rows($result))
		checkshortULR();
	else
		return $link; 
	$connect->db_connect();	
}
function feedbacktable($id){
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();
	$sql = "CREATE TABLE IF NOT EXISTS `businessplace_$id` (
		`id` int(10) NOT NULL AUTO_INCREMENT,
		  `userName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
		  `userId` varchar(50) NOT NULL,
		  `source` varchar(5) NOT NULL,
		  `feedsource` varchar(2) NOT NULL,
		  `photo_url` varchar(200) NOT NULL,
		  `hideimg` tinyint(4) NOT NULL,
		  `feature` tinyint(4) NOT NULL,
		  `date` datetime NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;";
		$sql2 = "CREATE TABLE IF NOT EXISTS `businessCustomer_$id` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `userId` varchar(100) NOT NULL,
		  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
		  `email` varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
		  `source` tinyint(4) NOT NULL,
		  `follow` tinyint(4) NOT NULL,
		  PRIMARY KEY (`id`),
		  KEY `follow` (`follow`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
		$sql3 = " CREATE TABLE IF NOT EXISTS `sharedlink_$id` (
		`id` int(11) NOT NULL,
		  `feedbackId` int(11) NOT NULL,
		  `fbId` bigint(20) NOT NULL,
		  `link` varchar(50) NOT NULL,
		  `pathimg` varchar(200) NOT NULL,
		  `isshared` tinyint(4) NOT NULL DEFAULT '0',
		  `datecreated` datetime NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
		$sql4 = "ALTER TABLE `sharedlink_$id` ADD PRIMARY KEY (`id`), ADD KEY `feedbackId` (`feedbackId`,`link`), ADD KEY `fbId` (`fbId`);";
		$sql5 = "ALTER TABLE `sharedlink_$id` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT";
		mysql_query($sql) or die(mysql_error());
		mysql_query($sql2) or die(mysql_error());
		mysql_query($sql3) or die(mysql_error());
		mysql_query($sql4) or die(mysql_error());
		mysql_query($sql5) or die(mysql_error());
	$connect->db_connect();		
	return;
}
function checksharedURL($table,$id){
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();
	$con =  new fucn();
	$link = strtolower($con->rand_string( 7 )) .'-'. $id;
	$result = mysql_query("SELECT id FROM {$table} WHERE link = '{$link}'");//check if link is existed
	if(mysql_num_rows($result))
		checksharedURL();
	else
		return $link; 
	$connect->db_connect();	
}
function checknicename(){
	include_once('class/class.main.php');
	$connect = new db();
	$connect->db_connect();
	$con =  new fucn();
	$link = strtolower($con->rand_string( 7 ));
	$result = mysql_query("SELECT id FROM businessProfile WHERE nicename = '{$link}'");//check if link is existed
	if(mysql_num_rows($result))
		checknicename();
	else
		return $link; 
	$connect->db_connect();	
}
function array2json($arr) { 
   // if(function_exists('json_encode')) return json_encode($arr); //Lastest versions of PHP already has this functionality.
    $parts = array(); 
    $is_list = false; 

    //Find out if the given array is a numerical array 
    $keys = array_keys($arr); 
    $max_length = count($arr)-1; 
    if(($keys[0] == 0) and ($keys[$max_length] == $max_length)) {//See if the first key is 0 and last key is length - 1
        $is_list = true; 
        for($i=0; $i<count($keys); $i++) { //See if each key correspondes to its position 
            if($i != $keys[$i]) { //A key fails at position check. 
                $is_list = false; //It is an associative array. 
                break; 
            } 
        } 
    } 

    foreach($arr as $key=>$value) { 
        if(is_array($value)) { //Custom handling for arrays 
            if($is_list) $parts[] = array2json($value); /* :RECURSION: */ 
            else $parts[] = '"' . $key . '":' . array2json($value); /* :RECURSION: */ 
        } else { 
            $str = ''; 
            if(!$is_list) $str = '"' . $key . '":'; 

            //Custom handling for multiple data types 
            if(is_numeric($value)) $str .= $value; //Numbers 
            elseif($value === false) $str .= 'false'; //The booleans 
            elseif($value === true) $str .= 'true'; 
            else $str .= '"' . addslashes($value) . '"'; //All other things 
            // :TODO: Is there any more datatype we should be in the lookout for? (Object?) 

            $parts[] = $str; 
        } 
    } 
    $json = implode(',',$parts); 
     
    if($is_list) return '[' . $json . ']';//Return numerical JSON 
    return '{' . $json . '}';//Return associative JSON 
} 

?>
