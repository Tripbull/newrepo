var placeId = '',blankstar = 'images/template/blankstar.png',colorstar = 'images/template/colorstar.png',fromtakephotopage=1;//fromtakephotopage 1 if from rateone else 2 from takephoto page
var customArray = [],item2Rate=[],ratedObj= [],nicename,isTakeSelfie='',alertaverate=0,last_Id='',lastidbusiness='',photo_url='',get_img='',photo_saved=0;
var count=0,sharedphoto=0,isphototakedone=0,takeaphoto=0,urlphotoshared,businessname='',txtname='',txtphone='',txtemail='',sharedlinkphoto='',sharedurl='',userCurEmail='';
var defaultPostReview = {posted:1,percent:3.0},ratecomment='',timeInverval='',closeselfie=0,username='',hadlabel='',istakephoto = 0;
var defaultrating = {vpoor:'Very poor',poor:'Poor',fair:'Average',good:'Good',excellent:'Excellent'};
var defaultButtonText2 = {logout:['okay'],btnshare:['okay'],btncampaign:['Your Selfie Now!'],btncapture:['okay'],follow:['no','yes'],badEmail:['no','yes'],allow:['cancel','submit'],btntake:['okay'],btnfeedback:['no','yes'],cambtnoption:['cancel','snap','discard','use']},arraytagline={};
var defaultButtonText = {logout:['okay'],btnshare:['okay'],btncampaign:['Your Selfie Now!'],follow:['no','yes'],comment:['proceed'],share:['don\'t share','share'],photo:['no','yes'],option:['cancel','login','reset'],badEmail:['no','yes'],allow:['cancel','submit'],cambtnoption:['cancel','snap','discard','use']};
var defaultTextMessage2 = {sharedT:"You're logged in to <social_media>",sharedB:"Click <double>okay<double> to start sharing!",logoutT:'Auto logout',logoutB:"You'll be logged out of <social_media> after sharing.",followT:'Be a fan of <brand>?',followB:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',badEmailT:'We\'re sorry for your poor experience!',badEmailB:'Do you wish to leave your contact details so that we may get in touch with you?',detailsEmailT:'Please enter your contact details...',detailsEmailB:'Additional info such as room or table number.',allow:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',takeselfieB:'This won\'t work unless you snap a photo. You can either do your awesome selfie pose or take a photo of interesting things around you.',takeselfieT:'Take a selfie!',surveyselfieT:'Take a photo?',surveyselfieB:'Ask your customers to say "yeahhh!" for the camera!',shareB:'Please use the "share" button to recommend <brand>. By sharing you agree with Tabluu\'s <privacy_policy_link>',commentB:'What do you like the most? Is there any area that needs improvement?',captureT:'Your photo is captured',captureB:'This photo will be used to create your review page of the merchant later.',optionT:'Login OR select &quot;reset&quot; to take a new photo'};
var defaultTextMessage = {sharedT:"You're logged in to <social_media>",sharedB:"Click <double>okay<double> to start sharing!",logoutT:'Auto logout',logoutB:"You'll be logged out of <social_media> after sharing.",followT:'Be a fan of <brand>?',followB:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',takePhoto:'Take a new photo?',average:'Your average rating:',thank:'Thank you!',option:'Choose an option…',optionT:'Login OR select &quot;reset&quot; to take a new photo',comment:'Please comment...',share:'Share this page?',badEmailT:'We\'re sorry for your poor experience!',badEmailB:'Do you wish to leave your contact details so that we may get in touch with you?',detailsEmailT:'Please enter your contact details...',detailsEmailB:'Additional info such as room or table number.',allow:'Press the <double>yes<double> button to agree with Tabluu\'s <privacy_policy_link> & allow <brand> to contact you.',takeselfieB:'This won\'t work unless you snap a photo. You can either do your awesome selfie pose or take a photo of interesting things around you.',takeselfieT:'Take a selfie!',surveyselfieT:'Take a photo?',surveyselfieB:'Ask your customers to say "yeahhh!" for the camera!',shareB:'Please use the "share" button to recommend <brand>. By sharing you agree with Tabluu\'s <privacy_policy_link>',commentB:'What do you like the most? Is there any area that needs improvement?',captureT:'Your photo is captured',captureB:'This photo will be used to create your review page of the merchant later.'},resizeTimeout;

