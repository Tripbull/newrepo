<!DOCTYPE html>
<html>
<head>
	<title>Collect Feedback / Reviews Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="feedback" data-role="page">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconfeed" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Collect Response</div>			
							<ul class="feedback-left-menu" data-role="listview">
								<li ><a href="#">Spot Response<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#" class="qrcode">Messages, QR Codes &amp; Mini Links<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Send Email Invitations<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Photo Booth (Tablet or Notebook)<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Website Feedback Widget<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Collect Feedback / Selfie</div>
							<section class="tellafriend hide">
								<!--<iframe src="http://www.tabluu.com/tellafriend/index.php" width="600" height="600" scrolling="auto" frameborder="0" style="border:0px #FFFFFF" name="frame share contacts" id="tellFrame" marginheight="0"></iframe>-->
								<p class="font-16 fnoted bgrey" style="padding:10px">Note: Send out feedback / review invitations by copying &amp; pasting the below subject / message to your email.</p>
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Subject:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="invitxtsubject" id="invitxtsubject" value="You're invited to give Tokyo Cafe a review!" placeholder="Subject...">
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Message:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-invite" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								<div class="hide emailselfie">
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-16 fnoted2 bgrey" style="padding:10px">Note: Send out feedback / review invitations by copying &amp; pasting the below subject / message to your email.</p>
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Subject:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<input type="text" data-clear-btn="false" name="invitxtsubject2" id="invitxtsubject2" value="You're invited to give Tokyo Cafe a review!" placeholder="Subject...">
								<div class="clear" style="padding-top:1em"></div>
								<p class="font-17 fl">Message:</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<div>
									<textarea name="bbcode_field" id="textarea-invite2" style="height:400px;width:100%;max-height: 900px;"></textarea>
								</div>
								</div>
							</section>	
							<section class="feedback-weblink hide">									
								<ul class="feedback-right-weblink" data-role="listview">
									<li><a href="weblink.html">Ask for a Selfie<span class="listview-arrow-default"></span></a></li>
									<li><a href="weblink.html">Don’t ask for a Selfie<span class="listview-arrow-default"></span></a></li>
								</ul>											
							</section>
							<section class="feedback-photo hide">	
								<p>Link:</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<input type="text" name="photolink" id="photolink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="phopen">Open</button>
								</div>
							</section>
							<section class="survey hide">
								<ul class="feedback-right-weblink" data-role="listview">
									<li><a href="onspot.html">Handheld Tablet<span class="listview-arrow-default"></span></a></li>
									<li><a href="onspot.html">Response Station<span class="listview-arrow-default"></span></a></li>
								</ul>	
							</section>
							<section class="feedback-widget hide">	
								<p>Copy the below codes and paste it within the "&lt;head&gt;&lt;/head&gt;" tags of your web page.</p>
								<div class="clear" style="padding:5px;"></div>
								<div class="script-tag" ></div>
								<div class="clear" style="padding:5px;"></div>
								<fieldset data-role="controlgroup" data-iconpos="left" data-corners="false">
									<div class="ui-checkbox">
										<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="checkbox-top">Display above the header of the webpage</label>
										<input id="checkbox-top" type="checkbox" value="0" name="checkbox-top">
										<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="checkbox-bottom">Display at the bottom right corner of the webpage</label>
										<input id="checkbox-bottom" type="checkbox" value="1" name="checkbox-bottom">
									</div>
								</fieldset> 
								<div class="clear" style="padding-top:2em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="website-widget-update">Update</button>
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