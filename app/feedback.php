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
					<img src="images/Logo/logo-arrow.png" class="logo fl" width="143" height="auto" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconfeed" />
					</div>
				</div><!-- /header -->		
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Campaign Page Links</div>			
							<ul class="feedback-left-menu" data-role="listview">
								<li><a href="#">Mini Link<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#" class="qrcode">QR Code<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Spot Response (Your Own Mobile Devices)<span class="listview-arrow-default"></span></a></li>
								<li ><a href="#">Photo Booth (Your Own Tablet or Notebook)<span class="listview-arrow-default"></span></a></li>
								<!--<li ><a href="#">Website Campaign Widget<span class="listview-arrow-default"></span></a></li>-->
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Collect Feedback / Selfie</div>
							<section class="tellafriend hide">
								<p>Your campaign page mini link:</p>
								<div class="clear" style="padding-top:1em"></div>
								<input type="text" name="promotelink" id="promotelink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="promotelinkopen">Open</button>
								</div> 
								<!--
								<p>Please use the below link in your email invitations to get response:</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="emaillink" id="emaillink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="emaillinkopen">Open</button>
								</div>-->
							</section>	
							<section class="feedback-weblink bgwhite hide pad-left-right">
								<p>Please choose a QR Code size...</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<fieldset data-role="controlgroup" data-corners="false" id="qr-size3">
									<input type="radio" name="post" id="weba" value="1" >
									<label for="weba">100 x 100</label>
									<input type="radio" name="post" id="webb" checked="checked" value="2">
									<label for="webb">200 x 200</label>
									<input type="radio" name="post" id="webc" value="3">
									<label for="webc">300 x 300</label>
									<input type="radio" name="post" id="webd" value="4">
									<label for="webd">400 x 400</label>
									<input type="radio" name="post" id="webe" value="5" >
									<label for="webe">500 x 500</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="qr-generate3">Generate QR Code</button>
								</div>		
									
							</section>
							<section class="feedback-photo hide">	
								<p>Link:</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="photolink" id="photolink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="phopen">Open</button>
								</div>
							</section>
							<section class="survey hide pad-left-right">
								<p>Link:</p>
								<div class="clear" style="padding-top:1em"></div>	
								<input type="text" name="surveyopenlink" id="surveyopenlink" value="" >
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit">
									<button class="ui-btn" id="surveyopen">Open</button>
								</div>
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
								<div class="clear" style="padding-top:1em"></div>
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