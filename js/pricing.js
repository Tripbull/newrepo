$(document).ready(function(){
	// pre-launch code start here
	var tempdomail = '',istimerunning = 1;
	if($('#campaign').val() > 1)
		tempdomail = 'http://camrally.com/app/beta.html';
	else
		tempdomail = 'http://camrally.com/app/alpha.html'
 
	function setuplink(){
		
		if(istimerunning > 0){
			showLoader();
			var data = 'opt=btngetcoupon&type='+$('#campaign').val();
			$.ajax({type: "POST",async: false,url:"setData.php",cache: false,data:data,success:function(data){
				hideLoader();
				var str = data.split('_');
				if(str[0] > 0){
					window.location = tempdomail;
				}else{
					getEmail();
				}
			}});
		}else
			getEmail();
	}		
	
    function getEmail(){
		$.box_Dialog(
		'<form id="frmalert" action="#" method="post" enctype="multipart/form-data" ><p>Be the first to know next time...</p><div class="alertbox"><input type="text" name="txtname" id="txtname" value="" placeholder="name"/><p></p><input type="text" value="" name="txtemail" id="txtemail" placeholder="email"/><br/><p style="text-align:left;font-size:1em"></p></div></form>', {
		'type':     'question',
		'title':    '<span class="color-white">Sorry! The deal is over!<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'submit',callback:function(){
		
			txtname=$('#txtname').val(),txtemail=$('#txtemail').val();
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if($('#txtname').val() == ''){
				setTimeout(function() {alertBox2('incomplete information','Please input your name');},300);
			}else if(!regex.test($('#txtemail').val())){
					setTimeout(function() {alertBox2('invalid email address','Please enter a valid email address');},300);
			}else{	
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=emaillist&'+$('#frmalert').serialize(),success:function(lastId){
					hideLoader();
				}});
			}
		}},{caption: 'cancel',callback:function(){
			
		}}]
	});
	}
	/*
	$('#basic-link').click(function(e){e.preventDefault();setuplink();});
	$('#pro-link').click(function(e){e.preventDefault();setuplink();});
	$('#enter-link').click(function(e){e.preventDefault();setuplink();});
	*/
	$('#basic-link').attr('href', 'app/signup.html?type=1&plan=basic');
	$('#pro-link').attr('href', 'app/signup.html?type=1&plan=pro');
  var clock = $('.worday').on('update.countdown', function(event){}).on('finish.countdown', function(event) {istimerunning = 0;});
  //switches();
  function switches() {
    //var val = $(this).val().toString().match(/^([0-9\.]{1,})([a-z]{1})$/),
	    var val = $('#txttime').val().split('_')
        qnt = parseFloat(val[0]),
        mod = val[1];
    switch(mod) {
      case 's':
        val = qnt * 1000;
        break;
	  case 'min':
        val = qnt * 60 * 1000;
        break;	
      case 'h':
        val = qnt * 60 * 60 * 1000;
        break;
      case 'd':
        val = qnt * 24 * 60 * 60 * 1000;
        break;
      case 'w':
        val = qnt * 7 * 24 * 60 * 60 * 1000;
        break; 
	   case 'm':
        val = qnt * 30 * 24 * 60 * 60 * 1000;
        break;
       case 'y':
        val = qnt * 365 * 24 * 60 * 60 * 1000;
        break; 	
      default:
        val = 0;
    }
   	var selectedDate = '';
	if($('#isclokstart').val() > 0)
		selectedDate = new Date($('#stardate').val()).valueOf() + val;
	else
		selectedDate = new Date().valueOf();
	  clock.countdown(selectedDate.toString());
  }
  // end of prelaunch code
  
  
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
	// top menu monthly - 1 yearly - 2 yearly
	$( ".month-plan" ).click(function(e) {
		e.preventDefault();
		$('a.month-plan div').removeClass('dark');$('a.year-plan div').removeClass('dark');$('a.year2-plan div').removeClass('dark');
		$('a.month-plan div').addClass('dark');
		var basicprice = '$9.90',proprice = '$29.90',enterpriseprice = '$59.90',textmonthly = 'monthly';
		var basic = basicprice,pro = proprice,enterprise = enterpriseprice;
		$('.basic-price').html(basic);
		$('.pro-price').html(pro);
		$('.enter-price').html(enterprise);
		$('.txtmontly').html(textmonthly);
		/*$('#basic-link').attr('href', 'http://tabluu.chargify.com/h/3356305/subscriptions/new');
		$('#pro-link').attr('href', 'http://tabluu.chargify.com/h/3356306/subscriptions/new');
		$('#enter-link').attr('href', 'http://tabluu.chargify.com/h/3356316/subscriptions/new'); */
		
		$('#basic-link').attr('href', 'app/signup.html?type=1&plan=basic');
		$('#pro-link').attr('href', 'app/signup.html?type=1&plan=pro');
		$('#enter-link').attr('href', 'app/signup.html?type=1&plan=enterprise'); 

	});
	$( ".year-plan" ).click(function(e) {
		e.preventDefault();
		$('a.month-plan div').removeClass('dark');$('a.year-plan div').removeClass('dark');$('a.year2-plan div').removeClass('dark');
		$('a.year-plan div').addClass('dark');
		var basicprice = '$118.80',proprice = '$358.80',enterpriseprice = '$718.80',textmonthly = '1 yearly';
		var basic = basicprice,pro = proprice,enterprise = enterpriseprice;
		$('.basic-price').html(basic);
		$('.pro-price').html(pro);
		$('.enter-price').html(enterprise);
		$('.txtmontly').html(textmonthly);
		/*$('#basic-link').attr('href', 'http://tabluu.chargify.com/h/3405343/subscriptions/new');
		$('#pro-link').attr('href', 'http://tabluu.chargify.com/h/3405345/subscriptions/new');
		$('#enter-link').attr('href', 'http://tabluu.chargify.com/h/3410620/subscriptions/new'); */
		$('#basic-link').attr('href', 'app/signup.html?type=2&plan=basic');
		$('#pro-link').attr('href', 'app/signup.html?type=2&plan=pro');
		$('#enter-link').attr('href', 'app/signup.html?type=2&plan=enterprise'); 
	});
	$( ".year2-plan" ).click(function(e) {
		e.preventDefault();
		$('a.month-plan div').removeClass('dark');$('a.year-plan div').removeClass('dark');$('a.year2-plan div').removeClass('dark');
		$('a.year2-plan div').addClass('dark');
		var basicprice = '$237.60',proprice = '$717.60',enterpriseprice = '$1,437.60',textmonthly = '2 yearly';
		var basic = basicprice,pro = proprice,enterprise = enterpriseprice;
		$('.basic-price').html(basic);
		$('.pro-price').html(pro);
		$('.enter-price').html(enterprise);
		$('.txtmontly').html(textmonthly);
		/*$('#basic-link').attr('href', 'http://tabluu.chargify.com/h/3405344/subscriptions/new');
		$('#pro-link').attr('href', 'http://tabluu.chargify.com/h/3405346/subscriptions/new');
		$('#enter-link').attr('href', 'http://tabluu.chargify.com/h/3410619/subscriptions/new');*/
        $('#basic-link').attr('href', 'app/signup.html?type=3&plan=basic');
		$('#pro-link').attr('href', 'app/signup.html?type=3&plan=pro');
		$('#enter-link').attr('href', 'app/signup.html?type=3&plan=enterprise'); 
		
	});
});