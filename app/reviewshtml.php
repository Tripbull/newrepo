<?php
	$fbname = '';
	//if($rowrate->photo_url != '' && strstr($rowrate->photo_url,"shared")){
		$fbsrc =  $src = (file_exists($rowrate->photo_url) ? $path.$rowrate->photo_url : $path.$rowrate->photo_url);
		if($rowrate->userId){
			$fbname = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
		}	
	/*
	}else if($rowrate->userId){
		$fbsrc =  "http://graph.facebook.com/$rowrate->userId/picture?type=large";
		$fbname = mb_convert_case($rowrate->userName,MB_CASE_TITLE, "UTF-8");
	}else
		$fbsrc =  $path."images/profileDefault.png";
   */
if($rowrate->hideimg > 0 && $rowrate->hideimg != null)
	$fbsrc =  $path."images/profileDefault.png";
?>		
<div class="sysPinItemContainer pin">
	<?php
		if($rowrate->source == 'fb' && $rowrate->link != '' && $rowrate->isshared == 1){
	?>		
		<p class="description sysPinDescr fblink"><a href="http://www.facebook.com/<?php echo $rowrate->userId ?>" target="_blank"><?php echo $fbname; ?></a></p>
	<?php
    }else{?>
		<p class="description sysPinDescr fblink"></p>
	<?php
    }?>	
	<div style="text-align:center;">
		<?php
		if($rowrate->source == 'fb' && $rowrate->link != '' && $rowrate->isshared == 1)
			echo '<a href="'.$path.'user/'.$rowrate->link.'"><img class="pinImage" src="'.$fbsrc.'" alt="Selfie"/></a>';
		else
			echo '<img class="pinImage" src="'.$fbsrc.'" alt="Selfie"/>';
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