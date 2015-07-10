$(document).ready(function(){
	/*$(window).load(function () {	
		$.magnificPopup.open({
			disableOn: 0,
			items: {src: 'http://www.youtube.com/watch?v=GZsYqyy_rP4'},
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false
		});
	});	
	$(window).load(function () {
		$('.popup-link').magnificPopup({ 
			type: 'image',
			preloader: true
		});
	});*/
	
	$(document).on('click', '.popup-link2', function (e) {
		$('.popup-link2').magnificPopup({ 
			type: 'image',
			preloader: true
		}); 
		e.preventDefault();
	});
	
	$('.timing-container p span').css({'font-family': 'myriad_prolight'});
	/* $(document).on('click', '.play', function (e) {
	   	$.magnificPopup.open({
			disableOn: 0,
			items: {src: 'http://www.youtube.com/watch?v=GZsYqyy_rP4'},
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false
		});
	 })*/
        
	if($("#total-page").val() == $("#page").val()){
		$( "#firtsubmit" ).addClass("none");
	}
	$( ".next-submit" ).click(function() {	
		var page = parseInt($("#page").val()) + 1;
		var offset = parseInt($("#offset").val()) + 5;
		$("#offset").val(offset);
		$("#page").val(page);
		$(".comment-container").html('<img src="images/tabluu_preloader.gif" width="24" height="24" style="margin: auto 0"  />');	
		$.ajax({
		  type: "POST",
		  url: "Reviews.php",
		  data: { placeId: $("#placeid").val(), offset: offset }
		}).done(function( msg ) {
			$(".comment-container").html(msg);
			checkpage();
		});			
	});
	$( ".prv-submit" ).click(function() {	
		checkpage();
		var page = $("#page").val() - 1;
		var offset = parseInt($("#offset").val()) - 5;
		$("#offset").val(offset);		
		$("#page").val(page);
		$(".comment-container").html('<img src="images/tabluu_preloader.gif" width="24" height="24" style="margin: auto 0"  />');
		$.ajax({
		  type: "POST",
		  url: "Reviews.php",
		  data: { placeId: $("#placeid").val(), offset: offset }
		}).done(function( msg ) {
			$(".comment-container").html(msg);
			checkpage();
		});			
	});
	$(document).on('click','#contactsubmit',function(e) { //contact tabluu page 
	e.preventDefault();
	var name = $("#cName").val();
	var email = $("#cEmail").val();
	var subject = $("#cSubject").val();
	var message = $("#cMessage").val();
	var setting = 1;
	$('#cError').html('<img src="images/tabluu_preloader.gif" width="21" height="11" />');
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(name == '' || email == '' || subject == '' || message == '')
			$('#cError').html('<p style="color:red">Invalid Please complete all the required field(s)</p>');	
		else{
		   	if(!regex.test(email))
				$('#cError').html('<p style="color:red">Invalid Please enter a valid email address</p>');
			else{
				$.ajax({
					data:"name="+name+"&email="+email+"&subject="+subject+"&message="+message+'&setting='+setting,
					url:"tabluuContact.php",
					type: "POST",
					success:function(result){
						$('#cError').html('<p style="color:red">Message sent! Please allow up to 24hrs for a reply. Thank you!</p>');	
					}
				});
			}
	    }
  });
  	$(document).on('click','#affsubmit',function(e) { //contact tabluu page 
	e.preventDefault();
	var name = $("#cName").val();
	var email = $("#cEmail").val();
	var subject = $("#cSubject").val();
	var message = $("#cMessage").val();
	var setting = 0;
	$('#cError').html('<img src="images/tabluu_preloader.gif" width="21" height="11" />');
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(name == '' || email == '' || subject == '' || message == '')
			$('#cError').html('<p style="color:red">Invalid Please complete all the required field(s)</p>');	
		else{
		   	if(!regex.test(email))
				$('#cError').html('<p style="color:red">Invalid Please enter a valid email address</p>');
			else{
				$.ajax({
					data:"name="+name+"&email="+email+"&subject="+subject+"&message="+message+'&setting='+setting,
					url:"tabluuContact.php",
					success:function(result){
						$('#cError').html('<p style="color:red">Message sent! Please allow up to 24hrs for a reply. Thank you!</p>');	
					}
				});
			}
	    }
  });
	$( ".menu" ).click(function(e) {
		//e.preventDefault();
	  //$( "#showHide" ).show('slow');
	  $( "#submenu" ).toggle('slow');
	});

});
function checkpage(){
	if($("#total-page").val() == $("#page").val()){
		if($("#page").val() > 1){
			$( "#prv-submit" ).addClass("none");
			$( "#next-submit" ).addClass("none");
			$( "#firtsubmit" ).addClass("none");
			$( "#lastsubmit" ).removeClass("none");
		}else{
			$( "#prv-submit" ).addClass("none");
			$( "#next-submit" ).addClass("none");
			$( "#lastsubmit" ).addClass("none");
			$( "#firtsubmit" ).removeClass("none");
		}
	}else{
		if($("#page").val() == 1){
			$( "#prv-submit" ).addClass("none");
			$( "#next-submit" ).addClass("none");
			$( "#firtsubmit" ).removeClass("none");
			$( "#lastsubmit" ).addClass("none");		
		}else{
			$( "#prv-submit" ).removeClass("none");
			$( "#next-submit" ).removeClass("none");
			$( "#firtsubmit" ).addClass("none");
			$( "#lastsubmit" ).addClass("none");
		}
	}
} 