var counter1 = 0,counter2 = 0,counter3 = 0,counter4 = 0,counter5 = 0,counter6 = 0,counter7 = 0,countertake=0,countershare=0;
//live mode chargify ids
var everFree = 3356308,basicID=3356305,proID=3356306,enterprise=3356316,basic12 = 3405343,basic24 = 3405344,pro12 = 3405345,pro24 = 3405346,enterprise12 =3410620,enterprise24 =3410619;
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
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases+'&name='+username,success:function(lastId){
		if(customArray.redirect > 0){
			var str = customArray.websiteURL;
			var redirectpage = (str.indexOf("http") == -1 ? 'http://'+customArray.websiteURL : customArray.websiteURL);
			window.location = redirectpage;
		}else{
			window.location = domainpath+nicename+'html';
		}
	}}); 
}
function sendEmail2Client2(cases){
	showLoader();
	$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId+'&opt=sendEmail2Client&cases='+cases,success:function(lastId){
		setTimeout(function() {
			hideLoader();	
			sendEmail2Client(0);
		}, 300);
	}});
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
				//setTimeout(function() {
					//sendEmail2Client(defaultTextMessage.thank,defaultTextMessage.nxt,defaultButtonText.nxt[0]);
				//}, 300);
				saverate();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=follow&email='+email+'&placeId='+placeId+'&case=1',success:function(lastId){
					setdefault();
					sendEmail2Client2(1);
				}});
			}
		}},{caption: 'cancel',callback:function(){setTimeout(function() {
			saverate();
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
	return String(str).replace(/<double>/g,'"').replace('<privacy_policy_link>','<a href="privacy_policy.php?name='+customArray.businessName+'" class="fancybox fancybox.iframe">Privacy Policy</a>').replace(/<brand>/,businessname).replace(/<comma>/g,',').replace(/{_}/g,"'").replace(/<quote>/g,"'").replace(/{}/g,'"').replace('<social_media>','Facebook');
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
			saverate();
			sendEmail2Client(0);
		}, 500);}}]
	  });
   }, 300); 
}

function pressyes(){
	hadpoorexp();
}

