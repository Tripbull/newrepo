<?php
$noPhoto = 'images/template/no-photo.gif';
?>
<!DOCTYPE html>
<html>
<head>
	<title>User Interface for Customer Panel</title>
	<meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>

</head>
<body>
	
		<div id="uic" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconuic" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Customize the Response Page</div>			
							<ul class="uic-left-menu" data-role="listview">
								<li ><a href="#">Logo<span class="listview-arrow-default"></span></a></li><li ><a href="#" >Background Image<span class="listview-arrow-default"></span></a></li><li ><a href="#">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="#" >Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text Below Stars<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Message<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#" data-prefetch="true" id="seefeedback2">See the Feedback / Selfie Page<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="uic-section-logo hide">
								<div class="clear"></div>
								<form id="frmlogo" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadlogo">Upload an Image</button>
									<input type="file" name="filelogo" style="visibility:hidden;height:0px" id="filelogo" value="">
									<input type="hidden" value="" name="placeIdLogo" id="placeIdLogo" />
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
							<section class="uic-section-img hide">
								<div class="clear"></div>
								<form id="frmbackground" action="setPhoto.php" method="post" enctype="multipart/form-data" >
									<button class="ui-btn" id="uploadbackground">Upload an Image</button>
									<input type="file" name="filebackground" style="visibility:hidden;height:0px" id="filebackground" value="">
									<input type="hidden" value="" name="placeIdbackground" id="placeIdbackground" />
								 </form>
								 <div class="thumb">
									<img src="<?php echo $noPhoto ?>" id="backgroundthumb" height="190" style="width:100%" />
								 </div>
								 <div class="clear" style="padding-top:0.5em"></div>
								<span class="color-grey font-12 fl">
									<p>For best results, upload an image based on your device's…</p>
									<p>1. Display resolution</p>
									<p>2. Screen orientation.</p>
									<p>For example, if you are using Ipad mini locked on landscape orientation, you should upload an image 1024px by 768px.</p>
								</span>	
							</section>	
							<section class="uic-section-bg hide">
								<p class="font-17 fl">Set a background color...</p>
								<div class="clear" style="padding-top:1em"></div>
								<div id="pickerbackground"></div>
							</section>
							<section class="uic-section-fc hide">
								<p class="font-17 fl">Set a font color...</p>
								<div class="clear" style="padding-top:1em"></div>
								<div id="pickerfont"></div>								
							</section>	
							<section class="uic-section-tbs hide">
								<form id="frmUIC1" action="#" method="post" enctype="multipart/form-data" >
									<input type="text" data-clear-btn="true" name="txtvpoor" id="txtvpoor" value="Very poor" placeholder="Very poor">
									<input type="text" data-clear-btn="true" name="txtpoor" id="txtpoor" value="Poor" placeholder="Poor">
									<input type="text" data-clear-btn="true" name="txtfair" id="txtfair" value="Average" placeholder="Average">
									<input type="text" data-clear-btn="true" name="txtgood" id="txtgood" value="Good" placeholder="Good">
									<input type="text" data-clear-btn="true" name="txtexc" id="txtexc" value="Excellent" placeholder="Excellent">
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-tbs">Submit</button>
									</div>
								</form>
							</section>
							<section class="uic-section-tb hide">
								<form id="frmUIC2" action="#" method="post" enctype="multipart/form-data" >
									<div class="clear btncampaign" style="padding-top:1em;">								
											<input type="text" name="btncampaign" id="btncampaign" value="Your Selfie Now!" placeholder="Your Selfie Now!">
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="btnTakeSelfie">Take a selfie!</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="btnTakeSelfie" id="btnTakeSelfie" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p>&lt;Camera Buttons&gt;</p>
									<div class="clear cambtnoption" style="padding-top:1em;width:31em;">
										<div class="fl w60">
											<input type="text" name="btncam1" id="btncam1" value="cancel" placeholder="cancel">
										</div>
										<div style="padding-left:1em" class="fl w60">
											<input type="text" name="btncam2" id="btncam2" value="snap" placeholder="snap">
										</div>
										<div style="padding-left:1em" class="fl w60">
											<input type="text" name="btncam3" id="btncam3" value="discard" placeholder="discard">
										</div>
										<div class="fr w60">
											<input type="text" name="btncam4" id="btncam4" value="use" placeholder="use">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="btnfeedbackSelfie">Take a photo?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="btnfeedbackSelfie" id="btnfeedbackSelfie" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="btnfeedbackSelfie2" id="btnfeedbackSelfie2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="btncapture">Your photo is captured</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="btncapture" id="btncapture" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="share">Share this page?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtshare1" id="txtshare1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtshare2" id="txtshare2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="log-out">You'll be logged out of Facebook after sharing.</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txt-logout" id="txt-logout" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="logged">You're logged in to &lt;social media&gt;</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txt-share" id="txt-share" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="leave">Do you wish to leave your contact details so that we may get in touch with you?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtleave1" id="txtleave1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtleave2" id="txtleave2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="allow">Press &quot;yes&quot; to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you.</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtallow1" id="txtallow1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtallow2" id="txtallow2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="recommend">Please comment...</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtrecommend1" id="txtrecommend1" value="proceed" placeholder="proceed">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="follow-loc">Be a fan of <brand>?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="follow-no" id="follow-no" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="follow-yes" id="follow-yes" value="yes" placeholder="yes">
										</div>
									</div>		
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="take">Take a new photo?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtphoto1" id="txtphoto1" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="txtphoto2" id="txtphoto2" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="option">Choose an option…</p>
									<div class="clear" style="padding-top:1em;width:23em;">
										<div class="fl w60">
											<input type="text" name="txtoption1" id="txtoption1" value="cancel" placeholder="cancel">
										</div>
										<div style="padding-left:1em" class="fl w60">
											<input type="text" name="txtoption2" id="txtoption2" value="login" placeholder="login">
										</div>
										<div class="fr w60">
											<input type="text" name="txtoption3" id="txtoption3" value="reset" placeholder="reset">
										</div>
									</div>								
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-tb">Submit</button>
									</div>
								</form>
							</section>	
							<section class="uic-section-box hide">
								<form id="frmUIC3" action="#" method="post" enctype="multipart/form-data" >
									<input type="text" data-clear-btn="true" name="txtbox19" id="txtbox19" value="Take a selfie!" placeholder="Take a selfie!">
									<input type="text" data-clear-btn="true" name="txtbox18" id="txtbox18" value="If you are shy... at least take a photo of something interesting around you! This won't work unless you take a photo!" placeholder="This won't work unless you snap a photo. You can either do your awesome selfie pose or take a photo of interesting things around you.">
									<input type="text" data-clear-btn="true" name="txtbox20" id="txtbox20" value="Take a photo?" placeholder="Take a photo?">
									<input type="text" data-clear-btn="true" name="txtbox21" id="txtbox21" value="Ask your customers to say &quot;yeahhh!&quot; for the camera!" placeholder="Ask your customers to say &quot;yeahhh!&quot; for the camera!">
									<input type="text" data-clear-btn="true" name="txtbox24" id="txtbox24" value="Your photo is captured" placeholder="Your photo is captured">
									<input type="text" data-clear-btn="true" name="txtbox25" id="txtbox25" value="This photo will be used to create your review page of the merchant later." placeholder="This photo will be used to create your review page of the merchant later.">
									<input type="text" data-clear-btn="true" name="txtbox1" id="txtbox1" value="Please comment..." placeholder="Please comment...">
									<input type="text" data-clear-btn="true" name="txtbox23" id="txtbox23" value="What do you like the most? Is there any area that needs improvement?" placeholder="What do you like the most? Is there any area that needs improvement?">
									<input type="text" data-clear-btn="true" name="txtbox2" id="txtbox2" value="Your average rating:" placeholder="Your average rating:">
									<input type="text" data-clear-btn="true" name="txtbox9" id="txtbox9" value="Auto logout" placeholder="Auto logout">
									<input type="text" data-clear-btn="true" name="txtbox10" id="txtbox10" value="You'll be logged out of Facebook after sharing." placeholder="You'll be logged out of Facebook after sharing.">
									<input type="text" data-clear-btn="true" name="txtbox26" id="txtbox26" value="You're logged in to" placeholder="You're logged in to">
									<input type="text" data-clear-btn="true" name="txtbox27" id="txtbox27" value="Click &quot;okay&quot; to start sharing!" placeholder="Click &quot;okay&quot; to start sharing!">
									<input type="text" data-clear-btn="true" name="txtbox3" id="txtbox3" value="Share this page?" placeholder="Share this page?">
									<input type="text" data-clear-btn="true" name="txtbox22" id="txtbox22" value="Please use the &quot;share&quot; button to recommend <brand>. By sharing you agree with Tabluu's <privacy_policy_link>." placeholder="Please use the &quot;share&quot; button to recommend <brand>. By sharing you agree with Tabluu's <privacy_policy_link>.">
									<input type="text" data-clear-btn="true" name="txtbox11" id="txtbox11" value="Be a fan of <brand>?" placeholder="Be a fan of <brand>?">
									<input type="text" data-clear-btn="true" name="txtbox12" id="txtbox12" value="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you." placeholder="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you.">
									<input type="text" data-clear-btn="true" name="txtbox13" id="txtbox13" value="We're sorry for your poor experience!" placeholder="We're sorry for your poor experience!">
									<input type="text" data-clear-btn="true" name="txtbox14" id="txtbox14" value="Do you wish to leave your contact details so that we may get in touch with you?" placeholder="Do you wish to leave your contact details so that we may get in touch with you?">
									<input type="text" data-clear-btn="true" name="txtbox15" id="txtbox15" value="Please enter your contact details..." placeholder="Please enter your contact details...">
									<input type="text" data-clear-btn="true" name="txtbox16" id="txtbox16" value="Additional info such as room or table number." placeholder="Additional info such as room or table number.">
									<input type="text" data-clear-btn="true" name="txtbox17" id="txtbox17" value="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you." placeholder="Press the &quot;yes&quot; button to agree with Tabluu's <privacy_policy_link> & allow <brand> to contact you.">
									<input type="text" data-clear-btn="true" name="txtbox4" id="txtbox4" value="Thank you!" placeholder="Thank you!">
									<input type="text" data-clear-btn="true" name="txtbox6" id="txtbox6" value="Choose an option…" placeholder="Choose an option…">
									<input type="text" data-clear-btn="true" name="txtbox28" id="txtbox28" value="Login OR select &quot;reset&quot; to take a new photo" placeholder="Login OR select &quot;reset&quot; to take a new photo">
									<input type="text" data-clear-btn="true" name="txtbox8" id="txtbox8" value="Take a new photo?" placeholder="Take a new photo?">
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-box">Submit</button>
									</div>
								</form>
							</section>								
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>