var placeId = '',blankstar = 'images/template/blankstar.png',colorstar = 'images/template/colorstar.png',fromtakephotopage=1;//fromtakephotopage 1 if from rateone else 2 from takephoto page
var customArray = [],item2Rate=[],ratedObj= [],nicename,isTakeSelfie='',alertaverate=0,last_Id='',lastidbusiness='',photo_url='',get_img='',photo_saved=0;
var count=0,sharedphoto=0,isphototakedone=0,takeaphoto=0,urlphotoshared,thumbnailurl,businessname='',txtname='',txtphone='',txtemail='',sharedlinkphoto='',sharedurl='',userCurEmail='';
var defaultPostReview = {posted:1,percent:3.0},ratecomment='',timeInverval='',closeselfie=0,username='',hadlabel='',istakephoto = 0;
var defaultrating = {vpoor:'Very poor',poor:'Poor',fair:'Average',good:'Good',excellent:'Excellent'};
var defaultButtonText2 = {logout:['okay'],btnshare:['okay'],btncapture:['okay'],follow:['no','yes'],btntake:['okay'],cambtnoption:['cancel','snap','discard','use']},arraytagline={};
var defaultButtonText = {logout:['okay'],btnshare:['okay'],follow:['no','yes'],comment:['proceed'],share:['no','yes'],photo:['no','yes'],cambtnoption:['cancel','snap','discard','use']};
var defaultTextMessage2 = {};
var defaultTextMessage = {sharedT:"You're logged in to <social_media>",sharedB:"Click <double>okay<double> to start sharing!",logoutT:'Auto logout',logoutB:"You'll be logged out of <social_media> after sharing.",followT:'Follow this campaign?',followB:'Press the <double>yes<double> button to agree with Camrally\'s <privacy_policy_link> & allow <campaigner> to contact you.',takePhoto:'Take a new photo?',share:'Share your Camrally Post?',takeselfieT:'Take a selfie!',shareB:'Press the "yes" button to share. By sharing you agree with Camrally\'s <privacy_policy_link>.'},resizeTimeout;

var istest = false,domainpath='',fbPhotoPathShare='',state_Array = ['unpaid','canceled'];

function alertBox(title,message){ // testing
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+decodequote(title)+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay'}]
	});	
	}, 500);//to prevent the events fire twice
}
function alertErrorPage(title,message){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+title+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay',callback:function (){
			window.location = 'error.php';
		}}]
	});	
	}, 500);//to prevent the events fire twice
}
function alertBox2(title,message){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){ 
	$.box_Dialog(decodequote(message), {
		'type':     'question',
		'title':    '<span class="color-white">'+decodequote(title)+'<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'okay',callback:function(){setTimeout(function(){alertform();},500);}}]
	});
	}, 500);//to prevent the events fire twice
}
function sendEmail2Client(cases){
	showLoader();
	//$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases+'&name='+username,success:function(lastId){
		setTimeout(function() {
			if(customArray.redirect > 0){
				var str = customArray.websiteURL;
				var redirectpage = (str.indexOf("http") == -1 ? 'http://'+customArray.websiteURL : customArray.websiteURL);
				window.location = redirectpage;
			}else{
				window.location = domainpath+nicename+'.html';
			}
		},300);
	//}}); 
}
function sendEmail2Client2(cases){
	showLoader();
	//$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases,success:function(lastId){
		setTimeout(function() {
			hideLoader();
			sendEmail2Client(0);
		}, 300);
	//}});
}


function followplace(){
	$.box_Dialog('enter a valid email address...<br/><input type="text" name="email" id="email" placeholder="email" style="width:100%;height:30px;margin-top:5px;" placeholder="password" />', {
		'type':     'question',
		'title':    '<span class="color-white">please enter your email address<span>',
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: 'submit',callback:function(){
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email=$('#email').val();
			if(!regex.test(email))
				setTimeout(function() {	
					$.box_Dialog('Please enter a valid email address', {'type':'question','title':'<span class="color-white">invalid email address<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,
						'buttons':  [{caption: 'okay',callback:function(){
							setTimeout(function() {followplace();}, 300);
						}}]
					});	
				}, 300);
			else{	
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=follow&email='+email+'&placeId='+placeId+'&case=1',success:function(lastId){
					//setdefault();
					sendEmail2Client2(1);
				}});
			}
		}},{caption: 'cancel',callback:function(){setTimeout(function() {
			//saverate();
			sendEmail2Client(0);
		}, 500);}}]
	});
   //clearconsole();	
}
//items: {src: 'http://www.camrally.com/app/privacy_policy.php?name='+customArray.businessName},
function showpolicy(){
	$.magnificPopup.open({
		disableOn: 0,
		items: {src: 'privacy_policy.php?name='+customArray.businessName},
		type: 'iframe',
		preloader: true
	}); 
}
function decodequote(str){
	return String(str).replace(/<double>/g,'"').replace('<privacy_policy_link>','<a href="privacy_policy.php?name='+customArray.businessName+'" class="fancybox fancybox.iframe">Privacy Policy</a>').replace(/<campaigner>/,customArray.businessName).replace(/<comma>/g,',').replace(/{_}/g,"'").replace(/<quote>/g,"'").replace(/{}/g,'"').replace('<social_media>','Facebook');
}

function hadpoorexp(){
	
	setTimeout(function() {
		$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? decodequote(defaultTextMessage.followB) : String(decodequote(defaultTextMessage2.followB))), {
			'type':     'question',
			'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
				setTimeout(function() {
					followplace();
				}, 300);
		}},{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
			//saverate();
			sendEmail2Client(0);
		}, 500);}}]
	  });
   }, 300); 
}

function pressyes(){
	hadpoorexp();
}

function photoshare(isfb){
  //clearconsole();
}

$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
});


