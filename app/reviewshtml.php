<?php
	$fbname = '';
	$fbsrc =  $src = (file_exists($rowrate->photo_url) ? $path.$rowrate->photo_url : $path.$rowrate->photo_url);
	if($rowrate->userId){
		$fbname = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
	}	
	$social_link = '';
	if($rowrate->source == 'fb')
		$social_link = "http://www.facebook.com/";
	else if($rowrate->source == 'tw')
		$social_link = "https://www.twitter.com/";
//if($rowrate->hideimg > 0 && $rowrate->hideimg != null)
	//$fbsrc =  $path."images/profileDefault.png";

	$getpos = strpos($fbsrc, 'images');

	if($getpos === false)
	{
		$fbsrc = 'https://i.ytimg.com/vi/'.$rowrate->photo_url.'/0.jpg';
	}
?>		
<div class="sysPinItemContainer pin">
	<?php
		if($rowrate->link != '' && $rowrate->isshared == 1){
	?>		
		<p class="description sysPinDescr fblink"><a href="<?php echo $social_link . $rowrate->userId ?>" target="_blank"><?php echo $fbname; ?></a></p>
	<?php
	}else{?>
		<p class="description sysPinDescr fblink"></p>
	<?php
    }?>	
	<div style="text-align:center;">
		<?php
		if($rowrate->link != '')
			echo '<a href="user/'.$rowrate->link.'"><img class="pinImage" src="'.$fbsrc.'" alt="' . $image_alt . ' selfie photo"/></a>';
		else
			echo '<img class="pinImage" src="'.$fbsrc.'" alt="' . $image_alt . ' selfie photo"/>';
		?>
	</div>
		<div style="padding:5px;">
		<p class="RateCount">
		<?php 
		$datetoconvert = $rowrate->date;
		$user_tz = (($timezone == 'none' || $timezone == '') ? 'Asia/Singapore' : $timezone);//'America/Chicago';
		$server_tz = 'UTC';
		$date = new DateTime($datetoconvert, new DateTimeZone($server_tz) );
		$date->setTimeZone(new DateTimeZone($user_tz));						
		echo $date->format('d M Y, h:ia') ?>
		</p>
		</div>
</div>