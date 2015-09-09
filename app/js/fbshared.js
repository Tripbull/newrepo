$(document).ready(function() {
	var width = $('.left').width();
	$( window ).resize(function() { // when window resize
		var width = $('.left').width();
		if($( window ).width() <=1100)	
			$('.right').css({"maxWidth":width+'px'});
		else	
			$('.right').css({"maxWidth":'360px'});
		 $(".fb-comments").attr("data-width", $(".comments").width());
		FB.XFBML.parse($(".comments")[0]);	
	});	
	if($( window ).width() <=1100)	
		$('.right').css({"maxWidth":width+'px'});
	else	
		$('.right').css({"maxWidth":'360px'});
})