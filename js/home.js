$(document).ready(function() {

	$('.widthDiv').css('font-size', $('.title1').css('font-size'));
	wordwrap('title1');
	wordwrap('title2');
	wordwrap('title3');
	wordwrap('title4');
	wordwrap('title5');

	$( window ).resize(function() { // when window resize
		$('.widthDiv').css('font-size', $('.title1').css('font-size'));
		wordwrap('title1');
		wordwrap('title2');
		wordwrap('title3');
		wordwrap('title4');
		wordwrap('title5');
	});	

		var istimerunning = 1;
	$('.signupbtn').click(function(e){
		e.preventDefault();		
		/*
		if(istimerunning > 0){
			showLoader();
			var data = 'opt=btngetcoupon&type='+$('#campaign').val();
			$.ajax({type: "POST",async: false,url:"setData.php",cache: false,data:data,success:function(data){
				hideLoader();
				var str = data.split('_');
				if(str[0] > 0){
					if($('#campaign').val() > 1)
						window.location = 'http://camrally.com/app/beta.html';
					else
						window.location = 'http://camrally.com/app/alpha.html';
				}else{
					getEmail();
				}
			}});
		}else
			getEmail(); */
			window.location = 'app/signup.html?type=1&plan=basic';
	});
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
  var $clock = $('.worday')
    .on('update.countdown', function(event) {
      //var format = '%H Hour%!H, %M Min%!M, %S Sec%!S';
	 
      if(event.offset.weeks > 0) {
		$(this).html(event.strftime('%-w week%!w'));
		//$('.left-content').is(":visible"))
		$('.m-week').html(event.strftime('0%-w'));
      }else
		 $(this).html(event.strftime('%-w week'));
	  if(event.offset.days > 9)
       $('.day').html(event.strftime('%-d'));
	  else
		$('.day').html(event.strftime('0%-d'));
      $('.hour').html(event.strftime('%H'));
	  $('.min').html(event.strftime('%M'));
	  $('.sec').html(event.strftime('%S'));
      
    })
    .on('finish.countdown', function(event) {
	  // $(this).html(event.strftime('%H Hour%!H, %M Min%!M, %S Sec%!S'));
	  $(this).html(event.strftime('%-w week'));
	  $('.m-week').html(event.strftime('%-w'));
	  $('.day').html(event.strftime('0%-d'));
      $('.hour').html(event.strftime('%H'));
	  $('.min').html(event.strftime('%M'));
	  $('.sec').html(event.strftime('%S'));
		istimerunning = 0;
    });
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
	//selectedDate = new Date('2015/02/06 9:05:47').valueOf() + val;
	
	$clock.countdown(selectedDate.toString());
  }
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

	function wordwrap(questionContainer) {
		$('.' + questionContainer).css('width', 'auto');
		var str = $('.' + questionContainer).html();
		var containerWidth = $('.' + questionContainer).width();
		var textWidth = txtWidth(str, 'width');
		var textHeight = txtWidth(str, 'height');
		var lines = Math.ceil(textWidth/$('.' + questionContainer).width());
		var senHeight = textHeight*lines;
		var widthDiff = textWidth - containerWidth;
		if(widthDiff > 2)
		{
			$('.' + questionContainer).width(textWidth/lines);
			console.log(textWidth, lines);

			while($('.' + questionContainer).height() > senHeight)
			{
				$('.' + questionContainer).width($('.' + questionContainer).width()+10);
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