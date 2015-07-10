<?php 
	$browser = get_browser(null, true);
?>

<div class='browser-div' style='display:none;'> 
	This site does not support Internet Explorer. Please use Google Chrome for best viewing experience. 
	<a id='browser-button' href='#' onclick='clickOk();'>
		OK
	</a>
</div>

<script type="text/javascript">

	if (!sessionStorage.clickOk) {
	    sessionStorage.clickOk = 0;
	}

 	if (typeof jQuery !== "undefined") {
		$(function(){
			browserMessage();
		});
    }
    else
    {
		window.onload = function()
		{
			browserMessage();
		}
    }

    function browserMessage()
    {
		var getBrowser = "<?php echo $browser['browser']; ?>";

		if(getBrowser == "IE" && sessionStorage.clickOk == 0)
		{
			$('.browser-div').css('display', 'block');
			$(".vdesktop .header").css('top', '20px');
		}
    }

	function clickOk()
	{
		$('.browser-div').css('display', 'none');
		sessionStorage.clickOk = 1;
		$(".vdesktop .header").css('top', '0px');
	}
</script>

<style type="text/css">
	.browser-div{
		font-family: sans-serif !important;
		font-size: 14px;
		line-height: 1.42857143;
		color: #333;
		text-align:center;
		box-sizing: border-box;
		text-shadow: none;
	}

	#browser-button{
		padding: 2px 20px !important;
		color: white !important;
		border: 1px solid #ccc;
		font-size: 14px !important; 
		vertical-align: middle;
		text-decoration: none !important;
		margin-left: 20px;
		background: linear-gradient(to bottom, #A39E9E 0%, #C0BEBE 100%);
		box-sizing: border-box;
		line-height: 1.42857143;
		text-align: center;
		font-weight: normal !important;
	}
</style>