function createTempSharedPage(){
	$('.top-button-selfie').hide();
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=generatesharedurl&placeId='+placeId+'&photo_url='+sharedlinkphoto+'&comment='+ratecomment+'&ave='+alertaverate,success:function(link){
		hideLoader();
		sharedurl = link;
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "framelinkshared.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });}, 500);
	}});
}
$(document).on('pageinit','#sharedlinkpage', function(e) {
	var src = sharedurl.split('_');
	$('.fluidMedia').css({"padding-bottom":$( window ).height()+'px'});
	$('.iframeshare').attr('src',domainpath+'user/'+src[0]);
	$('.iframeshare').load(function(){
	//  hideLoader();	
      $.box_Dialog((decodequote((typeof(defaultTextMessage.shareB) != 'undefined' ? defaultTextMessage.shareB : defaultTextMessage2.shareB))), {
			'type':     'question',
			'title':    '<span class="color-white">'+decodequote(defaultTextMessage.share)+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: defaultButtonText.share[1],callback:function (){
				if(isTakeSelfie == 5 || isTakeSelfie == 3 || isTakeSelfie == 2){ //photoboth, checkout anywhere, survey
					setTimeout(function(){
						$.box_Dialog((typeof(defaultTextMessage.logoutB) != 'undefined' ? decodequote(defaultTextMessage.logoutB) : decodequote(defaultTextMessage2.logoutB)), {
							'type':     'question',
							'title':    '<span class="color-white">'+(typeof(defaultTextMessage.logoutT) != 'undefined' ? decodequote(defaultTextMessage.logoutT) : decodequote(defaultTextMessage2.logoutT))+'<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: (typeof(defaultButtonText.logout) != 'undefined' ? decodequote(defaultButtonText.logout[0]) : decodequote(defaultButtonText2.logout[0])),callback:function(){
								showLoader();
								loginFb();
							}}]
						});
					},500);
				}else{
					showLoader();
					loginFb();
				} 
			}},{caption: defaultButtonText.share[0],callback:function(){setTimeout(function(){
				var niceid = sharedurl.split('_');
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=generatedurlremove&placeId='+placeId+'&sharedId='+niceid[1],success:function(lastId){}});
				pressyes();
			},300);}}]
	  });
	  //if(item2Rate.length == 1){
		//setTimeout(function(){alert('r')},10000000);
	 // }	
    });
	if(item2Rate.length == 1)
		e.preventDefault();
});


function fbisfollow(){
	setTimeout(function() {
		$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? String(decodequote(defaultTextMessage.followB)) : String(decodequote(defaultTextMessage2.followB))), {
			'type':     'question',
			'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
				setTimeout(function() {
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=follow&placeId='+placeId+'&case=2&lastId='+lastidbusiness,success:function(lastId){
						//setdefault();
						sendEmail2Client2(1);
					}});
				 //sendEmail2Client();
				}, 300);
				
		}},{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
				//saverate();
				//setdefault();
				 sendEmail2Client(0);
			}, 500);}}]
	  });
  }, 300);
}
function pressyes2(){	
	fbisfollow();
}
function loginFb(){
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	 FB.login(function(response) {
	   if (response.authResponse) {
	   		
	   		$.box_Dialog((typeof(defaultTextMessage.sharedB) != 'undefined' ? String(decodequote(defaultTextMessage.sharedB)) : String(decodequote(defaultTextMessage2.sharedB))), {
				'type':     'question',
				'title':    '<span class="color-white">'+(typeof(defaultTextMessage.sharedT) != 'undefined' ? String(decodequote(defaultTextMessage.sharedT)) : String(decodequote(defaultTextMessage2.sharedT)))+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: (typeof(defaultButtonText.btnshare) != 'undefined' ? defaultButtonText.btnshare[0] : defaultButtonText2.btnshare[0] ),callback:function (){
						shareFb();
				}}]
	  		});
	   }
	   else {
			saveuserinfo2();
	   } 
	 },{scope: 'email'});
}

function shareFb()
{
	var niceid = sharedurl.split('_');
	FB.ui({
	  method: 'share',
	  href: domainpath+'user/'+niceid[0]
	}, function(response){
	  if (response && !response.error_code) {
	  	 postFb();
	  } else {
		saveuserinfo();
	  }
	});
}
function saveuserinfo2()
{

	var p = 'placeId='+placeId+'&userName=&userId=&email=&photo_url='+thumbnailurl+'&param='+isTakeSelfie+'&source=&data=&sharedId='+sharedurl; 
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=savecampaign&'+p,success:function(lastId){
		//setTimeout(function(){followplace();},300);
		$.box_Dialog((typeof(defaultTextMessage.followB) != 'undefined' ? String(decodequote(defaultTextMessage.followB)) : String(decodequote(defaultTextMessage2.followB))), {
				'type':     'question',
				'title':    '<span class="color-white">'+(typeof(defaultTextMessage.followT) != 'undefined' ? String(decodequote(defaultTextMessage.followT)) : String(decodequote(defaultTextMessage2.followT)))+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[1] : defaultButtonText2.follow[1] ),callback:function (){
					setTimeout(function() {
						followplace();
					}, 300);
			}},{caption:(typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
					//saverate();
					 sendEmail2Client(0);
				}, 300);}}]
			});	
	}});
}
function saveuserinfo()
{
	if(FB.getAuthResponse())
	{
		FB.api('/me', function(response) {
			var p = 'placeId='+placeId+'&userName='+response.name+'&userId='+response.id+'&email='+userCurEmail+'&photo_url='+thumbnailurl+'&param='+isTakeSelfie+'&source=&data=&sharedId='+sharedurl; 
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
				FB.logout(function(response) {});
				var ids = lastId.split('_');
				lastidbusiness = ids[1];
				setTimeout(function(){pressyes2();},300);
			}});
		});
	}
}
function postFb()
{
	if(FB.getAuthResponse())
	{
		FB.api('/me', function(response) {
			var p = 'placeId='+placeId+'&userName='+response.name+'&userId='+response.id+'&email='+userCurEmail+'&photo_url='+thumbnailurl+'&param='+isTakeSelfie+'&source=fb&data=&sharedId='+sharedurl; 
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
				FB.logout(function(response) {});
				var ids = lastId.split('_');
				lastidbusiness = ids[1];
				setTimeout(function(){pressyes2();},300);
			}});
		});
	}
}

