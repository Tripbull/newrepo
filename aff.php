<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name="robots" content="noindex, nofollow"/>
	<title>Tabluu's contact us page</title>
    <link rel="stylesheet" href="css/style.css"/>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/default.js"></script>
	<?php include_once("analyticstracking.php") ?>
</head>
<body class="contactpage">
<?php require_once('browser_detection.php'); ?>
<?php require_once('header.html'); ?>
    <section>
    	<div class="container">
    		<div class="wrapper_contactform">
    			<div class="contact_title">Affiliate Support...</div>
    			<form action="#" method="post" class="contactform">
    				<label>
    					<span>Name</span>
    					<input type="text" placeholder="name" id="cName" name="name" />
    				</label>
    				<label>
    					<span>Email</span>
    					<input type="text" placeholder="email" id="cEmail" name="email" />
    				</label>
    				<label>
    					<span>Subject</span>
    					<input type="text" placeholder="enter a subject title" id="cSubject" name="subject" />
    				</label>
    				<label>
    					<span>Message</span>
    					<textarea name="message" id="cMessage" placeholder="enter your message"></textarea>
    				</label>
					<div id="cError"></div>
    				<input class="submit_button" id="contactsubmit" type="submit" value="Submit" />
					<p class="pad">Contact Information:<p>
					<p class="pad">Business Marketing Apps<p>
					<p class="pad">200B Sengkang East Road #11-22, Singapore 542200<p>
					<p class="pad">65-96911274 (Business hours: 10am to 6pm)</p>	
					<br><br><br>		   
    			</form> 
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