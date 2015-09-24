$(document).ready(function() {
	var isResult = 0,m_isResult=0,j=0,featureOffset=$('#blimit').val(),notfeatureOffset=0,reviewOffset=0,m_featureOffset=1,m_notfeatureOffset=1,m_reviewOffset=2,m_limit=5,triggerload = false,path=$( "#path" ).val(),d_limit=50,pageincre=1,pagefeatincre=1,isbtnshowfeature = 0,isbtnshow = 0;
	$( ".resizeme" ).aeImageResize({ height: 176, width: 176 });
	var pagesonadvocates = $('#advocatepages').val(),pagefeature = $('#totalfeature').val();
	App.tabledList.init("#campin-showimage");
	App.tabledList.init("#campin-advocate");
	$( window ).resize(function() { // when window resize
		$( ".resizeme" ).aeImageResize({ height: 176, width: 176 });
	});
	$('.sharedpage').fancybox({width:'90%'});
	$('.fancybox').fancybox({});
	$(".showproductsimg").fancybox({helpers : {title : {type : 'inside'}}});
	$("li.sub-comment").click(function(e){
		e.preventDefault();
		$('#comment').show();
		$('#comment').removeClass('hide');
		$('#masoncontainer').hide();
	});
	$("#li-showhide").click(function(e)
	{
		e.preventDefault();
		$('#comment').hide();
		$('#masoncontainer').show();	
		if($(this).hasClass( "li-advocate" )){
			$('.textadvo').html('Gallery');
			$('#campin-showimage').removeClass( "hide" );
			$(this).removeClass( "li-advocate" );
			$(this).addClass( "li-showcase" );
			$('.showcaseimg').hide();
			$('.advocateimg').show();
		}else if($(this).hasClass( "li-showcase" )){
			$('.textadvo').html('Posts');
			$('#campin-showimage').removeClass( "hide" );
			$(this).removeClass( "li-showcase" );
			$(this).addClass( "li-advocate" );
			$('.advocateimg').hide();
			$('.showcaseimg').show();
			App.tabledList.init("#campin-showimage");
		}
	});
	$("#ScrollToTop").click(function()
	{
		$(window).scrollTop(0);
		return false;
	});
	function hideloader(){setTimeout(function(){$( "#overlay" ).hide();},1000);}
	$(".loadmorebtn").click(function(e){ //code for advocates not feature
		if(pageincre < pagesonadvocates){
			$( "#overlay" ).show();
			var offset = pageincre * d_limit;
			pageincre++;
			$.ajax({
				url: 'app/loadadvocate.php',	
				type: 'POST',
				data: {offset:offset,limit:d_limit,placeId:$('#placeid').val(),feature:0},
				success:function(object){
					$( "#overlay" ).hide();
					$(object).appendTo($('#campin-advocate'));
					App.tabledList.init("#campin-advocate");
					$("#campin-advocate").masonry('reload');
				}
			});
		}else{
			//$('#advocatepages').val(0);
			$('.loadmorebtn').hide();
		}
	});
	$(".loadmorefeaturebtn").click(function(e){ //code for advocates feature
		if(pagefeatincre < pagefeature){
			$( "#overlay" ).show();
			//alert('feature '+pagefeatincre +'<='+ pagefeature)
			var offset = pagefeatincre * d_limit;pagefeatincre++;
			$.ajax({
				url: 'app/loadadvocate.php',	
				type: 'POST',
				data: {offset:offset,limit:d_limit,placeId:$('#placeid').val(),feature:1},
				success:function(object){
					$( "#overlay" ).hide();
					$(object).appendTo($('#campin-advocate'));
					App.tabledList.init("#campin-advocate");
					$("#campin-advocate").masonry('reload');
				}
			});
		}else{
			//$('#totalfeature').val(0);
			$('.loadmorefeaturebtn').hide();
			if($('#advocatepages').val() > 0){
				$( "#overlay" ).show();
				$.ajax({
					url: 'app/loadadvocate.php',	
					type: 'POST',
					data: {offset:0,limit:d_limit,placeId:$('#placeid').val(),feature:0},
					success:function(object){
						$( "#overlay" ).hide();
						$(object).appendTo($('#campin-advocate'));
						App.tabledList.init("#campin-advocate");
						$("#campin-advocate").masonry('reload');
					}
				});
				if($('#advocatepages').val() > 1)
					$('.loadmorebtn').show();
			}
		}
	});
	function scrollToTopCheck() {
		if ( timer ) clearTimeout(timer);
        timer = setTimeout(function(){
		 // fix for IE bug on tabluu page
		$(".vdesktop .header").css('top', '0px');
		if($(window).scrollTop() == 0){browserMessage();}
		// end of fix for IE bug on tabluu page
		
		if ($(window).scrollTop() > 500) $("#ScrollToTop").show();
		else $("#ScrollToTop").hide();
		var documentHeight = $(document).height();
		if($(window).width() > 600){
			if($('#totalfeature').val() > 1){
				if($(window).scrollTop() + $(window).height() > (documentHeight*0.7) && isbtnshowfeature < 1){
					$('.loadmorefeaturebtn').show();
					isbtnshowfeature = 1;
				}	
			}else if($('#advocatepages').val() > 1 && ($('#numberoffeature').val() <= 20 || $('#totalfeature').val() < 2)){
				if($(window).scrollTop() + $(window).height() > (documentHeight*0.7) && isbtnshow < 1){
					$('.loadmorebtn').show();
					isbtnshow = 1;
				}	
			}
		}
		/*
		else{
			if($('#totalfeature').val() > 1){
				if($(window).scrollTop() + $(window).height() > (documentHeight*0.7) && isbtnshowfeature < 1){
					$('.loadmorefeaturebtn').show();
					isbtnshowfeature = 1;
				}	
			}else if($('#advocatepages').val() > 1 && ($('#numberoffeature').val() <= 20 || $('#totalfeature').val() < 2)){
				if($(window).scrollTop() + $(window).height() > (documentHeight*0.7) && isbtnshow < 1){
					$('.loadmorebtn').show();
					isbtnshow = 1;
				}	
			}
		} */
		
		}, 300);
	}
	var timer;
    $(window).scroll(scrollToTopCheck);
	// Fancy Form
	$(".FancyForm input[type=text], .FancyForm input[type=password], .FancyForm textarea").each(function() {
		if ($(this).val()) $(this).addClass("NotEmpty"); 
	}).change(function() {
		if ($(this).val()) $(this).addClass("NotEmpty");
		else  $(this).removeClass("NotEmpty");
	});

	if($(window).width() > 600){
       App.tabledList.init("#campin-showimage");
		App.tabledList.init("#campin-advocate");
	}
	$.ajax({type: "POST",url:path+"firstloadhtml.php",cache: false,data:'placeId='+$('#placeid').val()+'&opt=contactus',success:function(result){
		$('.mailto').attr('href','mailto:'+result)
	}});
	/*
	$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset=0&limit=1&case=1',success:function(result){
		if(result == 0){
			$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset=0&limit=1&case=2',success:function(result){
				if(result != 0)
					$('#m_reviews').append(result);
			}})
		}else
			$('#m_reviews').append(result);
	}}); */
	$('#top-reviews').click(function(e){
		e.preventDefault();
		$('.m-comment').addClass('hide');
		$('.m-images').show();
		$('#m_productImages').hide();
		$('#m_reviews').removeClass('hide');
		$('#m_reviews').show();
		$('#topmenu ul li#showcase').removeClass('activeMenu');
		$('#topmenu ul li#top-reviews').addClass('activeMenu');
		//m_showreviews();
	})
	$('#showcase').click(function(e){
		e.preventDefault();
		$('#m_reviews').hide();
		$('.m-comment').addClass('hide');
		$('.m-images').show();
		$('#m_productImages').removeClass('hide');
		$('#m_productImages').show();
		$('#topmenu ul li#top-reviews').removeClass('activeMenu');
		$('#topmenu ul li#showcase').addClass('activeMenu');
	});
	$('.m-btncomment').click(function(e){
		e.preventDefault();
		$('.m-images').hide();
		$('.m-comment').removeClass('hide');
	});
	/*
	$('#socialmenu ul').on('click', ' > li', function () {
	    var curClick = $(this).index();
		$('#socialmenu ul li a').each(function (index) {
			if(curClick == index)
				$(this).addClass('menuiconactive');
			else
				$(this).removeClass('menuiconactive');
		});	
	});	
	$('.topleftmenu').click(function(){
		$('#socialmenu ul li a').each(function (index) {
			$(this).removeClass('menuiconactive');
		});	
	});*/
	function m_showreviews(){
		if(m_isResult < 1){
			$( "#overlay" ).show();
			$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+m_featureOffset+'&limit='+m_limit+'&case=1',success:function(result){
				if(result == 0 && m_isResult < 1){ 
					$.ajax({type: "POST",url:path+"m_reviews.php",cache: false,data:'placeId='+$('#placeid').val()+'&offset='+m_notfeatureOffset+'&limit='+m_limit+'&case=2',success:function(data){
						if(data == 0)
							m_isResult = 1;
						else{	
							m_notfeatureOffset = m_limit + m_notfeatureOffset;
							$('#m_reviews').append(data);
						}
						hideloader();
					}});
				}else{
					m_featureOffset = m_limit + m_featureOffset;
					$('#m_reviews').append(result);
					hideloader();
				}
			}});
		}
	}
});