$(document).ready(function(){ 
   	window.fbAsyncInit = function() {
    // init the FB JS SDK
	   FB.init({
		  appId      : 148972192103323,                        // App ID from the app dashboard
		  status     : true,                                 // Check Facebook Login status
		  xfbml      : true                                  // Look for social plugins on the page
		});
		// Additional initialization code such as adding Event Listeners goes here
  };
  // Load the SDK asynchronously

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); 
   nicename = getUrlVar('p');
   isTakeSelfie = getUrlVar('s');  
   $('.fancybox').fancybox();
   
   if(istest == true){
		//domainpath = 'http://camrally.com/';
		domainpath = 'http://localhost.tabluu.com/dinocam/newrepo/app/';
	}else{
		domainpath = 'http://camrally.com/';
	}
});

$(document).on('pagehide','#rateone', function() {$(this).remove();});


function showLoader(){loader = jQuery('<div id="overlay"> </div>');loader.appendTo(document.body);}
function hideLoader(){$( "#overlay" ).remove();}

function changetextcamerabutton(){
	$('.snapshot .cancelsnap').text((typeof(defaultButtonText.cambtnoption) != 'undefined' ? decodequote(defaultButtonText.cambtnoption[0]) : decodequote(defaultButtonText2.cambtnoption[0])));
		$('.snapshot .takesnap').text((typeof(defaultButtonText.cambtnoption) != 'undefined' ? decodequote(defaultButtonText.cambtnoption[1]) : decodequote(defaultButtonText2.cambtnoption[1])));
		$('.usesnap .cancelsnap').text((typeof(defaultButtonText.cambtnoption) != 'undefined' ? decodequote(defaultButtonText.cambtnoption[2]) : decodequote(defaultButtonText2.cambtnoption[2])));
		$('.usesnap .use').text((typeof(defaultButtonText.cambtnoption) != 'undefined' ? decodequote(defaultButtonText.cambtnoption[3]) : decodequote(defaultButtonText2.cambtnoption[3])));
}

function clearconsole() { 
  console.log(window.console);
  if(window.console || window.console.firebug) {
   console.clear();
  }
}
function messageaftertakeselfie(){
	setTimeout(function() {saveToServer();},1800);
}
function getSelfie(){
		$('#selfieId').val(customArray.placeId);
		$('#fileselfie').click();
		$('#frmtakeselfie').on('change',function(e){ // save fb photo
			takeaphoto = 1;
			// $('#frmtakeselfie').ajaxSubmit({beforeSubmit:  beforeSubmit2,success: showResponse2,resetForm: true });
			beforeSubmit2();
			e.preventDefault();
		});	
		// function showResponse2(responseText, statusText, xhr, $form)  { 
		// 	urlphotoshared=responseText;
		// }
		function beforeSubmit2(){
			if (window.File && window.FileReader){
			   var fsize = $('#fileselfie')[0].files[0].size; //get file size
			   var ftype = $('#fileselfie')[0].files[0].type; // get file type
				switch(ftype){
					case 'image/png':
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/bmp':
					case 'image/pjpeg':
						sharedphoto=1;istakephoto = 1;
						var reader = new FileReader();	
						reader.onload = function(){
	        				var img = new Image();
		        			img.onload = function() {
		        				resizeImage(img);
							};
							img.src = reader.result;
						};
						reader.readAsDataURL($('#fileselfie')[0].files[0]);
						isphototakedone = 1;
						messageaftertakeselfie();
					break;
					default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');
					hideLoader();						
					return false;
				}
			}else{
			   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   return false;
			}			
		}
}
function getPhoto(){
		$('#selfieId').val(customArray.placeId);
		$('#fileselfie').click();
		$('#frmtakeselfie').on('change',function(e){ // save fb photo
			takeaphoto = 1;
			// $('#frmtakeselfie').ajaxSubmit({beforeSubmit:  beforeSubmit_2,success: showResponse_2,resetForm: true });
			beforeSubmit_2();
			e.preventDefault();
		});	
		// function showResponse_2(responseText, statusText, xhr, $form)  { 
		// 	urlphotoshared=responseText;
		// }
		function beforeSubmit_2(){
			if (window.File && window.FileReader){
			   var fsize = $('#fileselfie')[0].files[0].size; //get file size
			   var ftype = $('#fileselfie')[0].files[0].type; // get file type
				switch(ftype){
					case 'image/png':
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/bmp':
					case 'image/pjpeg':
						sharedphoto=1;istakephoto = 1;
						var reader = new FileReader();	
						reader.onload = function(){
							var img = new Image();
		        			img.onload = function() {
		        				resizeImage(img);
							};
							img.src = reader.result;
						};
						reader.readAsDataURL($('#fileselfie')[0].files[0]);
						isphototakedone = 1;
						messageaftertakeselfie();
					break;
					default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');
					hideLoader();						
					return false;
				}
			}else{
			   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   return false;
			}
		}
}

