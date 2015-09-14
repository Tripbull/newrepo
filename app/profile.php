<?php
$noPhoto = 'images/template/no-photo.gif';
$time_zones = timezone_identifiers_list();
$tz = '<option value="none" selected="selected">Select Time Zone</option>';
foreach($time_zones as $zones){
	if($zones <> 'UTC')		
		$tz.= "<option value=".$zones.">".$zones."</option>";	
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Profile Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
	
</head>
<body>
	
		<div id="profile" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/Logo/logo-arrow.png" class="logo fl" width="143" height="auto" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconpro" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Camrally Page</div>			
							<ul class="profile-left-menu2" data-role="listview">
								<li ><a href="#">Profile<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="pro-section hide">
								<form id="frmpro" action="#" method="post" enctype="multipart/form-data" >
								<input type="text" data-clear-btn="false" name="txtorg" id="txtorg" value="" placeholder="name of individual or organisation">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtadd" id="txtadd" value="" placeholder="address">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtcity" id="txtcity" value="" placeholder="city">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtcountry" id="txtcountry" value="" placeholder="country">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtzip" id="txtzip" value="" placeholder="zip or postal code">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtproemail" id="txtproemail" value="" placeholder="email address">
								<label for="number-1"></label>
								<select name="profile-timezone" id="profile-timezone">
                                	<?=$tz?>
                                </select>
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtpho" id="txtpho" value="" placeholder="telephone (optional)">
                                <label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtfb" id="txtfb" value="" placeholder="facebook page url (optional)">
								<label for="number-1"></label>
								<input type="text" data-clear-btn="false" name="txtweb" id="txtweb" value="" placeholder="website url (optional)">
									<label for="number-1"></label>
									<input type="text" data-clear-btn="false" name="txtlink" id="txtlink" value="" placeholder="linkedIn url (optional)">
									<label for="number-1"></label>
									<input type="text" data-clear-btn="false" name="txttwit" id="txttwit" value="" placeholder="twitter url (optional)">
									<label for="number-1"></label>
									<input type="text" data-clear-btn="false" name="txtbooknowlabel" id="txtbooknowlabel" value="Post Your Photo or Selfie!" placeholder="custom button (optional)" style="background-color: #C7E6F5;">
									<label for="number-1" style="font-size:12px;">(custom button - you may leave this input box as is or change it to something else. e.g. Buy Now, Donate, Take a advocates!, etc.)</label>
									<input type="text" data-clear-btn="false" name="txtbooknow" id="txtbooknow" value="" placeholder="custom button url">
									<label for="number-1" style="font-size:12px;">(custom button url)</label>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-pro">Submit</button>
								</div>
								</form>
							</section>
							
							<section class="desc-section hide">
							   <div class="clear"></div>
							    <div class="clear" style="padding-top:0.2em"></div>
								<p class="font-17 fl">Description of your product or campaign (up to 300 words)</p>
								 <div class="clear" style="padding-top:1.4em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-desc" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-desc">Submit</button>
								</div>								
							</section>	
							<section class="open-section hide">
								<div class="clear"></div>
								<form id="frmlogocampaign" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadcampaign">Upload an Image</button>
									<input type="file" name="campaignlogo" style="visibility:hidden;height:0px" id="campaignlogo" value="">
									<input type="hidden" value="" name="placeIdCampaign" id="placeIdCampaign" />
								 </form>
								 <div class="thumb">
									<img src="<?php echo $noPhoto ?>" id="logothumb" height="190" style="width:100%" />
								 </div>
								 <div class="clear" style="padding-top:0.5em"></div>
								<span class="color-grey font-12 fl">
									<p>Max width 600px; Max height 600px</p>
									<p>Recommended logo sizes: Horizontal logo: 500px by 200px Vertical logo: 300px by 450px</p>
									<p>Tip 1: Uploaded logo image will be used for laptop resolution: 1366 x 768. Logo's size will be automatically reduced to fit multiple device resolution.</p>
									<p>Tip 2: Lock device's screen orientation to landscape for horizontal logo. Lock device's screen orientation to portrait for vertical logo</p>
								</span>
							</section>
							<section class="photo-section hide">
								 
								<span class="font-17 fl">Upload images for your Camrally page...</span>
								<div class="clear"></div>
								<form id="frmweb" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadweb">Upload Images</button>
									<div style="visibility:hidden;height:0px">
									<input type="file" name="fileweb" style="visibility:hidden;height:0px" id="fileweb" value="">
									</div>
									<input type="hidden" value="" name="placeidweb" id="placeidweb" />
									<input type="hidden" value="" name="typeweb" id="typeweb" />
									<input type="hidden" value="" name="imgtitle" id="imgtitle" />
									<input type="hidden" value="" name="imgdesc" id="imgdesc" />
								 </form>	
								 <div class="clear" style="padding-top:0.5em"></div>
								 <div id="container">
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb1" width="200" height="200" />
											</div>
											<div class="titledesc ishide1">
												<p>T: <span class="title1"></span></p><p>D: <span class="desc1"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb2" width="200" height="200" />
											</div>
											<div class="titledesc ishide2">
												<p>T: <span class="title2"></span></p><p>D: <span class="desc2"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb3" width="200" height="200" />
											</div>
											<div class="titledesc ishide3">
												<p>T: <span class="title3"></span></p><p>D: <span class="desc3"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb4" width="200" height="200" />
											</div>
											<div class="titledesc ishide4">
												<p>T: <span class="title4"></span></p><p>D: <span class="desc4"></span></p>
											</div>
										</div>
									</div>
								<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb5" width="200" height="200" />
											</div>
											<div class="titledesc ishide5">
												<p>T: <span class="title5"></span></p><p>D: <span class="desc5"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb6" width="200" height="200" />
											</div>
											<div class="titledesc ishide6">
												<p>T: <span class="title6"></span></p><p>D: <span class="desc6"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb7" width="200" height="200" />
											</div>
											<div class="titledesc ishide7">
												<p>T: <span class="title7"></span></p><p>D: <span class="desc7"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="webthumb8" width="200" height="200" />
											</div>
											<div class="titledesc ishide8">
												<p>T: <span class="title8"></span></p><p>D: <span class="desc8"></span></p>
											</div>
										</div>
									</div>
								</div>
								 <div class="clear" style="padding-top:1em"></div>
								 <span class="color-grey font-12 fl">Note: Max image size is 1000kb</span>		
								  <div class="clear" style="padding-top:1em"></div>
							</section>

							<section class="video-section hide">
								<span class="font-17 fl">Upload videos for your Camrally page...</span>
								<div class="clear"></div>
								<form id="frmvid" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadvid">Upload Videos</button>
									<div style="visibility:hidden;height:0px">
									<input type="file" name="filevid" style="visibility:hidden;height:0px" id="filevid" value="">
									</div>
									<input type="hidden" value="" name="placeidvid" id="placeidvid" />
									<input type="hidden" value="" name="typevid" id="typevid" />
									<input type="hidden" value="" name="imgtitlevid" id="imgtitlevid" />
									<input type="hidden" value="" name="imgurlvid" id="imgurlvid" />
								 </form>	
								 <div class="clear" style="padding-top:0.5em"></div>
								 <div id="containervid">
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb1" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle1"></span></p><p>U: <span class="vidurl1"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb2" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle2"></span></p><p>U: <span class="vidurl2"></span></p>
											</div>
										</div>
									</div>
										 
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb3" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle3"></span></p><p>U: <span class="vidurl3"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb4" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle4"></span></p><p>U: <span class="vidurl4"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb5" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle5"></span></p><p>U: <span class="vidurl5"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb6" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle6"></span></p><p>U: <span class="vidurl6"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb7" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle7"></span></p><p>U: <span class="vidurl7"></span></p>
											</div>
										</div>
									</div>
									<div class="masonryImage">
										<div style="padding-right:10px;padding-bottom:10px;">
											<div class="imgthumb">
												<img src="<?php echo $noPhoto ?>" id="vidthumb8" width="200" height="200" />
											</div>
											<div class="titledesc">
												<p>T: <span class="vidtitle8"></span></p><p>U: <span class="vidurl8"></span></p>
											</div>
										</div>
									</div>
								</div>
								 <div class="clear" style="padding-top:1em"></div>
							</section>

							<section class="pro-vanity hide">
								<div class="clear" style="padding-top:0.2em"></div>
								<p class="font-16 fl bgrey" style="width:97%;padding:10px">
									Please customise your Camrally Page link.
								</p>
								<div class="clear" style="padding:1.5em 10px 0 10px;">
								<p class="font-16 fl">Your default Camrally URL:&nbsp;</p>
								<p class="font-16 fl vanity-default-link" style="text-decoration:none;font-weight: normal;font-size: 16px;color:blue">        camrally.com/09z9wxb.html</p>
								<!--<div class="clear" style="padding-top:1em"></div>
								<p class="van-link-default font-16" style="font-weight: normal;color:#38c">http://camrally.com/</p> -->
								<div class="clear" style="padding-top:1.5em"></div>
							    <div class="tbl">
									<div class="row1">
										<div class="left1">
											<div class="font-16">Your custom Camrally URL: </div>
										</div>
										<div class="right1">							
											<div class="width-lite">
											<input type="text" data-clear-btn="false" name="vanity-str" id="vanity-str" value="" placeholder="campaignname"></div>
											<div style="position:relative;left:0;top:-29px;width:50px;color:#38c;padding-left:5px">camrally.com/</div>			
										</div>
									</div>
								</div>
								</div>
								<div class="clear" style="padding-top:1.5em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="vanity-update">Update</button>
								</div>
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="vanity-reset">Reset</button>
								</div>
							</section>
							<section class="map-section hide">	
								<div class="clear" style="padding-top:0.2em"></div>
								<span class="font-17 fl">Flick the switch Off to remove the map on your Tabluu page</span>
								<div class="clear"></div>
								<select name="flipmap" id="flipmap" data-role="flipswitch" data-corners="false">
									<option value="0">Off</option>
									<option value="1">On</option>
								</select>
								<div class="clear" style="padding-top:0.5em"></div>
								<span class="font-17 fl">Move the marker to your desired location on the map</span>
								<div class="clear" style="padding-top:1em"></div>
								<div id="map-canvas"></div>	
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-map">Update Marker's New Position</button>
								</div>
							</section>							
						</div>
					</div>	
						
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
		
</body>
</html>