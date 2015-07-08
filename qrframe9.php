<?php
session_start();
include_once('class/class.cookie.php');
include_once('class/class.main.php');
$cookie = new cookie();
if(!$cookie->validateAuthCookie())
	die('access is forbidden');
if(!isset($_REQUEST['s']) || !isset($_REQUEST['id']))
	die('error the url parameters is not correct');

$connect = new db();
$connect->db_connect();
$placeId = $_REQUEST['id'];
$sql = "SELECT c.printvalue,p.nicename,s.link FROM businessCustom as c LEFT JOIN businessProfile AS p ON p.profilePlaceId = c.customPlaceId LEFT JOIN businessshorturl AS s ON s.placeId = c.customPlaceId AND s.source = {$_REQUEST['s']} WHERE c.customPlaceId = $placeId";
$result = mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_object($result );
$textline = json_decode($row->printvalue);
$connect->db_disconnect();
$size = 120;$class='';
if($_REQUEST['s'] == 1){
	$selfiex1 = (!empty($textline->selfiex1) ? $textline->selfiex1 : 'GO HERE:');
	$selfiex2 = (!empty($textline->selfiex2) ? $textline->selfiex2 : 'POST YOUR "X"');
	$selfiex3 = (!empty($textline->selfiex3) ? $textline->selfiex3 : 'SELFIE');
	if($row->link == null){
		$link = 'https://tabluu.com/'.$row->nicename.'=1';
		$shortlink = 'tabluu.com/'.$row->nicename.'=1';
	}else{
		$link = 'https://tabluu.com/'.$row->link;
		$shortlink = 'tabluu.com/'.$row->link;
	}
	$class='pselfiex';
	$size = 50;
}else if($_REQUEST['s'] == 0){
	$selfiex1 = (!empty($textline->selfiex1) ? $textline->noselfie1 : 'GO HERE:');
	$selfiex2 = (!empty($textline->selfiex2) ? $textline->noselfie2 : 'We Value Your');
	$selfiex3 = (!empty($textline->selfiex3) ? $textline->noselfie3 : 'FEEDBACK');
	if($row->link == null){
		$link = 'https://tabluu.com/'.$row->nicename.'=0';
		$shortlink = 'tabluu.com/'.$row->nicename.'=0';
	}else{
		$link = 'https://tabluu.com/'.$row->link;
		$shortlink = 'tabluu.com/'.$row->link;
	}
	$size = 50;$class='pselfiex2';
}else if($_REQUEST['s'] == 3){
	$selfiex1 = (!empty($textline) ? $textline->selfiex1 : 'GO HERE:');
	$selfiex2 = (!empty($textline) ? $textline->selfiex2 : 'POST YOUR "X"');
	$selfiex3 = (!empty($textline) ? $textline->selfiex3 : 'SELFIE');
	$link = 'http://www.tabluu.com/'.$row->nicename.'=6';
	$shortlink = 'tabluu.com/'.$row->nicename.'=6';
	$size = 50;
}	
?>
<!doctype html>
<html>
<head>
<title>QR Code Generated &amp; Print</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qrcode-0.7.0.min.js"></script>
	<!--<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>-->
	<script type="text/javascript">
		$(document).ready(function(){
			var options = {
				// render method: `'canvas'`, `'image'` or `'div'`
				render: 'image',
				fill: '#000',
				size: <?php echo $size ?>,
				text: '<?php echo $link ?>',
			};
			$(".QRimage").qrcode(options);
		})
		function printpage(){
			var printButton = document.getElementById("btnprint2");
			printButton.style.visibility = 'hidden';
			window.print();
			printButton.style.visibility = 'visible';
		}
	</script>
