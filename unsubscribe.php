<?php

include_once('class/class.main.php');
if(isset($_REQUEST['id']) || isset($_REQUEST['confirm'])){
	$db = new db();
	$db->db_connect();

	//$sql = "SELECT DISTINCT id,email FROM businessplace_$placeId WHERE id = $pId";
	if(isset($_REQUEST['id'])){
		$decode = base64_decode( $_REQUEST['id'] );
		$id = explode('|',$decode);
		$placeId = $id[0];
		$pId = $id[1];	
		$sql = " SELECT businessName,address,city,country,contactNo
				FROM businessProfile WHERE profilePlaceId = $placeId";	
		$result = mysql_query($sql);
		if(mysql_num_rows($result))
			$row = mysql_fetch_object($result);
		else
			die('<h2 style="text-align:center;">Invalid Request</h2>');
	}
	if(isset($_REQUEST['confirm'])){
		$decode = base64_decode( $_REQUEST['confirm'] );
		$id = explode('|',$decode);
		$placeId = $id[0];
		$pId = $id[1];	
		$sql = " UPDATE businessCustomer_$placeId
			SET follow=0 WHERE id = $pId";	
		$result = mysql_query($sql);
	}

	$db->db_disconnect();

}
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="robots" content="noindex, nofollow"/>
	<title>Tabluu Unsubscribe Email</title>
    <link href="css/bootstrap.css" rel="stylesheet" media="all">
<link href="css/style.css" rel="stylesheet" media="all">
</head>
<body>
<?php require_once('browser_detection.php'); ?>
   <?php require_once('header.html'); ?>
    <section class="unsubscribe" style="height:450px;">
        <div class="text-center container">
		    <div class="homeTitle"> 
				<div class="clear"></div>
				<?php
				if(isset($_REQUEST['id'])){
				?>
					<h2>Unfollow Merchant <?php echo $row->businessName ?>?</h2>
					<div style="clear:both;height:100px;"></div>
					<div style="width:400px;margin:0 auto">
					<table>
					<tr>
					<td  style="width:200px;padding:20px"><a href="/" class="color-button">cancel</a></td>
					<td style="width:200px;padding:20px"><a href="unsubscribe.php?confirm=<?php echo base64_encode($decode);?>" class="color-button">yes</a></td>
					</tr>
					</table>
					</div>
				<?php
				}else{
				?>
					<h2>Thank you</h2>
				<?php
			    }
				?>
			</div>
        </div>
    </section>
     <?php //require_once('footer.html'); ?> 
</body>
</html>