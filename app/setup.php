<?php
$noPhoto = 'images/template/no-photo.gif';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Setup Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="setup" data-role="page"  data-dom-cache="false" data-prefetch="false" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" id="setup-logo" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconsetup" />
					</div>
				</div><!-- /header -->			
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Setup</div>			
							<ul class="setup-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Camrally Page Info<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Customizations<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Campaign Info<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Redirect Participants<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="right-header"></div>
							<section class="panel-profile hide">									
								<ul class="profile-left-menu1" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>										
							</section>
							<section class="panel-UIC hide">
								<ul class="right-menu" data-role="listview"><li ><a href="uic.html" data-prefetch="true">Background Image<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Messages<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="panel-question hide">
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
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="clear"></div>
							    <div class="clear" style="padding-top:0.2em"></div>
								<p class="font-17 fl">Description of campaign (up to 300 words)</p>
								 <div class="clear" style="padding-top:1.4em"></div>
								<div>
									<textarea name="bbcode_field" id="campaign-desc" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-desc">Update Description</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<form id="frmselfies" action="#" method="post" enctype="multipart/form-data" >
								<select name="select-category" id="select-category">
										<option value="">Select a Category</option>
										<option value="Social cause">Social cause</option>
										<option value="Fanbase building">Fanbase building</option>
										<option value="Fundraising">Fundraising</option>
										<option value="New product/service launch">New product/service launch</option>
										<option value="Marketing promotions">Marketing promotions</option>
										<option value="Contest">Contest</option>
										<option value="Event">Event</option>
										<option value="Others">Others</option>
								</select>
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl"><i>Campaign name:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="true" name="namecampaign" id="namecampaign" value="" placeholder="Text (max 40 chars)">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl"><i>Presented by brand:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="true" name="txtbrand" id="txtbrand" value="" placeholder="Text (max 40 chars)">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl"><i>Add your slogan:</i> </span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="true" name="txtcamp1" id="txtcamp1" value="" placeholder="Text for row 1 (max 40 chars)">
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="true" name="txtcamp2" id="txtcamp2" value="" placeholder="Text for row 2 (max 40 chars)">
								<div class="clear" style="padding-top:0.5em"></div>
								<span class="font-17 fl"><i>Your call to action message:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="true" name="txtbtnselfie" id="txtbtnselfie" value="Post Your Photo!" placeholder="Post Your Photo!">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl">Sample: </span>
								<div class="clear" style="padding-top:0.5em"></div>
								<div style="width:500px;">
									<img src="images/campaign-sample.jpg" style="width:100%;height:auto;" />
								</div>
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-tagline">Update</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="delCampaign">Delete All Campaign Data</button>
								</div>
								</form>
							</section>
							<section class="panel-redirect hide">
								<fieldset data-role="controlgroup" data-corners="false" id="optionredirect">
									<input type="radio" name="redirect" id="redirect-a" value="0">
									<label for="redirect-a">Your Camrally Page (default)</label>
									<input type="radio" name="redirect" id="redirect-b" value="1">
									<label for="redirect-b">Your desired landing page...</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="hide txtdesirepage">
									<input type="text" name="txtwebdesired" id="txtwebdesired" value="" placeholder="website url">
								</div>
								<div class="clear" style="padding-top:2em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-redirect">Update</button>
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