<style style="text/css">
/* reset css */
html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {margin: 0;padding: 0;border: 0;outline: 0;font-size: 100%;vertical-align: baseline;background: transparent;}
body {line-height: 1;}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {display: block;}
nav ul {list-style: none;}
blockquote,q {quotes: none;}
blockquote:before,blockquote:after,q:before,q:after {content: '';content: none;}
a {margin: 0;padding: 0;font-size: 100%;vertical-align: baseline;background: transparent;}
*:focus {outline: 0;}
/* end of reset*/
@font-face {
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: 400;
  src: url('fonts/v10/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2') format('woff2'), url('fonts/cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff') format('woff');
}
@font-face {
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: 700;
  src: url('fonts/k3k702ZOKiLJc3WVjuplzOgdm0LZdjqr5-oayXSOefg.woff2') format('woff2'), url('fonts/k3k702ZOKiLJc3WVjuplzHhCUOGz7vYGh680lGh-uXM.woff') format('woff');
}
@font-face {
  font-family: 'myriad_prolight';
  src: url('fonts/myriadpro-light-webfont.eot');
  src: url('fonts/myriadpro-light-webfont.eot?#iefix') format('embedded-opentype'), url('fonts/myriadpro-light-webfont.woff') format('woff'), url('fonts/myriadpro-light-webfont.ttf') format('truetype'), url('fonts/myriadpro-light-webfont.svg#myriad_prolight') format('svg');
  font-weight: normal;
  font-style: normal;
}
#wrap {width:100%;max-width:630px; height:auto; margin-left:auto; margin-right:auto;padding:10px;}
.QRFrame {font-family:"myriad_prolight";width: 200px;height: 100%;border: 2px solid #000;text-align: center;position:relative;float:left;margin-right:5px;margin-bottom:5px;overflow:hidden;padding-bottom:0.5em;padding-top: 0.5em;}
.QRimage {margin-left:auto;margin-right:auto;}
.QRFrame2 {font-family:"OpenSans";width: 200px;height: 100%;border: 2px solid #000;text-align: center;position:relative;float:left;margin-right:5px;margin-bottom:5px;overflow:hidden;padding:1em 0;}
.QRimage {margin-left:auto;margin-right:auto;}
.qrframelogo {width:80px;height:30px;background-image:url(images/qrlogo9.png);background-position:center;background-repeat:no-repeat;margin-left:auto;margin-right:auto;}
p.title{width: 80%;margin: 0 auto;padding: 0px 5px 13px 5px;font-size:1.5em;line-height: 1em;font-weight:bold;} 
p.shortlink {margin:0;padding:0.5em 0;font-size:14px;font-weight:bold;}
.clear{clear:both;}
#btnprint {border: medium none;font-weight: bold;height: 30px;margin-top: 20px;width: 70px;}
#tblcontainer{display: table;width:80%;margin:0 auto;}
#tblcontainer .row  {display: table-row;}
#tblcontainer .left, #tblcontainer .right {display: table-cell;}
#tblcontainer .left, #tblcontainer .right {display: text-align: center;vertical-align: middle;}
p.gohere {font-family:"OpenSans";margin:0;padding:0;font-size:1em;color:#000;font-weight:400;width:auto;max-width:100px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin:0 auto;}
p.link {font-family:"OpenSans";margin:0;padding: 5px 0 0;font-size:0.8em;color:#000;font-weight:400;}
p.postx {font-family:"OpenSans";margin:0;padding-top:1em;font-size:1.3em;line-height: 1em;font-weight:700;color:#000;width:auto;max-width:170px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin:0 auto;}
p.pselfiex {font-family:"OpenSans";margin:0;padding-top:0.2em;font-size:35px;line-height: 1em;font-weight:bold;color:#000;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width:auto;max-width:170px;margin:0 auto;}
p.pselfiex2 {margin:0;padding-top:0.2em;font-size:33px;line-height: 1em;font-weight:700;color:#000;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width:auto;max-width:170px;margin:0 auto;}
p.powered {font-family:"OpenSans";font-size:10px;padding-bottom:3px;margin-top:0;color:#000;}
.QRFrame .logo {width:50px;height:19px;background-repeat:no-repeat;margin:0 auto}
#btnprint2 {border: medium none;font-weight: bold;height: 30px;margin-top: 20px;width: 100%;max-width:623px;background-color:#7fba00;cursor:pointer;}
</style>
</head>

<body>
<?php
if($_REQUEST['s'] == 1 OR $_REQUEST['s'] == 0){
?>
<div id="wrap">
<div class="clear"></div>
	<input type="button" onclick="javascript:printpage();" name="btnprint2" id="btnprint2" value="Print Now!">
<div class="clear" style="padding:10px 0;"></div>
	<?php
	for($i=0; $i < 9; $i++){
?>
	<div class="QRFrame2">
	  <p class="gohere"><?php echo decodequote($selfiex1) ?></p>
	  <p class="link"><?php echo $shortlink ?></p>
	  <p class="postx"><?php echo decodequote($selfiex2) ?></p>
	  <p class="<?php echo $class ?>"><?php echo decodequote($selfiex3) ?></p>
	   <div style="padding-top:2em"> 
		<div id="tblcontainer">
			<div class="row">
				<div class="left">
					 <div class="QRimage"></div>
				</div>
				<div class="right">
					<p class="powered">powered by</p>
					<div class="logo"><img src="images/qrcodelogo.png" width="50" height="19" /></div>											
				</div>
			</div>
		</div>
		</div>
	</div>	
	<?php
	}
	?>
	</div>
	
<?php
}else{
?>
<div id="wrap">
  <!--
	<div class="QRFrame">
		  <p class="title"><?php //echo $firstline1 ?></p>
		  <div class="QRimage"></div>
		  <p class="shortlink"><?php //echo $shortlink ?></p>
		  <div class="qrframelogo"></div>  
		</div>	-->
	<?php
	for($i=0; $i < 9; $i++){
	?>
		<div class="QRFrame">
		  <p class="title"><?php echo decodequote($firstline1) ?></p>
		  <div class="QRimage"></div>
		  <p class="shortlink"><?php echo $shortlink ?></p>
		  <img src="images/qrlogo9.png" width="80" height="30" style="margin-left:auto;margin-right:auto;" >
		</div>
	<?php
	}
	?>
	<div class="clear"></div>
	<input type="button" onclick="javascript:printpage();" name="btnprint" id="btnprint" value="Print">
</div>
<?php
}
function decodequote($str){
	$str = str_replace('<double>','"',str_replace('<quote>',"'",$str));
	$str = str_replace('<comma>',',',$str);
	return $str;
}
?>
</body>
</html>
