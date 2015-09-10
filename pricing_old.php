<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="title" content="Pricing - Camrally">
	<meta name="description" content="Here are the pricing plans for Camrally. Pick a plan of your choice and sign up now!">
	<meta name="keywords" content="camrally pricing, pricing camrally, camrally">
	<title>Camrally Pricing</title>
    <link href="css/bootstrap.css" rel="stylesheet" media="all">
	<link href="css/style.css" rel="stylesheet" media="all">
	<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/jquery.countdown.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="js/star-rating.js"></script>
	<script type="text/javascript" src="js/pricing.js"></script>
	<link type="text/css" media="all" rel="stylesheet" href="css/dialog.css" >
	<link rel="Shortcut Icon" href="http://camrally.com/images/Icons/ico/favicon.ico" type="image/x-icon">
	<?php include_once("analyticstracking.php") ?>
</head>
<body class="pricing">
<?php
/*
include_once('class/class.main.php');
$connect = new db();
$connect->db_connect();
$isclokstart = 0;
$result = mysql_query("SELECT `time` as selects,is_started, `stardate`, `campaign`, `accounts`, `accountleft` FROM `businessClockcounter` WHERE 1 ") or die(mysql_error());
if(mysql_num_rows($result)){
	$row = mysql_fetch_object($result);
	$isclokstart = $row->is_started;
	$user_tz = 'Asia/Singapore';
	$server_tz = 'UTC';
	$schedule_date = new DateTime($row->stardate, new DateTimeZone($server_tz) );
	$schedule_date->sub(new DateInterval('P0DT0H2M0S'));
	$schedule_date->setTimeZone(new DateTimeZone($user_tz));
	$startdate = $schedule_date->format('Y/m/d H:i:s');
}
$connect->db_disconnect();		  
*/
?>
<input type="hidden" value="<?php //echo $isclokstart;?>" name="isclokstart" id="isclokstart" />
<input type="hidden" value="<?php //echo $row->selects;?>" name="txttime" id="txttime" />
<input type="hidden" value="<?php //echo $startdate?>" name="stardate" id="stardate" />
<input type="hidden" value="<?php //echo $row->campaign;?>" name="campaign" id="campaign" />
<input type="hidden" value="<?php //echo $row->accounts;?>" name="accounts" id="accounts" />
<input type="hidden" value="<?php //echo $row->accountleft;?>" name="accountleft" id="accountleft" />
<span class="worday" style="height:0.1px"></span>
<?php require_once('browser_detection.php'); ?>
<?php require_once('header.html'); ?>
<div style="width:100%;min-width:287px;">		  
<section class="plan-section text-center clear">
	<div class="container">
		<div class="clear title-top"></div>
		<h4 class="plan-title pricing-header">Choose a plan that best fits your purpose</h4>
		
		<div class="text-center">
		 <nav class="navbar navbar-default" role="navigation"> 
          <!-- Brand and toggle get grouped for better mobile display -->
         
		 <div id="subiconmenu" class="navbar-sub clear">
            <!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigator"> 
				<span class="sr-only">Toggle navigation</span> <span class="arrow-down"></span> <!-- <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>  </button>
            <a class="navbar-brand nav-title" href="#">Menu</a> 
		  </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
		  <!--
		  <div id="wrapsubmenu">
          <div class="navbar-collapse collapse" id="navigator">
			<ul class="nav navbar-nav pull-right">
              <li class="month-plan"><a href="#" >Monthly</a></li>
              <li><a href="#" class="year-plan">1 Yearly</a></li>
              <li><a href="#" class="year2-plan">2 Yearly</a></li>
            </ul>
          </div>
		  </div>
          -->
        </nav> 
		<!--
		<div class="button-group">
				<a href="#" class="month-plan"> <div class="left-button button dark">Monthly</div></a>
				<a href="#" class="year-plan"><div class="button borderleftright">1 Yearly</div></a>
				<a href="#" class="year2-plan"><div class="right-button button">2 Yearly</div></a>
				<div class="clear"></div>
			</div>-->
		</div> 
	  <div class="row text-center content-plan-menu" style="max-width: 1108px;">
		 <!-- <div class="col-xs-6 col-sm-3 colscols">
			<div class="contentwrap">
			 <h4 class="plan-title">Free</h4>
             <p class="plan-subtitle">Start experiencing</p>
			  <p class="price">$0.00</p>
			  <p class="plan-subtitle2">See the blue area below for a complete list of the features... </p>
				<ul>
				</ul>
			   </div>
			   <a href="#" id="pro-link" class="color-button inline-block">Sign up</a>
		  </div> -->
		 <div class="col-sm-4 cols">
			<div class="contentwrap">
			<h4 class="plan-title">Lite</h4>
			<p class="plan-subtitle"></p>
			<p class="price"><span class="basic-price">Free</span><span style="font-size:15px;float:right;margin-right:20px"><span class="txtmontly">for all</span> <br/>campaigns</span></p>
			<p class="plan-subtitle2"></p>
			<ul>
				<li>1 user</li>
				<li>Non-commercial usage</li>
				<li>Run unlimited campaigns</li>
				<li>Your Camrally page URL in this format: Camrally.com/campaignname.html</li>
			</ul>
			</div>
			<a href="app/signup.html" class="color-button color-4 inline-block">Sign up</a>
		  </div>
		  <div class="col-sm-4 cols secondcols">
			<div class="contentwrap">
			<h4 class="plan-title">Basic</h4>
			<p class="plan-subtitle"></p>
			<p class="price"><span class="pro-price">$29.90</span><span style="font-size:15px;float:right;margin-right:20px"><span class="txtmontly">monthly</span> <br/> per campaign</span></p>
			<p class="plan-subtitle2"></p>
			<ul>
				<li>Add & manage unlimited users</li>
				<li>Commercial usage</li>
				<li>Display your organizational info, website & social media buttons on your Camrally page</li>
				<li>Add a custom strong "call to action" button on your Camrally page</li>
				<li>Your Camrally page URL in this format: Camrally.com/campaignname</li>
			</ul>	
			</div>
			<a id="pro-link" class="color-button color-4 inline-block">Coming Soon</a>	
		  </div>
		  <div class="col-sm-4 cols">
		  	<div class="ribbon-overlay">
		  		<div class="ribbon">Marketers' Choice</div>
			</div>
			<div class="contentwrap">
			<h4 class="plan-title">Pro</h4>
			<p class="plan-subtitle"></p>
			<p class="price"><span class="enter-price">$59.90</span><span style="font-size:15px;float:right;margin-right:20px"><span class="txtmontly">monthly</span> <br/> per campaign</span></p>
			<p class="plan-subtitle2"></p>
			<ul>
				<li>Add & manage unlimited users</li>
				<li>Commercial usage</li>
				<li>Display your organizational info, website & social media buttons on your Camrally page</li>
				<li>Add a custom strong "call to action" button on your Camrally page</li>
				<li>Your Camrally page URL in this format: Camrally.com/campaignname</li>
				<li>Redirect advocates to your desired web page</li>
				<li>Your logo watermark on the image posts (coming soon)</li>
				<li>Export email addresses of your followers to excel (coming soon)</li>
			</ul>
			</div>
			<a id="enter-link" class="color-button color-4 inline-block">Coming Soon</a>	
		  </div>
		  
		</div>
		<div class="clear"></div>
		<p class="text-center" style="margin-top:20px">Note: If you already have an existing account with Camrally, please login to upgrade / downgrade your subscription. </p>	
	</div>
