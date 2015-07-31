<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
$_SESSION['type']='';$_SESSION['plan']='';	
if(isset($_REQUEST['type']) && isset($_REQUEST['plan'])){
	//note: type 1= monthly,2= 1 yearly,3 = 2 yearly
	$_SESSION['type']=$_REQUEST['type'];$_SESSION['plan']=$_REQUEST['plan'];
}	
?>
<!DOCTYPE html>
<html lang="en"> 
<head>
	<title>Sign up</title>
    <meta name="robots" content="noindex, nofollow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
	<link type="text/css" rel="stylesheet" href="css/dialog.css" type="text/css">
	<link href="js/source/jquery.fancybox.css?v=2.1.5" media="screen" rel="stylesheet" type="text/css" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.min.js"></script>
	<script type="text/javascript" src="js/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>	
	<script type="text/javascript" src="js/signup.js"></script>
<link rel="Shortcut Icon" href="images/Logo/ico/Icon_2.ico" type="image/x-icon">
</head>
<body>
<div id="sign" data-role="page" data-prefetch="true">
	<div class="content-wrap">
		<div role="main" class="ui-content">
			<div class="main-wrap">
				<div class="contentwrap">
					<div class="logo-sign"></div>
					<div class="clear" style="padding-top:2.6em"></div>
					<div style="padding:0 5px;">
					    <input type="text" data-clear-btn="false" name="fname" id="fname" value="" placeholder="first name">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="text" data-clear-btn="false" name="lname" id="lname" value="" placeholder="last name">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="text" data-clear-btn="false" name="email" id="email" value="" placeholder="email">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="password" data-clear-btn="false" name="newpwd" id="newpwd" value="" placeholder="enter a password">
						<div class="clear" style="padding-top:0.5em"></div>
						<input type="password" data-clear-btn="false" name="newpwdConfirm" id="newpwdConfirm" value="" placeholder="confirm password">
						<input type="hidden" name="groupId" id="groupId" value="" >
						<div class="clear" style="padding-top:1em"></div>
						<a href="http://camrally.com/subscription_agreement.html" class="fancybox fancybox.iframe" style="font-weight:normal;color: #00AEEF;">I accept the terms &amp; conditions</a>
						<div class="clear" style="padding-top:0.5em"></div>
						<div class="btn-submit">
							<button class="ui-btn" id="submit-signing">Submit</button>
						</div>
					</div>
					<div class="clear" style="padding-top:1em"></div>
					<div class="page-login">Already have an account? Login here</div>
					<div class="clear" style="padding-top:1.5em"></div>
				</div>
				</div>	
		</div><!-- /content -->
		<div data-role="footer"></div><!-- /footer -->
	</div>
	<script type="text/javascript" src="http://static.leaddyno.com/js"></script>
	<script>
	LeadDyno.key = "8e2a70840f441554c2eb5208c4ef501baa0f7d38";
	LeadDyno.recordVisit();
	LeadDyno.autoWatch();
	</script>				
</body>
</html>