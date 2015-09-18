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
App.tabledList.init(".trend-campaign");
   $(function () {
		$(window).scroll(function () {
			var documentHeight = $(document).height();
			if($(window).scrollTop() > 0){ //scrolling down
				if ($(window).scrollTop() + $(window).height() > (documentHeight*0.7))
					$('.bottom-campaign-link').fadeOut('slow');
			} else {
				$('.bottom-campaign-link').fadeIn('slow');
			}
		});
	});
	function clearhtml(){
		$('.trend-campaign').html('');
		$('.m-trend-campaign').html('');
		$('.latest-shared').html('');
		$('.m-latest-shared').html('');
	}
		
	$('.trending').click(function(e){
		e.preventDefault();
		clearhtml();
		$('.latest').removeClass( "active-li" );
		$('.trending').addClass( "active-li" );
		$('.latest-shared').hide();
		$('.m-latest-shared').hide();
		$('.m-trend-campaign').show();
		$('.trend-campaign').show();
		
		if($(window).width() > 600){
			$('.trend-campaign').html('');
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':3},
				success:function(object){
					hideLoader();
					$('.trend-campaign').html('');
					$(object).appendTo($('.trend-campaign'));
					App.tabledList.init(".trend-campaign");
					$(".trend-campaign").masonry('reload');
				}
			});
		}else{
			$('.m-trend-campaign').html('');
			$.ajax({
				url: 'latestadvocate.php',	
				type: 'POST',
				data: {'case':4},
				success:function(object){
					hideLoader();
					$(object).appendTo($('.m-trend-campaign'));
				}
			});
		}
	});
	$('.latest').click(function(e){
		e.preventDefault();
		clearhtml();
		showLoader();
		$('.trending').removeClass( "active-li" );
		$('.trend-campaign').hide();
		$('.m-trend-campaign').hide();
		$('.latest-shared').removeClass( "hide" ).show();
		$('.m-latest-shared').removeClass( "hide" ).show();
		$('.trending').removeClass( "active-li" );
		$('.latest').addClass( "active-li" );
		//if(latest < 1){
		//	latest = 1;
			if($(window).width() > 600){
				$('.latest-shared').html('');
				$.ajax({
					url: 'latestadvocate.php',	
					type: 'POST',
					data: {'case':1},
					success:function(object){
						hideLoader();
						$('.latest-shared').html('');	
						$(object).appendTo($('.latest-shared'));
						App.tabledList.init(".latest-shared");
						$(".latest-shared").masonry('reload');
					}
				});
			}else{
				$('.m-latest-shared').html('');
				$.ajax({
					url: 'latestadvocate.php',	
					type: 'POST',
					data: {'case':2},
					success:function(object){
						$('.m-latest-shared').html('');
						hideLoader();
						$(object).appendTo($('.m-latest-shared'));
					}
				});
			}
		//}
	});
	wordwrap('txtfund');
	$( window ).resize(function() { // when window resize
		wordwrap('txtfund');
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