function ratevalue(rate,page){
    ratedObj.push(rate);
	if(item2Rate.length > 1 && page == 2){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratetwo.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratetwo.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 2 && page == 3){
	   showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratethree.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		//showLoader();
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratethree.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 3 && page == 4){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefour.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefour.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 4 && page == 5){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefive.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratefive.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 5 && page == 6){
		showLoader();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratesix.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		//setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "ratesix.html",{ transition: "flip",data: 'p='+nicename });hideLoader();}, 100);
	}else if(item2Rate.length > 6 && page == 7){
		showLoader();
		setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateseven.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });}, 100);
	}else{
		if(getUrlVar('s') != '' && getUrlVar('s') == 2){
			clearInterval(timeInverval);
			refresh_handler();
		}
		var val = new Array();
		val['1']='1.0';val['1.25']='1.25';val['1.5']='1.5';val['1.75']='1.75';val['2']='2.0';val['2.25']='2.25';val['2.5']='2.5';val['2.75']='2.75';val['3']='3.0';val['3.25']='3.25';val['3.5']='3.5';val['3.75']='3.75';val['4']='4.0';val['4.25']='4.25';val['4.5']='4.5';val['4.75']='4.75';
		var val2 = ['1.0','1.25','1.5','1.75','2.0','2.25','2.5','2.75','3.0','3.25','3.5','3.75','4.0','4.25','4.5','4.75'];
		var percent = val[defaultPostReview.percent];
		if(typeof(val[defaultPostReview.percent]) == 'undefined')
			percent = val2[defaultPostReview.percent];
		var rate_1 = ratedObj[0];
		var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
		var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
		var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
		var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
		var rate_6 =(typeof(ratedObj[5]) != 'undefined' ? ratedObj[5] : 0);
		var rate_7 =(typeof(ratedObj[6]) != 'undefined' ? ratedObj[6] : 0);
		var totalRated = rate_1 + rate_2 + rate_3 + rate_4 + rate_5 + rate_6 + rate_7;
		var aveRated = totalRated / item2Rate.length ;
		alertaverate = aveRated;
			$.box_Dialog('<p style="padding:5px 0px;text-align:left;font-size:14px;">'+defaultTextMessage.average+' '+ aveRated.toFixed(1) + '/5 </p>'+'<textarea class="comment-txt" placeholder="'+decodequote((typeof(defaultTextMessage.commentB) != 'undefined' ? defaultTextMessage.commentB : defaultTextMessage2.commentB))+'" style="width:100% !important;height:7em !important;margin:0 auto !important;font-size:0.8em;resize: none;overflow:hidden"></textarea>', { 
				'type':     'question',
				'title':    '<span class="color-white">'+defaultTextMessage.comment+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: defaultButtonText.comment[0],callback:function(){
					ratecomment = $('.comment-txt').val();
					if(defaultPostReview.posted > 0 && aveRated >= percent){
						if(customArray.optsocialpost < 1){
							if(istakephoto > 0){
								istakephoto = 0;
								saveToServer();
							}else{
								sharedlinkphoto = customArray.fbImg;
								urlphotoshared = customArray.fbImg;
								createTempSharedPage();
							}	
						}else
							saveToServer();
					}else{
						setTimeout(function(){hadpoorexp2();},300);
					}
				}}]
			});
			setTimeout(function(){$('.comment-txt').focus()},400);
	}
}
function setdefault(){
	ratedObj = [],ratecomment='';urlphotoshared='';photo_url='';get_img='';
	sharedphoto=0;isphototakedone=0;takeaphoto=0;photo_saved=0;userCurEmail='';
}
function saverate(){
    var rate_1 =ratedObj[0];
    var rate_2 =(typeof(ratedObj[1]) != 'undefined' ? ratedObj[1] : 0);
    var rate_3 =(typeof(ratedObj[2]) != 'undefined' ? ratedObj[2] : 0);
    var rate_4 =(typeof(ratedObj[3]) != 'undefined' ? ratedObj[3] : 0);
    var rate_5 =(typeof(ratedObj[4]) != 'undefined' ? ratedObj[4] : 0);
    var rate_6 =(typeof(ratedObj[5]) !== 'undefined' ? ratedObj[5] : 0);
    var rate_7 =(typeof(ratedObj[6]) !== 'undefined' ? ratedObj[6] : 0);
    var totalRated = rate_1 + rate_2 + rate_3 + rate_4 + rate_5 + rate_6 + rate_7;
    var aveRated = totalRated / item2Rate.length ;
    var p = 'placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&case=1&param='+isTakeSelfie+'&label='+hadlabel+'&source=';
    $.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
		last_Id = lastId;
		setdefault();
	}});
	//clearconsole();
}
function photoshare(isfb){
  //clearconsole();
}

$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
});
$(document).on('pageshow','#sharephoto', function() {
	window.history.forward(1);
});

