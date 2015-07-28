<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="title" content="Pricing - Camrally">
	<meta name="description" content="Here are the pricing plans for Camrally. Pick a plan of your choice and sign up now!">
	<meta name="keywords" content="camrally pricing, pricing camrally, camrally">
	<title>Pricing - Camrally</title>
    <link href="css/bootstrap.css" rel="stylesheet" media="all">
	<link href="css/style.css" rel="stylesheet" media="all">
	<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/jquery.countdown.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="js/star-rating.js"></script>
	<script type="text/javascript" src="js/pricing.js"></script>
	<link type="text/css" media="all" rel="stylesheet" href="css/dialog.css" >
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
		<h4 class="plan-title pricing-header">Take advantage of our low introductory rate now!</h4>
		
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
		<div class="butt10px 0 0 0on-group">
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
				<li>For personal & non-commercial use</li>
				<li>Run unlimited campaigns</li>
				<li>Your Camrally page URL in this format: Camrally.com/campaignname.html</li>
			</ul>
			</div>
			<a href="#" id="basic-link" class="color-button color-4 inline-block">Sign up</a>
		  </div>
		  <div class="col-sm-4 cols secondcols">
			<div class="contentwrap">
			<h4 class="plan-title">Pro1</h4>
			<p class="plan-subtitle"></p>
			<p class="price"><span class="pro-price">$29.90</span><span style="font-size:15px;float:right;margin-right:20px"><span class="txtmontly">monthly</span> <br/> per campaign</span></p>
			<p class="plan-subtitle2"></p>
			<ul>
				<li>Add & manage unlimited users</li>
				<li>For organization & commercial usage</li>
				<li>Display your organizational info, website & social media buttons on your Camrally page</li>
				<li>Add a custom strong “call to action” button on your Camrally page</li>
				<li>Your Camrally page URL in this format: Camrally.com/campaignname</li>
			</ul>	
			</div>
			<a id="pro-link" class="color-button color-4 inline-block">Sign up</a>	
		  </div>
		  <div class="col-sm-4 cols">
		  	<div class="ribbon-overlay">
		  		<div class="ribbon">Marketers' Choice</div>
			</div>
			<div class="contentwrap">
			<h4 class="plan-title">Pro3</h4>
			<p class="plan-subtitle"></p>
			<p class="price"><span class="enter-price">$59.90</span><span style="font-size:15px;float:right;margin-right:20px"><span class="txtmontly">3 monthly</span> <br/> per campaign</span></p>
			<p class="plan-subtitle2"></p>
			<ul>
				<li>Add & manage unlimited users</li>
				<li>For organization & commercial usage</li>
				<li>Display your organizational info, website & social media buttons on your Camrally page</li>
				<li>Add a custom strong “call to action” button on your Camrally page</li>
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
		<p class="text-center" style="margin-top:20px">Note: If you already have an exisiting account with Camrally, please login to upgrade / downgrade your subscription. </p>	
	</div>
</section>
<section class="plan-section2">
	<div class="container">
		<h4 class="plan-title">All plans are power-packed with loads of<br/> amazing features, including:</h4>
		 <div class="clear" style="padding-top:40px;"></div>
		 <div class="align-center" style="float:left;width:50%;">
			<ul>
				<li>Collect feedback using email invitations, </br>QR Codes, surveys & feedback stations</li>
				<li>Build up your followers & email list</li>
				<li>Automatic daily backup of your data</li>
				<li>User administration & management</li>
				<li>Prompt & friendly email support</li>
				<li>Statistics reporting of your feedback & reviews</li>
				<li>Social sharing buttons on your Camrally page</li>
				<li>Link to your Facebook page</li>
				<li>Link to your business web page</li>
				<li>Secure data transfer with SSL technology</li>
				<li>Limit & restrict access for each location</li>
				<li>Fully customizable feedback interface</li>
			</ul>
		</div>
		<div class="align-center" style="float:left;width:50%">
			<ul>
				<li>Your business contact info is posted along with your </br>customers' social media posts</li>
				<li>Camrally is hosted on cloud servers with 99.9% uptime</li>
				<li>Assign admin rights to managers</li>
				<li>Step by step instructions to setup Camrally</li>
				<li>A variety of samples for reference</li>
				<li>Manage multiple businesses & locations</li>
				<li>Multilingual customer interface possibilities</li>
				<li>Post customers' selfies & reviews to their social media accounts</li>
				<li>Export feedback data to excel</li>
				<li>Mobile friendly Camrally web pages</li>
				<li>Easy to use & intuitive user interface</li>
			</ul>
		</div>
	</div>
</section>
<section class="plan-section3">
	<div class="container text-left">
		<h2 class="plan-title">Frequently Asked Questions</h4>
		<div class="clear" style="padding-top:10px;"></div> 
		<h4>Is Camrally available on Apple and Android stores?</h4>
		<p>No. Camrally is a web app available on any device with a web browser and internet connection.</p>
		<h4>Do I need to hire a designer to create an attractive feedback user interface?</h4>
		<p>No, simply upload any image of the correct sizes to Camrally and choose a matching background colour to create an attracive looking customer interface.</p>
		<h4>My customers are concerned about signing into their Facebook account on a third party device.  How can I assure them?</h4>
		<p>Camrally automatically logs out of your customer's Facebook account once sharing is completed. Our script also double checks to ensure the user is completely logged out  before the next user is allowed to use Camrally</p>
		<h4>Do I always have to take a photo of my customers before requesting for ratings and reviews?</h4>
		<p>No. Simply use Camrally in the way that best suits your business needs. Camrally works even without the customers's photos or selfies.</p>
		<h4>What is your refund policy?</h4>
		<p>Camrally does not offer any refund.</p>
	</div>
</section>
</div>
 <?php require_once('footer.html'); ?>
</body>
</html>