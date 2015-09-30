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
					<img src="images/Logo/logo-arrow.png" id="setup-logo" class="logo fl" width="143" height="auto" />
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
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Camrally Page<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Campaign Details<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Customizations<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Redirect Advocates After Posting<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content fr">
							<div class="right-header"></div>
							<section class="panel-profile hide">									
								<ul class="profile-left-menu1" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Description<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Photos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Map Display<span class="listview-arrow-default"></span></a></li></ul>										
							</section>
							<section class="panel-UIC hide">
								<ul class="right-menu" data-role="listview"><li ><a href="uic.html" data-prefetch="true">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" >Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="uic.html" data-prefetch="true">Text in Messages<span class="listview-arrow-default"></span></a></li></ul>
							</section>
							<section class="panel-question hide">
								<p class="font-17 bgrey" style="padding:10px">Please upload a campaign poster or video...</p>
								 <div class="clear" style="padding-top:1em"></div>
								<form id="frmbackground" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadbackground">Upload an Image or Video</button>
									<input type="file" name="filebackground" style="visibility:hidden;height:0px" id="filebackground" value="">
									<input type="hidden" value="" name="placeIdbackground" id="placeIdbackground" />
								 </form>
								 <div class="thumb">
									<img src="<?php echo $noPhoto ?>" id="backgroundthumb" height="190" style="width:100%" />
								 </div>
								 <div class="clear" style="padding-top:0.5em"></div>
								<span class="color-grey font-12 fl">
									<p>Recommended width and height: 650 x 450</p>
								</span>	
								<div class="clear" style="padding-top:1.5em"></div>
								<hr>
							    <div class="clear" style="padding-top:1em"></div>
								<p class="font-17 bgrey" style="padding:10px">Tell us about your campaign. Add "call to action" messages &amp; links here!</p>
								 <div class="clear" style="padding-top:1.4em"></div>
								<div id="focushere">
									<textarea name="bbcode_field" id="campaign-desc" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="clear" style="padding-top:0.8em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-desc">Update Description Section</button>
								</div>
								<div class="clear" style="padding-top:1em"></div>
								<hr>
								<div class="clear" style="padding-top:1em"></div>
								<form id="frmselfies" action="#" method="post" enctype="multipart/form-data" >
								<p class="font-17 bgrey" style="padding:10px">Your campaign message on all posted images:</p>
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl darkgrey"><i>Campaign name:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="namecampaign" id="namecampaign" value="" placeholder="Text (max 40 chars)">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl darkgrey"><i>Presented by:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="txtbrand" id="txtbrand" value="" placeholder="Text (max 40 chars)">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl darkgrey"><i>Add your slogan:</i> </span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="txtcamp1" id="txtcamp1" value="" placeholder="Text for row 1 (max 40 chars)">
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="txtcamp2" id="txtcamp2" value="" placeholder="Text for row 2 (max 40 chars)">
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl darkgrey"><i>Your call to action button:</i></span>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="txtbtnselfie" id="txtbtnselfie" value="Post a response!" placeholder="Post a response!">
								<div class="clear" style="padding-top:0.5em"></div>
								<select name="select-category" id="select-category">
										<option value="">Select a Category</option>
										<option value="Social cause">Online mass rally</option>
										<option value="Social cause">Social cause</option>
										<option value="Fanbase building">Fanbase building</option>
										<option value="Fundraising">Fundraising</option>
										<option value="New product/service launch">New product/service launch</option>
										<option value="Marketing promotions">Marketing promotion</option>
										<option value="Contest">Contest</option>
										<option value="Event">Event</option>
										<option value="Others">Others</option>
								</select>
								<div class="clear" style="padding-top:1em"></div>
								<span class="font-17 fl">Sample: </span>
								<div class="clear" style="padding-top:0.5em"></div>
								<div style="max-width:500px;">
									<img src="images/selfiemovement.jpg" style="width:100%;height:auto;" />
								</div>
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="submit-tagline">Update Campaign Message</button>
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
								<div class="clear"></div>
								<div class="hide txtdesirepage">
									<div class="clear" style="padding-top:0.5em"></div>
									<input type="text" name="txtwebdesired" id="txtwebdesired" value="http://" placeholder="website url">
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
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