function createTempSharedPage(){
	$('.top-button-selfie').hide(); //
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
								setTimeout(function(){loginFb();},300);
							}}]
						});
					},500);
				}else{
					showLoader();
					setTimeout(function(){loginFb();},300);
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
$(document).on('pageinit','#sharephoto', function() {
	saveToServer(); // ADD RATING TEXT TO IMAGE AND SAVE
    
	if(getUrlVar('s') != '' && getUrlVar('s') == 2){
		clearInterval(timeInverval);
		refresh_handler();
	}
	$('#sharephoto .take-no').html(defaultButtonText.share[0]);
	$('#sharephoto .take-yes').html(defaultButtonText.share[1]);
	$('#sharephoto .titleheader').html(decodequote(defaultTextMessage.share));
	fromtakephotopage = 1;
	//if(countershare < 1){
		sharephoto();
		$( window ).resize(function() { // when window resize
			sharephoto();
		});
		$('#sharephoto .take-no').click(function(e){
		  // showLoader();
		   pressyes();
		   e.preventDefault();
		});
		$('#sharephoto .take-yes').click(function(e){ 
			showLoader();
			loginFb();
			e.preventDefault();
		});
		$('.share_privacy').html(decodequote((typeof(defaultTextMessage.shareB) != 'undefined' ? defaultTextMessage.shareB : defaultTextMessage2.shareB)));
		$.box_Dialog((typeof(defaultTextMessage.logoutB) != 'undefined' ? decodequote(defaultTextMessage.logoutB) : decodequote(defaultTextMessage2.logoutB)), {
			'type':     'question',
			'title':    '<span class="color-white">'+(typeof(defaultTextMessage.logoutT) != 'undefined' ? decodequote(defaultTextMessage.logoutT) : decodequote(defaultTextMessage2.logoutT))+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: (typeof(defaultButtonText.logout) != 'undefined' ? decodequote(defaultButtonText.logout[0]) : decodequote(defaultButtonText2.logout[0]))}]
		});		
		countershare = 1;	
	//}
		function sharephoto(){
			if(window.innerWidth <= 600){
				$('#sharephoto .cam-img').css({'padding-top':'1em'});
				$("#sharephoto .cam-img").attr('width', '170').attr('height', '173');
				$("#sharephoto .take-logo").attr('width', '80').attr('height', '30');
				$('#sharephoto .taketop').css({'padding-top':'1em'});
				$('#sharephoto .take-powered').css({'padding':'0.5em 0 0.2em 0'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1em'});
				$('#sharephoto .take-powered p').css({'font-size':'0.7em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 600 && window.innerWidth <= 1024){ //7 inches
				$('#sharephoto .cam-img').css({'padding-top':'1.5em'});
				$("#sharephoto .cam-img").attr('width', '190').attr('height', '193');
				$("#sharephoto .take-logo").attr('width', '100').attr('height', '37');
				$('#sharephoto .taketop').css({'padding-top':'2em'});
				$('#sharephoto .take-powered').css({'padding':'1em 0 0.2em 0'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1.2em'});
				$('#sharephoto .take-powered p').css({'font-size':'0.8em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}else if(window.innerWidth > 1024){
				$('#sharephoto .cam-img').css({'padding-top':'1.5em'});
				$("#sharephoto .cam-img").attr('width', '200').attr('height', '203');
				$("#sharephoto .take-logo").attr('width', '131').attr('height', '49');
				$('#sharephoto .taketop').css({'padding-top':'4em'});
				$('#sharephoto .take-powered').css({'padding-top':'1em'});
				$('#sharephoto .take-logo').css({'padding-top':'0.5em'});
				$('#sharephoto .takewrap').css({'margin':'0 auto'});
				$('#sharephoto  p.titleheader').css({'font-size':'1.5625em'});
				$('#sharephoto .take-powered p').css({'font-size':'1em'});
				$('#sharephoto .takebutton').css({'margin-top':'10px','padding':'5px 40px 5px 0'});
			}
		}	
});

function alertEmail2(){
	$.box_Dialog((typeof(defaultTextMessage.badEmailB) != 'undefined' ? decodequote(defaultTextMessage.badEmailB) : decodequote(defaultTextMessage2.badEmailB)), {
		'type':     'question',
		'title':    '<span class="color-white">'+(typeof(defaultTextMessage.badEmailT) != 'undefined' ? decodequote(defaultTextMessage.badEmailT) : decodequote(defaultTextMessage2.badEmailT)),
		'center_buttons': true,
		'show_close_button':false,
		'overlay_close':false,
		'buttons':  [{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[1]) : decodequote(defaultButtonText2.badEmail[1])),callback:function(){setTimeout(function() {
			alertform();
		}, 300);}},{caption: (typeof(defaultButtonText.badEmail) != 'undefined' ? decodequote(defaultButtonText.badEmail[0]) : decodequote(defaultButtonText2.badEmail[0])),callback:
		function(){
			showLoader();
			if(isTakeSelfie == '' || isTakeSelfie == 2)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });
		}}]
	});
}
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
						setdefault();
						sendEmail2Client2(1);
					}});
				 //sendEmail2Client();
				}, 300);
				
		}},{caption: (typeof(defaultButtonText.follow) != 'undefined' ? defaultButtonText.follow[0] : defaultButtonText2.follow[0] ),callback:function(){setTimeout(function() {
				//saverate();
				setdefault();
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
	// FB.logout(function(response) {});
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
			var niceid = sharedurl.split('_');
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=generatedurlremove&placeId='+placeId+'&sharedId='+niceid[1],success:function(lastId){}});
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
					saverate();
					 sendEmail2Client(0);
				}, 300);}}]
			});		
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
	  		var niceid = sharedurl.split('_');
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=generatedurlremove&placeId='+placeId+'&sharedId='+niceid[1],success:function(lastId){}});
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
					saverate();
					 sendEmail2Client(0);
				}, 300);}}]
			});		
		  // $.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=generatedurlremove&placeId='+placeId+'&sharedId='+niceid[1],success:function(lastId){}});
	  }
	});
}

