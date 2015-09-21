function wordwrap(questionContainer) {
	$('.' + questionContainer).css('width', 'auto');
	var str = $('.' + questionContainer).html();
	var textWidth = txtWidth(str, 'width');
	var textHeight = txtWidth(str, 'height');
	var lines = Math.ceil(textWidth/$('.' + questionContainer).width());
	var senHeight = textHeight*lines;
	var fontWidth = txtWidth('W', 'width');
	if(lines > 1)
	{
		$('.' + questionContainer).width(textWidth/lines);

		while($('.' + questionContainer).height() > senHeight)
		{
			$('.' + questionContainer).width($('.' + questionContainer).width()+fontWidth);
		}
	}
}

function txtWidth(str, type){
	$('.widthDiv').html(str);
	var width = $('.widthDiv').width();
	var height = $('.widthDiv').height();
	if(type == 'width')
	{
	  	return width;
	}
	else
	{
	  	return height;
	}
}
$(document).ready(function() {
var height = $( window ).height() - 100,lastScrollTop = 0,resizeTimeout,latest=0;
$( '.fundwrap-content').css( {"min-height":height.toFixed() + 'px'} ); 
$(".showproductsimg").fancybox({helpers : {title : {type : 'inside'}}});
if(getCookie('topxclose') == ''){
	$('.bottom-campaign-link').removeClass('hide').show();
	$('body').css({paddingTop:$('.bottom-campaign-link').height()});
	$('.ribbonwhite-overlay').css({top:47});
}
App.tabledList.init(".trend-campaign");
   $(function () {
		$(window).scroll(function () {
			var documentHeight = $(document).height();
			/*
			if($(window).scrollTop() > 0){ //scrolling down
				if ($(window).scrollTop() + $(window).height() > (documentHeight*0.7))
					$('.bottom-campaign-link').fadeOut('slow');
			} else {
				$('.bottom-campaign-link').fadeIn('slow');
			}*/
		});
	});
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + ";";
	}
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	$('.top-xclose').click(function(){
		setCookie('topxclose', 1, 5);
		$( ".bottom-campaign-link" ).remove();
		$('body').css({paddingTop:0});
		$('.ribbonwhite-overlay').css({top:-20});
	});		
	$('.trending').click(function(e){
		e.preventDefault();
		$('.latest').removeClass( "active-li" );
		$('.trending').addClass( "active-li" );
		$('.latest-shared').hide();
		$('.m-latest-shared').hide();
		$('.m-trend-campaign').show();
		$('.trend-campaign').show();
		if($(window).width() > 600){
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':3},
				success:function(object){
					hideLoader();
					$('.m-trend-campaign').html('');
					$(object).appendTo($('.trend-campaign'));
					App.tabledList.init(".trend-campaign");
					$(".trend-campaign").masonry('reload');
				}
			});
		}else{
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':4},
				success:function(object){
					hideLoader();
					$('.m-trend-campaign').html('');
					$(object).appendTo($('.m-trend-campaign'));
				}
			});
		}
	});
	$('.latest').click(function(e){
		e.preventDefault();
		showLoader();
		$('.trending').removeClass( "active-li" );
		$('.trend-campaign').hide();
		$('.m-trend-campaign').hide();
		$('.latest-shared').removeClass( "hide" ).show();
		$('.m-latest-shared').removeClass( "hide" ).show();
		$('.trending').removeClass( "active-li" );
		$('.latest').addClass( "active-li" );
		if(latest < 1){
			latest = 1;
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':1},
				success:function(object){
					hideLoader();
					$(object).appendTo($('.latest-shared'));
					App.tabledList.init(".latest-shared");
					$(".latest-shared").masonry('reload');
				}
			});
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':2},
				success:function(object){
					hideLoader();
					$(object).appendTo($('.m-latest-shared'));
				}
			});
			
		}
	});
	wordwrap('txtfund');
	$( window ).resize(function() { // when window resize
		wordwrap('txtfund');
		$('body').css({paddingTop:$('.bottom-campaign-link').height()});
	});
  function showLoader(){loader = jQuery('<div id="overlay"></div>');loader.appendTo(document.body);}
  function hideLoader(){$( "#overlay" ).remove();}
  function alertBox2(title,message){
		$.box_Dialog(message, {
			'type':     'question',
			'title':    '<span class="color-white">'+title+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay',callback:function(){setTimeout(function(){getEmail();},300);}}]
		});
	}
 }); 