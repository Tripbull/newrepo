$(document).ready(function() {
	var width = $('.left').width();
	$( window ).resize(function() { // when window resize
		var width = $('.left').width();
		if($( window ).width() <=1100)	
			$('.right').css({"maxWidth":width+'px'});
		else	
			$('.right').css({"maxWidth":'360px'});	
	});	
	if($( window ).width() <=1100)	
		$('.right').css({"maxWidth":width+'px'});
	else	
		$('.right').css({"maxWidth":'360px'});	
})