function postFb()
{
	if(FB.getAuthResponse())
	{
		FB.api('/me', function(response) {
			
			console.log(response);
			//FB.api('/me/friends',  function(friendlist) {
				var rate_1=0,rate_2 =0,rate_3 =0,rate_4 =0,rate_5 =0,rate_6 =0,rate_7 =0;
				var aveRated = 0.0;
				userCurEmail = (typeof(response.email) != 'undefined' ? response.email : '');
				if(isphototakedone < 0 && takeaphoto > 0){ // take the camera? && check if the photo temporary done uploaded
					setTimeout(function() {
						var p = 'tempPhoto='+photo_url+'&placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+userCurEmail+'&totalFriends=0&photo_url='+urlphotoshared+'&case=2&param='+isTakeSelfie+'&socialopt='+customArray.optsocialpost+'&source=fb&data=&sharedId='+sharedurl; 
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
								var fb='';
								var ids = lastId.split('_');
								lastidbusiness = ids[1];
								//last_Id = ids[0];
								if(sharedphoto > 0)
									fb = 'fb';
								p = p +'&source='+fb;
								$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
									setdefault();
								}});
								FB.logout(function(response) {});	
								setTimeout(function(){pressyes2();},300);
							}
						});			
					}, 500);
				}else{ 
				  //JSON.stringify(response)
				   if(typeof(urlphotoshared) == 'undefined' || urlphotoshared == ''){
						urlphotoshared=customArray.fbImg;
					} 
					var p = 'tempPhoto='+photo_url+'&placeId='+placeId+'&rated1='+rate_1+'&rated2='+rate_2+'&rated3='+rate_3+'&rated4='+rate_4+'&rated5='+rate_5+'&rated6='+rate_6+'&rated7='+rate_7+'&aveRate='+aveRated.toFixed(1)+'&comment='+ratecomment+'&userName='+response.name+'&userId='+response.id+'&email='+userCurEmail+'&totalFriends=0&photo_url='+urlphotoshared+'&case=2&param='+isTakeSelfie+'&label='+hadlabel+'&socialopt='+customArray.optsocialpost+'&source=fb&data=&sharedId='+sharedurl; 
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=ratesave&'+p,success:function(lastId){
							var ids = lastId.split('_');
							lastidbusiness = ids[1];
							//last_Id = ids[0];
							var fb='';
							if(sharedphoto > 0)
								fb = 'fb';
							p = p +'&source='+fb;
							$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=photoshare&'+p,success:function(lastId){
								setdefault();
							}});
							FB.logout(function(response) {});	
							setTimeout(function(){pressyes2();},300);

						}
					});
				}
		});
	}
}



$(document).ready(function(){ 
   $('.fancybox').fancybox();
   
   if(istest == true){
		//domainpath = 'http://camrally.com/';
		domainpath = 'http://localhost/dinocam/newrepo/app/';
		everFree = 3602345,basicID=3361656,basic12 = 3602785,basic24 = 3602788,proID=3361672,pro12 = 3602786,pro24 = 3602789,enterprise=3602346,enterprise12 =3602787,enterprise24 = 3602790;
	}else{
		domainpath = 'http://camrally.com/';
	}
});

$(document).on('pagehide','#rateone', function() {$(this).remove();});