</section>
<section class="plan-section2">
	<div class="container">
		<h4 class="plan-title">All plans are power-packed with loads of<br/> amazing features, including:</h4>
		 <div class="clear" style="padding-top:40px;"></div>
		 <div class="align-center" style="float:left;width:50%;">
			<ul>
				<li>In built viral mechanism</li>
				<li>Rally for support online or hit the streets!</li>
				<li>Get & promote a hassle free mini link</li>
				<li>Clear & consistent campaign message at all touch points</li>
				<li>Proactively ask advocates to share on Facebook</li>
				<li>Social sharing widgets on your campaign pages</li>
				<li>Strong call to action on external landing pages</li>
				<li>Get your own custom Camrally page URL!</li>
				<li>Take your campaign offline</li>
			</ul>
		</div>
		<div class="align-center" style="float:left;width:50%">
			<ul>
				<li>Camrally is hosted on cloud servers with 99.9% uptime</li>
				<li>Step by step instructions for your campaign setup</li>
				<li>Campaign in your native language</li>
				<li>Mobile friendly Camrally web pages</li>
				<li>Easy to use & intuitive user interface</li>
				<li>Vibrant online discussions of your campaign</li>
				<li>Discovery to participation in one click!</li>
				<li>Manage posts from your advocates</li>
				<li>Get your own Pinterest-like page!</li>
			</ul>
		</div>
	</div>
</section>
<section class="plan-section3">
	<div class="container text-left">
		<h2 class="plan-title">Frequently Asked Questions</h4>
		<div class="clear" style="padding-top:10px;"></div> 
		<h4>Is the Lite version really free? Any catch?</h4>
		<p>Yes, it's free forever as long as it is used for non-commercial purposes.</p>
		<h4>Imagine if I would to create a campaign to rally support for the recent Nepal Earthquake by getting people to post selfies. Isn't it wrong if some people start posting photos of themselves smiling?</h4>
		<p>Yes, it will make a lot of sense to mention in your campaign poster that advocates should post selfies of themselves praying or showing a solemn expression. In case any inappropriate selfies are posted, you may hide them until the concern is fully addressed.</p>
		<h4>Do I need to hire a designer to create an attractive campaign poster?</h4>
		<p>That will depend on the reasons why you are running a photo campaign. Your audience may expect high quality posters for commercial campaigns.</p>
		<h4>I'm hitting the streets to rally for advocates. Some people are concerned about signing into their Facebook account on a third party device.  How can I assure them?</h4>
		<p>Camrally automatically logs out of your advocates' Facebook accounts once sharing is completed. You may also ask potential advocates to enter Camrally's mini link into their own mobile devices as a backup plan.</p>
		<h4>I'll like to use Camrally to create photo campaigns on topics such as "books i'm reading now" & "cute doggy photos"... what do you think?</h4>
		<p>Sounds like fun! And a great way to meet like minded people online. Use Camrally as you see fit, there is no restrictions on how this service may be used as long as the topics you choose are wholesome & does not offend any persons or groups.</p>
	</div>
</section>
</div>
 <?php require_once('footer.html'); ?>
</body>
</html>