<!DOCTYPE html>
<html>
<head>
	<title>Customers Facebook Posts</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
		<div id="fbpost" data-role="page">
			<div class="content-wrap" style="background-color:#cbe7f2;">
				<div data-role="header">
					<img src="images/template/logo.png" class="logo fl" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconfbpost" />
					</div>
				</div><!-- /header -->
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Social Media Posts</div>			
							<ul class="fbpost-left-menu" data-role="listview">
								<li><a href="#">Type of Image<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Post Reviews to Social Media &amp; Tabluu?<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Customize Message<span class="listview-arrow-default"></span></a></li>
							</ul>								
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header">Customers Facebook Posts</div>
							<section class="panel-fbpost hide">
								<!--<span class="font-17 fl">What to post to social media?</span>-->
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="optPost">
									<input type="radio" name="optPost" id="optPost-b" value="1">
									<label for="optPost-b">Selfie / photo (with rating score)</label>
									<input type="radio" name="optPost" id="optPost-c" value="2">
									<label for="optPost-c">Selfie / photo (without rating score)</label>
									<input type="radio" name="optPost" id="optPost-a" value="0">
									<label for="optPost-a">Your own banner / image (recommended for slow internet connections)</label>
								</fieldset>	
								<div class="clear"></div>
								<div class="selfie-2 hide">
									<form id="frmselfies" action="#" method="post" enctype="multipart/form-data" >
									<div class="clear" style="padding-top:1em"></div>
									<span class="font-17 fl">Event / Cause / Promotion:</span>
									<div class="clear" style="padding-top:0.5em"></div>
									<input type="text" data-clear-btn="true" name="txtoccation" id="txtoccation" value="" placeholder="Text (max 40 chars)">
									<div class="clear" style="padding-top:1em"></div>
									<span class="font-17 fl">Presented by brand, date:</span>
									<div class="clear" style="padding-top:0.5em"></div>
									<input type="text" data-clear-btn="true" name="txtinfodate" id="txtinfodate" value="" placeholder="Text (max 40 chars)">
									<div class="clear" style="padding-top:1em"></div>
									<span class="font-17 fl">Add your slogan: </span>
									<div class="clear" style="padding-top:0.5em"></div>
									<input type="text" data-clear-btn="true" name="txtcamp1" id="txtcamp1" value="" placeholder="Text for row 1 (max 40 chars)">
									<div class="clear" style="padding-top:0.5em"></div>
									<input type="text" data-clear-btn="true" name="txtcamp2" id="txtcamp2" value="" placeholder="Text for row 2 (max 40 chars)">
									<div class="clear" style="padding-top:1em"></div>
									<span class="font-17 fl">Sample: </span>
									<div class="clear" style="padding-top:0.5em"></div>
									<div style="width:500px;">
										<img src="images/campaign-sample.jpg" style="width:100%;height:auto;" />
									</div>
									</form>
								</div>
								<div class="ownimg hide">
									<div class="clear" style="padding-top:1em"></div>
									<span class="font-17 fl">Upload your own image for your customers' social media posts...</span>
									 <div class="clear" style="padding-top:1em"></div>
									<form id="frmfb" action="setPhoto.php" method="post" enctype="multipart/form-data" >
										<button class="ui-btn" id="upload">Upload an Image</button>
										<div style="visibility:hidden;height:0px">
										<input type="file" name="filefb" style="visibility:hidden;height:0px" id="filefb" value="">
										</div>
										<input type="hidden" value="" name="placeidfb" id="placeidfb" />
										<input type="hidden" value="" name="idfb" id="idfb" />
									 </form>
									 
									 <div class="clear"></div>
									<div style="height: 1.5em">
									   <div class="thumb">
											<img src="<?php echo $noPhoto ?>" id="fbthumb" style="width:100%;height:100%" />
									   </div>
									   <div class="clear" style="padding-top:0.5em"></div>
									   <span class="color-grey font-12 fl">Note: Max image size is 1000kb</span>
										<div class="clear" style="padding-top:1em"></div>
									</div>	
								</div>
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="btnsocialpost">Update</button>
								</div>	
							</section>
							
							<section class="panel-post hide">
								<p>Allow reviews &amp; photos to be posted to Social Media &amp; Tabluu</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="sharefb">
									<input type="radio" name="radio-a" id="radio-a" value="0" >
									<label for="radio-a">no</label>
									<input type="radio" name="radio-a" id="radio-b" value="1">
									<label for="radio-b">yes</label>
								</fieldset>
								<div class="clear" style="padding-top:0.5em"></div>	
								<p>Minimum average rating before customers can post to Social Media &amp; Tabluu</p>
								<div class="clear" style="padding-top:0.5em"></div>	
								<fieldset data-role="controlgroup" data-corners="false" id="sharelimit">
									<input type="radio" name="post" id="onea" value="1.0" >
									<label for="onea">1.0</label>
									<input type="radio" name="post" id="oneb" value="1.25">
									<label for="oneb">1.25</label>
									<input type="radio" name="post" id="onec" value="1.5">
									<label for="onec">1.5</label>
									<input type="radio" name="post" id="oned" value="1.75">
									<label for="oned">1.75</label>
									<input type="radio" name="post" id="onee" value="2.0" >
									<label for="onee">2.0</label>
									<input type="radio" name="post" id="onef" value="2.25">
									<label for="onef">2.25</label>
									<input type="radio" name="post" id="oneg" value="2.5">
									<label for="oneg">2.5</label>
									<input type="radio" name="post" id="oneh" value="2.75">
									<label for="oneh">2.75</label>
									<input type="radio" name="post" id="onei" value="3.0">
									<label for="onei">3.0</label>
								</fieldset>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="submit-postfb">Update</button>
								</div>	
							</section>
							<section class="setup-cust-post hide">
							    
								<form id="frmpost2social" action="#" method="post" enctype="multipart/form-data" >
							    <div class="clear" style="padding-top:0.5em"></div>
								<p>Customize your message's title by editing the following...</p>
								<div class="clear" style="padding-top:0.5em"></div>
								<textarea cols="20" rows="1" style="resize:none" name="postdesc" id="postdesc">My "Selfie Review" of <brand></textarea>
								<div class="clear" style="padding-top:0.5em"></div>
								<p>Preview:<br/><span class="preview2">My "Selfie Review" of</p>	
								<div class="clear" style="padding-top:1em"></div>
								<p>Customize your message's description by editing the following...</p>	
								<div class="clear" style="padding-top:0.5em"></div>	
								 <textarea cols="20" rows="2" style="resize:none" name="txtFBPost" id="txtFBPost">See my "Selfie Review" of <brand> here! <tabluu_url> <brand>, <address>, <tel>.</textarea>
								  <div class="clear" style="padding-top:1em"></div>
								 <p>Preview:<br/><span class="preview">See my "Selfie Review" of Tokyo Cafe 4.3 out of 5. Awesome! Go to: <span style="text-decoration:underline;color:blue;">http://camrally.com/ukw0cjn.html</span> - Addr: Spui 15 (tramhalte Spui), Amsterdam, Netherlands. Tel: 020-489 7918.</span></p>	
								 <div class="clear" style="padding-top:1em"></div>
								 <p>Note: <br/>The &lt;comment&gt;, &lt;brand&gt; &amp; &lt;tabluu_url&gt; tags are mandatory.</p>
								 <div class="clear" style="padding-top:0.5em"></div>								 
								 <div class="btn-submit">
									<button class="ui-btn" id="fblinkupdate">Update</button>
								</div>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="fblinkreset">Reset</button>
								</div>
								</form>
								<!--
								<p>Customize your Facebook post by editing the following...</p>	
								<div class="clear" style="padding-top:0.5em"></div>	
								 <textarea cols="20" rows="3" style="resize:none" name="txtFBPost" id="txtFBPost">See my "Selfie Review" of <brand> here! <tabluu_url> <brand>, <address>, <tel>.</textarea>
								  <div class="clear" style="padding-top:1em"></div>
								 <p>Preview:<br/><span class="preview">See my "Selfie Review" of Tokyo Cafe 4.3 out of 5. Awesome! Go to: <span style="text-decoration:underline;color:blue;">http://tabluu.com/ukw0cjn.html</span> - Addr: Spui 15 (tramhalte Spui), Amsterdam, Netherlands. Tel: 020-489 7918.</span></p>	
								 <div class="clear" style="padding-top:1em"></div>
								 <p>Note: <br/>The &lt;comment&gt;, &lt;brand&gt; &amp; &lt;tabluu_url&gt; tags are mandatory.</p>
								 <div class="clear" style="padding-top:0.5em"></div>								 
								 <div class="btn-submit">
									<button class="ui-btn" id="fblinkupdate">Update</button>
								</div>	
								<div class="clear" style="padding-top:0.5em"></div>	
								<div class="btn-submit">
									<button class="ui-btn" id="fblinkreset">Reset</button>
								</div> -->
							</section>
						</div>
					</div>	
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>