$(document).on( "pagebeforechange", function( e, data ) {
	//alert(data.options.dataUrl)
});
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
   if(customArray.isselfie == 1)
		setTimeout(function() {saveToServer();},1800);
	else{	
		setTimeout(function(){
			$.box_Dialog(decodequote((typeof(defaultTextMessage.captureB) != 'undefined' ? defaultTextMessage.captureB : defaultTextMessage2.captureB)), {
				'type':     'question',
				'title':    '<span class="color-white">'+decodequote((typeof(defaultTextMessage.captureT) != 'undefined' ? defaultTextMessage.captureT : defaultTextMessage2.captureT))+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: (typeof(defaultButtonText.btncapture) != 'undefined' ? decodequote(defaultButtonText.btncapture[0]) : decodequote(defaultButtonText2.btncapture[0])),callback:function(){
					setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });}, 100);
					
				}}]
			});
		},300);
	}
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
			setTimeout(function() {$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+(isTakeSelfie != '' ? '&s='+isTakeSelfie : '')+(hadlabel != '' ? '&label='+hadlabel : '') });}, 100);
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
			if($.inArray(customArray.state,state_Array) == -1){
				placeId = customArray.placeId;
				if($.inArray(getUrlVar('s'),['0','1','2','3','4','5','e','','6','8'] ) == -1){
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
						$('.btn-take-isselfie').html(customArray.btntext);
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

function getTabluuwidget(){
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
		 var toberate=[],selectedItems=[];
		 if(customArray.item2Rate != '')
			toberate = $.parseJSON(customArray.item2Rate);
		 selectedItems = $.parseJSON(customArray.selectedItems);
		  item2Rate=[];
		if(typeof(toberate.rows) != 'undefined'){
			if(typeof(selectedItems.rows) != 'undefined'){
				for(var i in selectedItems.rows){
					for(var j in toberate.rows){
						var name = toberate.rows[j].data.split('_');
						if(name[1] == selectedItems.rows[i].data)
							item2Rate.push(toberate.rows[j].data);
					}
				}
			}else{
				for(var i in selectedItems){
					for(var j in toberate.rows){
						var name = toberate.rows[j].data.split('_');
						if(name[1] == selectedItems[i])
							item2Rate.push(toberate.rows[j].data);
					}	
				}
			}	
		}else{
			for(var i in selectedItems){
				for(var j in toberate){
					var name = toberate[j].split('_');
					if(name[1] == selectedItems[i])
						item2Rate.push(decodequote(toberate[j])); 
				}	
			}
		}
		for(var i in selectedItems){
				for(var j in questionDefault){
					name = questionDefault[j].split('_');
					if(name[1] == selectedItems[i])
						item2Rate.push(questionDefault[j]);
				}	
			}
		if(customArray.reviewPost != '')
			defaultPostReview = $.parseJSON(customArray.reviewPost);
		if(customArray.button != '')
			defaultButtonText = $.parseJSON(customArray.button);
		if(customArray.messageBox != '')	
			defaultTextMessage = $.parseJSON(customArray.messageBox);
		if(customArray.taglineselfie != '')
			arraytagline =  $.parseJSON(customArray.taglineselfie);
		if(customArray.nicename == "")
			alertErrorPage('setup incomplete','Go to Setup > Your Tabluu Page');
		else if(customArray.city == '')	
			alertErrorPage('setup incomplete','Go to Setup > Your Tabluu Page ');
		else if($.trim(customArray.fbImg) == '' && customArray.optsocialpost < 1)
			alertErrorPage('setup incomplete','Go to Setup > Customers\' Social Media Posts > What to Post to Social Media? ');
		else if(customArray.subscribe < 1)
			alertErrorPage('this campaign is offline','Please change the status to online');
		else if(customArray.settingsItem < 1)
			alertErrorPage('settings not locked','To lock, flick the switch "on". Setup > What Questions to Ask');
		else{
			if($.inArray(customArray.state,state_Array) == -1){
				placeId = customArray.placeId;
				if($.inArray(getUrlVar('s'),['0','1','2','3','4','5','e','','6','8'] ) == -1){
					alertErrorPage('Unauthorized',"Please contact Tabluu support");
				}else{
					$('.isselfie').show();
					if(item2Rate.length > 1){
						var ratetxt = item2Rate[1].split('_');
						$('.ratetxt').html(ratetxt[0]);
						rate_initialize();
						if(ios_ver[0] == 6)
						{
							$.box_Dialog(('iOS 6 is not supported by Tabluu. Please use a device running on iOS 7 and above.'), {
								'type':     'question',
								'title':    '<span class="color-white">Unsupported Version<span>',
								'center_buttons': true,
								'show_close_button':false,
								'overlay_close':false,
								'buttons':  [{caption: 'okay',callback:function(){
										setTimeout(function(){window.location = domainpath+nicename+'.html'},300);
									}}]
							});
						}
						else
						{
							//changetextcamerabutton();
							if(tabluurated < 1){
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "rateone.html",{ transition: "flip",data: 'p='+nicename+'&s=3'});
							}else
								ratedObj.push(parseInt(tabluurated));
							 rate(3);	
						}
					}else{
						showLoader();
					    var ratetxt = item2Rate[0].split('_');
						$('.ratetxt').html(ratetxt[0]);
						rate_initialize();
						var imgcolor1 = blankstar,imgcolor2 = blankstar,imgcolor3 = blankstar,imgcolor4 = blankstar,imgcolor5 = blankstar;
						if(tabluurated >= 1)
							imgcolor1 = colorstar;
						if(tabluurated >= 2)
							imgcolor2 = colorstar;
						if(tabluurated >= 3)
							imgcolor3 = colorstar;
						if(tabluurated >= 4)
							imgcolor4 = colorstar;
						if(tabluurated >= 5)
							imgcolor5 = colorstar;
							$( ".imgrate1" ).attr('src', imgcolor1);
							$( ".imgrate2" ).attr('src', imgcolor2);
							$( ".imgrate3" ).attr('src', imgcolor3);
							$( ".imgrate4" ).attr('src', imgcolor4);
							$( ".imgrate5" ).attr('src', imgcolor5);
						setTimeout(function(){ratevalue(parseInt(tabluurated),8)},5000);
					}
				}
			}else
				alertErrorPage('unauthorized',"Please subscribe.");
		}	
		$(".loc-login").on( 'click', function () {login()});
		//clearconsole();
		}else
			alertErrorPage('account suspended',"Please contact Tabluu Support to unsuspend your account.");
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

function rate_initialize(){
    var img = new Image(), logoUrl ='',logo='',bgback='';
	if(customArray.logo != '')
		logo = $.parseJSON(customArray.logo);
	else
		logo = $.parseJSON('{"dLogo":"images/desktop_default.png","pLogo":"images/iphone_default.png","logo7":"images/7Ins_default.png","mLogo":"images/mobile_default.png","bLogo":"images/desktop_default.png"}');
	if(customArray.backgroundImg)
		bgback = $.parseJSON(customArray.backgroundImg);
	
	if(bgback.bckimage != '' || typeof(bgback.bckimage) != 'undefined'){
		var bgSize = $(window).height()-$('.top-button-selfie').height();
		$( '.rate' ).css('background-image',(bgback.bckimage != '' ? 'url('+bgback.bckimage+')' : ''));
		$('.rate').css('background-size', 'auto ' + bgSize + 'px');
		$('.rate').css('background-repeat', 'no-repeat');
		$('.rate').css({backgroundPosition: 'center top'});
	}	
	$( '.rate' ).css({'color':(customArray.backgroundFont != '' ? customArray.backgroundFont : '#3b3a26')});
	//alert(bgback.bckimage)
	//if(bgback.bckimage == '' || typeof(bgback.bckimage) == 'undefined')
		$( '.rate' ).css({'background-color':(customArray.backgroundcolor != '' ? customArray.backgroundcolor : '#DBEBF1')});
	
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
  		data: {"dataUrl" : dataUrl},
		success: function(data) {

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
	var imgLogoWidth = 35;
	var imgLogoHeight = 12;
	var overlayHeight = 0;
	var overlayY = 0;
	var eventName = customArray.businessName;
	var companyName = customArray.brand;
	var logoText = "Powered by"
	var firstLine = customArray.tag1;
	var secondLine = customArray.tag2;
	var logourl = "images/tabluu-logo-mono-xxsmall.png";
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
	var widthTaglineOffset = 10;
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
		logourl = "images/tabluu-logo-mono-xsmall.png";
	}
	else if(width > 500)
	{
		logourl = "images/tabluu-logo-mono-small.png";
	}

	imgLogo.onload = function() {

		logoTextHeight = height*0.05;
		
		// POWERED BY
		context.font = logoTextFont + "pt Lato-Light";
		context.fillText(logoText,width*0.88,logoTextHeight);
		logoWidth =context.measureText(logoText).width;

		logoImageHeight = (height*0.04)+logoTextFont;

		context.drawImage(imgLogo, width*0.84, logoImageHeight, imgLogoWidth, imgLogoHeight);
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
	var widthTaglineOffsetTest = 10;
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
