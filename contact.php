<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name="robots" content="noindex, nofollow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Tabluu's contact us page</title>
    <link href="css/bootstrap.css" rel="stylesheet" media="all">
	<link href="css/style.css" rel="stylesheet" media="all">
	<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="js/star-rating.js"></script>
	<script type="text/javascript" src="js/default.js"></script>
	<?php include_once("analyticstracking.php") ?>
</head>
<body class="contactpage">
<?php require_once('browser_detection.php'); ?>
<?php require_once('header.html'); ?>
    <section class="contact-section text-center clear">
    	<div class="container">
    		<div class="wrapper_contactform">
    			<h2>We would love to hear from you!</h2>
				<div class="clear" style="text-align:left;margin:0 auto;">
    			<form action="#" method="post" class="contactform">
    				<label><span>Name</span></label>
    					<input type="text" placeholder="name" id="cName" name="name" />
    				
					<div class="clear"></div>
    				<label><span>Email</span></label>
    					<input type="text" placeholder="email" id="cEmail" name="email" />
    				
					<div class="clear"></div>
    				<label><span>Subject</span> </label>
    					<input type="text" placeholder="enter a subject title" id="cSubject" name="subject" />

					<div class="clear"></div>
    				<label><span>Message</span></label>
    					<textarea name="message" id="cMessage" placeholder="enter your message"></textarea>
					<div class="clear"></div>
					<div id="cError"></div>
    				<input class="submit_button" id="contactsubmit" type="submit" value="SUBMIT" />
					<br><br>		   
    			</form> 
				<div>
    		</div>
    	</div>
    </section>
  <!--   <section id="signup">
  	   	<div class="container">
 	<div class="wrapper_signup">
    			<div class="signup_title">Sign up for our newsletter now.</div>
    			<div class="signup_desc">Be amongst the first to know about upcoming features, news and job offers.</div>
    			<div class="inline-block">
    				<input type="text" name="" placeholder="Enter your email address" />
    			</div> 
    			<div class="inline-block"><input class="signup_button" type="submit" value="Subscribe" name="" /></div>
    			<div class="clr"></div>
    		</div> 
    	</div> 
    </section> -->
	<div class="container"><div class="dark-line-2"></div></div>
 <?php require_once('footer.html'); ?>
</body>
</html>