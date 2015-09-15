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
					<img src="images/Logo/logo-arrow.png" class="logo fl" width="143" height="auto" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconuic" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Customizations</div>			
							<ul class="uic-left-menu" data-role="listview">
								<li ><a href="#">Background Color<span class="listview-arrow-default"></span></a></li><li ><a href="#" >Font Color<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Buttons<span class="listview-arrow-default"></span></a></li><li ><a href="#">Text in Message<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="uic-section-logo hide">
								
							</section>
							<section class="uic-section-img hide">
								
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
									<input type="text" data-clear-btn="false" name="txtvpoor" id="txtvpoor" value="Very poor" placeholder="Very poor">
									<input type="text" data-clear-btn="false" name="txtpoor" id="txtpoor" value="Poor" placeholder="Poor">
									<input type="text" data-clear-btn="false" name="txtfair" id="txtfair" value="Average" placeholder="Average">
									<input type="text" data-clear-btn="false" name="txtgood" id="txtgood" value="Good" placeholder="Good">
									<input type="text" data-clear-btn="false" name="txtexc" id="txtexc" value="Excellent" placeholder="Excellent">
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit">
										<button class="ui-btn" id="submit-tbs">Submit</button>
									</div>
								</form>
							</section>
							<section class="uic-section-tb hide">
								<form id="frmUIC2" action="#" method="post" enctype="multipart/form-data" >
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
									<p class="share">Share this page?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="txtshare1" id="txtshare1" value="Skip" placeholder="Skip">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="log-out">You'll be logged out of &lt;social_media&gt; after sharing.</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txt-logout" id="txt-logout" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="logged">Click &quot;okay&quot; to start sharing</p>
									<div class="clear" style="padding-top:1em;width:8.1em;">
										<div class="fl w60">
											<input type="text" name="txt-share" id="txt-share" value="okay" placeholder="okay">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="follow-loc">Follow this campaign?</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w60">
											<input type="text" name="follow-no" id="follow-no" value="no" placeholder="no">
										</div>
										<div class="fr w60">
											<input type="text" name="follow-yes" id="follow-yes" value="yes" placeholder="yes">
										</div>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<p>&lt;Campaign details&gt;</p>
									<div class="clear" style="padding-top:1em;width:15em;">
										<div class="fl w90">
											<input type="text" name="txt-camdetails" id="txt-camdetails" value="Campaign details" placeholder="Campaign details">
										</div>
									</div>
									<div class="hide"> <!-- remove this div to show the button -->
										<div class="clear" style="padding-top:0.5em"></div>
										<p>&lt;Respond Now!&gt;</p>
										<div class="clear" style="padding-top:1em;width:15em;">
											<div class="fl w90">
												<input type="text" name="txt-widget" id="txt-widget" value="Respond Now!" placeholder="Respond Now!">
											</div>
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
									<input type="text" data-clear-btn="false" name="txtbox9" id="txtbox9" value="Auto logout" placeholder="Auto logout">
									<input type="text" data-clear-btn="false" name="txtbox10" id="txtbox10" value="You'll be logged out of <social_media> after sharing." placeholder="You'll be logged out of <social_media> after sharing.">
									<input type="text" data-clear-btn="false" name="txtbox26" id="txtbox26" value="You're logged in to <social_media>" placeholder="You're logged in to <social_media>">
									<input type="text" data-clear-btn="false" name="txtbox27" id="txtbox27" value="Click &quot;okay&quot; to start sharing!" placeholder="Click &quot;okay&quot; to start sharing!">
									<input type="text" data-clear-btn="false" name="txtbox3" id="txtbox3" value="Share your Camrally Post?" placeholder="Share your Camrally Post?">
									<input type="text" data-clear-btn="false" name="txtbox22" id="txtbox22" value="By sharing you agree with Camrally's <privacy_policy_link>." placeholder="By sharing you agree with Camrally's <privacy_policy_link>.">
									<input type="text" data-clear-btn="false" name="txtbox11" id="txtbox11" value="Follow this campaign?" placeholder="Follow this campaign?">
									<input type="text" data-clear-btn="false" name="txtbox12" id="txtbox12" value="Press the &quot;yes&quot; button to agree with Camrally's <privacy_policy_link> & allow <campaigner> to contact you." placeholder="Press the &quot;yes&quot; button to agree with Camrally's <privacy_policy_link> & allow <campaigner> to contact you.">
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