function showCamera(IDparam){
  
	//note: whatpage if 1 from rateone else 2 from takephoto
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');

	Webcam.set({
			width: 640,
			height: 480,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
	Webcam.attach('#screen');

	Webcam.on( 'error', function(err) {
        if(err == 'Access to camera denied')
        {
			$.fancybox.close();
			closeselfie=1;clearInterval(timeInverval);refresh_handler();
        }
    });

	$('.cam-f').show();

    $('.usesnap').show(); // button fo
    $('.usesnap').hide(); // button fo
	var curHeight = window.innerWidth,width=0,height=0,ratio;
	ratio = 0.68;
	width =  curHeight * ratio;
	height = window.innerHeight * 0.68;
    
	//set video snapshot
	$('.snapshot').show(); // Show snapshot buttons

	var shootEnabled = false;
	$.fancybox({'scrolling':'no','closeEffect':'fade','closeClick':false,'closeBtn':false,'overlayColor': '#000','href' :'#data','overlayOpacity': 0.5,'hideOnOverlayClick':false}); 
	$('.snapshot .takesnap').click(function(){
		var snd = new Audio("shutter.mp3"); // buffers automatically when created
		snd.play();

    	Webcam.freeze();
		//if(!shootEnabled) return false;
		$('.snapshot').hide(); // button for snapshot
		$('.usesnap').show(); // button for use		
		return false;
	});
	$('.snapshot .cancelsnap').click(function(e){
		e.preventDefault();
		$.fancybox.close();

		Webcam.reset();

		if(fromtakephotopage == 2){
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "campaign.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });}, 100);
		}	
		closeselfie=1;clearInterval(timeInverval);refresh_handler();
	});
	$('.usesnap .cancelsnap').click(function(e){
		e.preventDefault();

		Webcam.unfreeze();

		$('.snapshot').show(); // button for snapshot
		$('.usesnap').hide(); // button for use
		return false;
	});
	$('.usesnap .use').click(function(){
        sharedphoto=1;istakephoto = 1;
		Webcam.snap(function() {
	        get_img = canvas;
			setCanvasSelfie('shared');
			Webcam.reset();
    	}, canvas);

		$.fancybox.close();
		closeselfie=1;clearInterval(timeInverval);refresh_handler();
		messageaftertakeselfie();
		return false;
	});
    
}

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

function refresh() {
	if(closeselfie == 1){
		window.location = location.href;
	}
}

function refresh_handler() {
    timeInverval = setInterval(refresh, 10*60*1000); //every 10 minutes
}
function invalidUsedBackbtn(){
	//alert('u used back browser');
}


function getLocationData(){
	var ispageok = false;nicename = $('#nicename').val();
	var ios_ver = iOSversion();
	 
	showLoader();
	$.ajax({type: "POST",url:"getData.php",async: true,cache: false,data:'nice='+nicename+'&opt=getrate',success:function(result){
		if(typeof(result) == 'false')
			alertErrorPage('error',"Rating page not found");
		else{
		customArray =  $.parseJSON(result);
		hideLoader();
		
		if(customArray.suspend == 0){ //check if the account is suspended
		if(customArray.button != '')
			defaultButtonText = $.parseJSON(customArray.button);
		if(customArray.messageBox != '')	
			defaultTextMessage = $.parseJSON(customArray.messageBox);
		if(customArray.nicename == "")
			alertErrorPage('setup incomplete','Go to Setup > Your Camrally Page');
		else if(customArray.subscribe < 1)
			alertErrorPage('this campaign is offline','Please change the status to online');
		else{
			changetextcamerabutton();
			if($.inArray(customArray.state,state_Array) == -1){
				placeId = customArray.placeId;
				if($.inArray(getUrlVar('s'),['0','1','2','3','4','5','e','','6','8','b'] ) == -1){
					alertErrorPage('Unauthorized',"Please contact Camrally support");
				}else {
					rate_initialize();
					if(ios_ver[0] == 6)
					{
						$.box_Dialog(('iOS 6 is not supported by Camrally. Please use a device running on iOS 7 and above.'), {
							'type':     'question',
							'title':    '<span class="color-white">Unsupported Version<span>',
							'center_buttons': true,
							'show_close_button':false,
							'overlay_close':false,
							'buttons':  [{caption: 'okay',callback:function(){
									setTimeout(function(){window.location = domainpath+nicename+'.html'},300);
								}}]
						});
					}else{
						$('.wraptext').html(customArray.btntext);
						$('.btn-take-isselfie').unbind('click').click(function(){
								if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
									setTimeout(function(){getSelfie();},200);
								else
									showCamera('#camera-modal');
							//	$('.top-button-selfie').hide();	
						})
					}
				}
			}else
				alertErrorPage('unauthorized',"Please subscribe.");
		}	
		//clearconsole();
		}else
			alertErrorPage('account suspended',"Please contact Camrally Support to unsuspend your account.");
		}	
	}});
}


function topoverlay(){
	$('#rateone').css({marginTop:$('.top-button-selfie').height()});
}
$(document).on('pageinit','#rateone', function() {
	hideLoader();	
	if(typeof(ratedObj[0]) != 'undefined')
		invalidUsedBackbtn();
	getLocationData();
	$( window ).resize(function() { // when window resize
		rate_initialize();
	});
});

function campaign_poster()
{	
	//CAMPAIGN POSTER DO NOT REMOVE
    var bgHeight = '', bgWidth='', campHeight='', campWidth='', campRel='', totalHeight='', commentHeight='';
	campRel = $('.campaign-image').height()/$('.campaign-image').width();
	bgHeight = $(window).height()-$('.top-button-selfie').height();
	bgWidth = bgHeight/campRel;

	$('.left').css('height', bgHeight + 'px');
	$('.left').css('width', bgWidth + 'px');

	if(bgWidth >= bgHeight)
	{
		campHeight = 'auto';
		campWidth = '100%';
	}
	else
	{
		campHeight = '100%';
		campWidth = 'auto';
	}

	$('.campaign-image').css('height', campHeight);
	$('.campaign-image').css('width', campWidth);
	//CAMPAIGN POSTER END

	$('.left').css('margin-top', $('.top-button-selfie').height() + 'px');
	$('.left').css('min-width', $('.campaign-image').width() + 'px');
	$('.left').css('max-width', $('.campaign-image').width() + 'px');
	$('.right').css('margin-top', $('.top-button-selfie').height() + 'px');
	if($(window).width() < ($('.left').width()+350))
	{
		if(bgWidth >= bgHeight)
		{
			campHeight = 'auto';
			campWidth = $(window).width() + 'px';
		}
		else
		{
			campHeight = ($(window).height()-$('.top-button-selfie').height()) + 'px';
			campWidth = $(window).width() + 'px';
		}
		
		$('.left').css('float', 'none');
		$('.left').css('width', campWidth);
		$('.left').css('height', campHeight);
		$('.left').css('min-width', campWidth);

		commentHeight = $(window).height()-($('.left').height()+$('.top-button-selfie').height());
		if(commentHeight > 300)
		{
			totalHeight = commentHeight;
		}
		else
		{
			totalHeight = 300;
		}
		$('.right').css('height', totalHeight + 'px');
		$('.right').css('float', 'none');
		$('.right').css('margin-top', '0px');
		$('.right').css('max-width', $(window).width() + 'px');
	}
	else
	{
		$('.left').css('float', 'left');
		$('.left').css('margin-right', '0px');

		$('.right').css('float', 'right');
		$('.right').css('height', $('.left').height() + 'px');
		$('.right').css('min-width', '350px');

		var wrapperW = $('.campaign-image').width() + $('.right').width() + 1;
		$('.camp-wrapper').css('max-width', wrapperW + 'px' );
	}
	$('.camp-wrapper').css('opacity', 1);
}

function rate_initialize(){
    var img = new Image(), logoUrl ='',logo='',bgback='';
    var bgHeight = '', bgWidth='';
	if(customArray.logo != '')
		logo = $.parseJSON(customArray.logo);
	else
		logo = $.parseJSON('{"dLogo":"images/desktop_default.png","pLogo":"images/iphone_default.png","logo7":"images/7Ins_default.png","mLogo":"images/mobile_default.png","bLogo":"images/desktop_default.png"}');
	if(customArray.backgroundImg)
		bgback = $.parseJSON(customArray.backgroundImg);
	
	if(bgback.bckimage != '' || typeof(bgback.bckimage) != 'undefined'){

		$('.campaign-image').attr('src',(bgback.bckimage != '' ? bgback.bckimage : ''));
		$('.rate').css('overflow-y', 'hidden');

		// var camp_img = new Image();
		// camp_img.onload = function() {
		// 	if(camp_img.width >= camp_img.height)
		// 	{
		// 		bgHeight = 'auto';
		// 		bgWidth = $(window).width() + 'px';
		// 	}
		// 	else
		// 	{
		// 		bgHeight = $(window).height()-$('.top-button-selfie').height() + 'px';
		// 		bgWidth = 'auto';
		// 	}

		// 	$('.rate').css('background-image',(bgback.bckimage != '' ? 'url('+ bgback.bckimage + ')' : ''));
		// 	$('.rate').css('background-size', bgWidth + ' ' + bgHeight);
		// 	$('.rate').css('background-repeat', 'no-repeat');
		// 	$('.rate').css('margin-top', $('.top-button-selfie').height() + 'px');
		// 	if(camp_img.height < ($(window).height()-$('.top-button-selfie').height()))
		// 	{
		// 		$('.rate').css('background-position', 'center center');
		// 	}
		// 	else
		// 	{
		// 		$('.rate').css('background-position', 'center top');
		// 	}
		// };
		// camp_img.src = bgback.bckimage;

	}	

	$( '.rate' ).css({'color':(customArray.backgroundFont != '' ? customArray.backgroundFont : '#3b3a26')});
	//alert(bgback.bckimage)
	//if(bgback.bckimage == '' || typeof(bgback.bckimage) == 'undefined')
		$( '.rate' ).css({'background-color':(customArray.backgroundcolor != '' ? customArray.backgroundcolor : '#7f7f7f')});
	
    if( window.innerWidth <=325){ //iphone
        logoUrl  = logo.pLogo;
		img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
		$( ".rate-logo" ).css({'padding-top':'20px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '48').attr('height', '46');
		$( ".rate-star").css({'width':'48px','font-size':'8px'}); //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'10px 0px','font-size':'18px'});
		$( ".rate-wrapstar").css({'width':'265px'});
		$( ".loc-address").css({'font-size':'7px','padding':'15px 0'});
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-logo" ).css({'padding-top':'10px'});
			$( ".rate-question" ).css({'height':'40px','padding-top':'50px','font-size':'18px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);  
    }else if((window.innerWidth > 325 && window.innerWidth < 600)){ // htc
        logoUrl  = logo.mLogo;    
        img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        });
		$( ".rate-logo" ).css({'padding-top':'25px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '60').attr('height', '58');
		$( ".rate-star").css({'width':'60px','font-size':'10px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'15px 0','font-size':'20px'});
		$( ".rate-wrapstar").css({'width':'325px'}); //width wrap on star image
		$( ".loc-address").css({'font-size':'8px','padding':'15px 0'}); //font address
		$( ".ratelogo").attr('width', '70px');
		$( ".ratelogo").attr('height', '20px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'50px','padding-top':'70px','font-size':'20px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);  
    }else if((window.innerWidth >= 600 && window.innerWidth <= 1024)){ //7 inches
        logoUrl  = logo.logo7;
       img.src = logoUrl;
       $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
	    $( ".rate-logo" ).css({'padding-top':'50px'});
        $( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '100').attr('height', '97');
		$( ".rate-star").css({'width':'100px','font-size':'11px'});  //font below star like poor,very poor
		$( ".rate-question" ).css({'padding':'20px 0px 30px 0px','font-size':'35px'});
		$( ".rate-wrapstar").css({'width':'530px'});
		$( ".loc-address").css({'font-size':'10px','padding':'25px 0 10px 0'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
		 if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){
			$( ".rate-question" ).css({'height':'90px','padding-top':'120px','font-size':'35px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
            $( ".loc-logo" ).hide();
        }else
		  $( ".loc-logo" ).attr('src', logoUrl);
    }else if((window.innerWidth > 1024)){ //desktop
		logoUrl  = logo.dLogo;
        img.src = logoUrl;
        $(img).load(function(){
            var width = img.width;
            var height = img.height;
			$( ".loc-logo" ).attr('width', width);
			$( ".loc-logo" ).attr('height', height);
        }); 
		$( ".rate-logo" ).css({'padding-top':'50px'});
		$( ".imgrate1, .imgrate2, .imgrate3, .imgrate4, .imgrate5" ).attr('width', '132').attr('height', '127');
		$( ".rate-star").css({'width':'132px','font-size':'13px'});  //font below star like poor,very poor
		$( ".rate-wrapstar").css({'width':'704px'});
		$( ".loc-address").css({'font-size':'11px','padding':'20px'});
		$( ".rate-question" ).css({'padding':'30px 0px','font-size':'44px','margin':'0px'});
		$( ".ratelogo").attr('width', '103px');
		$( ".ratelogo").attr('height', '30px');
        if(typeof(logo.dLogo) == 'undefined' || logo.dLogo == ''){ // if logo is empty
			$( ".rate-question" ).css({'height':'100px','padding-top':'150px','font-size':'44px'});
			$( ".rate-logo" ).css({'padding-top':'20px'});
            $( ".loc-logo" ).hide();
        }else
          $( ".loc-logo" ).attr('src', logoUrl);
    }
}
// IMAGE PROCESSING
var overlayHeight = 0;
var overlayY = 0;
var widthOffsetRating = 0;
var widthOffset = 0;

function saveToServer()
{
	var canvas = document.getElementById('canvas-image');
	var dataUrl = canvas.toDataURL('image/jpg', 0.1);
    showLoader();
	$.ajax({
		type: "POST",
		url: "saveimage.php",
		data: {"placeId" : placeId, "dataUrl" : dataUrl},
		success: function(data) {
			sharedlinkphoto = data; 
			saveThumbnail(canvas);
			//postFb();
		}
	});
}

function saveThumbnail(canvas)
{
	var canvasThumb = document.getElementById('canvas-resize');
	var contextThumb = canvasThumb.getContext('2d');
	var width;
	var height;

	contextThumb.clearRect(0, 0, canvasThumb.width, canvasThumb.height);

	width = canvas.width;
	height = canvas.height;

	var rel = height / width;
	if(width > 400 || height > 400)
	{
		width = 400;
		height = width*rel;
		if (height > 400) {
			height = 400;
			width = height/rel;
		}
	}

	// SET CANVAS WIDTH AND HEIGHT
	canvasThumb.setAttribute('width', width);
	canvasThumb.setAttribute('height', height);

	contextThumb.drawImage(canvas, 0, 0, width, height);

	var dataUrl = canvasThumb.toDataURL('image/jpg');

	$.ajax({
      	type: "POST",
     	url: "saveimage.php",
  		data: {"placeId" : placeId,"dataUrl" : dataUrl},
		success: function(data) {
            thumbnailurl = data;
			if(photo_url == "profile")
			{
				photo_url = data;
			}
			else
			{
				urlphotoshared = data;
			}
			createTempSharedPage();
			photo_saved = 1;
		}
  	});
}

function getSize(canvas, value) {
    var ratio = value / 200;   // calc ratio
    var size = canvas.width * ratio;   // get font size based on current width
    return size; // set font
}

function getDate(){
	var d = new Date();
	var month_name = new Array(12);

	month_name[0]="January";
	month_name[1]="February";
	month_name[2]="March";
	month_name[3]="April";
	month_name[4]="May";
	month_name[5]="June";
	month_name[6]="July";
	month_name[7]="August";
	month_name[8]="September";
	month_name[9]="October";
	month_name[10]="November";  
	month_name[11]="December";

	return d.getDate() + " " + month_name[d.getMonth()] + ", " + d.getFullYear();
}

function resizeImage(img)
{
	var canvasResize1 = document.getElementById('canvas-image-test');
	var contextResize1 = canvasResize1.getContext('2d');

	contextResize1.clearRect(0, 0, canvasResize1.width, canvasResize1.height);

	var width = img.width;
	var height = img.height;

	if(width > 800 || height > 800)
	{
		rel = height / width;
		width = 800;
		height = width*rel;
		if (height > 800) {
			height = 800;
			width = height/rel;
		}
	}

	// SET CANVAS WIDTH AND HEIGHT
	canvasResize1.setAttribute('width', width);
	canvasResize1.setAttribute('height', height);

	contextResize1.drawImage(img, 0, 0, width, height);

	rotateImage(canvasResize1, img);
}

function rotateImage(canvasResize1, img)
{
	var canvasResize = document.getElementById('canvas-resize');
	var contextResize = canvasResize.getContext('2d');
	var width = 0;
	var height = 0;
	var x = 0;
	var y = 0;
	var degree = 0;

	width = canvasResize1.width;
	height = canvasResize1.height;

	EXIF.getData(img, function() {
		var orientation = EXIF.getTag(img, "Orientation");
		switch(orientation)
		{
	       case 8:
	       		degree = 270;
				width = canvasResize1.height;
				height = canvasResize1.width;
				x = canvasResize1.width * (-1);
	           break;
	       case 3:
	       		degree = 180;
	       		x = canvasResize1.width * (-1);
      			y = canvasResize1.height * (-1);
	           break;
	       case 6:
	       		degree = 90;
				width = canvasResize1.height;
		  		height = canvasResize1.width;
		  		y = canvasResize1.height * (-1);
	           	break;
	    }
    });

	// SET CANVAS WIDTH AND HEIGHT
	canvasResize.setAttribute('width', width);
	canvasResize.setAttribute('height', height);

	// ROTATE IMAGES
	contextResize.rotate(degree*Math.PI/180);

	// DRAW IMAGE ON CANVAS
	contextResize.drawImage(canvasResize1, x, y);

    get_img = canvasResize;
	setCanvasSelfie('shared');
}

// image processing end

function setCanvasSelfie(img_type)
{
	photo_url = img_type;

	var canvas = document.getElementById('canvas-image');
	var context = canvas.getContext('2d');
	var imgLogo = new Image();
	var width = 1000;
	var height = 0;
	var rel = 0;
	var imgLogoWidth = 38;
	var imgLogoHeight = 14;
	var overlayHeight = 0;
	var overlayY = 0;
	var eventName = customArray.businessName;
	var companyName = customArray.brand;
	var logoText = "Powered by"
	var firstLine = customArray.tag1;
	var secondLine = customArray.tag2;
	var logourl = "images/Logo/Logo_white_1xxsmall.png";
	var eventNameFont = 11;
	var companyNameFont = 4;
	var taglineFont = 5;
	var logoTextFont = 3;	

	var eventNameHeight = 0;
	var dashLineHeight = 0;
	var compImageHeight = 0;
	var taglineHeightTop = 0;
	var taglineHeightBot = 0;
	var taglineWidth = 0;
	var taglineOverlayWidth = 0;
	var logoImageHeight = 0;
	var logoTextHeight = 0;

	var eventNameWidth = 0;
	var compWidth = 0;
	var firstWidth = 0;
	var secondWidth = 0;
	var logoWidth = 0;
	
	var dashWidth = 1;
	var dashInterval = 3;
	var dashLineHeightOffset = 2;
	var widthOffset = 0;
	var totalTaglineWidth = 0;
	var widthOffsetRating = 0;
	var widthTaglineOffset = 8;
	var eventNameDenom = 2;
	var eventNameNom = 0;

	var getNewFont = [];


    width = get_img.width;
   	height = get_img.height;

	rel = height / width;
	if(width > 800 || height > 800)
	{
		width = 800;
		height = width*rel;
		if (height > 800) {
			height = 800;
			width = height/rel;
		}
	}

	// SET CANVAS WIDTH AND HEIGHT
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	// DRAW IMAGE ON CANVAS
	context.drawImage(get_img, 0, 0, width, height);

	// SET FONT SIZE BASED ON CANVAS WIDTH
	taglineFont = getSize(canvas, taglineFont);
	eventNameFont = getSize(canvas, eventNameFont);
	getNewFont = setCanvasSelfieTest(width, height,"eventNameFont", 0, 0, 0);
	eventNameFont = getNewFont[0];
	taglineFont = getNewFont[1];
	taglineWidth = getNewFont[2];

	companyNameFont = getSize(canvas, companyNameFont);
	getNewFont = setCanvasSelfieTest(width, height,"companyNameFont", 0, 0, 0);
	companyNameFont = getNewFont[0];
	if(taglineFont > getNewFont[1])
	{
		taglineFont = getNewFont[1];
		taglineWidth = getNewFont[2];
	}

	imgLogoWidth = getSize(canvas, imgLogoWidth);
	imgLogoHeight = getSize(canvas, imgLogoHeight);
	logoTextFont = getSize(canvas, logoTextFont);

	// SET OFFSET BASED ON CANVAS WIDTH
	widthOffset = setCanvasSelfieTest(width, height, "offset", eventNameFont, companyNameFont, taglineFont);
	widthTaglineOffset = getSize(canvas, widthTaglineOffset);
	dashLineHeightOffset = getSize(canvas, dashLineHeightOffset);
	dashWidth = getSize(canvas, dashWidth);
	dashInterval = getSize(canvas, dashInterval);

	// SET Y AXIS OF TEXT BASED ON FONTSIZE
	eventNameNom = eventNameFont+dashWidth+dashLineHeightOffset+(companyNameFont*1.5);

	// OVERLAY Y AXIS AND OVERLAY HEIGHT
	overlayHeight = eventNameNom + (eventNameNom/2) * rel;
	overlayY = height - overlayHeight;

	// DRAW OVERLAY ON CANVAS
	context.fillStyle = "rgba(0, 0 , 0, 0.5)";
	context.fillRect(0, overlayY, width, overlayHeight);

	// SET Y AXIS OF TEXT BASED ON FONTSIZE
	eventNameHeight = (((overlayHeight - eventNameNom)/eventNameDenom)+overlayY)+eventNameFont;
	dashLineHeight = eventNameHeight+dashLineHeightOffset;

	// SET TEXT COLOR
	context.fillStyle = "#FFFFFF";

	// EVENT NAME
	context.font = eventNameFont + "pt myriadpro";
	context.fillText(eventName,widthOffset,eventNameHeight);
	eventNameWidth =context.measureText(eventName).width;
	// EVENT NAME END

	// DASH LINE
	context.setLineDash([dashWidth, dashInterval]);
	context.beginPath();
	context.moveTo(widthOffset,dashLineHeight);
	context.lineTo(eventNameWidth+widthOffset, dashLineHeight);
	context.strokeStyle = "#FFFFFF";
	context.stroke();
	// DASH LINE END

	// COMPANY NAME
	compImageHeight = eventNameHeight+(companyNameFont*2);

	context.font = companyNameFont + "pt Lato-Light";
	context.fillText(companyName,widthOffset,compImageHeight);
	compWidth =context.measureText(companyName).width;
	// COMPANY NAME END

	if(eventNameWidth > compWidth)
	{
		totalTaglineWidth = (((width-(widthOffset+eventNameWidth+widthTaglineOffset))-taglineWidth)/2)+(widthOffset+eventNameWidth+widthTaglineOffset);
		taglineOverlayWidth = widthOffset+eventNameWidth+widthTaglineOffset;
	}
	else
	{
		totalTaglineWidth = (((width-(widthOffset+compWidth+widthTaglineOffset))-taglineWidth)/2)+(widthOffset+compWidth+widthTaglineOffset);
		taglineOverlayWidth = widthOffset+compWidth+widthTaglineOffset;
	}

	// DRAW DARKER OVERLAY ON CANVAS
	context.fillStyle = "rgba(0, 0 , 0, 0.3)";
	context.fillRect(taglineOverlayWidth, overlayY, width, overlayHeight);

	// SET TEXT COLOR FOR TAGLINE
	context.fillStyle = "#FFFFFF";

	taglineHeightTop = (((overlayHeight - eventNameNom)/eventNameDenom)+overlayY)+(taglineFont*1.5);
	taglineHeightBot = (((overlayHeight - eventNameNom)/eventNameDenom)+overlayY)+(taglineFont*3);
	if(firstLine == '' || secondLine == '' || firstLine == ' ' || secondLine == ' ')
	{
		taglineHeightTop = (((overlayHeight - taglineFont)/2)+overlayY)+taglineFont;
		taglineHeightBot = (((overlayHeight - taglineFont)/2)+overlayY)+taglineFont;
	}

	// FIRST LINE
	context.font = taglineFont + "pt myriadproit";
	context.fillText(firstLine,totalTaglineWidth,taglineHeightTop);
	firstWidth =context.measureText(firstLine).width;
	// FIRST LINE END

	// SECOND LINE
	context.font = taglineFont + "pt myriadproit";
	context.fillText(secondLine,totalTaglineWidth,taglineHeightBot);
	secondWidth =context.measureText(secondLine).width;
	// SECOND LINE END

	if(width >= 300 && width <= 500)
	{
		logourl = "images/Logo/Logo_white_1xsmall.png";
	}
	else if(width > 500)
	{
		logourl = "images/Logo/Logo_white_1small.png";
	}

	imgLogo.onload = function() {

		logoTextHeight = height*0.045;
		
		// POWERED BY
		context.font = logoTextFont + "pt Lato-Light";
		context.fillText(logoText,width*0.834,logoTextHeight);
		logoWidth =context.measureText(logoText).width;

		logoImageHeight = (height*0.035)+logoTextFont;

		context.drawImage(imgLogo, width*0.794, logoImageHeight, imgLogoWidth, imgLogoHeight);
	};
	imgLogo.src = logourl;
}

function setCanvasSelfieTest(widthTest, heightTest, type, bfont, afont, tfont)
{
	var canvasTest = document.getElementById('canvas-image-test');
	var contextTest = canvasTest.getContext('2d');
	
	var eventNameTest = customArray.businessName;
	var companyNameTest = customArray.brand;
	var firstLineTest = customArray.tag1;
	var secondLineTest = customArray.tag2;
	var eventNameFontTest = 11;
	var companyNameFontTest = 4;
	var taglineFontTest = 6;
           
	var eventNameWidthTest = 0;
	var compWidthTest = 0;
	var firstWidthTest = 0;
	var secondWidthTest = 0;
	
	var widthOffsetTest = 0;
	var widthTaglineOffsetTest = 8;
	var totalCompWidthTest = 0;
	var totalEventNameWidthTest = 0;
	var getLineWidth = 0;
	var getLineText = '';

	// SET CANVAS WIDTH AND HEIGHT
	canvasTest.setAttribute('width', widthTest);
	canvasTest.setAttribute('height', heightTest);

	widthTaglineOffsetTest = getSize(canvasTest, widthTaglineOffsetTest);

	// SET FONT SIZE BASED ON CANVAS WIDTH
	if(bfont > 0)
	{
		eventNameFontTest = bfont;
	}
	else
	{
		eventNameFontTest = getSize(canvasTest, eventNameFontTest);
	}

	if(afont > 0)
	{
		companyNameFontTest = afont;
	}
	else
	{
		companyNameFontTest = getSize(canvasTest, companyNameFontTest);
	}

	if(tfont > 0)
	{
		taglineFontTest = tfont;
	}
	else
	{
		taglineFontTest = getSize(canvasTest, taglineFontTest);
	}


	// BRAND NAME
	contextTest.font = eventNameFontTest + "pt myriadpro";
	contextTest.fillText(eventNameTest,0,0);
	eventNameWidthTest = contextTest.measureText(eventNameTest).width;

	// ADDRESS
	contextTest.font = companyNameFontTest + "pt Lato-Hairline";
	contextTest.fillText(companyNameTest,0,0);
	compWidthTest =contextTest.measureText(companyNameTest).width;

	// FIRST LINE
	contextTest.font = taglineFontTest + "pt myriadproit";
	contextTest.fillText(firstLineTest,0,0);
	firstWidthTest =contextTest.measureText(firstLineTest).width;

	// SECOND LINE
	contextTest.font = taglineFontTest + "pt myriadproit";
	contextTest.fillText(secondLineTest,0,0);
	secondWidthTest =contextTest.measureText(secondLineTest).width;

	if(firstWidthTest > secondWidthTest)
	{
		getLineWidth = firstWidthTest;
		getLineText = firstLineTest;
	}
	else
	{
		getLineWidth = secondWidthTest;
		getLineText = secondLineTest;
	}

	switch(type)
	{
		case "offset": 

			totalEventNameWidthTest = eventNameWidthTest + getLineWidth + widthTaglineOffsetTest;
			totalCompWidthTest = compWidthTest + getLineWidth + widthTaglineOffsetTest;

			if(totalCompWidthTest >= totalEventNameWidthTest)
			{
				// SET X AXIS OF TEXT BASED ON FONTSIZE
				widthOffsetTest = ((widthTest - totalCompWidthTest)/3);
			}
			else
			{
				// SET X AXIS OF TEXT BASED ON FONTSIZE
				widthOffsetTest = ((widthTest - totalEventNameWidthTest)/3);
			}
			return widthOffsetTest;
		break;
		case "eventNameFont":
			totalEventNameWidthTest = eventNameWidthTest + getLineWidth + widthTaglineOffsetTest;

			while(totalEventNameWidthTest > widthTest)
			{
				contextTest.clearRect(0, 0, canvasTest.width, canvasTest.height);
				eventNameFontTest = eventNameFontTest - 2;
				contextTest.font = eventNameFontTest + "pt myriadpro";
				contextTest.fillText(eventNameTest,0,0);
				eventNameWidthTest = contextTest.measureText(eventNameTest).width;

				taglineFontTest = taglineFontTest - 1.5;
				contextTest.font = taglineFontTest + "pt myriadproit";
				contextTest.fillText(getLineText,0,0);
				getLineWidth = contextTest.measureText(getLineText).width;

				totalEventNameWidthTest = eventNameWidthTest + getLineWidth + widthTaglineOffsetTest;
			}
			return [eventNameFontTest, taglineFontTest, getLineWidth];
		break;
		case "companyNameFont":
			totalCompWidthTest = compWidthTest + getLineWidth + widthTaglineOffsetTest;

			while(totalCompWidthTest > widthTest)
			{
				contextTest.clearRect(0, 0, canvasTest.width, canvasTest.height);
				companyNameFontTest = companyNameFontTest - 2;
				contextTest.font = companyNameFontTest + "pt  Lato-Hairline";
				contextTest.fillText(companyNameTest,0,0);
				compWidthTest = contextTest.measureText(companyNameTest).width;

				taglineFontTest = taglineFontTest - 1.5;
				contextTest.font = taglineFontTest + "pt myriadproit";
				contextTest.fillText(getLineText,0,0);
				getLineWidth = contextTest.measureText(getLineText).width;

				totalCompWidthTest = compWidthTest + getLineWidth + widthTaglineOffsetTest;
			}
			return [companyNameFontTest, taglineFontTest, getLineWidth];
		break;

	}
}

// image processing (SELFIE ONLY) end

// DETECT IF IOS VERSION == 6
function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  else
  {
  	return [0];
  }
}
//DETECT IF IOS VERSION == 6 end
