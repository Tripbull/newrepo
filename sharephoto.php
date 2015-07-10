<?php
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$limit = 20;
$page = (int) $_REQUEST['p'];
if ($page < 1) $page = 1;
 $offset = (($page-1) * $limit);

//echo "SELECT SQL_CALC_FOUND_ROWS p.rated1, p.rated2, p.rated3, p.rated4, p.rated5, p.rated6, p.rated7, p.aveRate,p.photo_url,p.userName,c.item2Rate,c.selectedItems, pr.businessName, pr.address, pr.city, pr.country, pr.zip FROM photoshare AS p LEFT JOIN businessCustom AS c ON c.customPlaceId = p.placeId LEFT JOIN businessProfile as pr ON pr.profilePlaceId=p.placeId ORDER BY p.id DESC LIMIT $offset,$limit";
$result = mysql_query("SELECT SQL_CALC_FOUND_ROWS p.rated1, p.rated2, p.rated3, p.rated4, p.rated5, p.rated6, p.rated7, p.aveRate,p.photo_url,p.userName,c.item2Rate,c.selectedItems, pr.businessName, pr.address, pr.city, pr.country, pr.zip,p.comment,p.userId FROM photoshare AS p LEFT JOIN businessCustom AS c ON c.customPlaceId = p.placeId LEFT JOIN businessProfile as pr ON pr.profilePlaceId=p.placeId ORDER BY p.id DESC LIMIT $offset,$limit");
$numberOfRows = mysql_result(mysql_query("SELECT FOUND_ROWS()"),0,0);
$totalPages = ceil($numberOfRows / $limit);
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="robots" content="noindex, nofollow"/>
	<title>Photos share on facebook</title>
    <link rel="stylesheet" href="css/photo.css"/>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/sharephoto.js"></script>
</head>
<body class="home">
<?php require_once('browser_detection.php'); ?>
   <?php require_once('header.html'); ?>	
	<section id="photo" >
	<?php
		while($row = mysql_fetch_object($result)){
		
		$arrayItem2Rate= json_decode($row->item2Rate);
		$arraySelectedItem = json_decode($row->selectedItems);
		$ratingTextTemp = array();
		if($arrayItem2Rate){
			if(count($arrayItem2Rate->rows)){
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
			}
		}		
	?>
		<div class="frame">
			<div class="framecontent">
				<img src="<?php echo $row->photo_url ?>" class="photos"/>
				<div class="info">
					<p style="padding:5px"><a href="http://www.facebook.com/<?php echo $row->userId ?>" target="_blank" ><?php echo $row->userName ?></a></p>
					<?php
						if($row->comment)
							echo '<p style="padding:5px">'.$row->comment.'</p>';
					?>
					<div class="wrap-rate">
						<?php
						$aveTotal = $row->aveRate;
						$ave = explode(".",$aveTotal);
						$style='';
						if($aveTotal >= 1 && $aveTotal < 2){
							if(count($ave) > 1){
								$dec = "0.".$ave[1];					
								$width = 35 + ($dec * 33); 
								$style = 'width:'.$width.'px;';	
							}else
								$style = "width:36px;";	
						}
						if($aveTotal >= 2 && $aveTotal < 3){
							if(count($ave) > 1){
								$dec = "0.".$ave[1];					
								$width = 70 + ($dec * 33); 
								$style = 'width:'.$width.'px;';	
							}else
								$style = "width:70px;";	
						}
						if($aveTotal >= 3 && $aveTotal < 4){
							if(count($ave) > 1){
								$dec = "0.".$ave[1];					
								$width = 103 + ($dec * 33); 
								$style = 'width:'.$width.'px;';	
							}else
								$style = "width:100px;";	
						}
						if($aveTotal >= 4 && $aveTotal < 5){
							if(count($ave) > 1){
								$dec = "0.".$ave[1];					
								$width = 137 + ($dec * 33); 
								$style = 'width:'.$width.'px;';	
							}else
								$style = "width:137px;";	
						}
						if($aveTotal >= 5)
							$style = "width:170px;";
							echo '<span class="stargrey"><span class="staryellow" style="'.$style.'"></span></span>';
						?>
					</div> 				
			<div class="ratings">
			<?php
			//print_r($ratingTextTemp);
				if(count($ratingTextTemp) == 1){
					$rating1 = $row->rated1;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b></span>";			
				}else if(count($ratingTextTemp) == 2){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b></span>";				
				}else if(count($ratingTextTemp) == 3){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;
					$rating3 = $row->rated3;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b></span>";		
				}else if(count($ratingTextTemp) == 4){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;
					$rating3 = $row->rated3;
					$rating4 = $row->rated4;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b></span>";						
				}else if(count($ratingTextTemp) == 5){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;
					$rating3 = $row->rated3;
					$rating4 = $row->rated4;
					$rating5 = $row->rated5;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b></span>";					
				}else if(count($ratingTextTemp) == 6){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;
					$rating3 = $row->rated3;
					$rating4 = $row->rated4;
					$rating5 = $row->rated5;
					$rating6 = $row->rated6;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b>,</span>";
					echo "<span>$ratingTextTemp[5]: <b>$rating6/5</b></span>";		
				}else if(count($ratingTextTemp) == 7){
					$rating1 = $row->rated1;
					$rating2 = $row->rated2;
					$rating3 = $row->rated3;
					$rating4 = $row->rated4;
					$rating5 = $row->rated5;
					$rating6 = $row->rated6;
					$rating7 = $row->rated7;				
					echo "<span>$ratingTextTemp[0]: <b>$rating1/5</b>,</span>";
					echo "<span>$ratingTextTemp[1]: <b>$rating2/5</b>,</span>";
					echo "<span>$ratingTextTemp[2]: <b>$rating3/5</b>,</span>";
					echo "<span>$ratingTextTemp[3]: <b>$rating4/5</b>,</span>";	
					echo "<span>$ratingTextTemp[4]: <b>$rating5/5</b>,</span>";
					echo "<span>$ratingTextTemp[5]: <b>$rating6/5</b>,</span>";	
					echo "<span>$ratingTextTemp[6]: <b>$rating7/5</b></span>";
				}
			?>
			</div>	
				<div class="clear"></div>
				   <?php
					$address = $row->businessName .' '.$row->address .', ' . $row->city .', '. $row->country;
				   ?>
					<p style="padding:5px"><?php echo $address ?></p>
				</div>
			</div>	
		</div>
		<?php
		}
		if($totalPages > 1){
		?>	
		<div class="control-but-container">
			<form id="frmshare" method="post" action="sharephoto.php">
			<?php
			if($page == 1){
				echo "<span id=\"next\" class=\"full next-submit\">Next Post >></span>";
			}else{
				if($totalPages != $page){
					echo "<span id=\"prv\" class=\"half prv-submit\"><< Prev Post</span>";
					echo "<span id=\"next\" class=\"half next-submit\">Next Post >></span>";
				}else if($totalPages == $page){
					echo "<span id=\"prv\" class=\"full prv-submit\"><< Prev Post</span>";
				}	
			}
			?>
			<div style="clear:both;"></div>
			<input type="hidden" value="<?php echo $totalPages ?>" id="totalPages" name="totalPages" />
			<input type="hidden" value="<?php echo $page ?>" id="p" name="p" />
			</form>
		</div>	
<?php
	}
?>		
	</section>
	<div class="clear"><div>
     <?php require_once('footer.html'); ?> 
</body>
</html>
<?php
$connect->db_disconnect();
?>