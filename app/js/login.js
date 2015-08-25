$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
	 $('input[type="text"]').textinput({ preventFocusZoom: true });
});
var resizeTimeout,clickme=0;
$(document).ready(function(){

	var height = ($( window ).height() / 16) - 5;
	$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );
	
	$('#txtcode').val(rand_str(7));
	
	$(".create-accnt").click(function () {  // delete place
		window.location= "signup.html";	
	});
	$('#codereload').click(function(){
		$('#txtcode').val(rand_str(7));
	})
    $(".prob-login").click(function () {  // popup
		$('#codemail').val('');
		$('#confirmcode').val('');
		$('#invalidcode').html('');
		$('#popup-prob-login').popup('open');
	});	

	$("#signInPwd").keypress(function(e) {
		if(e.which == 13){
			$("#signInEmail").focus();
			login();
		}
	})		
	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.contentwrap').css( {"min-height":height.toFixed() + 'em'} );
	});

	$("#submit-setpwd").click(function () {  // generate new pwd
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var demail=$('#codemail').val();
		if(!regex.test(demail))
		  $('#invalidcode').html('Please enter a valid email address');
		else if($('#txtcode').val() == $('#confirmcode').val()){
			$('#invalidcode').html('<img src="images/template/loader.gif" width="16" height="16"/>');
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getEmail&email='+$('#codemail').val(),success:function(is_exist){	
				if(is_exist > 0){
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=resetpwd&email='+$('#codemail').val(),success:function(lastId){
						$('#invalidcode').html('A temporary password is sent to your email address.');
					}});
				}else
					$('#invalidcode').html('email provided not existed');
			}});	
		}else
			$('#invalidcode').html('Invalid code try again');
	});	
	function login(){
		//setTimeout(function(){
		//if(clickme < 1){
		//clickme = 1;
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var demail=$('#signInEmail').val();
		if(!regex.test(demail)){
			alertBoxfocus('invalid','Please enter a valid email address',"#signInEmail");
		}else if($('#signInPwd').val() == ''){
			alertBoxfocus('incomplete','Please input password',"#signInPwd");
		}else{
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=login&pwd='+$.md5($('#signInPwd').val())+'&email='+$('#signInEmail').val(),success:function(status){
				$('#overlay').remove();
				if(status > 0){
					if(status == 1)
						window.location= "index.html";	
					else
						alertBox('account suspended','Please contact Camrally Support to unsuspend your account.');	
				}else
					alertBoxfocus('please try again','Invalid email or password',"#signInPwd");
			}});
		}
		//}	
		//},300);
	}
	//$( "#submit-signing" ).on('click',function() { // signing in
		
	$( "#submit-signing" ).click(function(e) { // signing in
		e.preventDefault();
		login();
	});

	function alertBox(title,message,id){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
		$.box_Dialog(message, {
			'type':     'question',
			'title':    '<span class="color-gold">'+title+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay'}]
		});
		}, 500);//to prevent the events fire twice
	}
	function alertBoxfocus(title,message,id){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
		$.box_Dialog(message, {
			'type':     'question',
			'title':    '<span class="color-gold">'+title+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay',callback:function(){$(id).focus();}}]
		});
		}, 500);//to prevent the events fire twice
	}	
	function rand_str(limit)
	{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < limit; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
});

