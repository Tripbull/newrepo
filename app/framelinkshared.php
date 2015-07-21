<?php
session_start();
$ur_session = rand(0, 15);
$_SESSION['session']=$ur_session;
?>
<!DOCTYPE html>
<html> 
<head>
	<title>shared pages</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='campaign.html?<?php echo  $_SERVER['QUERY_STRING']; ?>'</script>
    <style type="text/css">

	</style>
</head>
<body>
<div id="sharedlinkpage" data-dom-cache="false" data-role="page">
	<div class="fluidMedia">
		<iframe src="" class="iframeshare" frameborder="0"> </iframe>
	</div>
</div>	
</body>
</html>