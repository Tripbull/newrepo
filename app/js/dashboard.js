var curClick=0,locId=0,frmpagemanage=0,setupclickmenu=0,defaultSetup=0,noPhoto = 'images/template/no-photo.gif',loadingPhoto = 'images/template/no-photo-tran.gif',isprofileupdated=0,reviewQuestion=[],feedbackArray=[],featureArray=[],inviteEmailvisited=0,isAdminCreatedLocation=0,lab='',vanitylinkupdate=0,newvanitylink='',selfieonly = 0,bgwizard=0,invited=0,invitedemail='';
var locArray=[],userArray=[],customArray=[],viewOnce=0,geocoder,lat=0,lng=0,domainFile="http://camrally.com";chargifydomain = 'https://tabluu.chargify.com';
var locDefault = '',placeId=0,placename='',keyId=0,loader='',activeLocLength=1,isfocus=0,t=0,comp_id_old=0,locname='',arraylabel=[];
var online ='images/template/active.png',onlineBg='images/template/activeOnline.png',offline ='images/template/inactive.png',offlineBg='images/template/activeOffline.png',imagesArray=[],videosArray=[],txtdescription='',txtimg='',txtvideourl='',txtvideotitle='',product_plan_array=[],component_array=[],transac=[],activity_array=[],issetup = 0,postwizard=0,isselfie=0;
//live mode chargify ids
var liteID = 3720054,basicID=3716169,proID=3716170;
//live component chargify ids
var com_basicID=26331,com_basic12 = 39047,com_basic24 = 39048,com_proID=26332,com_pro12 = 39050,com_pro24 = 39051,com_enterprise=26333,com_enterprise12 =39053,com_enterprise24 =39054,newentryloc = 0; 
//compoentprice
com_basicID_price=9.90,com_basic12_price = 99.00,com_basic24_price = 178.20,com_proID_price=29.90,com_pro12_price = 299.00,com_pro24_price = 538.20,com_enterprise_price=59.90,com_enterprise12_price =599.00,com_enterprise24_price =1078.20;
var istest=true,domainpath='',pathfolder='';
var creditsFree=0,creditsBasic = 2000, creditsPro = 5000, creditsEnterprise = 10000,creditsPrise = 6000;
var newplaceId,profilewizardsetup=0,profilewizardwebImg = 0,profilewizardwebVid = 0,uicwizardsetup=0,questionwizardsetup=0,campaignwizard=0,vanitywizard=0,emailwizardsetup=0,resizeTimeout,isdonewizard=0,logowizard=0;
var state_Array = ['unpaid','canceled'];

$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
	 $('input[type="text"]').textinput({ preventFocusZoom: true });
});

$(document).ready(function(){
	$('.fancybox').fancybox();
	if(istest == true){
			//test mode chargify ids
		basicID=3716169,proID=3716170,liteID = 3720054; 
		//test component chargify ids
		chargifydomain = 'https://camrally.chargify.com';
		photourl2='http://camrally.com/staging/'
		//domainpath = 'http://camrally.com/staging/';
		domainpath = '';
	}else{
		photourl2='http://camrally.com/app/'
		domainpath = 'http://camrally.com/';
		chargifydomain = 'https://camrally.chargify.com';
		pathfolder = 'http://camrally.com/app/';
	}
});

	function wizardAlert(whatsetup,level,steps){
		//showLoader();
		//var steps = 6;//(selfieonly == 1 ? 7 : 7);
		if(whatsetup == 1){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Please set your time zone.</p>';
			var redirect = "settings.html";	
        }else if(whatsetup == 2){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Please add a new campaign.</p>';
			var redirect = "index.html";
			$('.addnew-loc').hide();
			$('.text-loc').show();
        }else if(whatsetup == 3){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Please complete your profile.</p>';
			var redirect = "profile.html";
		}else if(whatsetup == 4){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p style="text-align:left;">Please upload your profile image (for individuals) or a logo of your organization.</p>';
			var redirect = "profile.html";
			curClick = 1;
        }else if(whatsetup == 5){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p style="text-align:left;">Please upload one image related to your campaign.</p>'
						+'<p style="text-align:left;padding-top:7px">You may return to the image section later & upload up to 8 images.</p>';
			var redirect = "profile.html";
			createProfileMenu2();
		}else if(whatsetup == 6){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p style="text-align:left;">Please upload one video related to your campaign.</p>';
				body += '<p style="text-align:left;padding-top:7px">You may return to the video section later & upload up to 8 videos.</p>';
			var redirect = "profile.html";
			createProfileMenu2();
        }else if(whatsetup == 7){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p style="text-align:left;">Please upload your campaign poster & enter your campaign message.</p>';
			var redirect = "setup.html";
			curClick = 1;
		 }else if(whatsetup == 8){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Customize your Camrally link.</p>';
			var redirect = "profile.html";
			curClick = 1;
        }else if(whatsetup == 9){
			curClick = 2;
			var redirect = "feedback.html"; 
			$( ":mobile-pagecontainer" ).pagecontainer( "change",redirect,{});
			isdonewizard = 1;
			return;
        }
		//if(whatsetup != 6){
			$.box_Dialog(body, {
				'type':     'question',
				'title':    '<span class="color-white">'+title+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'okay',callback:function(){
					$( ":mobile-pagecontainer" ).pagecontainer( "change",redirect,{});
					setTimeout(function(){$('#text-6').focus();},300);
				}}]
			});	
		//}
	}
	
	function wizardforloction(){
		locId = newplaceId;
		var locOption = locId.split('|');
		keypad = locOption[0];
		if(locOption[2] < 1 && locOption[1] > 0){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+keypad+'&opt=getCustom',success:function(result){
				customArray =  $.parseJSON(result);
				placename  = customArray.businessName;
				hideLoader();var j=0;var v=0;
				if(selfieonly == 1)
					customArray.settingsItem = 1;
				if(customArray.webImg != '')
					j++;
				if(customArray.webImg2 != '')
					j++;
				if(customArray.webImg3 != '')
					j++;
				if(customArray.webImg4 != '')
					j++;
				if(customArray.webImg5 != '')
					j++;
				if(customArray.webImg6 != '')
					j++;
				if(customArray.webImg7 != '')
					j++;
				if(customArray.webImg8 != '')
					j++;	

				if(customArray.vidImg != '')
					v++;
				if(customArray.vidImg2 != '')
					v++;
				if(customArray.vidImg3 != '')
					v++;
				if(customArray.vidImg4 != '')
					v++;
				if(customArray.vidImg5 != '')
					v++;
				if(customArray.vidImg6 != '')
					v++;
				if(customArray.vidImg7 != '')
					v++;
				if(customArray.vidImg8 != '')
					v++;

				if(customArray.organization == ''){
					profilewizardsetup=1;logowizard=1; 
					wizardAlert(3,1,6);
				}else if(customArray.logo == ''){
					bgwizard = 1;campaignwizard=1;imgproductwizard=1;profilewizardwebImg = 1;
					wizardAlert(4,2,6);	
				}else if(j == 0){
					profilewizardwebVid = 1;
					wizardAlert(5,3,6);
				}else if(v == 0){
					wizardAlert(6,4,6);
				}else if(campaignwizard == 1){
					vanitywizard=1;
					wizardAlert(7,5,6);
				}else if(vanitywizard == 1){
					wizardcreatedlink=1;
					wizardAlert(8,6,6);			
				}else if(locOption[2] < 1){
					issetup = 1;uicwizardsetup = 0;
					wizardAlert(9,7,6);
				}
			}});
		}
	} 

    function wizardsetup(){
		//if(userArray.setup != '') {
			//var wizardtrack =  $.parseJSON(userArray.setup);
			if(userArray.permission < 1){
				if(locArray.length < 1){
					if(userArray.timezone == '')
						wizardAlert(1,1,8);
					else
						wizardAlert(2,2,8);
				}else{
					if(locArray.length == 1 && locArray[0].setup < 1){
						showLoader();
						keypad = locArray[0].id;
						locId = locArray[0].id+'|'+locArray[0].subscribe;
						$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+keypad+'&opt=getCustom',success:function(result){
							customArray =  $.parseJSON(result);
							placename  = customArray.businessName;
							hideLoader();var j=0;var v=0;
							if(selfieonly == 1)
								customArray.settingsItem = 1;
							if(customArray.webImg != '')
								j++;
							if(customArray.webImg2 != '')
								j++;
							if(customArray.webImg3 != '')
								j++;
							if(customArray.webImg4 != '')
								j++;
							if(customArray.webImg5 != '')
								j++;
							if(customArray.webImg6 != '')
								j++;
							if(customArray.webImg7 != '')
								j++;
							if(customArray.webImg8 != '')
								j++;	

							if(customArray.vidImg != '')
								v++;
							if(customArray.vidImg2 != '')
								v++;
							if(customArray.vidImg3 != '')
								v++;
							if(customArray.vidImg4 != '')
								v++;
							if(customArray.vidImg5 != '')
								v++;
							if(customArray.vidImg6 != '')
								v++;
							if(customArray.vidImg7 != '')
								v++;
							if(customArray.vidImg8 != '')
								v++;	

							if(customArray.organization == ''){
								profilewizardsetup=1;logowizard=1; 
								wizardAlert(3,3,6);
							}else if(customArray.logo == ''){
								bgwizard = 1;campaignwizard=1;imgproductwizard=1;profilewizardwebImg = 1;
								wizardAlert(4,4,6);	
							}else if(j == 0){
								profilewizardwebVid = 1;
								wizardAlert(5,5,6);
							}else if(v == 0){
								wizardAlert(6,6,6);
							}else if(campaignwizard == 1){
								vanitywizard=1;
								wizardAlert(7,7,6);
							}else if(vanitywizard == 1){
								wizardcreatedlink=1;
								wizardAlert(8,8,6);			
							}else if(locArray[0].setup < 1){
								issetup = 1;uicwizardsetup = 0;
								wizardAlert(9,9,8);
							}
					    }});
				}else{
					//var ind = locArray.length - 1;
					if(newentryloc > 0)
						wizardforloction();
				}
			}
		}else{
			if(isAdminCreatedLocation > 0)
				wizardforloction();
		}
	}
	
	function showLoader(){loader = jQuery('<div id="overlay"> </div>');loader.appendTo(document.body);}
	function hideLoader(){$( "#overlay" ).remove();}
	
		function logout(){
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost";
				/*$.ajax({url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		*/
			}},{caption: 'cancel'}]
			});
		}
		
		function showrate(){
			places = locId.split('|');
			if(places[1] > 0){
			showLoader();
			  $.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+places[0]+'&opt=getCustom',async: false,success:function(result){
				 customArray =  $.parseJSON(result);
				hideLoader();
					var j=0;
					if(customArray.webImg != '')
						j++;
					if(customArray.webImg2 != '')
						j++;
					if(customArray.webImg3 != '')
						j++;
					if(customArray.webImg4 != '')
						j++;
					if(customArray.webImg5 != '')
						j++;
					if(customArray.webImg6 != '')
						j++;
					if(customArray.webImg7 != '')
						j++;
					if(customArray.webImg8 != '')
						j++;
					if(customArray.organization == '')	
						alertBox('setup incomplete','Go to Setup > Camrally Page ');
					//else if(customArray.fbImg == '' && customArray.optsocialpost < 1)
						//alertBox('setup incomplete','Go to Setup > Customers\' Social Media Posts > Default Image for Facebook Posts ');
					//else if(j < 2)
					//	alertBox('setup incomplete','Go to Setup > Your Tabluu (Business) Page ');						
					//else if(customArray.nicename == "")
						//alertBox('setup incomplete','Go to Setup > Your Camrally Page > Create Your Camrally Page');
					else if(customArray.subscribe < 1)
						alertBox('this campaign is offline','Please change the status to online');
					else
						window.open('campaign.html?p='+customArray.nicename,'_blank');
			  }});
			
			}else
				alertBox('this campaign is offline','Please change the status to online');
		}
	function feedbackpage(s){
			places = locId.split('|');
			if(places[1] > 0){
			showLoader();
			  $.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+places[0]+'&opt=getCustom',async: false,success:function(result){
				 customArray =  $.parseJSON(result);
				hideLoader();
					var j=0;
					if(customArray.webImg != '')
						j++;
					if(customArray.webImg2 != '')
						j++;
					if(customArray.webImg3 != '')
						j++;
					if(customArray.webImg4 != '')
						j++;
					if(customArray.webImg5 != '')
						j++;
					if(customArray.webImg6 != '')
						j++;
					if(customArray.webImg7 != '')
						j++;
					if(customArray.webImg8 != '')
						j++;
					if(customArray.organization == '')	
						alertBox('setup incomplete','Go to Setup > Camrally Page ');
					//else if($.trim(customArray.fbImg) == '' && customArray.optsocialpost < 1)
						//alertBox('setup incomplete','Go to Setup > Customers\' Social Media Posts > What to Post to Social Media? ');
					//else if(j < 2)
						//alertBox('setup incomplete','Go to Setup > Your Tabluu (Business) Page ');						
					//else if(customArray.nicename == "")
						//alertBox('setup incomplete','Go to Setup > Your Camrally Page > Create Your Camrally Page');
					else if(customArray.subscribe < 1)
						alertBox('this campaign is offline','Please change the status to online');
					else
						window.open('campaign.html?p='+customArray.nicename+'&s='+s,'_blank');
			  }});
			
			}else
				alertBox('this campaign is offline','Please change the status to online');
		}	
    function googleAnalytic(){
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-46314042-2', 'camrally.com');
	  ga('send', 'pageview');	
	}
	function goHome(){
		curClick=0;defaultSetup=0;
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
	}
   
	 $(document).on('pageinit','#dashboard', function() {
		$.mobile.loading( "hide" );
		$('.iconlogout').click(function(e){
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){ 
				$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
					showLoader();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
						hideLoader();
						window.location = 'index.php'
					}});
				}},{caption: 'cancel'}]
				});
			}, 500);//to prevent the events fire twice
			e.preventDefault();
		});
		$('#dashboard .star').click(function(){goHome();});	
		$('#dashboard #startgetting').click(function(){showrate();});
		$('.plan-page').on('click', ' > li', function () {
		   curClick = $(this).index();
		  // if(userArray.productId == liteID)
			//	alertBox('no access','Please upgrade to basic plan & above to access this feature');
			//else
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "plan.html",{ });
		});
		$('.right-menu').on('click', ' > li', function () {
		   curClick = $(this).index();
		});
		$('#collectFeedback').click(function(){
			curClick = 0;
			if($.inArray(userArray.state,state_Array) == -1)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "feedback.html",{ });
			else
				alertBox('no access','Please subscribe.');
		});
		$('#getwidget').click(function(){
			curClick = 0;
			if($.inArray(userArray.state,state_Array) == -1)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "widget.html",{ });
			else
				alertBox('no access','Please subscribe.');
		});
		$('#review-widget').click(function(){
			curClick = 0;
			if($.inArray(userArray.state,state_Array) == -1)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "widget.html",{ });
			else
				alertBox('no access','Please subscribe.');
		});
		$('#manageFeedback').click(function(){
			curClick = 0;
			//if(userArray.productId == liteID)
				//alertBox('no access','Please upgrade to basic plan & above to access this feature');
			//else{
				if($.inArray(userArray.state,state_Array) == -1)
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "reviews.html",{ });
				else
					alertBox('no access','Please subscribe.');
					
			//}	
		});
		$('#exportemail').click(function(e){
			e.preventDefault();
			var id = locId.split('|');
			window.open('exportData.php?id='+id[0],'_blank');
		});
		$('#dashboard img.logo').css({'margin': '0.6em 0 0 1.6em'});
		$("#dashboard img.logo").click(function (){  //logo click
			if($( window ).width() <= 600){
				$('#dashboard img.logo').attr('src','images/Logo/Logo_1-small.png');
				$('#dashboard img.logo').css({'margin': '0.6em 0 0 1.6em'});
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}
		});
		$("#page-stat").click(function () {  // going to statistic page
			var status = locId.split('|');
			if(status[1] > 0)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "statistic.html",{ });
			else
				alertBox('this campaign is offline','Please change the status to online');
		});
		$("#setup-custom").click(function () {  // going to setup page
			var status = locId.split('|');
			if(status[1] > 0){
				getData('getCustom');
			}else
				alertBox('this campaign is offline','Please change the status to online');
		});	
		$("#change-icon").click(function () {  // delete place
			var icon = locId.split('|');
			if(userArray.permission < 2 ){
				if(icon[1] > 0){
					defaulAlertBox('confirm','please confirm','Make this campaign offline?',3);	
				}else{
					var subs=0,curActive = parseInt(userArray.addLoc) + 1;
					//if( parseInt(curActive) >= parseInt(activeLocLength) ){
						defaulAlertBox('confirm','please confirm','Make this campaign online?',2);
					//}else
						//defaulAlertBox('confirm','insufficent campaign subscriptions','Please subscribe to more campaigns...',4);
				}
			}else
				defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
		});	
			$("#del-place").click(function () {  // delete place
		if(userArray.permission < 2 ){
			//loginpwd();
			//defaulAlertBox('confirm','please confirm','Delete this campaign?',1);
			$.box_Dialog('Delete this campaign?', {'type':'confirm','title': '<span class="color-gold">please confirm</span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
				{caption: 'yes', callback: function() {
				loginpwd();
			}}]
			});	
		}else
			defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
	});	
	
    function  removecampaign(){
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+placeId[0]+'&opt=resetdata&pwd='+$('#resetpw').val()+'&email='+userArray.email,success:function(ispwdcorrect){
		if(ispwdcorrect > 0){
			setTimeout(function(){setData({opt:'delLoc',placeId:placeId[0]});},300);
		}else{
			setTimeout(function(){ 
			$.box_Dialog('Your password is incorrect', {
				'type': 'information',
				'title': '<span class="color-white">incorrect</span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons': [{caption:'okay',callback:function(){setTimeout(function(){loginpwd()},300);}}]
			});
			},500);
		}
	}});
	}	
	
	function loginpwd(){
			var placeId = locId.split('|');
			showLoader();
			setTimeout(function(){
			/*
				setTimeout(function(){
				$( "#resetpw" ).keypress(function(e) {
					if(e.which == 13){
						resizeTimeout = setTimeout(function(){ 
							removecampaign();
						},500);
					}
				});
				},400); */
				$.box_Dialog('<div style="text-align:left;padding-bottom:5px">Please enter your account password to proceed.</div><input type="password" name="resetpw" id="resetpw" style="width:100%" placeholder="password" />', {'type':'confirm','title': '<span class="color-gold">enter password</span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
				{caption: 'okay', callback: function() {
					//clearTimeout(resizeTimeout);
					//resizeTimeout = setTimeout(function(){ 
						$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+placeId[0]+'&opt=resetdata&pwd='+$('#resetpw').val()+'&email='+userArray.email,success:function(ispwdcorrect){
							hideLoader();
							if(ispwdcorrect > 0){
								setTimeout(function(){setData({opt:'delLoc',placeId:placeId[0]});},300);
							}else{
								setTimeout(function(){ 
								$.box_Dialog('Your password is incorrect', {
									'type': 'information',
									'title': '<span class="color-white">incorrect</span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons': [{caption:'okay',callback:function(){setTimeout(function(){loginpwd()},300);}}]
								});
								},500);
							}
						}});
					//},500);
				}},{caption: 'cancel',callback:function(){hideLoader();}}]
			});	
				setTimeout(function(){$('#resetpw').focus()},300);
			},300);
			
		}
	$(".addnew-loc li a").click(function () {  // listview when tried to add new location
		$('.addnew-loc').hide();
		$('.text-loc').show();
		$('#text-6').focus();
	});	
	
	$( ".text-loc .ui-input-text input" ).blur(function() { // input text when it blur
		if($('#text-6').val() == ''){
			$('.keyicon').addClass('hide');
			$('.addnew-loc').show();
			$('.text-loc').hide();
		}
	});
	
	$(".keyright" ).click(function(e) {
		setcampaign();
	}); 
	function setcampaign(){
		var user = userArray;
		var name = $.trim($("#text-6").val());
		if(name == '')
			defaulAlertBox('alert','invalid',"Campaign name is empty");
		else{
			if(user.permission < 2){
				var rows = locArray.length,numofcampaign = parseInt(user.addLoc) + 1; //get total length of location
				if(userArray.productId == basicID || userArray.productId == proID){
					if(rows >= parseInt(numofcampaign))
						defaulAlertBox('alert','no access',"Please request to add more campaigns.");
					else
						_setBusinessName(name);
				}else
					_setBusinessName(name);
				/*if(user.productId == everFree){
					if(rows > 0){
						defaulAlertBox('alert','no access',"Please upgrade to basic plan & above to add more campaign.");
					}else{
						_setBusinessName(name);
					}
				}else{ */
					// _setBusinessName(name);
				//}
		  }else
			defaulAlertBox('alert','invalid request',"Please contact your administrator(s) for this request");
		}
	}
	$( "#text-6" ).keypress(function(e) {
		$('.keyicon').removeClass('hide');
		if(e.which == 13){
			setcampaign();
		}
	});
    function loclabel(){
		var isfound = true;
		$('.left-menu li a').each(function (index) {
			var na  = $( this ).text().toLowerCase();
			if(index > 2){
				if($.trim(na) == $.trim(locname.toLowerCase()))
					isfound = false;
			}	
		});
		
		if(!isfound)	
			defaulAlertBox('alert','invalid','Campaign '+locname+' existed')
		else
			_setBusinessName2('');
	}
	function _setBusinessName2(label){
	
		var subs=1;//change it to 0
		var curActive = parseInt(userArray.addLoc) + 1;
		if( parseInt(curActive) >= parseInt(activeLocLength) )
			subs = 1;
		setData({opt:'setLoc',userId:userArray.id,name:locname,subs:subs,label:encodequote(label)});
		if(userArray.permission == 1)
			isAdminCreatedLocation = 1; 
		$('.addnew-loc').show();
		$('.text-loc').hide();	
		hideLoader();
	}
	function _setBusinessName(name){
		locname = name;
		loclabel();	
	}
	$( window ).resize(function() { // when window resize
			if($( window ).width() > 600){
				$('#dashboard img.logo').attr('src','images/Logo/Logo_1-small.png');
				$('#dashboard img.logo').css({'margin': '0.6em 0 0 1.6em'});
			}
			is_resize();
			defaultMenu();
		});
});
	function showHideMenu(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}
		$('.right-menu-help').hide();$('.right-menu-admin').hide();$('.right-menu-send').hide();$('.right-menu-plan').hide();$('.right-menu-loc').hide();$('.right-menu-settings').hide();
		//if(row == 0){
			//$('.right-menu-help').show();
		if(row == 1){
			if(userArray.productId == liteID || userArray.permission > 1 )
				diabledTab('.right-menu-admin .right-menu',[0,1]);
			$('.right-menu-admin').show();
		}else if(row == 0){
			$('.right-menu-settings').show();	
		//}else if(row == 3){
			//$('.right-menu-send').show();
		}else if(row == 2){
			diabledTab('.plan-page',[1,2]);
			$('.right-menu-plan').show();
		}else if(row > 2){
			if(userArray.productId != proID )
				diabledTab('.right-menu-loc',[4]);
			$('#visit-tabluu-page').hide();
			placeId= locId;
			var index = row - 3;
			if(locArray[index].nicename){
				if(newvanitylink != ''){
					locArray[index].vlink = newvanitylink;
					newvanitylink= '';
				}
				if(locArray[index].vlink != ''){
					$('#visit-tabluu-page a').attr('href',domainpath+locArray[index].vlink);
				}else
					$('#visit-tabluu-page a').attr('href',domainpath+locArray[index].nicename);
				$('#visit-tabluu-page').show();
			}	
			$('.right-menu-loc').show();
		}
	}
	function DashMenu(){
		/*locDefault = '<li ><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Help<span class="listview-arrow-default listview-arrow-active"></span></a></li><li><a href="#">User Admin<span class="listview-arrow-default"></span></a></li><li ><a href="#">Global Settings<span class="listview-arrow-default"></span></a></li><li ><a href="#">Send Emails<span class="listview-arrow-default"></span></a></li><li ><a href="#">Subscriptions<span class="listview-arrow-default"></span></a></li>'; */
		locDefault = '<li ><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Global Settings<span class="listview-arrow-default"></span></a></li><li><a href="#">User Admin<span class="listview-arrow-default"></span></a></li><li ><a href="#">Subscriptions<span class="listview-arrow-default"></span></a></li>';
		if(locArray.length){ // had location already
			activeLocLength=1;arraylabel=[];
			for(var i in locArray){
				var icon = online;
				if(locArray[i].subscribe < 1)
					icon = offline;
				else
					activeLocLength++;
				if($.trim(locArray[i].label) != '')
					arraylabel.push(encodequote(locArray[i].label));	
				locDefault = locDefault + '<li><a href="#" class="'+locArray[i].id+'|'+locArray[i].subscribe+'|'+locArray[i].setup+'"><img src="'+icon+'" alt="" class="ui-li-icon ui-corner-none">'+locArray[i].name+'<span class="listview-arrow-default"></span></a></li>';
			}
			$('.left-menu').html('<ul class="left-menu" data-role="listview">'+locDefault+'</ul>');
			$(".left-menu").on ('click', ' > li', function (event){
				var row = $(this).index();
				var clas = $(this).find( "a" ).attr("class");
				var str = $( this ).text();
				placename  = str;
				var id = clas.split(' ');
				locId = id[0];
				$( ".right-header" ).html( placename );
				curClick = row;
				showHideMenu(row);
				defaultMenu();
				if($( window ).width() <= 600){
					$('#dashboard img.logo').attr('src','images/Logo/Logo_1-small.png');
					$('#dashboard img.logo').css({'margin': '0.6em 0 0 0.5em'});
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
				}
				setupclickmenu = row;
			});
			$(".left-menu").listview();
		}else{
			$('.left-menu').html('<ul class="left-menu" data-role="listview">'+locDefault+'</ul>');
			$(".left-menu").on ('click', ' > li', function (event){
				var row = $(this).index();
				var clas = $(this).find( "a" ).attr("class");
				var str = $( this ).text();
				placename  = str; 
				var id = clas.split(' ');
				locId = id[0];
				$( ".right-header" ).html( placename );		
				curClick = row;
				showHideMenu(row);
				defaultMenu();
				if($( window ).width() <= 600){
					$('#dashboard img.logo').attr('src','images/Logo/Logo_1-small.png');
					$('#dashboard img.logo').css({'margin': '0.6em 0 0 0.5em'});
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
				}
				setupclickmenu = row;
			});
			$(".left-menu").listview();	
		}
		showHideMenu(curClick);
		defaultMenu();
		if($('#issignup').val() > 0){
			curClick=0;
			setTimeout(function(){$( ":mobile-pagecontainer" ).pagecontainer( "change", "plan.html",{ });},300);
		}
		//diabledTab('.left-menu',[2]);
	}
	function defaultMenu(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content' ).css( {"min-height":height.toFixed() + 'em'} );

		if($( window ).width() > 600){
			$('.left-menu li a').each(function (index) {
				if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
					var src = $(this).find( "img" ).attr('src');			
					src = src.split('/');				
				}		
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){	
						if(src[2] == 'active.png')
							$(this).find( "img" ).attr('src', onlineBg);
						else if(src[2] == 'inactive.png')	
							$(this).find( "img" ).attr('src', offlineBg);
					}
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
					if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
						if(src[2] == 'activeOnline.png')
							$(this).find( "img" ).attr('src', online);	
						else if(src[2] == 'activeOffline.png')
							$(this).find( "img" ).attr('src', offline);	
							
					}	
				}	
			}); 			
		}else{
			$('.left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
				if(typeof($(this).find( "img" ).attr('src')) != 'undefined'){
					var src = $(this).find( "img" ).attr('src');
					src = src.split('/');
					if(src[2] == 'active.png' || src[2] == 'activeOnline.png')
						$(this).find( "img" ).attr('src', online);	
					else if(src[2] == 'inactive.png' || src[2] == 'activeOffline.png')
						$(this).find( "img" ).attr('src', offline);						
				}	
			});				
		}
	}

	function defaulAlertBox(opt,title,message,optConfirm){
		switch(opt){
			case 'alert':
				$.box_Dialog(message, {
					'type':     'question',
					'title':    '<span class="color-gold">'+title+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'okay'}]
				});		
			break;
			case 'confirm':
				$.box_Dialog(message, {
					'type':     'question',
					'title':    '<span class="color-gold">'+title+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'yes', callback: function() {
						var id = locId.split('|');
						switch(optConfirm){
							case 1: //delete place
								setTimeout(function(){setData({opt:'delLoc',placeId:id[0]});},300);
							break;
							case 2: //set to online the location*/
								setData({opt:'onLoc',placeId:id[0]});
							break;
							case 3: //set to offline the location
								//alert(id[0])
								setData({opt:'offLoc',placeId:id[0]});
							break;
							case 4: //request to add more subscription
								curClick=1;
								$( ":mobile-pagecontainer" ).pagecontainer( "change", "plan.html",{ });
							break;							
						}
					}},{caption: 'no'}]
				});
			break;
		}
	}
	function hadError(lastId){
		hideLoader();
		if(lastId > 0){
			getData('getLoc');		
		}else
			defaulAlertBox('alert','error detected','Please refresh the page');
	}	
	function getData(opt){
	 switch(opt){
		case 'getUser':
			   showLoader();
			  $.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+keyId+'&opt='+opt,success:function(result){
				userArray =  $.parseJSON(result);
				hideLoader();
				getData('getLoc');
			  }});
		break;
		case 'getCustom': 
		  showLoader();	
		  placeId = locId.split('|');
		  $.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt='+opt,success:function(result){
			customArray =  $.parseJSON(result);
			hideLoader();
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{});
		  }});
		break;
		case 'getLoc': 
		  locArray=[];
		  showLoader();
		  $.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+keyId+'&opt='+opt+'&permission='+userArray.permission,success:function(result){
			locArray =  $.parseJSON(result);
			curClick=0;
			hideLoader();
			wizardsetup();
			DashMenu();
		  }});
		break;	
	  }
	}
	function setSelfies(id){
		$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+id+'&opt=selfieonly',success:function(lastId){
		}});	
	}
	
	function setData(s){
	 switch(s.opt){
		case 'setLoc':
			showLoader();
			$('#text-6').val('');
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'key='+s.userId+'&opt='+s.opt+'&groudId='+userArray.userGroupId+'&subscribe='+s.subs+'&name='+s.name+'&label='+s.label,async: false,success:function(lastId){
				newplaceId = lastId +'|'+s.subs+'|'+0;
				newentryloc = 1;
				/*
				if(userArray.productId == enterprise || userArray.productId == enterprise12 || userArray.productId == enterprise24){
					$.box_Dialog('<p>Please select the type of campaing you wish to run.</p>', {
						'type':     'question',
						'title':    '<span class="color-gold">Select your campaign type...</span>',
						'center_buttons': true,
						'show_close_button':false,
						'overlay_close':false,
						'buttons':  [{caption: 'feedback',callback:function(){setTimeout(function(){selfieonly = 0;hadError(lastId);},400)}},{caption: 'selfie only',callback:function(){selfieonly = 1;setSelfies(lastId);setTimeout(function(){hadError(lastId);},400)}}]
					});
				}else*/
					//hadError(lastId);
				selfieonly = 1;setSelfies(lastId);setTimeout(function(){hadError(lastId);},400);
			}});
		break;
		case 'delLoc':
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				setTimeout(function(){
				$.box_Dialog('Data for this campaign is deleted', {
					'type': 'information',
					'title': '<span class="color-white">successful</span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons': [{caption:'okay',callback:function(){
						hadError(lastId);
						if(activeLocLength > 0)
							activeLocLength--;
						customArray=[];
					}}]
				});
				},500);
			}});
		break;
		case 'onLoc':
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				hadError(lastId);
			}});	
		break;
		case 'offLoc':
			//alert('offLoc');
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'key='+s.placeId+'&opt='+s.opt,success:function(lastId){
				//alert(lastId);
				hadError(lastId);
			}});	
		break;	
	  }
	}	
	$(document).on('pageshow','#dashboard', function() {
		$.mobile.loading( "hide" );
		$('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {
			isfocus = 1;
		});	
		$('.star').hide();
		hideLoader();
		if(isprofileupdated > 0){
			isprofileupdated = 0;
			DashMenu();
		} 
		keyId = $('#key').val();
		$('.star').hide();
		showHideMenu(curClick);
		defaultMenu();
		viewOnce=1;
		if(userArray.length < 1){
			//vanitylinkupdate = 0;
			getData('getUser');
		}	
		setTimeout(function(){hideLoader();},1000);
	});
	
	 $(document).on('pageinit','#settings', function() {
		$.mobile.loading( "hide" );
		$('#settings .iconsettings').click(function(e){
			//logout();
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){ 
				$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
					showLoader();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
						hideLoader();
						window.location = 'index.php'
					}});		
				}},{caption: 'cancel'}]
				});
			}, 500);//to prevent the events fire twice
			e.preventDefault();
		});
		$('#settings .star').click(function(){goHome();});	
		$('#settings #startgetting').click(function(){showrate();})
	});
	
	$(document).on('pageshow','#settings', function() {  //Joan Villamor Timezone Aug 6, 2014
		showLoader();
		$('#settings .left-header').html('Global Settings');
		$('#settings .right-header').html('Time Zone');
		$('.star').show();
		autoHeight();//robert
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=customerTime&groupID='+userArray.userGroupId,success:function(result){
			hideLoader();
			var selectobject=document.getElementById("select-timezone");
			for (var i=0; i<selectobject.length; i++){
				if(selectobject.options[i].value==result){
					selectobject.options[i].setAttribute('selected','selected');
					if(result=='none'){
						$('#select-timezone-button span').html('Select Time Zone');
					} else {
						$('#select-timezone-button span').html(result);
					}
				} else {
					selectobject.options[i].removeAttribute('selected');
				}
			}
		}});

		//robert added
		function autoHeight(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		}
		function leftMenu(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
			if($( window ).width() > 600){
				$('.settings-left-menu li a').each(function (index) {
					if(index == curClick){
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					}	
				}); 			
			}else{
				$('.settings-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});				
			}
		}
		$('.settings-left-menu').on('click', ' > li', function () {
			leftMenu();
			if($( window ).width() > 600){
				$(this).find( "a" ).addClass('ui-btn-active'); 
				$(this).find( "span" ).addClass("listview-arrow-active");
			}else{
				$('.send-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
			}		
		}); //until here
		$('#select-timezone').change(function(){
			if(userArray.permission < 2){
				$.box_Dialog('Change Time Zone?', {'type':'confirm','title': '<span class="color-gold">Please Confirm</span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						$('<div id="overlay"></div>').appendTo(document.body);
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'groupId='+userArray.userGroupId+'&opt=updatetimezone&timezone='+$('#select-timezone').val(),success:function(data){
						    hideLoader();
							userArray.timezone = $('#select-timezone').val();
							setTimeout(function(){
								$.box_Dialog('Time zone is set to '+$('#select-timezone').val(), {
								'type': 'information',
								'title': '<span class="color-white">Time Zone</span>',
								'center_buttons': true,
								'show_close_button':false,
								'overlay_close':false,
								'buttons': [{caption:'okay', callback:function(){ setTimeout(function(){wizardsetup();}, 300); }}]
								});
							}, 300);
						}});
					}},{caption: 'no'}]
					
				}); // end of $box.dialog to change code
			} else {
				$.box_Dialog('Permission Denied', {
					'type': 'information',
					'title': '<span class="color-white">Time Zone</span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons': [{caption:'okay', callback:function(){ hideLoader(); }}]
				});
			}
		});
		$("#settings img.logo").click(function (e){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				leftMenu();
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick=0;defaultSetup=0;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
			}
			e.preventDefault();
		});	
		//robert added code
		$( window ).resize(function() { // when window resize
			autoHeight();
			leftMenu();
		});
	});  // Timezone Aug 6, 2014  *** End of Script ***	
	
	function is_resize(){
		if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).css( {"max-width":'30%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'70%'} );
		}else{
			if(isfocus < 1){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else
				isfocus=0;
		}
	}
	
	function rand_nicename(limit)
	{
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < limit; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	
	function alertBox(title,message){
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
	

	function diabledMenu(s){
		clas = 'ui-state-disabled';
		if(s == 1){
			$('.weblink-left-menu li').each(function (index) {
				if(index != 2)
					$(this).addClass(clas);
			});
		}else{
			$('.weblink-left-menu li').each(function (index) {
				$(this).removeClass(clas);
			});		
		}
	}
	function wizardstep7(){
		showLoader();
		var placeId = locId.split('|');
		selfieonly = 0;vanitywizard=0;bgwizard = 0;campaignwizard=0;imgproductwizard=1;profilewizardwebImg = 0;profilewizardwebVid = 0;wizardcreatedlink=0;issetup = 0;uicwizardsetup = 0;profilewizardsetup=0;logowizard=0;
		$.ajax({type: "POST",url:"getData.php",cache: false,async: true,data:'key='+placeId[0]+'&opt=getFeedbackUser',success:function(result){
			hideLoader();
			customArray =  $.parseJSON(result);
			if(customArray.setup < 1){
				newplaceId = placeId[0] +'|'+placeId[1]+'|'+1;
				if(locArray.length == 1 && locArray[0].setup < 1)
					locArray[0].setup = 1;
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId[0]+'&opt=wizardsetupdone',success:function(result){
					newplaceId = placeId[0] +'|'+placeId[1]+'|'+1;
				}});
				getData('getUser');
				isdonewizard = 0;
				curClick = 0;
			}else{
				emailwizardsetup = 0;
			}	
		}});
	}
	
	function codes(str){
		return String(str).replace(',','||');
	}
	function codes2(str){
		return String(str).replace('||',',');
	}	

    function validateURL(url) {
	  var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	  return urlregex.test(url);
	}

	$(document).on('pageinit','#setup', function () {
		$('#frmbackground').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');		
		$('#frmbackground').find('div').css({height:'1px'});
		$('.iconsetup').click(function(e){
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
			e.preventDefault();
		});
		places = locId.split('|');
		
		$('#setup #submit-tagline').click(function(e){
			e.preventDefault();
			validatedetails();
		});
		$('#setup #submit-desc').click(function(e){ //save description
			var str = strencode($('#campaign-desc').sceditor('instance').val());
			if(str == '<br _moz_editor_bogus_node="TRUE" />'){
				alertBox('incomplete information','Please add your campaign description');
			}else{
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=textdesc&val='+str,success:function(lastId){
					hideLoader();
					customArray.description = str;
					$.box_Dialog('Description section has been updated', {
						'type':     'question',
						'title':    '<span class="color-gold">update successful<span>',
						'center_buttons': true,
						'show_close_button':false,
						'overlay_close':false,
						'buttons':  [{caption: 'okay',callback:function(){
							setTimeout(function() {	validatedetails();}, 300);
						}}]
					});	
				}});
			}
		});	
		function updateTextcampaign(){
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=detailscampaign&placeId='+places[0]+'&'+$('#frmselfies').serialize(),success:function(result){
				hideLoader();
				customArray.businessName=$("#namecampaign").val();customArray.brand=$("#txtbrand").val();customArray.tag1=$("#txtcamp1").val();customArray.tag2=$("#txtcamp2").val();customArray.btntext=$("#txtbtnselfie").val();customArray.category=$("#select-category").val();
				$.box_Dialog('Campaign details has been updated', {
				'type': 'information',
				'title': '<span class="color-white">update</span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons': [{caption:'okay', callback:function(){ setTimeout(function(){campaignwizard = 0;wizardsetup();}, 300); }}]
				});
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+keyId+'&opt=getLoc&permission='+userArray.permission,success:	function(result){
					locArray =  $.parseJSON(result);
					isprofileupdated = 1;
					placename = $("#namecampaign").val();
					$( ".right-header" ).html( placename );
				}});
			}});
		}
		
		function validatedetails(){
			var placeId = locId.split('|');
			if(customArray.backgroundImg == '')
				uicAlertBox('incomplete information','Please upload campaign poster','#uploadbackground');
			else if(customArray.description == '')
				uicAlertBox('incomplete information','Please add your campaign description section','#submit-desc');
			else if($("#namecampaign").val() == '')
				uicAlertBox('incomplete information','Please input occasion','#namecampaign');	
			else if($("#txtbrand").val() == '')
				uicAlertBox('incomplete information','Please complete "Presented by:" section.','#txtbrand');
			else if($("#txtcamp1").val() == '' && $("#txtcamp2").val() == '')
				uicAlertBox('incomplete information','Please add your slogan','#txtcamp1');
			else if($("#txtbtnselfie").val() == '')
				uicAlertBox('incomplete information','Please add your text button','#txtbtnselfie');
			else if($("#select-category").val() == '')
				uicAlertBox('incomplete information','Please select category','#select-category');	
			else
				updateTextcampaign();
		}
		$('#placeIdbackground').val(places[0]);
		$('#setup #delCampaign').click(function(e){
			e.preventDefault();
			$.box_Dialog('All data for this campaign will be deleted.', {'type':'confirm','title': '<span class="color-gold">warning!<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
			{caption: 'yes', callback: function() {
					loginreset();
			}},{caption: 'no',callback:function(){ 
			}}]
			});
		});
		function loginreset(){
			showLoader();
			setTimeout(function(){
				$.box_Dialog('<div style="text-align:left;padding-bottom:5px">Please enter your account password to proceed.</div><input type="password" name="resetpwd" id="resetpwd" style="width:100%" placeholder="password" />', {'type':'confirm','title': '<span class="color-gold">enter password</span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
				{caption: 'okay', callback: function() {
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=resetdata&pwd='+$('#resetpwd').val()+'&email='+userArray.email,success:function(ispwdcorrect){
						if(ispwdcorrect > 0){
							$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=createTable&case=0&set=0',success:function(lastId){
								hideLoader();
								setTimeout(function(){
								$.box_Dialog('Data for this campaign is deleted', {
									'type': 'information',
									'title': '<span class="color-white">successful</span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons': [{caption:'okay'}]
								});
								},500);
							}});	
						}else{
							hideLoader();
							setTimeout(function(){
							$.box_Dialog('Your password is incorrect', {
								'type': 'information',
								'title': '<span class="color-white">incorrect</span>',
								'center_buttons': true,
								'show_close_button':false,
								'overlay_close':false,
								'buttons': [{caption:'okay',callback:function(){setTimeout(function(){loginreset()},300);}}]
							});
							},500);
						}
							
					}});
					
				}},{caption: 'cancel',callback:function(){hideLoader();}}]
				});
				setTimeout(function(){$('#resetpwd').focus()},300);
			},500);
		}

		$('#uploadbackground').click(function(e){
			e.preventDefault();
			showLoader();
			$.box_Dialog('Please choose the type of file to upload.', {'type':'question','title': '<span class="color-gold">choose file type<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'image', callback: function() {
					$('#filebackground').click();
				}},{caption: 'video', callback: function() {
					ytUploadPoster();
				}}]
			});	
		});
		
		$('#filebackground').on('change',function(){ // save fb photo
			showLoader();
			$('#frmbackground').ajaxSubmit({beforeSubmit:  beforeSubmitImage2,success: showResponsebck,resetForm: true });
		});

		function ytUploadPoster()  
		{
			var win = window.open(domainpath + "app/youtubeapi.html?placeId=" + places[0] + "&videotitle=" + placename + " Camrally Poster" + "&videotype=poster", " ","width=435, height=294");   
			var timer = setInterval(function() {   
			    if(win.closed) {  
			        clearInterval(timer);  
			        $.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getVideoIdPoster',async: false,success:function(videoId){
			        	if(videoId != '')
			        	{
							var getParse = $.parseJSON(videoId);
							var logoArray = $.parseJSON(getParse);		
							$('#frmbackground').css({display:'none'});		
							$('#backgroundthumb').attr('src', "http://i.ytimg.com/vi/" + logoArray.bckimage + "/default.jpg");
							customArray.backgroundImg = getParse;
							validatedetails();
			        	}
				        hideLoader();
			        }}); 
			    }  
			}, 500);  
		}
		
		function showResponsebck(responseText, statusText, xhr, $form)  { 
			hideLoader();
			$('#frmbackground').css({display:'none'});
			var logoArray = $.parseJSON(responseText);			
			$('#backgroundthumb').attr('src', logoArray.bckimage);
			customArray.backgroundImg = responseText;
			validatedetails();
		}			
			
		$("#backgroundthumb").click(function (){ 
			if(customArray.backgroundImg != ''){
				$.box_Dialog('Delete this video/image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=2',success:function(lastId){
							hideLoader();
							customArray.backgroundImg = '';$('#frmbackground').css({display:'inline'});
							$('#backgroundthumb').attr('src', noPhoto);	
						}});
					}},{caption: 'no'}]
				});	
			}			
		});	
		
		function beforeSubmitImage2(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filebackground')[0].files[0].size; //get file size
				   var ftype = $('#filebackground')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(parseFloat(fsize)>1000000){
						alertBox(bytesToSize(fsize)+' too big file!','Please ensure that image size is less than 1mb');
						$('#overlay').remove();
						return false;			
				   }else{
						switch(ftype){
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
							$('#backgroundthumb').attr('src', loadingPhoto);
							break;
							default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');	
							$('#overlay').remove();
							return false;					
						}
				  }
			}else{
			   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}
		
		$("#setup-logo").click(function (e){  //logo click
			
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick = setupclickmenu;defaultSetup=0;
				//$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ transition: "flip" });
				
				$.mobile.pageContainer.pagecontainer("change", "index.html", {});
				e.preventDefault();
			}
			
		});
		$('.right-menu').on('click', ' > li', function () {
		    if($(this).index() < 7)
				curClick = $(this).index();
		});
		$("#seefeedback").click(function (e){  //logo click
			//curClick = 1;
			feedbackpage(3);
			//$.mobile.pageContainer.pagecontainer("change", "onspot.html", {transition: "flip"});
			e.preventDefault();
		});
		$("#seefeedback3").click(function (e){  //logo click
			//curClick = 1;
			feedbackpage(3);
			//$.mobile.pageContainer.pagecontainer("change", "onspot.html", {transition: "flip"});
			//showrate();
			e.preventDefault();
		});
		$('#setup .star').click(function(){goHome();});
		//checkboxQuestion();
		
		/*pageshow event script*/
		var val,val2;
		$('.star').show();
		
		if(campaignwizard == 1){
			clas = 'ui-state-disabled';
			curClick = 1;
			showHideMenuSetup(curClick);
			defaultMenuSetup();
			diabledTab('#setup .setup-left-menu',[0,2,3,4]);
		}else{
			curClick = defaultSetup;
			showHideMenuSetup(curClick);
			defaultMenuSetup();	
		}
		$('.setup-right-weblink').on('click', ' > li', function () {
		   curClick = $(this).index();
		});
		$('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {isfocus = 1;});	
		$('.panel-question').find('div').removeClass('ui-shadow-inset');
	   $( ".right-header" ).html( placename );	
		places = locId.split('|');
		$('.star').show();	

				
		function createPage1(){
			places = locId.split('|');
			var nicename = rand_nicename(7);
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=nicename&nicename='+nicename,success:function(link){
				$("#overlay").remove();
				customArray.nicename=link;
				//window.open('http://camrally.com/'+nicename+'.html');
				createProfileMenu1();
			}});		
		}

	function createProfileMenu1(){
		var j=0;
		if(customArray.city != ''){
			$('#txtcity').val(customArray.city);
		}
		if(customArray.fbImg != '')
			j++;
		if(customArray.webImg != '')
			j++;
		if(customArray.webImg2 != '')
			j++;
		if(customArray.webImg3 != '')
			j++;
		if(customArray.webImg4 != '')
			j++;
		if(customArray.webImg5 != '')
			j++;
		if(customArray.webImg6 != '')
			j++;
		if(customArray.webImg7 != '')
			j++;
		if(customArray.webImg8 != '')
			j++;
		//if(customArray.city != '' && j > 2){
		//var endhtml = (userArray.productId == liteID ? '.html' : '');
		var addli='',newnice = (customArray.link == null || customArray.link == '' ? customArray.nicename+'.html' : customArray.link);
		if(customArray.city != ''){
			if(customArray.nicename == "")
				addli = '<li ><a href="#" id="create-page" data-prefetch="true">Create Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
			else
				addli = '<li ><a href="'+domainpath+newnice+'" class="link-visit-page" target="_blank">See Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
			var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="vanity">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Videos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';
		}else{
			if(customArray.nicename != "")
				addli = '<li ><a href="'+domainpath+newnice+'" class="link-visit-page" target="_blank" >See Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
			var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="vanity">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Videos<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';	
				
		}
			$('.profile-left-menu1').html(newli);
			$('.profile-left-menu1').on('click', ' > li', function () {
				curClick = $(this).index();
			});
			$(".profile-left-menu1").listview();
	}	
			
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
	
		//$( ".right-header" ).html( placename );		
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				$('.setup-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});		
			if(campaignwizard == 1){
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
			}
		}	
		
		$('.setup-left-menu').on('click', ' > li', function () {
			   curClick = $(this).index();  
				showHideMenuSetup(curClick);		
				defaultMenuSetup();
				if($( window ).width() > 600){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$('.setup-left-menu li a').each(function (index) {
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					});
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
				}	
			});	

		$("#create-page").click(function () {  // listview when tried to add new location
			createPage1();
		});		
		function defaultMenuSetup(){
			if($( window ).width() > 600){
				$('#setup .setup-left-menu li').each(function (index) {
					if(index == curClick){
						$(this).find( "a" ).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).find( "a" ).removeClass('ui-btn-active'); 
						$(this).find( "span" ).removeClass("listview-arrow-active");				
					}
				});	
			}else{
				$('#setup .setup-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});
				if(campaignwizard == 1){
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
				}
			}	
		}  
		
		$('#submit-average').click(function(e){
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var found=true,email= $('#multi-email').val().split(',');
			for(var i in email){
				if(!regex.test($.trim(email[i]))){
					//alertBox('invalid email address','Please enter a valid email address');
					uicAlertBox('invalid email address','Please enter a valid email address','#multi-email');
					found=false;
					break;
				}
			}
			if(found){
				places = locId.split('|');
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=eAlert&'+$('#frmAlert').serialize(),success:function(lastId){
					$("#overlay").remove();
					alertBox('update','successfully updated');
					customArray.email_alert = '{"emails":['+$("#multi-email").val()+'],"is_alert":'+$("#alertsend :radio:checked").val()+',"indiRate":'+$("#alertsend3 :radio:checked").val()+',"alertType":'+$("#alertsend2 :radio:checked").val()+',"average":'+$("#aveAlert :radio:checked").val()+'}';
				}});	
			}
		 })
	      $('#alertsend2 input[name="aleftfor"]').bind( "change", function(event, ui) {
		   if($("#alertsend2 :radio:checked").val() > 0){
				$('.average').hide();
				$('.individual').show();
		   }else{
				$('.individual').hide();
				$('.average').show();
		   }
			
		});
		$('#website-widget-update').click(function(e){
			e.preventDefault();
			var placeId = locId.split('|'),top=0,bot=0;
			showLoader();
			$(".feedback-widget input[type='checkbox']").each(function(index){
				if($(this).is(':checked')){
					if($(this).val() == 1)
						bot = 1; 
					else if($(this).val() == 0)
						top = 1;
				}	
			 });
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+placeId[0]+'&opt=webwidget&top='+top+'&bot='+bot,success:function(result){
				hideLoader();
				alertBox('updated','Website widget updated');
			}});
		});
		function showHideMenuSetup(row){
			curClick = row;
			$('.panel-question').hide();$('.panel-post').hide();$('.panel-profile').hide();$('.panel-UIC').hide();$('.setup-cust-post').hide();$('.setup-email-alert').hide();$('.panel-fbpost').hide();$('.panel-redirect').hide();$(".feedback-widget").hide();	
			$( '#setup .right-content' ).removeClass("right-bgblue bgwhite");$('.panel-postFB').hide();
			if(row < 1)
				 $( '#setup .right-content' ).addClass("right-bgblue");
			else
				$( '#setup .right-content' ).addClass("bgwhite");	
			if(row == 0){
				createProfileMenu1();
				$('.panel-profile').show();
			}else if(row == 2){
				$( '#setup .right-content' ).addClass("right-bgblue");
				$('.panel-UIC').show();
			}else if(row == 1){
				$('.panel-question').show();
				if(customArray.backgroundImg != ''){ 
					var logoArray = $.parseJSON(customArray.backgroundImg);
					$('#frmbackground').css({display:'none'});	
					var bimage = logoArray.bckimage;
					var n = bimage.indexOf("images/profile");
					if(n >= 0)
					{
						$('#backgroundthumb').attr('src', logoArray.bckimage);
					}
					else
					{
						$('#backgroundthumb').attr('src', "http://i.ytimg.com/vi/" + logoArray.bckimage + "/default.jpg");
					}
				}
				setTimeout(function(){
					$(function() {
						$("#setup #campaign-desc").sceditor({
							plugins: "xhtml",
							style: "minified/jquery.sceditor.default.min.css",
							toolbar: "bold,italic,underline,link,unlink,email,strike,subscript,superscript,left,center,right,justify,size,color,bulletlist,orderedlist,table,horizontalrule,date,time,ltr,rtl",
							resizeEnabled:false
						});
					});
					$('textarea').sceditor('instance').focus(function(e) {isfocus=1;});
					if(customArray.description != '' && customArray.description != null)	
						$('#campaign-desc').sceditor('instance').val(strdecode(customArray.description));
				},500);	
				if(customArray.businessName != '')
					$('#namecampaign').val(customArray.businessName);
				if(customArray.tag1 != ''){
					$('#txtbrand').val(customArray.brand);
					$('#txtcamp1').val(customArray.tag1);
					$('#txtcamp2').val(customArray.tag2);
					$('#txtbtnselfie').val(customArray.btntext);
					var selectobject=document.getElementById("select-category");
					var n= 0;
					for (var i=0; i<selectobject.length; i++){
						if(selectobject.options[i].value==customArray.category)
							n = i;
					}
					var cat = $("#select-category"); //set selected
					cat[0].selectedIndex = n;
					cat.selectmenu("refresh");
		        }
			}else if(row == 3){
				$('.panel-redirect').show();
				//$('#txtwebdesired').val('');
				if(customArray.websiteURL != '')
					$('#txtwebdesired').val(customArray.websiteURL);
				$('#optionredirect input[value="'+customArray.redirect+'"]').attr('checked',true).checkboxradio('refresh');
				if(customArray.redirect == 1)
					$('.txtdesirepage').show();
			} else if(row == 4){
				var placeId = locId.split('|');
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+placeId[0]+'&opt=webwidget',success:function(result){
					hideLoader();
					$(".feedback-widget").show();
					if(result != ''){
						data = $.parseJSON(result);
						if(data.top == 1)
							$('.feedback-widget input[id="checkbox-top"]').attr("checked",true).checkboxradio();
						else
							$('.feedback-widget input[id="checkbox-top"]').attr("checked",false).checkboxradio();
						if(data.bot == 1)
							$('.feedback-widget input[id="checkbox-bottom"]').attr("checked",true).checkboxradio();
						else
							$('.feedback-widget input[id="checkbox-bottom"]').attr("checked",false).checkboxradio();	
				   }else
					  $('.feedback-widget input[type="checkbox"]').attr("checked",true).checkboxradio();
					$(".feedback-widget [data-role=controlgroup]").controlgroup("refresh");
				
				}});
				$('.feedback-widget .script-tag').html('<div style="overflow-x:scroll;white-space:wrap;line-height:1.2em;padding:10px;border:1px solid #ccc">&lt;script type="text/javascript" id="camrally-script" src= "http://camrally.com/app/campaign/js/camrallyfeed.min.js?pubId='+customArray.nicename+'"&gt;&lt;/script&gt;</div>');
			}
		}
		$('#optionredirect').change(function(){
			if($("#optionredirect :radio:checked").val() == 1){
				//$('#txtwebdesired').val('');
				if(customArray.websiteURL != '')
					$('#txtwebdesired').val(customArray.websiteURL);
				$('.txtdesirepage').show();
			}else{
				$('.txtdesirepage').hide();
			}	
		}) 
		$('.visittabluupage').click(function(){
			if(customArray.nicename != ''){
				var newnice = (customArray.link == null || customArray.link == '' ? customArray.nicename+'.html' : customArray.link);
				window.open(domainpath+newnice, '_blank');
			}
		});
		function isupdated(){
			$.box_Dialog('successfully updated', {
				'type':     'question',
				'title':    '<span class="color-white">update<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'okay',callback:function (){
					//if(redirectwizardsetup == 1)
						//setTimeout(function(){redirectwizardsetup=0;wizardsetup();},300);
				}}]
			});	
		}
		
		$('#submit-redirect').click(function(e){
			places = locId.split('|');
			if($("#optionredirect :radio:checked").val() == 1){
				if(validateURL($('#txtwebdesired').val()) == false)
					uicAlertBox('incorrect url','Please include "http://" in your URL','#txtwebdesired');
				else{
					showLoader();
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=redirectpage&selected='+$("#optionredirect :radio:checked").val()+'&txtwebsite='+$('#txtwebdesired').val()+'&case=0',success:function(lastId){
						hideLoader();
						customArray.websiteURL = $('#txtwebdesired').val();
						customArray.redirect = $("#optionredirect :radio:checked").val();
						isupdated();
					}});
				}	
			}else{
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=redirectpage&selected='+$("#optionredirect :radio:checked").val()+'&case=1',success:function(lastId){
					hideLoader();
					customArray.redirect = $("#optionredirect :radio:checked").val();
					isupdated();
				}});
			} 
		 });
		$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			/*if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'30%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'70%'} );
			}else{
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}	*/
			//is_resize();
			$( ".right-header" ).html( placename );	
			defaultMenuSetup();
		});
		
	}); 
	$(document).on('pageshow','#setup', function () {
		if(newvanitylink != ""){
			$('.link-visit-page').attr('href',domainpath+newvanitylink);
		}	
		if(userArray.productId == liteID || userArray.productId == basicID)
			diabledTab('.setup-left-menu',[3]);
		
	});
	
	var rateName=[],tagName=[],noAswer=0;
	  	function createPage2(){
		places = locId.split('|');
		var nicename = rand_nicename(7);
		$('<div id="overlay"> </div>').appendTo(document.body);
		$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=nicename&nicename='+nicename,async: false,success:function(link){
			$("#overlay").remove();
			customArray.nicename=link;
			if(profilewizardsetup == 1){
				profilewizardsetup = 0;
				setTimeout(function() {wizardsetup();},200);
			}else{	
			//window.open('http://camrally.com/'+nicename+'.html', '_blank');
			$.box_Dialog('Click "visit your Camrally Page" on the left column', {
				'type':     'question',
				'title':    '<span class="color-gold">visit your Camrally Page?<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'okay',callback:function(){
					setTimeout(function() {	alertBox('setup your questions...','Please create the survey questions to complete the setup.');}, 300);
				}}]
			});	
			createProfileMenu2();
			}
		}});
	}
     function createProfileMenu2(){
		var j=0,clas = '';	
		if(customArray.logo != ''){ 
			var logoArray = $.parseJSON(customArray.logo);
			$('#frmlogocampaign').css({display:'none'});	
			$('#logothumb').attr('src', (logoArray.dLogo == 'images/desktop_default.png' ? 'images/default-logo.png' : logoArray.dLogo)); //logoArray.dLogo
		}
		if(customArray.city != '')
			$('#txtcity').val(customArray.city);
		if(customArray.webImg != '')
			j++;
		if(customArray.webImg2 != '')
			j++;
		if(customArray.webImg3 != '')
			j++;
		if(customArray.webImg4 != '')
			j++;
		if(customArray.webImg5 != '')
			j++;
		if(customArray.webImg6 != '')
			j++;
		if(customArray.webImg7 != '')
			j++;
		if(customArray.webImg8 != '')
			j++;
		//if(customArray.city != '' && j > 1){
		var addli='',newnice = (customArray.link == null || customArray.link == '' ? customArray.nicename+'.html' : customArray.link);
		/*if(customArray.city != ''){
			if(customArray.nicename == "")
				createPage2();
				addli = '<li '+clas+'><a href="'+domainpath+newnice+'" class="link-visit-page" target="_blank">Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu2" id="setup-profile-menu" data-role="listview"><li '+clas+'><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="profile.html"  data-prefetch="true" class="addlogo">Logo<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="#"  data-prefetch="true" class="addlogo">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>'
		}else{
			if(customArray.nicename != "") */
				addli = '<li '+clas+'><a href="'+domainpath+newnice+'" target="_blank" class="link-visit-page" >See Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu2" id="setup-profile-menu" data-role="listview"><li '+clas+'><a href="profile.html"  data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="#"  data-prefetch="true" class="addlogo">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Videos<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="profile.html" data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';
		//}
		
			$('.profile-left-menu2').html(newli);
			$('.profile-left-menu2').on('click', ' > li', function () {
				//if($(this).index() == 1){
					//defaultSetup = 2;
					//$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{});
				if($(this).index() > 5){
				}else{	
					curClick = $(this).index();
					showHideMenuProfile(curClick);
					defaultMenuProfile();
				}	
			
			});			
			$(".profile-left-menu2").listview();
		if(profilewizardsetup==1){
			curClick = 0;	
			diabledTab('#profile .profile-left-menu2',[1,2,3,4,5,6]);
		}else if(logowizard==1){
			curClick = 1;
			diabledTab('#profile .profile-left-menu2',[0,2,3,4,5,6]);		
		}else if(profilewizardwebImg==1){
			curClick = 3;
			diabledTab('#profile .profile-left-menu2',[0,1,2,4,5,6]);
		}else if(profilewizardwebVid==1){
			curClick = 4;
			diabledTab('#profile .profile-left-menu2',[0,1,2,3,5,6]);
		}else if(vanitywizard==1){
			curClick = 2;
			diabledTab('#profile .profile-left-menu2',[0,1,3,4,5,6]);
		} 
         defaultMenuProfile();
		showHideMenuProfile(curClick);
		//$("#create-page2").click(function () {  // listview when tried to add new location
			//createPage2();
		//});
		
		}
		function defaultMenuProfile(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
			if($( window ).width() > 650){
				$('.profile-left-menu2 li a').each(function (index) {
					if(index == curClick){
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					}	
				}); 			
			}else{
				$('.profile-left-menu2 li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});				
			}
		}
		
		function showHideMenuProfile(row){
			curClick = row;
			if($( window ).width() <= 650){
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
			}
			$('.pro-section').hide();$('.desc-section').hide();$('.open-section').hide();$('.photo-section').hide();$('.video-section').hide();$('.map-section').hide();$('.pro-vanity').hide();
			if(row == 0){
				$('.pro-section').show();
			}else if(row == 1){
				$('.open-section').show();	
			}else if(row == 2){	
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=vanitylink',success:function(data){
					hideLoader();
					createdvanity = data;
					if($.trim(createdvanity) != '' ){
						$('#vanity-reset').show();
						//$('.van-link-default').html('<a href="'+domainpath+createdvanity+'" target="_blank" style="text-decoration:none;font-weight: normal;font-size: 16px">https://camrally.com/'+createdvanity+'</a>');
						$('#vanity-str').val(createdvanity);
					}else{
						$('#vanity-reset').hide();
						//$('.van-link-default').html('');
					}	
					$('.pro-vanity').show();
				}});
			
			}else if(row == 3){
				showLoader();
				$('.ishide1').hide();$('.ishide2').hide();$('.ishide3').hide();$('.ishide4').hide();$('.ishide5').hide();$('.ishide6').hide();$('.ishide7').hide();$('.ishide8').hide();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getImages&',async: false,success:function(result){
					hideLoader();
					if(result != 0){
						imagesArray =  $.parseJSON(result);
						if(imagesArray.webImg.title != '' || imagesArray.webImg.desc != ''){
							$('.ishide1').show();
							$('.title1').html(imagesArray.webImg.title);$('.desc1').html(imagesArray.webImg.desc);
						}
						if(imagesArray.webImg2.title != '' || imagesArray.webImg2.desc != ''){
							$('.ishide2').show();
							$('.title2').html(imagesArray.webImg2.title);$('.desc2').html(imagesArray.webImg2.desc);
						}
						if(imagesArray.webImg3.title != '' || imagesArray.webImg3.desc != ''){
							$('.ishide3').show();
							$('.title3').html(imagesArray.webImg3.title);$('.desc3').html(imagesArray.webImg3.desc);
						}
						if(imagesArray.webImg4.title != '' || imagesArray.webImg4.desc != ''){
							$('.ishide4').show();
							$('.title4').html(imagesArray.webImg4.title);$('.desc4').html(imagesArray.webImg4.desc);
						}
						if(imagesArray.webImg5.title != '' || imagesArray.webImg5.desc != ''){
							$('.ishide5').show();
							$('.title5').html(imagesArray.webImg5.title);$('.desc5').html(imagesArray.webImg5.desc);
						}
						if(imagesArray.webImg6.title != '' || imagesArray.webImg6.desc != ''){	
							$('.ishide6').show();
							$('.title6').html(imagesArray.webImg6.title);$('.desc6').html(imagesArray.webImg6.desc);
						}
						if(imagesArray.webImg7.title != '' || imagesArray.webImg7.desc != ''){
							$('.ishide7').show();
							$('.title7').html(imagesArray.webImg7.title);$('.desc7').html(imagesArray.webImg7.desc);
						}
						if(imagesArray.webImg8.title != '' || imagesArray.webImg8.desc != ''){	
							$('.ishide8').show();
							$('.title8').html(imagesArray.webImg8.title);$('.desc8').html(imagesArray.webImg8.desc);
						}
						var $container = $('#container');
						$container.imagesLoaded( function(){
						  $container.masonry({
							itemSelector : '.masonryImage'
						  });
						});
					}
					$('.photo-section').show();
				}});
				
			}else if(row == 4){
				
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getVideos&',async: false,success:function(result){
					hideLoader();
					if(result != 0){
						videosArray =  $.parseJSON(result);

						if(videosArray.vidImg.title != '' || videosArray.vidImg.url != ''){
							$('.vidtitle1').html(videosArray.vidImg.title);$('.vidurl1').html(videosArray.vidImg.url);
						}
						if(videosArray.vidImg2.title != '' || videosArray.vidImg2.url != ''){
							$('.vidtitle2').html(videosArray.vidImg2.title);$('.vidurl2').html(videosArray.vidImg2.url);
						}
						if(videosArray.vidImg3.title != '' || videosArray.vidImg3.url != ''){
							$('.vidtitle3').html(videosArray.vidImg3.title);$('.vidurl3').html(videosArray.vidImg3.url);
						}
						if(videosArray.vidImg4.title != '' || videosArray.vidImg4.url != ''){
							$('.vidtitle4').html(videosArray.vidImg4.title);$('.vidurl4').html(videosArray.vidImg4.url);
						}
						if(videosArray.vidImg5.title != '' || videosArray.vidImg5.url != ''){
							$('.vidtitle5').html(videosArray.vidImg5.title);$('.vidurl5').html(videosArray.vidImg5.url);
						}
						if(videosArray.vidImg6.title != '' || videosArray.vidImg6.url != ''){	
							$('.vidtitle6').html(videosArray.vidImg6.title);$('.vidurl6').html(videosArray.vidImg6.url);
						}
						if(videosArray.vidImg7.title != '' || videosArray.vidImg7.url != ''){
							$('.vidtitle7').html(videosArray.vidImg7.title);$('.vidurl7').html(videosArray.vidImg7.url);
						}
						if(videosArray.vidImg8.title != '' || videosArray.vidImg8.url != ''){	
							$('.vidtitle8').html(videosArray.vidImg8.title);$('.vidurl8').html(videosArray.vidImg8.url);
						}
						var $container = $('#containervid');
						$container.imagesLoaded( function(){
						  $container.masonry({
							itemSelector : '.masonryImage'
						  });
						});
					}
					$('.video-section').show();
				}});
				
			}else if(row == 5){
				$('.map-section').show();
				drawMap();
			}
			
		}
		$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			/*if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'30%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'70%'} );
			}else{
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}	*/
			//is_resize();
			$( ".right-header" ).html( placename );	
			defaultMenuProfile();
		});
	$(document).on('pageinit','#profile', function () {
		$('#frmlogocampaign').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmlogocampaign').find('div').css({height:'1px'});
		$('#frmfb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('#frmfb').find('div').css({height:'1px'});
		$('#frmweb').find('div').removeClass('ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset');
		$('.map-section ').find('div').removeClass('ui-shadow-inset');		
		$('#frmweb').find('div').css({height:'1px'});
		$('.iconpro').click(function(e){
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
			e.preventDefault();
		});
		$("#profile img.logo").click(function (e){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick=0;defaultSetup=0;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ });
			}
			e.preventDefault();
		});	
		$('#profile .star').click(function(){goHome();});
		$("#vanity-checklink").click(function (e){
			var places = locId.split('|');
			showLoader();var vanitystr = $('#vanity-str').val();
			if($.trim(vanitystr) != ''){
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=checkvanity'+'&str='+encodeURIComponent(encodequote(vanitystr)),success:function(data){
					hideLoader();
					if(data == '')
						alertBox('not available','This entry is not available anymore. Please try another one.');
					else{
						alertBox('available','This entry is available.');
					}
				}});
			}else{
				hideLoader();
				uicAlertBox('incomplete information','Please input your customize link','#vanity-str');
			}
		});
		$( "#vanity-str" ).keypress(function(e) {
			if(e.which == 13) createvanitylink();
        });	
		function createvanitylink(){
			var places = locId.split('|');
			showLoader();
			var vanitystr = $('#vanity-str').val();
			if($.trim(vanitystr) != ''){
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=updatevanity&case=1&str='+encodeURIComponent(encodequote(vanitystr)),success:function(data){
				hideLoader();
				if(data == 'exist')
					setTimeout(function(){alertBox('not available','This entry is not available anymore. Please try another one.');},300);
				else{
					$('#vanity-reset').show();
					$('#vanity-str').val(data);newvanitylink = data;
					var endhtml = data;
					$('.link-visit-page').attr('href',domainpath+endhtml); 
					if(vanitywizard == 1){
						vanitywizard=0;wizardsetup();
					}else	
						setTimeout(function(){alertBox('successful!','Congratulations! Your Custom Camrally URL has been updated.');},300);
				}
			}});
			}else{
				hideLoader();
				setTimeout(function(){uicAlertBox('incomplete information','Please input your customize link','#vanity-str');},300);
			}
		}
		$("#vanity-update").click(function (e){createvanitylink();});
		$("#vanity-reset").click(function (e){
			$.box_Dialog('Do you really want to reset', {'type':'confirm','title': '<span class="color-gold">are you sure?<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
				{caption: 'yes', callback: function() {
					var places = locId.split('|');
					showLoader();var vanitystr = $('#vanity-str').val();
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=updatevanity&case=2',success:function(data){ 
						hideLoader();
						$('#vanity-str').val('');$('#vanity-reset').hide();newvanitylink='';
						$('.link-visit-page').attr('href',customArray.nicename+'.html'); 
						$('.van-link-default').html('http://camrally.com/');
						setTimeout(function(){alertBox('successful!','Your Custom Camrally URL has been reset.');},300);
					}});
				}},{caption: 'no'}]
			
			});
		});
		$('.vanity-default-link').html('camrally.com/'+customArray.nicename+'.html');
		places = locId.split('|');
		$('#placeIdCampaign').val(places[0]);
		$('#uploadcampaign').click(function(e){e.preventDefault();$('#campaignlogo').click();});
		$('#campaignlogo').on('change',function(){ // save fb photo
			showLoader();
			$('#frmlogocampaign').ajaxSubmit({beforeSubmit:  beforeSubmitImage,success: logoresponse,resetForm: true });
		});	
		function logoresponse(responseText, statusText, xhr, $form)  { 
			hideLoader();
			if(responseText == 'less'){
				alertBox('incorrect size','Please upload a image with min width 50px & min height 50px');
			}else{
				$('#frmlogocampaign').css({display:'none'});
				var logoArray = $.parseJSON(responseText);			
				$('#logothumb').attr('src', logoArray.dLogo);
				if(logowizard == 1){
					logowizard=0;wizardsetup();
				}	
				customArray.logo = responseText;
			}
		}
		$("#logothumb").click(function (){ 
			if(customArray.logo != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=1',success:function(lastId){
							hideLoader();
							customArray.logo = '';$('#frmlogocampaign').css({display:'inline'});
							$('#logothumb').attr('src', noPhoto);
						}});
					}},{caption: 'no'}]
				});	
			}			
		});	
		function beforeSubmitImage(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#campaignlogo')[0].files[0].size; //get file size
				   var ftype = $('#campaignlogo')[0].files[0].type; // get file type
						   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(parseFloat(fsize)>1000000){
						alertBox(bytesToSize(fsize)+' too big file!','Please ensure that image size is less than 1mb');
						hideLoader();
						return false;			
				   }else{
						switch(ftype){
							case 'image/png':
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
							$('#logothumb').attr('src', loadingPhoto);
							break;
							default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');	
							$('#overlay').remove();
							return false;					
						}
				  }
			}else{
			   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}
	});
    
    function drawMap(){
		lat = 1.3090538697731884;lng = 103.8515001953125;
		$('#submit-map').show();
		if(customArray.city != '' && customArray.latitude != 0){
			lat = customArray.latitude;
			lng = customArray.longitude;
			$('#submit-map').show();
		}
		if(customArray.city == ''){
			$('#submit-map').show();
			//alertBox('default map is shown','Please update the profile section to see your business location on the map');
		}	
		var latlng = new google.maps.LatLng(lat, lng);
		var myOptions = {
			zoom: 14,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		// Add an overlay to the map of current lat/lng
		var image = new google.maps.MarkerImage('images/marker/star/image.png',
		new google.maps.Size(32,37),
		new google.maps.Point(0,0),
		new google.maps.Point(16,37));
		var marker = new google.maps.Marker({
			position: latlng,
			draggable: true,
			icon: image,
			map: map,
			zIndex: 90,
			optimized: true
		});
		google.maps.event.addListener(marker, 'dragend', function() {
			lat = marker.getPosition().lat();
			lng = marker.getPosition().lng();
		});
		google.maps.event.addListener(map,'center_changed',function() {
			marker.setPosition(map.getCenter());
			lat = map.getCenter().lat();
			lng = map.getCenter().lng();
		});
		google.maps.event.trigger(map, 'resize');
		$('#submit-map').click(function(e){ //update latitude and longitude
			var places = locId.split('|');
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=updatemap&lat='+lat+'&lng='+lng,success:function(lastId){
				$('#overlay').remove();
				customArray.latitude = lat;
				customArray.longitude = lng;
				alertBox('update successful','Map location has been updated');
			}});
		});
		
	}
	
	$(document).on('pageshow','#profile', function () { // Profile script start here
		googleAnalytic();
		var $container = $('#container');
		$container.imagesLoaded( function(){
		  $container.masonry({
			itemSelector : '.masonryImage'
		  });
		});

		var $container1 = $('#containervid');
		$container1.imagesLoaded( function(){
		  $container1.masonry({
			itemSelector : '.masonryImage'
		  });
		});

	   $('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {
			isfocus = 1;
		});
		
		$('#txtorg,#txtproemail').keydown(function (e) {
			if (e.which === 9 && userArray.productId == liteID) {
				return false;
			}
		});
		if(userArray.productId == liteID)
			diabledbox('#frmpro',[1,2,3,4,6,7,8,9,10,11,12]);
		$('.star').show();
		var places = locId.split('|'),n=0;
		$( ".right-header" ).html( placename );	
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=customerTime&groupID='+userArray.userGroupId,success:function(result){
			hideLoader();
			var selectobject=document.getElementById("profile-timezone");
			for (var i=0; i<selectobject.length; i++){
				if(selectobject.options[i].value==result){
					selectobject.options[i].setAttribute('selected','selected');
					if(result=='none'){
						$('#profile-timezone-button span').html('Select Time Zone');
					} else {
						$('#profile-timezone-button span').html(result);
					}
				} else {
					selectobject.options[i].removeAttribute('selected');
				} 
			}
		}});
		createProfileMenu2();
		$('#placeidweb').val(places[0]);
		$('#placeidvid').val(places[0]);
		// setting up values
		$('#webthumb1').attr('src', noPhoto);$('#webthumb2').attr('src', noPhoto);$('#webthumb3').attr('src', noPhoto);$('#webthumb4').attr('src', noPhoto);$('#webthumb5').attr('src', noPhoto);$('#webthumb6').attr('src', noPhoto);$('#webthumb7').attr('src', noPhoto);$('#webthumb8').attr('src', noPhoto);$('#txtorg').val('');$('#txtadd').val('');$('#txtcity').val('');$('#txtcountry').val('');$('#txtzip').val('');$('#txtpho').val('');$('#txtfb').val('');$('#txtweb').val('');$('#txtlink').val('');$('#txttwit').val('');$('#txtproemail').val('');$('#txtbooknow').val('');$('#vidthumb1').attr('src', noPhoto);$('#vidthumb2').attr('src', noPhoto);$('#vidthumb3').attr('src', noPhoto);$('#vidthumb4').attr('src', noPhoto);$('#vidthumb5').attr('src', noPhoto);$('#vidthumb6').attr('src', noPhoto);$('#vidthumb7').attr('src', noPhoto);$('#vidthumb8').attr('src', noPhoto);
		var str = $.trim(customArray.booknow);
		if(str != '' && str.indexOf("campaign.html") == -1){
			$('#txtbooknow').val(customArray.booknow);			
		}else{
			//$('#txtbooknow').val('http://camrally.com/app/campaign.html?p='+customArray.nicename);	
		}
		if(customArray.webImg != ''){
			$('#webthumb1').attr('src', customArray.webImg);
		}if(customArray.webImg2 != ''){
			$('#webthumb2').attr('src', customArray.webImg2);
		}if(customArray.webImg3 != ''){
			$('#webthumb3').attr('src', customArray.webImg3);
		}if(customArray.webImg4 != ''){
			$('#webthumb4').attr('src', customArray.webImg4);
		}if(customArray.webImg5 != ''){
			$('#webthumb5').attr('src', customArray.webImg5);
		}if(customArray.webImg6 != ''){
			$('#webthumb6').attr('src', customArray.webImg6);
		}if(customArray.webImg7 != ''){
			$('#webthumb7').attr('src', customArray.webImg7);
		}if(customArray.webImg8 != ''){
			$('#webthumb8').attr('src', customArray.webImg8);
		}

		if(customArray.vidImg != ''){
			$('#vidthumb1').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg + "/default.jpg");
		}if(customArray.vidImg2 != ''){
			$('#vidthumb2').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg2 + "/default.jpg");
		}if(customArray.vidImg3 != ''){
			$('#vidthumb3').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg3 + "/default.jpg");
		}if(customArray.vidImg4 != ''){
			$('#vidthumb4').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg4 + "/default.jpg");
		}if(customArray.vidImg5 != ''){
			$('#vidthumb5').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg5 + "/default.jpg");
		}if(customArray.vidImg6 != ''){
			$('#vidthumb6').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg6 + "/default.jpg");
		}if(customArray.vidImg7 != ''){
			$('#vidthumb7').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg7 + "/default.jpg");
		}if(customArray.vidImg8 != ''){
			$('#vidthumb8').attr('src', "http://i.ytimg.com/vi/" + customArray.vidImg8 + "/default.jpg");
		}

		if(customArray.organization != '')
			$('#txtorg').val(customArray.organization);
		if(customArray.address != ''){
			$('#txtadd').val(customArray.address);
		}if(customArray.city != ''){
			$('#txtcity').val(customArray.city);
		}if(customArray.country != ''){
			$('#txtcountry').val(customArray.country);
		}if(customArray.zip != ''){
			$('#txtzip').val(customArray.zip);
		}if(customArray.contactNo != ''){
			$('#txtpho').val(customArray.contactNo);
		}if(customArray.facebookURL != ''){
			$('#txtfb').val(customArray.facebookURL);
		}if(customArray.websiteURL != ''){
			$('#txtweb').val(customArray.websiteURL);
		}if(customArray.linkedinURL != ''){
			$('#txtlink').val(customArray.linkedinURL);
		}if(customArray.twitterURL != ''){
			$('#txttwit').val(customArray.twitterURL);
		}if(customArray.booknowlabel != ''){
			$('#txtbooknowlabel').val(customArray.booknowlabel);	
		}if(customArray.booknow != ''){
			$('#txtbooknow').val(customArray.booknow);	
		}if(customArray.email != ''){
			$('#txtproemail').val(customArray.email);
		}else if(customArray.gemail != '')
			$('#txtproemail').val(customArray.gmail);
		if(customArray.webImg8 != '' && customArray.webImg7 != '' && customArray.webImg6 != '' && customArray.webImg5 != '' && customArray.webImg4 != '' && customArray.webImg3 != '' && customArray.webImg2 != '' && customArray.webImg != '')
			$('#frmweb').css({display:'none'});		

		if(userArray.productId == liteID)
		{
			if(customArray.vidImg != '')
				$('#uploadvid').css({display:'none'});	
		}
		else
		{
			if(customArray.vidImg8 != '' && customArray.vidImg7 != '' && customArray.vidImg6 != '' && customArray.vidImg5 != '' && customArray.vidImg4 != '' && customArray.vidImg3 != '' && customArray.vidImg2 != '' && customArray.vidImg != '')
				$('#uploadvid').css({display:'none'});	
		}

		var mapoff = $("select#flipmap"); //set selected flipswitch
		mapoff[0].selectedIndex = customArray.showmap;
		mapoff.flipswitch("refresh");
		// end of setting up value	

	
		$("#webthumb1").click(function (){
			if(customArray.webImg != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg = '';$('#frmweb').css({display:'inline'});
								$('#webthumb1').attr('src', noPhoto);
								$('.ishide1').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}	
		});
		$("#webthumb2").click(function (){
			if(customArray.webImg2 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg2.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg2 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb2').attr('src', noPhoto);
								$('.ishide2').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}
		});
		$("#webthumb3").click(function (){
			if(customArray.webImg3 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg3.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg3 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb3').attr('src', noPhoto);
								$('.ishide3').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}
		});	
		$("#webthumb4").click(function (){
			if(customArray.webImg4 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg4.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg4 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb4').attr('src', noPhoto);
								$('.ishide4').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}		
		});
		$("#webthumb5").click(function (){  
			if(customArray.webImg5 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg5.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg5 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb5').attr('src', noPhoto);
								$('.ishide5').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}	
		});	
		$("#webthumb6").click(function (){
			if(customArray.webImg6 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg6.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg6 = '';$('#frmweb').css({display:'inline'});
								$('#webthumb6').attr('src', noPhoto);
								$('.ishide6').hide();
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}
		});
		$("#webthumb7").click(function (){ 
			if(customArray.webImg7 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg7.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg7 = '';$('#frmweb').css({display:'inline'});
								$('.ishide7').hide();
								$('.title7').html('');$('.desc7').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}		
		});
		$("#webthumb8").click(function (){ 
			if(customArray.webImg8 != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.webImg8.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.webImg8 = '';$('#frmweb').css({display:'inline'});
								$('.ishide8').hide();
								$('#webthumb8').attr('src', noPhoto);
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}			
		});	


		$("#vidthumb1").click(function (){
			if(customArray.vidImg != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb1').attr('src', noPhoto);
								$('.vidtitle1').html('');$('.vidurl1').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}	
		});
		$("#vidthumb2").click(function (){
			if(customArray.vidImg2 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg2.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg2 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb2').attr('src', noPhoto);
								$('.vidtitle2').html('');$('.vidurl2').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}
		});
		$("#vidthumb3").click(function (){
			if(customArray.vidImg3 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg3.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg3 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb3').attr('src', noPhoto);
								$('.vidtitle3').html('');$('.vidurl3').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}
		});	
		$("#vidthumb4").click(function (){
			if(customArray.vidImg4 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg4.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg4 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb4').attr('src', noPhoto);
								$('.vidtitle4').html('');$('.vidurl4').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}		
		});
		$("#vidthumb5").click(function (){  
			if(customArray.vidImg5 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg5.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg5 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb5').attr('src', noPhoto);
								$('.vidtitle5').html('');$('.vidurl5').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}	
		});	
		$("#vidthumb6").click(function (){
			if(customArray.vidImg6 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg6.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg6 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb6').attr('src', noPhoto);
								$('.vidtitle6').html('');$('.vidurl6').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}
		});
		$("#vidthumb7").click(function (){ 
			if(customArray.vidImg7 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg7.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg7 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb7').attr('src', noPhoto);
								$('.vidtitle7').html('');$('.vidurl7').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});
			}		
		});
		$("#vidthumb8").click(function (){ 
			if(customArray.webImg8 != ''){
				$.box_Dialog('Delete this video?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delVid&id='+videosArray.vidImg8.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.vidImg8 = '';$('#uploadvid').css({display:'inline'});
								$('#vidthumb8').attr('src', noPhoto);
								$('.vidtitle8').html('');$('.vidurl8').html('');
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}			
		});	
		

        
		function checkProfileBox(){
			var r=true,txtName = $('#txtname').val(),txtAdd = $('#txtadd').val(), txtCity = $('#txtcity').val(),txtContact = $('#txtpho').val(),txtCountry=$('#txtcountry').val(),txtZip=$('#txtzip').val(),txtemail=$('#txtproemail').val(),txtcustombutton=$('#txtbooknowlabel').val(),txtcustombuttonurl=$('#txtbooknow').val();
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email=txtemail;
			if(txtName == ''){
				alertBox('incomplete information','Please input a business name');
				r=false;        
			}
			if(!regex.test(email)){
				uicAlertBox('invalid email address','Please enter a valid email address','#txtproemail');
				r=false;
			}		
			if(userArray.productId != liteID){
				if(txtAdd == ''){
					uicAlertBox('incomplete information','Please input an address','#txtadd');
					r=false;
				}else if(txtCity == ''){
					uicAlertBox('incomplete information','Please input a city','#txtcity');
					r=false;        
				}else if(txtCountry == ''){
					uicAlertBox('incomplete information','Please input a country','#txtcountry');
					r=false;        
				}else if(txtZip == ''){
					uicAlertBox('incomplete information','Please input a ZIP / Postal code','#txtzip');
					r=false;         
				}else if(txtcustombutton == '' && txtcustombuttonurl != ''){
					uicAlertBox('incomplete information','Please input a custom button (this is required since you filled up the custom button url)','#txtbooknowlabel');
					r=false;        
				}
			}
			return r;
		}	
       		$('#txtbooknowlabel').keyup(function(e){     
				limitText(this,30);
			});
			
        function saveProfile(){
			var validateurl = true;
			if($('#txtfb').val() != ''){
				if(validateURL($('#txtfb').val()) == false){
					validateurl = false;
					uicAlertBox('incorrect website url','Please include "http://" in your URL','#txtfb');
				}	
			}if($('#txtweb').val() != '' && validateurl == true){
				if(validateURL($('#txtweb').val()) == false){
					validateurl = false;
					uicAlertBox('incorrect website url','Please include "http://" in your URL','#txtweb');
				}	
			} if($('#txtlink').val() != '' && validateurl == true){
				if(validateURL($('#txtlink').val()) == false) {
					validateurl = false;
					uicAlertBox('incorrect linkedIn url','Please include "http://" in your URL','#txtlink');
				}	
			} if($('#txttwit').val() != '' && validateurl == true){
				if(validateURL($('#txttwit').val()) == false){
					validateurl = false;
					uicAlertBox('incorrect twitter url','Please include "http://" in your URL','#txttwit');
				}	
			}if($('#txtbooknow').val() != '' && validateurl == true){
				if(validateURL($('#txtbooknow').val()) == false){
					validateurl = false;
					uicAlertBox('incorrect button url','Please include "http://" in your URL','#txtbooknow');
				}	
			}
			
			if(validateurl == true){
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&lat='+lat+'&lng='+lng+'&opt=profile&'+$('#frmpro').serialize()+'&timezone='+$('#profile-timezone').val()+'&groupId='+userArray.userGroupId,async: false,success:function(lastId){
					hideLoader();
					$( ".right-header" ).html( placename );	
					customArray.organization=$('#txtorg').val();customArray.address=$('#txtadd').val(); customArray.city=$('#txtcity').val(); customArray.country=$('#txtcountry').val(); customArray.zip=$('#txtzip').val(); customArray.contactNo=$('#txtpho').val(); customArray.facebookURL=$('#txtfb').val();customArray.websiteURL=$('#txtweb').val();customArray.linkedinURL=$('#txtlink').val();customArray.twitterURL=$('#txttwit').val();customArray.email=$('#txtproemail').val();customArray.booknowlabel=$('#txtbooknowlabel').val();customArray.booknow=$('#txtbooknow').val();
					//alertBox('update successful','Profile section has been updated');
					$.box_Dialog('Profile section has been updated', {
						'type':     'question',
						'title':    '<span class="color-gold">update successful<span>',
						'center_buttons': true,
						'show_close_button':false,
						'overlay_close':false,
						'buttons':  [{caption: 'okay',callback:function(){
							setTimeout(function() {
								if(profilewizardsetup == 1){
									profilewizardsetup = 0;wizardsetup();
								}
								createProfileMenu2();		
							}, 300);}
						}]
					});	
				}});
			}else
				hideLoader();
		}
		$('#submit-pro').click(function(e){ // save profile location
			e.preventDefault();
			
			if(checkProfileBox()){
				//$('<div id="overlay"> </div>').appendTo(document.body);
				showLoader();
				  var geocoder = new google.maps.Geocoder();
				  var address = $('#txtname').val() +' '+ $('#txtadd').val() +', '+ $('#txtcity').val() +', '+$('#txtcountry').val();
				  geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						lat = results[0].geometry.location.lat();
						lng = results[0].geometry.location.lng();
						customArray.latitude = lat;
						customArray.longitude = lng;
					} //else 
						//alertBox('notice','Your locaton address had no geocode'); 
					 saveProfile();
				  });
				// saveProfile();
			}
		});
		
		$('#uploadweb').click(function(e){e.preventDefault();setTitleDesc();}); // when upload button change web photos
        
		$('#submit-hour').click(function(e){ // save opening hour
			$('<div id="overlay"> </div>').appendTo(document.body);
			var str = strencode($('#textarea-hour').sceditor('instance').val());
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=texthour&val='+str,success:function(lastId){
				$('#overlay').remove();
				customArray.opening = str;
				alertBox('update successful','Opening hour section has been updated');
			}});			
		});
		$('#flipmap').on('change',function(){ // save whin flipswitch
			$('<div id="overlay"> </div>').appendTo(document.body);
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=flip&val='+$('#flipmap').val(),success:function(lastId){
				$('#overlay').remove();
				customArray.showmap = $('#flipmap').val();
				alertBox('update successful','Map display preference updated');
			}});
		});	
        		
		$('#fileweb').on('change',function(){ // save web photos
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmweb').ajaxSubmit({beforeSubmit:  beforeSubmitweb,success: showResponse2,resetForm: true });
		});	
		
		function setTitleDesc(){
			txtdescription='';txtimg='';
			$.box_Dialog('<input type="text" value="" name="txtimg" id="txtimg" placeholder="title" style="width:100%;"/><br/><textarea cols="20" rows="3" style="resize:none;width:100%;margin-top:10px;" placeholder="description" name="txtdescription" id="txtdescription"></textarea>', {
					'type':     'question',
					'title':    '<span class="color-gold">Image title and description...<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'browse',callback:function(){
						txtdescription=$('#txtdescription').val();txtimg=$('#txtimg').val();
						changephoto2();
						$('#fileweb').click();
					}},{caption:'cancel'}]
				});		
		}
        		
		/*
		$("#outselfie-1").keypress(function(){
			var str = $("#outselfie-1").val();
		  	if(str.length > 34){
				setTimeout(function(){
					$('.panel-outselfie .title-1').html(str.substring(0,35));
					$("#outselfie-1").val(str.substring(0,35));
				}, 300);
				alertBox('title too long','Your label title must have at least 34 chars.');
			}else 
		});
		*/
		function showResponse2(responseText, statusText, xhr, $form)  { 
			
			if(responseText == 'less'){
				hideLoader();
				if(customArray.webImg == ''){
					$('#webthumb1').attr('src', noPhoto);
				}else if(customArray.webImg2 == ''){
					$('#webthumb2').attr('src', noPhoto);
				}else if(customArray.webImg3 == ''){
					$('#webthumb3').attr('src', noPhoto);
				}else if(customArray.webImg4 == ''){
					$('#webthumb4').attr('src', noPhoto);
				}else if(customArray.webImg5 == ''){
					$('#webthumb5').attr('src', noPhoto);
				}else if(customArray.webImg6 == ''){
					$('#webthumb6').attr('src', noPhoto);
				}else if(customArray.webImg7 == ''){
					$('#webthumb7').attr('src', noPhoto);
				}else if(customArray.webImg8 == ''){
					$('#webthumb8').attr('src', noPhoto);
				}
				alertBox('incorrect image size','Please upload images products with min width 100px & min height 50px');
			}else{
				if(profilewizardwebImg == 1){
					setTimeout(function() {profilewizardwebImg = 0;wizardsetup();},200);
				}	
				if(customArray.webImg == ''){
					$('#webthumb1').attr('src', responseText);
					customArray.webImg = responseText;
					$('.title1').html(txtimg);$('.desc1').html(txtdescription);
				}else if(customArray.webImg2 == ''){
					$('#webthumb2').attr('src', responseText);
					customArray.webImg2 = responseText;
					$('.title2').html(txtimg);$('.desc2').html(txtdescription);
				}else if(customArray.webImg3 == ''){
					$('#webthumb3').attr('src', responseText);
					$('.title3').html(txtimg);$('.desc3').html(txtdescription);
					customArray.webImg3 = responseText;
				}else if(customArray.webImg4 == ''){
					$('#webthumb4').attr('src', responseText);
					$('.title4').html(txtimg);$('.desc4').html(txtdescription);
					customArray.webImg4 = responseText;
				}else if(customArray.webImg5 == ''){
					$('#webthumb5').attr('src', responseText);
					$('.title5').html(txtimg);$('.desc5').html(txtdescription);
					customArray.webImg5 = responseText;
				}else if(customArray.webImg6 == ''){
					$('#webthumb6').attr('src', responseText);
					$('.title6').html(txtimg);$('.desc6').html(txtdescription);
					customArray.webImg6 = responseText;
				}else if(customArray.webImg7 == ''){
					$('#webthumb7').attr('src', responseText);
					$('.title7').html(txtimg);$('.desc7').html(txtdescription);
					customArray.webImg7 = responseText;
				}else if(customArray.webImg8 == ''){
					$('#webthumb8').attr('src', responseText);
					customArray.webImg8 = responseText;
					$('.title8').html(txtimg);$('.desc8').html(txtdescription);
				}
				$('#overlay').remove();
				if(customArray.webImg8 != '' && customArray.webImg7 != '' && customArray.webImg6 != '' && customArray.webImg5 != '' && customArray.webImg4 != '' && customArray.webImg3 != '' && customArray.webImg2 != '' && customArray.webImg != '')
					$('#frmweb').css({display:'none'});	
				createProfileMenu2();
				var $container = $('#container');
				$container.imagesLoaded( function(){
				  $container.masonry({
					itemSelector : '.masonryImage'
				  });
				});
			}
		}
		function changephoto2(){
			
			if(customArray.webImg == ''){
				$('#typeweb').val('webImg');
				$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
			}else if(customArray.webImg2 == ''){
				$('#typeweb').val('webImg2');
				$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title2').html(txtimg);$('.desc2').html(txtdescription);
			}else if(customArray.webImg3 == ''){
				$('#typeweb').val('webImg3');
				$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title3').html(txtimg);$('.desc3').html(txtdescription);
			}else if(customArray.webImg4 == ''){
				$('#typeweb').val('webImg4');$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title4').html(txtimg);$('.desc4').html(txtdescription);
			}else if(customArray.webImg5 == ''){
				$('#typeweb').val('webImg5');$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title5').html(txtimg);$('.desc5').html(txtdescription);
			}else if(customArray.webImg6 == ''){
				$('#typeweb').val('webImg6');$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title6').html(txtimg);$('.desc6').html(txtdescription);
			}else if(customArray.webImg7 == ''){
				$('#typeweb').val('webImg7');$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title7').html(txtimg);$('.desc7').html(txtdescription);
			}else if(customArray.webImg8 == ''){
				$('#typeweb').val('webImg8');$('#imgdesc').val(txtdescription);$('#imgtitle').val(txtimg);
				//$('.title8').html(txtimg);$('.desc8').html(txtdescription);
			}		
		}
		function changephoto(){
			if(customArray.webImg == ''){
				$('#webthumb1').attr('src', loadingPhoto);
			}else if(customArray.webImg2 == ''){
				$('#webthumb2').attr('src', loadingPhoto);
			}else if(customArray.webImg3 == ''){
				$('#webthumb3').attr('src', loadingPhoto);
			}else if(customArray.webImg4 == ''){
				$('#webthumb4').attr('src', loadingPhoto);
			}else if(customArray.webImg5 == ''){
				$('#webthumb5').attr('src', loadingPhoto);
			}else if(customArray.webImg6 == ''){
				$('#webthumb6').attr('src', loadingPhoto);
			}else if(customArray.webImg7 == ''){
				$('#webthumb7').attr('src', loadingPhoto);
			}else if(customArray.webImg8 == ''){
				$('#webthumb8').attr('src', loadingPhoto);
			}		
		}
		function beforeSubmitweb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = String($('#fileweb')[0].files[0].size); //get file size
				   var ftype = $('#fileweb')[0].files[0].type; // get file type
									   //Allowed file size is less than 5 MB (1000000 = 1 mb)
				   if(parseFloat(fsize)>1000000){
						alertBox(bytesToSize(fsize)+' too big file!','Please ensure that image size is less than 1mb');
						$('#overlay').remove();
						return false;
				   }else{
						switch(ftype){
							case 'image/png':
							case 'image/gif':
							case 'image/jpeg':
							case 'image/jpg':
							case 'image/bmp':
							case 'image/pjpeg':
							changephoto();
							break;
							default: alertBox('unsupported file type','Please upload only gif, png, bmp, jpg, jpeg file types');	
							$('#overlay').remove();
							return false;
						}
				  }
			}else{
			   alertBox('unsupported browser','Please upgrade your browser, because your current browser lacks some new features we need!');	
			   $('#overlay').remove();
			   return false;
			}
		}		

		$('#uploadvid').click(function(e){e.preventDefault();setTitleVideo();});

		function setTitleVideo()
		{
			showLoader();
			txtvideotitle='';
			$.box_Dialog('Enter a title for your video. <br><br><input type="text" value="" name="txtvideotitle" id="txtvideotitle" placeholder="Video title" style="width:100%;"/>', {
				'type':     'question',
				'title':    '<span class="color-gold">Video title<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'enter',callback:function(){
					txtvideotitle=$('#txtvideotitle').val();
					if(txtvideotitle == '')
					{
						alertBox('Youtube error','Youtube title is empty!');	
						hideLoader();
					}
					else
					{
						changephoto();
						changephotovid2();
					}
				}},{caption:'cancel'}]
			});	
		}

		function ytBrowserUpload(txtvideotitle)  
		{
			var win = window.open(domainpath + "app/youtubeapi.html?placeId=" + $('#placeidvid').val() + "&name=" + $('#typevid').val() + "&videotitle=" + $('#imgtitlevid').val() + "&videotype=gallery", " ","width=410, height=294");   
			var timer = setInterval(function() {   
			    if(win.closed) {  
			        clearInterval(timer);  
			        $.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+$('#placeidvid').val()+'&typevid='+$('#typevid').val()+'&opt=getVideoId',async: false,success:function(videoId){
			        	if(videoId != '')
			        	{
			        		if(profilewizardwebVid == 0){
				        		alertBox('Youtube upload','Video successfully uploaded!');
				        	}
				        	showResponsevid2("http://i.ytimg.com/vi/" + videoId + "/default.jpg"); 
			        	}
				        hideLoader();
			        }});
			    }  
			}, 500);  
		}

		function showResponsevid2(responseText)  { 
			
			if(profilewizardwebVid == 1){
				setTimeout(function() {profilewizardwebVid = 0;wizardsetup();},200);
			}	
			if(customArray.vidImg == ''){
				$('#vidthumb1').attr('src', responseText);
				customArray.vidImg = responseText;
				$('.vidtitle1').html(txtvideotitle);$('.vidurl1').html(txtvideourl);
			}else if(customArray.vidImg2 == ''){
				$('#vidthumb2').attr('src', responseText);
				customArray.vidImg2 = responseText;
				$('.vidtitle2').html(txtvideotitle);$('.vidurl2').html(txtvideourl);
			}else if(customArray.vidImg3 == ''){
				$('#vidthumb3').attr('src', responseText);
				$('.vidtitle3').html(txtvideotitle);$('.vidurl3').html(txtvideourl);
				customArray.vidImg3 = responseText;
			}else if(customArray.vidImg4 == ''){
				$('#vidthumb4').attr('src', responseText);
				$('.vidtitle4').html(txtvideotitle);$('.vidurl4').html(txtvideourl);
				customArray.webImg4 = responseText;
			}else if(customArray.vidImg5 == ''){
				$('#vidthumb5').attr('src', responseText);
				$('.vidtitle5').html(txtvideotitle);$('.vidurl5').html(txtvideourl);
				customArray.vidImg5 = responseText;
			}else if(customArray.vidImg6 == ''){
				$('#vidthumb6').attr('src', responseText);
				$('.vidtitle6').html(txtvideotitle);$('.vidurl6').html(txtvideourl);
				customArray.vidImg6 = responseText;
			}else if(customArray.vidImg7 == ''){
				$('#vidthumb7').attr('src', responseText);
				$('.vidtitle7').html(txtvideotitle);$('.vidurl7').html(txtvideourl);
				customArray.vidImg7 = responseText;
			}else if(customArray.vidImg8 == ''){
				$('#vidthumb8').attr('src', responseText);
				customArray.vidImg8 = responseText;
				$('.vidtitle8').html(txtvideotitle);$('.vidurl8').html(txtvideourl);
			}
			$('#overlay').remove();
			if(userArray.productId == liteID)
			{
				if(customArray.vidImg != '')
					$('#uploadvid').css({display:'none'});	
			}
			else
			{
				if(customArray.vidImg8 != '' && customArray.vidImg7 != '' && customArray.vidImg6 != '' && customArray.vidImg5 != '' && customArray.vidImg4 != '' && customArray.vidImg3 != '' && customArray.vidImg2 != '' && customArray.vidImg != '')
					$('#uploadvid').css({display:'none'});	
			}

			createProfileMenu2();
			var $container = $('#containervid');
			$container.imagesLoaded( function(){
			  $container.masonry({
				itemSelector : '.masonryImage'
			  });
			});
		}
		function changephotovid2(){
			
			if(customArray.vidImg == ''){
				$('#typevid').val('vidImg');
				$('#imgtitlevid').val(txtvideotitle);
				// $('#imgurlvid').val(txtvideourl);
			}else if(customArray.vidImg2 == ''){
				$('#typevid').val('vidImg2');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg3 == ''){
				$('#typevid').val('vidImg3');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg4 == ''){
				$('#typevid').val('vidImg4');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg5 == ''){
				$('#typevid').val('vidImg5');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg6 == ''){
				$('#typevid').val('vidImg6');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg7 == ''){
				$('#typevid').val('vidImg7');
				$('#imgtitlevid').val(txtvideotitle);
			}else if(customArray.vidImg8 == ''){
				$('#typevid').val('vidImg8');
				$('#imgtitlevid').val(txtvideotitle);
			}			
			ytBrowserUpload(txtvideotitle);
		}

		function changephotovid(){
			if(customArray.vidImg == ''){
				$('#vidthumb1').attr('src', loadingPhoto);
			}else if(customArray.vidImg2 == ''){
				$('#vidthumb2').attr('src', loadingPhoto);
			}else if(customArray.vidImg3 == ''){
				$('#vidthumb3').attr('src', loadingPhoto);
			}else if(customArray.vidImg4 == ''){
				$('#vidthumb4').attr('src', loadingPhoto);
			}else if(customArray.vidImg5 == ''){
				$('#vidthumb5').attr('src', loadingPhoto);
			}else if(customArray.vidImg6 == ''){
				$('#vidthumb6').attr('src', loadingPhoto);
			}else if(customArray.vidImg7 == ''){
				$('#vidthumb7').attr('src', loadingPhoto);
			}else if(customArray.vidImg8 == ''){
				$('#vidthumb8').attr('src', loadingPhoto);
			}		
		}
	});
	
	function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'kb', 'mb', 'gb', 'tb'];
	   if (bytes == 0) return '0 Bytes';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
	}
	 function uicAlertBox(title,message,id){
		$.box_Dialog(decodequote(message), {
			'type':     'question',
			'title':    '<span class="color-white">'+decodequote(title)+'<span>',
			'center_buttons': true,
			'show_close_button':false,
			'overlay_close':false,
			'buttons':  [{caption: 'okay',callback:function(){setTimeout(function(){$(id).focus();},300);}}]
		});
	}
	$(document).on('pageinit','#uic', function () {
		$( "input" ).focus(function() {
			isfocus = 1;
		});

		$('.iconuic').click(function(e){
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
			e.preventDefault();
		});
		$("#seefeedback2").click(function (e){  //logo click
			feedbackpage(3);
			e.preventDefault();
		});
		$("#uic img.logo").click(function (e){  //logo click
			if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
				curClick=2;defaultSetup=2;
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ });
			}
			e.preventDefault();
		});	
		$('#uic .star').click(function(){goHome();});
	})
     function diabledUICMenu(s){
				clas = 'ui-state-disabled';
				if(s == 1){
					if(bgwizard == 1){
						defaultMenuUIC();
						showHideMenuUIC(curClick);	
					}	
					if(bgwizard == 1){
						diabledTab('#uic .uic-left-menu',[0,2,3,4,5,6,7]);
					}else{
						diabledTab('#uic .uic-left-menu',[1,2,3,4,5,6,7]);
					}
				}
			}
			function defaultMenuUIC(){
			var height = ($( window ).height() / 16) - 5;
			$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
			if($( window ).width() > 600){
				$('.uic-left-menu li a').each(function (index) {
					if(index == curClick){
						$(this).addClass('ui-btn-active'); 
						$(this).find( "span" ).addClass("listview-arrow-active");
					}else{
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					}	
				}); 			
			}else{
				$('.uic-left-menu li a').each(function (index) {
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				});				
			}
		}
		function showHideMenuUIC(row){
			curClick = row;
			if($( window ).width() <= 600){
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
			}
			$('.uic-section-logo').hide();$('.uic-section-img').hide();$('.uic-section-bg').hide();$('.uic-section-fc').hide();$('.uic-section-tbs').hide();$('.uic-section-tb').hide();$('.uic-section-box').hide();
			if(row == 0){
				//if(userArray.productId == liteID)
					// alertBox('no access','Please upgrade to basic plan & above to access this feature');
				//else
				$('.uic-section-bg').show();
			}else if(row == 1){			
					$('.uic-section-fc').show();	
			}else if(row == 2){
				$('.uic-section-tb').show();
			}else if(row == 3){
				$('.uic-section-box').show();
			}
		}		

		function changeLabel(getClass)
		{
			if(customArray.isselfie == 1)
			{
				$(getClass + ' li').each(function (index) {
					if(index == 1)
					{
						var getHtml = $(this).html().replace('Background Image', 'Campaign Poster');
						$(this).html(getHtml);
					}
				});
			}
			else
			{
				$(getClass + ' li').each(function (index) {
					if(index == 1)
					{
						var getHtml = $(this).html().replace('Campaign Poster', 'Background Image');
						$(this).html(getHtml);
					}
				});
			}
		}

	$(document).on('pageshow','#uic', function () { // UIC script start here
		googleAnalytic();
	   $('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {
			isfocus = 1;
		});	
		$('.star').show();
		places = locId.split('|');
		$('#placeIdLogo').val(places[0]);
		$( ".right-header" ).html( placename );	

		changeLabel('#uic .uic-left-menu');

		defaultMenuUIC();
		showHideMenuUIC(curClick);
		diabledUICMenu(uicwizardsetup);
		
         function setmessageBox(){
			var messArray = $.parseJSON(customArray.messageBox);
			$('.share').html(decodequote(messArray.share));
			$('.recommend').html(decodequote(messArray.comment));
			$('.next').html(decodequote(messArray.nxt));
			$('.pass').html(decodequote(messArray.pass));
			$('.logged').html(decodequote(messArray.sharedB));
			$('.follow-loc').html(messArray.followT);
			$('.log-out').html(decodequote(messArray.logoutB));
				//var strs = messArray.followT;
				//var strs = strs.replace('?','');
				//$('.follow-loc').html(decodequote(strs.replace(/<brand>/g,customArray.businessName)) + '?');
		 }
		//set default value	
		if(customArray.messageBox != ''){
			var messArray = $.parseJSON(customArray.messageBox);
			$('#txtbox3').val(decodequote(messArray.share));
			if(typeof(messArray.logoutT) != 'undefined')
				$('#txtbox9').val(decodequote(messArray.logoutT));
			if(typeof(messArray.logoutB) != 'undefined')
				$('#txtbox10').val(decodequote(messArray.logoutB));
			if(typeof(messArray.followT) != 'undefined')
				$('#txtbox11').val(decodequote(messArray.followT));
			if(typeof(messArray.followB) != 'undefined')
				$('#txtbox12').val(decodequote(messArray.followB));
			if(typeof(messArray.shareB) != 'undefined')
				$('#txtbox22').val(decodequote(messArray.shareB));
			if(typeof(messArray.sharedT) != 'undefined')
				$('#txtbox26').val(decodequote(messArray.sharedT));
			if(typeof(messArray.sharedB) != 'undefined')
				$('#txtbox27').val(decodequote(messArray.sharedB));		
			setmessageBox();
		}//else
			//$('.follow-loc').html('Be a fan of '+customArray.businessName+'?');
		
		if(customArray.ratingText != ''){
			var rateArray = $.parseJSON(customArray.ratingText);
			$('#txtvpoor').val((rateArray.vpoor != '' ? decodequote(rateArray.vpoor) : 'Very Poor'));
			$('#txtpoor').val((rateArray.poor != '' ? decodequote(rateArray.poor) : 'Poor'));
			$('#txtfair').val((rateArray.fair != '' ? decodequote(rateArray.fair) : 'Fair'));
			$('#txtgood').val((rateArray.good != '' ? decodequote(rateArray.good) : 'Good'));
			$('#txtexc').val((rateArray.excellent != '' ? decodequote(rateArray.excellent) : 'Good'));
		}		
		if(customArray.button != ''){
			var boxArray = $.parseJSON(customArray.button);
			$('#txtshare1').val((boxArray.share[0] != '' ? decodequote(boxArray.share[0]) : "Skip"));
			$('#txt-logout').val((typeof(boxArray.logout) != 'undefined' ? decodequote(boxArray.logout[0]) : 'okay'));
			$('#follow-no').val((typeof(boxArray.follow) != 'undefined' ? decodequote(boxArray.follow[0]) : 'no'));
			$('#follow-yes').val((typeof(boxArray.follow) != 'undefined' ? decodequote(boxArray.follow[1]) : 'yes'));
			$('#btncam1').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[0]) : 'cancel'));
			$('#btncam2').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[1]) : 'snap'));
			$('#btncam3').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[2]) : 'discard'));
			$('#btncam4').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[3]) : 'use'));
			$('#txt-camdetails').val((typeof(boxArray.campdetails) != 'undefined' ? decodequote(boxArray.campdetails[0]) : 'Campaign details'));
			$('#txt-widget').val((typeof(boxArray.btnwidget) != 'undefined' ? decodequote(boxArray.btnwidget[0]) : 'Show me!'));
		}	
		
		$('#pickerbackground').colpick({
			flat:true,
			layout:'hex',
			submit:1,
			submitText:'update',
			color:customArray.backgroundcolor,
			onSubmit:function(hsb,hex,rgb,el) {
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&color='+hex+'&case=3',success:function(lastId){
					hideLoader();
					alertBox('update successful','Update completed.');
				}});				
			}
		});
		$('#pickerfont').colpick({
			flat:true,
			layout:'hex',
			submit:1,
			submitText:'update',
			color:customArray.backgroundFont,
			onSubmit:function(hsb,hex,rgb,el) {
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&color='+hex+'&case=4',success:function(lastId){
					hideLoader();
					alertBox('update successful','Update completed.');		
				}});
			}
		});			

		$('#submit-tbs').click(function(e){
			e.preventDefault();
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=5&'+$('#frmUIC1').serialize(),success:function(lastId){
				customArray.ratingText = JSON.stringify({"vpoor":$('#txtvpoor').val(),"poor":$('#txtpoor').val(),"fair":$('#txtfair').val(),"good":$('#txtgood').val(),"excellent":$('#txtexc').val()});
				hideLoader();
				alertBox('successful','Update completed.');
			}});	
		});	
		
		$('#submit-box').click(function(e){
			e.preventDefault();
			var found = true,lessthan = '<',greaterthan='>';
			if($('#txtbox12').val().search(/<campaigner>/i) == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;campaigner&gt" and "&lt;privacy_policy_link&gt" are used or entered correctly.','#txtbox12');
				$('#txtbox12').focus();
			}else if($('#txtbox12').val().search('<privacy_policy_link>') == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;campaigner&gt" and "&lt;privacy_policy_link&gt" are used or entered correctly.','#txtbox12');
				$('#txtbox12').focus();
			}else if($('#txtbox22').val().search('<privacy_policy_link>') == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;privacy_policy_link&gt" are used or entered correctly.','#txtbox22');
			}else if($('#txtbox10').val().search('<social_media>') == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;social_media&gt" are used or entered correctly.','#txtbox10');
			}
			if(found){
				showLoader();	
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=7&'+$('#frmUIC3').serialize(),success:function(lastId){
					customArray.messageBox = 
					JSON.stringify({"logoutT":$('#txtbox9').val(),"logoutB":$('#txtbox10').val(),"followT":$('#txtbox11').val(),"followB":$('#txtbox12').val(),"share":$('#txtbox3').val(),"shareB":$('#txtbox22').val(),"sharedT":$('#txtbox26').val(),"sharedB":$('#txtbox27').val()});
					hideLoader();
					setmessageBox();
					alertBox('successful','Update completed.');
				}});	
			}
		});		
		$('#submit-tb').click(function(e){
			e.preventDefault();
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=6&'+$('#frmUIC2').serialize(),success:function(lastId){
				customArray.button =
				JSON.stringify({"share":[$('#txtshare1').val()],"logout":[$('#txt-logout').val()],"follow":[$('#follow-no').val(),$('#follow-yes').val()],"cambtnoption":[$('#btncam1').val(),$('#btncam2').val(),$('#btncam3').val(),$('#btncam4').val()],"btnshare":[$('#txt-share').val()],"campdetails":[$('#txt-camdetails').val()],"btnwidget":[$('#txt-widget').val()]});
				hideLoader();
				alertBox('successful','Update completed.');
			}});	
		});			
	
	  			
		
		$('.uic-left-menu').on('click', ' > li', function () {
			if($(this).index() < 7){
				curClick = $(this).index();
				showHideMenuUIC(curClick);
				defaultMenuUIC();	
				if($( window ).width() > 600){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$('.uic-left-menu li a').each(function (index) {
						$(this).removeClass("ui-btn-active");
						$(this).find( "span" ).removeClass("listview-arrow-active");
					});
					$( '.main-wrap .right-content' ).show();
					$( '.main-wrap .left-content' ).hide();
					$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
				}	
		  }		
		});	


		$( window ).resize(function() { // when window resize
		
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			$( ".right-header" ).html( placename );	
			defaultMenuUIC();
		});
	});
	
function strencode(str){
	return String(str).replace(/&amp;/g,"|one").replace(/&lt;/,"|two").replace(/&gt;/,"|three").replace(/&quot;/,"|four").replace(/#/,"|five");
}
function strdecode(str){
	return String(str).replace(/\|one/,"&amp;").replace(/\|two/,"&lt;").replace(/\|three/,"&gt;").replace(/\|four/,"&quot;").replace(/\|five/,"#").replace(/<and>/g,"&amp;");
}
function encodequote(str){
	return String(str).replace(/\|quote/,"&quot;").replace(/,/g,'<comma>').replace(/"/g,'<double>').replace(/'/g,'<quote>');
}
function decodequote(str){
	return String(str).replace(/<double>/g,'"').replace(/<comma>/g,',').replace(/<quote>/g,"'").replace(/{}/g,'"').replace(/{_}/g,"'");
}


$(document).on('pageinit','#plan', function () {
	$('.iconplan').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();
	});
	$('#plan .star').click(function(){goHome();});
	$("#plan img.logo").click(function (){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick = 2;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });				
		}
	});	
});

$(document).on('pageshow','#plan', function () {
	googleAnalytic();
	$('input[type="text"]').textinput({ preventFocusZoom: true });
	$( "input" ).focus(function() {
		isfocus = 1;
	});	
	$('.star').show();
	var currPlaceAvail=0,currentPlanprice=0;
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );

	if(userArray.permission > 1){
		alertBox('invalid request','Please contact your administrator(s) for this request.');
	}else
		initiazePlan();
	/* hide dropdown*/
	$('#changeAplan').hide();
  	diabledTab('.plan-left-menu',[1,2]);
   function initiazePlan(){
		var plan='',txtPlan='';$('#lblExpired').show();$('.ifcancel').show(),$('.addlocation').hide();$('.btncancelplan').hide();$('#lblcostLoc').hide();$('#lblTotal').hide();$('#lblperLoc').show();$('.btnreactivate').hide();$('#submit-planremove').hide();
		if(userArray.productId == liteID)
			txtPlan= 'Lite';
		else if(userArray.productId == basicID)
			txtPlan= 'Basic';
		else if(userArray.productId == proID)
			txtPlan= 'Pro';
		var state = userArray.state,currentPlan='';
		state= state.substr(0, 1).toUpperCase() + state.substr(1);
		$('#lblStatus').html('Status: '+state);
		$('#lblPlan').html('Current plan: '+txtPlan);
		if($.inArray(userArray.state,state_Array) == -1){
			if(userArray.productId == liteID){
				$('#label7').hide();
				//$('#lblExpired').hide();
				$('.addlocation').hide();
				$('#lblperLoc').hide();
			}
			var costperloc =  parseFloat(getPriceComponent());
			$('#lblperLoc').html('Cost per subscribed campaign: $'+seCommas(parseFloat(costperloc)));
			if(userArray.addLoc > 0){
				$('#lblcostLoc').show();
				$('#lblcostLoc').html('Total cost of all subscribed campaigns: $'+seCommas(parseFloat(costperloc) * parseFloat(userArray.addLoc)));
			}
			$('#lblExpired').html('Expiration date (plan & campaigns): '+userArray.expiration);
			currPlaceAvail = parseInt(userArray.addLoc) + 1;
			$('#lblTotalSubs').html('Total # of campaigns: '+ currPlaceAvail);
			$('#label7').html('Free: 1');
			$('#label8').html('Subscribed: '+ userArray.addLoc);
			if(userArray.subscription_id != 0){
				$('.btncancelplan').show();
				$('.addlocation').show();
				if(currPlaceAvail > 1)
					$('#submit-planremove').show();
			}
		}else{
			$('.btnreactivate').show();
			$('.ifcancel').hide();
		}
   }
   function getCurrentComponentId(){
		var id=0;
		if(userArray.productId == basicID){
			id = com_basicID;
		}else if(userArray.productId == proID){
			id = com_proID;
		}else if(userArray.productId == liteID){
			id = com_enterprise;
		}
		return id;
   }
   function getProductId(){
		if(product_plan_array.length < 1){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'&opt=getProductPlan',success:function(result){
				hideLoader();
				product_plan_array = $.parseJSON(result);
				planSelected();
			}});
		}else{
			planSelected();
		}
   }
   function setTransaction(){
		$('.tranwrap').show();
		var table = '<table cellspacing="0">'
			+'<tr>'
				+'<th>ID</th>'
				+'<th>Date & Time (Server)</th>'
				+'<th>Type</th>'
				+'<th>Memo</th>'
				+'<th>Amount</th>'
				+'<th>Sub. Balance</th>'
			+'</tr>';
			for(var i in transac){ 
				var addclass = '';
				if(i%2 == 1)
					addclass = 'even';
				table = table +'<tr class="'+addclass+'">'
					+'<td>'+transac[i].id+'</td>'
					+'<td>'+transac[i].created+'</td>'
					+'<td>'+transac[i].type+'</td>'
					+'<td>'+transac[i].memo+'</td>'
					+'<td>$'+seCommas(transac[i].amount)+'</td>'
					+'<td>$'+seCommas(transac[i].balance)+'</td>'
				+'</tr>';
			}
		table = table + '</table>';
		$('.transaction').html(table);
   }
   function getTransaction(){
		$('.tranwrap').hide();
		if(transac.length < 1){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'&opt=getTransaction&subsId='+userArray.subscription_id,success:function(result){
				hideLoader();
				transac = $.parseJSON(result);
				if(transac.code == 200){
					transac = transac.response;
					setTransaction();
				}else{
					transac = [];
					alertBox('note','Transaction not available');
				}
			}});
		}else
			setTransaction();
   }
    function setActivity(){
		$('.activitywrap').show();
		var div = '';
		for(var i in activity_array){ 
			div = div +'<div style="border-top:1px solid #ccc;padding:10px 0;line-height:1.3em;">'+activity_array[i].message+'</div>';
		}
		$('.activity').html(div);
   }
   function getActivity(){
		$('.activitywrap').hide();
		if(activity_array.length < 1){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'&opt=getActivity&subsId='+userArray.subscription_id,success:function(result){
				hideLoader();
				activity_array = $.parseJSON(result);
				if(activity_array.code == 200){
					activity_array = activity_array.response;
					setActivity();
				}else{
					activity_array = [];
					alertBox('note','Transaction not available');
				}
			}});
		}else
			setActivity();
   }
   function getPriceComponent(){
		var id=0;
		if(userArray.productId == basicID){
			id = com_basicID_price;
		}else if(userArray.productId == proID){
			id = com_proID_price;
		}else if(userArray.productId == liteID){
			id = com_enterprise_price;
		}
		return id;
   }
   function seCommas(num) {
		//Seperates the components of the number
		var n = parseFloat(num).toFixed(2);
		n = n.toString().split(".");
		//Comma-fies the first part
		n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		//Combines the two sections
		return  n.join(".");
	}
	
   function planSelected(){
		if(product_plan_array.code == 200){
			var t = '<option value="">Change Your Plan</option>';
			for(var i in product_plan_array.response){
				if(userArray.productId != product_plan_array.response[i].productId){
					//if($.inArray(product_plan_array.response[i].productId,[basic12,basic24,pro12,pro24,enterprise12,enterprise24,]) == -1){
						
						t = t + '<option value="'+product_plan_array.response[i].productId+'_'+product_plan_array.response[i].price+'">'+product_plan_array.response[i].name+' ($'+seCommas(parseFloat(product_plan_array.response[i].price))+') '+'</option>'
					//} 
				}else{
					currentPlanprice = product_plan_array.response[i].price;
					$('#lblPlan').html('Current plan: '+product_plan_array.response[i].name+' ($'+currentPlanprice+')');
					if(userArray.addLoc > 0){
						$('#lblTotal').show();
						$('#lblTotal').html('Total (plan + subscribed campaigns) = '+' $'+seCommas(parseFloat(currentPlanprice) + parseFloat(getPriceComponent()) * parseFloat(userArray.addLoc))+'');
					}	
				}	
			}
			$('#changeAplan').html(t);
			var planselect = $("#changeAplan");
			planselect[0].selectedIndex = 0;
			planselect.selectmenu('refresh');
		}else
			alertBox('error detected','Please try again');
   }
   function downgradeToFreePlan(){
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'&opt=donwgradeToFreeplan&subsId='+userArray.subscription_id+'&comp_id_prev='+comp_id_old+'&groupID='+userArray.userGroupId+'&userId='+userArray.id,success:function(result){
			hideLoader();
			result = $.parseJSON(result);
			if(result.code != 201){
				alertBox('error detected','We are unable to change your plan. Please email support@camrally.com about this problem.');	
			}else{
				userArray =  result.response;
				currPlaceAvail = parseInt(userArray.addLoc) + 1;
				$('#submit-planremove').show();
				$('#lblTotalSubs').html('Total # of campaigns: '+ currPlaceAvail);
				$('#label7').html('Free: 1');
				$('#label8').html('Subscribed: '+ userArray.addLoc);
				$('#submit-planremove').hide();
			}
		}});
   }
   function upgradDowngradeComponent(){
		var comp_id = getCurrentComponentId();
		if(comp_id_old != 0){
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'&opt=componentUpgrade&subsId='+userArray.subscription_id+'&comp_id_prev='+comp_id_old+'&comp_id_cur='+comp_id,success:function(result){
				hideLoader();
				result = $.parseJSON(result);
				if(result.code != 201){
					//alertBox('error detected','We are unable to change your plan. Please email support@camrally.com about this problem.');	
				}
			}});
		}else
			hideLoader();
   }
   
   function upgradePlan(textplan,productID){

		$.box_Dialog('Change your plan to '+$.trim(textplan)+'?<p>Please take note that all your current & future subscribed campaigns will also be changed to the new plan.</p>', {'type':'confirm','title': '<span class="color-gold">upgrade your plan?<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function()
		{
			showLoader();
			comp_id_old = getCurrentComponentId();	
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'userId='+userArray.id+'&groupID='+userArray.userGroupId+'&opt=changeplan&productIdTochange='+productID+'&subsId='+userArray.subscription_id+'&newplan='+textplan+'&currentPlan='+currentPlan+'&comp_id='+comp_id_old,success:function(result){
				result = $.parseJSON(result);
				if(result.code == 200){
					userArray =  result.response;
					$('#lblPlan').html('Current plan: '+textplan);
					$('#lblExpired').html('Expiration date (plan & campaigns): '+userArray.expiration);
					$('#lblperLoc').html('Cost per subscribed campaign: $'+seCommas(parseFloat(getPriceComponent())));
					product_plan_array = [];
					getProductId();
					alertBox('plan updated','Your plan now is '+textplan);
					if(userArray.productId != 0 && userArray.productId != liteID)
						$('.btncancelplan').show();
					if(userArray.productId == liteID){
						$('#lblperLoc').hide();$('.addlocation').hide();$('#lblExpired').hide();$('#lblcostLoc').hide();
						downgradeToFreePlan();
					}else{
						$('#lblperLoc').show();$('.addlocation').show();$('#lblExpired').show();
						upgradDowngradeComponent();
					}	
					if(userArray.addLoc > 0){
						$('#lblcostLoc').show();
						$('#lblcostLoc').html('Total cost of all subscribed locations: $'+seCommas(parseFloat(getPriceComponent()) * parseFloat(userArray.addLoc)));
					}
					
				}else{
					hideLoader();
					alertBox('error detected',result.response);
				}	
			}});
		}},{caption: 'cancel'}]
		});	
   }
   function downgradeDelay(textplan,productID){
		$.box_Dialog('Change your plan to '+$.trim(textplan)+'?<p>Please take note that all your current & future subscribed locations will also be changed to the new plan.</p>', {'type':'confirm','title': '<span class="color-gold">downgrade your plan?<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function()
		{
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'productIdTochange='+productID+'&subsId='+userArray.subscription_id+'&opt=changeplandelay',success:function(result){
				result = $.parseJSON(result);
				hideLoader();
				if(result.code == 200){
					alertBox('updated','Your request to downgrade the plan will be changed on the next billing cycle, '+result.response+'.');
				}else{
					alertBox('error detected',result.response);
				}	
			}});
		}},{caption: 'cancel'}]
		});	
   }
    $('#changeAplan').change(function(){
		var id = $(this).val();
        if (id != '') { // require a URL
			var ids = id.split('_');
			if(userArray.permission < 2){
				if(userArray.subscription_id == 0){
					showLoader();
					window.location = chargifydomain+'/h/'+ids[0]+'/subscriptions/new?first_name='+userArray.fname+'&last_name='+userArray.fname+'&reference='+userArray.userGroupId; // redirect
				}else{
					if(parseFloat(ids[1]) > parseFloat(currentPlanprice))
					 upgradePlan($(this).find('option:selected').text(),ids[0]);
					else
						downgradeDelay($(this).find('option:selected').text(),ids[0]);
				}
            }else
				alertBox('request not granted',"Unauthorized or invalid request"); 
        }
        return false;
	});	

	showHideMenuPlan(curClick);
	defaultMenuPlan();
	function changePlan(plan){
		showLoader();
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=planManage&setting=change&plan='+plan,success:function(lastId){
			hideLoader();
			alertBox('change plan request','We are processing your change plan request now. Please allow up to 24hrs for the changes to be updated');
		}}); 
	}
	$('#submit-reactivate').click(function(){ // request change plan
		if(userArray.permission < 1){
			$.box_Dialog('Reactivate your subscription?', {'type':'confirm','title': '<span class="color-gold">please confirm...<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'subsId='+userArray.subscription_id+'&opt=planreactivate',success:function(result){
					result = $.parseJSON(result);
					hideLoader();
					if(result.code == 200){
						$.box_Dialog('Congratulatons! You are now subscribed to Camrally.', {'type':'confirm','title': '<span class="color-gold">plan active<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay', callback: function() {
							 window.location = 'index.html';	
						}}]
						});	
					}else{
						alertBox('error detected',result.response);
					}
				}}); 	
			}},{caption: 'no'}]
			
			});	 
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	$('#submit-plancancel').click(function(){ // request change plan
		if(userArray.permission < 1){
			$.box_Dialog('Do you really want to cancel your subscription?', {'type':'confirm','title': '<span class="color-gold">are you sure?<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
				setTimeout(function(){$.box_Dialog('After the expiry date, your account will be closed.', {'type':'confirm','title': '<span class="color-gold">warning!<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'subsId='+userArray.subscription_id+'&opt=cancelplan',success:function(result){
					result = $.parseJSON(result);
					hideLoader();
					if(result.code == 200){
						alertBox('cancel plan request','Your request to cancel the plan will be changed on the next billing cycle '+result.response+'.');
					}else{
						alertBox('error detected',result.response);
					}	
				}}); 
				}},{caption: 'no'}]});},300);
			}},{caption: 'no'}]
			
			});	 
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	function isLetter(s)
	{
		return s.match(/[0-9]/g);    
	}
	$('#submit-planadd').click(function(){ // request change plan
		if(userArray.permission < 2){
			
			$.box_Dialog('Please key in the number of locations you want to add.<br/><input type="text" id="txtadd" size="4" style="margin-top:2px;font-size:12px;height:20px;text-align:center;" placeholder="here..." />', {'type':'confirm','title': '<span class="color-gold">add locations<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'submit', callback: function() {
				if(isNaN(Math.floor($('#txtadd').val())) == false) {
					showLoader();
					var comp_id = getCurrentComponentId(),added = $('#txtadd').val();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'userId='+userArray.id+'&groupID='+userArray.userGroupId+'&opt=addplanlocation&comp_id='+comp_id+'&subsId='+userArray.subscription_id+'&addloc='+$('#txtadd').val(),success:function(result){
						hideLoader();
						result = $.parseJSON(result);
						if(result.code == 201){
							userArray =  result.response;
							currPlaceAvail = parseInt(userArray.addLoc) + 1;
							$('#submit-planremove').show();
							$('#lblTotalSubs').html('Total # of online locations: '+ currPlaceAvail);
							$('#label7').html('Free: 1');
							$('#label8').html('Subscribed: '+ userArray.addLoc);
							$('#lblperLoc').show();
							$('#lblperLoc').html('Cost per subscribed location: $'+seCommas(parseFloat(getPriceComponent())));
							if(parseInt(userArray.addLoc) > 0){
								$('#lblcostLoc').show();$('#lblTotal').show();
								$('#lblTotal').html('Total (plan + subscribed locations) = '+' $'+seCommas(parseFloat(getPriceComponent()) + parseFloat(getPriceComponent()) * parseFloat(userArray.addLoc))+'');
								$('#lblcostLoc').html('Total cost of all subscribed locations: $'+seCommas(parseFloat(getPriceComponent()) * parseFloat(userArray.addLoc)));
							}
							alertBox('updated',added+' location(s) added');
						}else
							alertBox('error detected',result.response);
					}});
				}else
					setTimeout(function() {alertBox('invalid',"Please enter a number.");},300);
			}},{caption: 'cancel'}]
			});	
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	function offlineLocation(removeloc){
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=offlineLocation&remove='+removeloc+'&allocate='+userArray.addLoc+'&userId='+userArray.id+'&permission='+userArray.permission,success:function(result){
			hideLoader();
			locArray =  $.parseJSON(result);
			isprofileupdated = 1;
		}});
	}
	function removePlan(){
		$.box_Dialog('Please key in the number of locations you want to remove.<br/><input type="text" id="txtremove" size="4" style="margin-top:2px;font-size:12px;height:20px;text-align:center;" placeholder="here..." />', {'type':'confirm','title': '<span class="color-gold">remove locations<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'submit', callback: function() {
			if(isNaN(Math.floor($('#txtremove').val())) == false) {
				if(parseInt($('#txtremove').val()) <= parseInt(currPlaceAvail - 1)){
					showLoader();
					var comp_id = getCurrentComponentId(),removeloc = $('#txtremove').val();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'userId='+userArray.id+'&groupID='+userArray.userGroupId+'&opt=removeloc&comp_id='+comp_id+'&subsId='+userArray.subscription_id+'&remove='+removeloc,success:function(result){
						result = $.parseJSON(result);
						var str = 'Please take note that if you have a previous request to remove locations, it will be disregarded. A total of '+result.curr+' location(s) will be removed on the next billing cycle '+result.expiration+'.'
						setTimeout(function() {hideLoader();alertBox('updated',str);},300); 
					}});
				}else
					setTimeout(function() {alertBox('invalid',"Your total Subscribed location was "+(currPlaceAvail - 1));},300);
			}else
				setTimeout(function() {alertBox('invalid',"Please enter a number.");},300);
		}},{caption: 'cancel'}]
		});	
	}
	$('#submit-planremove').click(function(){ // request change plan
		if(userArray.permission < 2){
			if(currPlaceAvail > 1){
				$.box_Dialog('You may delete up to '+(currPlaceAvail - 1)+' locations', {'type':'question','title':    '<span class="color-gold">notice<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay',callback:function(){
					setTimeout(function() {removePlan();},300);
				}}]
				});	
			}			
		}else
			alertBox('request not granted',"Unauthorized or invalid request");
	});
	$('.plan-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();	   
		showHideMenuPlan(curClick);
		defaultMenuPlan();				
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");				
		}else{
			$('.plan-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	});	
	$('.plan-right-menu').on('click', ' > li', function () {
	   curClick = $(this).index();
	});			


	function defaultMenuPlan(){
		if($( window ).width() > 600){
			$('.plan-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('.plan-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );	
				}			
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}	
	}
	function showHideMenuPlan(row){
		curClick = row;
		if($( window ).width() <= 600){
		    if(frmpagemanage > 0){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				frmpagemanage=0;
			}else{
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );				
			}
			$('.plan-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
		$('.panel-sub-plan').hide();$('.panel-sub-location').hide();$('.panel-activity').hide();
		if(row == 0){
			//getProductId();
			if(userArray.permission > 1)
				$('.panel-sub-plan').hide();
			else
				$('.panel-sub-plan').show();
		}else if(row == 1){
			if(userArray.permission > 1)
				$('.panel-sub-location').hide();
			else{
				getTransaction();
				$('.panel-sub-location').show();
			}
		}else if(row == 2){
			if(userArray.permission > 1)
				$('.panel-activity').hide();
		    else{
				getActivity();
				$('.panel-activity').show();
		    }
		}	
		
	}
	
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		defaultMenuPlan();
	});
});
$(document).on('pageinit','#admin', function () {
	$('#permission input[value="2"]').attr('checked',true).checkboxradio('refresh');
	$('.iconadmin').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();
	});
	$("#admin img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });	
		}
		e.preventDefault();
	});
	$('#admin .star').click(function(){goHome();});
});
$(document).on('pageshow','#admin', function () {
	googleAnalytic();
	$('input[type="text"]').textinput({ preventFocusZoom: true });
	$( "input" ).focus(function() {
		isfocus = 1;
	});	
	if(userArray.productId == liteID || userArray.permission > 1)
		diabledTab('.admin-left-menu',[0,1]);
	$('.star').show();
    var listuser= [],locDefault=''; 
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	showHideMenuAdmin(curClick);
	defaultMenuAdmin();
	function getlistuser(){
		locDefault='';
		$('<div id="overlay"></div>').appendTo(document.body);
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=listuser',success:function(data){
			$('#overlay').remove();
			 listuser = $.parseJSON(data);
			if(listuser.length){ // had location already
				for(var i in listuser){
					var icon = '';  	
					if(listuser[i].permission == 0)
						 icon = 'images/template/iconOwner.png';
					else if(listuser[i].permission == 1)
						 icon = 'images/template/iconAdmin.png';
					else if(listuser[i].permission == 2)
						 icon = 'images/template/iconUser.png';	
					locDefault = locDefault + '<li><a href="manageuser.html" data-prefetch="true"><img src="'+icon+'" alt="" class="ui-li-icon ui-corner-none">'+listuser[i].fname+' '+listuser[i].lname+'<span class="listview-arrow-default"></span></a></li>';
				}	
				$('.admin-right-menu').html('<ul class="admin-right-menu" data-role="listview">'+locDefault+'</ul>');
				$('.admin-right-menu').on('click', ' > li', function () {
					$(this).removeClass('ui-btn-active');
				   curClick = $(this).index();
				});	
				$(".admin-right-menu").listview();
			}
			//showHideMenuAdmin(curClick);
			//defaultMenuAdmin();
		}});
	}
    $('#submit-updatepwd').click(function(){ //update pwd
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var demail=$('#txtaddress').val();
		if($('#txtfname1').val() == '' || $('#txtlname1').val() == '')
			alertBox('incomplete information','Please complete all the required field(s)');
		else if(!regex.test(demail))
		  alertBox('invalid email address','Please enter a valid email address');
		else if($('#newpwd').val() != $('#newpwdConfirm').val() || $('#newpwd').val() == '' || $('#newpwdConfirm').val() == '')
			alertBox('incorrect password','Please try again');
		else{
			$('<div id="overlay"></div>').appendTo(document.body);
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'id='+userArray.id+'&opt=updatepwd&fname='+$('#txtfname1').val()+'&lname='+$('#txtlname1').val()+'&email='+$('#txtaddress').val()+'&pwd='+$.md5($('#newpwd').val()),success:function(lastId){
				$('#overlay').remove();
				userArray.email = $('#txtaddress').val();
				alertBox('updated','Password updated');
			}});
			
		}
	});
	$('#submit-invite').click(function(){ // add users
		var totalUsers = listuser;
		var numUsers=1;   
		if(userArray.state == 'active' || userArray.state == 'trialing'){
				var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				var demail=$('#txtemail').val();
				if($('#txtfname').val() == '' || $('#txtlname').val() == '')
					alertBox('incomplete information','Please complete all the required field(s)');
				else if(!regex.test(demail))
				  alertBox('invalid email address','Please enter a valid email address');
				else{
					$('<div id="overlay"></div>').appendTo(document.body);
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getEmail&email='+$('#txtemail').val(),success:function(is_exist){	
						if(is_exist > 0){
							$('#overlay').remove();
							alertBox('email existed','Please use another email address');
						}else{
							$.ajax({type: "POST",url:"setData.php",cache: false,data:'groupID='+userArray.userGroupId+'&id='+userArray.id+'&opt=adduser&fname='+$('#txtfname').val()+'&lname='+$('#txtlname').val()+'&email='+$('#txtemail').val()+'&permission='+$("#permission :radio:checked").val() ,success:function(lastId){
								$('#overlay').remove();
								$.box_Dialog('An invitation email has been sent.', {
									'type':     'question',
									'title':    '<span class="color-white">invitation sent<span>',
									'center_buttons': true,
									'show_close_button':false,
									'overlay_close':false,
									'buttons':  [{caption: 'okay',callback:function(){
										invited = 1;invitedemail=$('#txtemail').val();
										$( ":mobile-pagecontainer" ).pagecontainer( "change", "manageuser.html",{ });
									}}]
								});	
							}});
						}	
					}});
					}	
		}else
			alertBox('trial ended','Please subscribe to a plan');
	})
	
	$('.admin-left-menu').on('click', ' > li', function () {
	   curClick = $(this).index();		
		showHideMenuAdmin(curClick);
		defaultMenuAdmin();				
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");				
		}else{
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}	
	});		
	
	function defaultMenuAdmin(){
		if($( window ).width() > 600){
			$('.admin-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('.admin-left-menu li a').each(function (index) {
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );	
				}			
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}	
	}
	
	function showHideMenuAdmin(row){
		curClick = row;
		if($( window ).width() <= 600){
		    if(frmpagemanage > 0){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).hide();
				$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				frmpagemanage=0;
			}else{
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );				
			}
			$('.admin-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});				
		}
		$('.panel-new').hide();$('.panel-users').hide();$('.panel-pwd').hide();		
		if(row == 0){
			$( '#admin .right-content' ).removeClass("right-bgblue");
			$( '#admin .right-content' ).addClass("bgwhite");
			$('.panel-new').show();
		}else if(row == 1){
			$( '#admin .right-content' ).removeClass("bgwhite");
			$( '#admin .right-content' ).addClass("right-bgblue");
			getlistuser();
			$('.panel-users').show();
		}else if(row == 2){
			$( '#admin .right-content' ).removeClass("right-bgblue");
			$( '#admin .right-content' ).addClass("bgwhite");
			$('#txtfname1').val(userArray.fname);
			$('#txtlname1').val(userArray.lname);
			$('#txtaddress').val(userArray.email);
			$('.panel-pwd').show();
		}
		
	}
	
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
		defaultMenuAdmin();
	});
});

$(document).on('pageinit','#manage', function () {
	$('.iconmanage').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();	
	});
	$("#manage img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=1;frmpagemanage=1;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "admin.html",{ });
		}
		e.preventDefault();
	});
	$('#manage .star').click(function(){goHome();});
});

$(document).on('pageshow','#manage', function () { // Profile script start here
	googleAnalytic();
	$('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {
			isfocus = 1;
		});	
	$('.star').show();	
	var listuser=[],paramId=0,permit=0;
	$('<div id="overlay"></div>').appendTo(document.body);
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'groupID='+userArray.userGroupId+'&opt=listuser',success:function(data){
		$('#overlay').remove();
		 listuser = $.parseJSON(data);
		 initializeManage();
	}});
	
	function initializeManage(){
		locDefault='';
		if(listuser.length){ // had location already
			for(var i in listuser){
				var icon = '';  	
				if(invitedemail == listuser[i].email){
					curClick = i;
					invitedemail = '';
				}	
				if(listuser[i].permission == 0)
					 icon = 'images/template/iconOwner.png';
				else if(listuser[i].permission == 1)
					 icon = 'images/template/iconAdmin.png';
				else if(listuser[i].permission == 2)
					 icon = 'images/template/iconUser.png';	
				var alt = listuser[i].permission +'|'+listuser[i].id
				locDefault = locDefault + '<li><a href="manageuser.html" data-prefetch="true"><img src="'+icon+'" alt="'+alt+'" class="ui-li-icon ui-corner-none">'+listuser[i].fname+' '+listuser[i].lname+'<span class="listview-arrow-default"></span></a></li>';
			}	
			$('.manage-left-menu').html('<ul class="manage-left-menu" data-role="listview">'+locDefault+'</ul>');
			$('.manage-left-menu').on('click', ' > li', function () {
				curClick = $(this).index();
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				params(altval[0],altval[1]);
				showHideMenuManage(curClick);
				defaultMenuManage();	   
			});	
			$(".manage-left-menu").listview();
			defaultMenuManage();
			showHideMenuManage(curClick);
		}
   }
	function params(permission,id){
	var allcheckbox = '';
	 for(var i in locArray){
			var name = locArray[i].name;
			var checkbox ='<div class="ui-checkbox">'
				+'<label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off ui-first-child ui-last-child" for="checkbox-'+i+'">'+name+'</label>'
				+'<input id="checkbox-'+i+'" '+(permission < 2 ? 'disabled="" checked="checked"'  : '')+' type="checkbox" value="'+locArray[i].id+'" name="checkbox-'+i+'">'
				+'</div>';
		   allcheckbox = allcheckbox + checkbox;		   
		}
		allcheckbox = '<div class="ui-controlgroup-controls">'+allcheckbox + '</div>'; 
		$('#check-manage-loc').html(allcheckbox);		

			for(var i in listuser){
				if(listuser[i].param != '' && listuser[i].permission > 1){
					var param = $.parseJSON(listuser[i].param);
					if(id == listuser[i].id){
						for(var k in param){
							for(var j in locArray){
								if(locArray[j].id == param[k]){
									$("input[id=checkbox-"+j+"]").attr("checked",true).checkboxradio();
								}
							}	
						}
					}
				}
			} 	
		$("input[type=checkbox]").checkboxradio();
		$("[data-role=controlgroup]").controlgroup("refresh");
    }
	
	$('#btn-remove-user').click(function(){
		if(userArray.permission < permit){
			$.box_Dialog('Delete this user?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
					$('<div id="overlay"></div>').appendTo(document.body);
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'userId='+paramId+'&opt=removeuser&groupID='+userArray.userGroupId,success:function(data){
						$('#overlay').remove();
						 curClick = 0;
						 listuser = $.parseJSON(data);
						 setTimeout(function(){initializeManage();},300);
						 /*
						 $.box_Dialog('This user no longer have access to your account', {'type':     'question','title':    '<span class="color-gold">user removed<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay',callback: function(){
						    setTimeout(function(){initializeManage();},300);
						 }}]
						}); */
					}});
				}},{caption: 'no'}]
			});
		}else{
			//showHideMenuManage(curClick);
			//defaultMenuManage();
			setTimeout(function(){alertBox('unauthorized request',"You don't have rights to delete this user");},300);
		}	
	})
	
	$('#btn-manage-user').click(function(){
		var objId=[];
		if(permit > 1){
			 $("input[type='checkbox']").each(function(index){
				if($(this).is(':checked')){
					objId.push($(this).val());
				}	
			 });
			 if(objId.length > 0){
				$('<div id="overlay"></div>').appendTo(document.body);
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'userId='+paramId+'&opt=userparam&objId='+objId+'&groupID='+userArray.userGroupId,success:function(data){
					$('#overlay').remove();
					listuser = $.parseJSON(data);
					 initializeManage();
					 alertBox('campaign access updated','The new campaign access for this user is updated');
				}});
			}else
				alertBox('invalid',"Please check one or more Campaigns");
		}	
	});
	 

	function defaultMenuManage(){
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content' ).css( {"min-height":height.toFixed() + 'em'} );
		if($( window ).width() > 600){
			$('.manage-left-menu li a').each(function (index) {
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				var alt = altval[0];
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );				
					$(this).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
					if(alt == 0)
						$(this).find( "img" ).attr('src', 'images/template/iconOwnerActive.png');
					else if(alt == 1)
						$(this).find( "img" ).attr('src', 'images/template/iconAdminActive.png');
					else if(alt == 2)
						$(this).find( "img" ).attr('src', 'images/template/iconUserActive.png');
					paramId = altval[1];permit=altval[0];
					params(altval[0],altval[1]);
				}else{
					if(alt == 0)
						$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
					else if(alt == 1)
						$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
					else if(alt == 2)
						$(this).find( "img" ).attr('src', 'images/template/iconUser.png');				
					$(this).removeClass("ui-btn-active");
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}	
			}); 			
		}else{	
			$('.manage-left-menu li a').each(function (index) {
				var altval = $(this).find( "img" ).attr('alt');
				altval = altval.split('|');
				var alt = altval[0];
				if(index == curClick){
					var str  = $( this ).text();
					$( ".right-header" ).html( str );
					paramId = altval[1];permit=altval[0];
					params(altval[0],altval[1]);
				}	
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");			
				if(alt == 0)
					$(this).find( "img" ).attr('src', 'images/template/iconOwner.png');
				else if(alt == 1)
					$(this).find( "img" ).attr('src', 'images/template/iconAdmin.png');
				else if(alt == 2)
					$(this).find( "img" ).attr('src', 'images/template/iconUser.png');				
			});				
		}
	}
	function showHideMenuManage(row){
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		$('.panel-new').hide();$('.panel-users').hide();$('.panel-pwd').hide();
		if(row == 0){
			$('.panel-new').show();
		}else if(row == 1){
			$('.panel-users').show();				
		}else if(row == 2){
			$('.panel-pwd').show();
		}
		
	}
   	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		defaultMenuManage();
	});
});

	

//==================================================== Collect Feedback / Reviews =============================================== 
//	Date created: July, 25 2014

$(document).on('pageinit','#feedback', function () {
	var iframeisload=0;
	$('.iconfeed').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();	
	});
	$("#feedback img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			if(issetup > 0)
				setupclickmenu = locArray.length + 2;	
			issetup=0;
			curClick = setupclickmenu;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
		}
		e.preventDefault();
	});
	$('#feedback .star').click(function(){goHome();});
	$('.popup-youtube').click(function(e){
		e.preventDefault();	
	});
	$('#invitxtsubject').click(function(e){
		$(this).select();
	});
	$('#invitxtmesge').click(function(e){
		$(this).select();
	});
	$('#phopen').click(function(e){
		e.preventDefault();
		feedbackpage(2);
		//window.open('rateone.html?p='+customArray.nicename+'&s=2','_blank');
	});
	$('#emaillinkopen').click(function(e){
		e.preventDefault();
		window.open(domainpath+customArray.nicename+'=e','_blank');
	});
	$('#promotelinkopen').click(function(e){
		e.preventDefault();
		//window.open('campaign.html?p='+customArray.nicename,'_blank');
		window.open(domainpath+arrayDataURL.source_1.link,'_blank');
	});
	
	$('#surveyopen').click(function(e){
		e.preventDefault();
		feedbackpage(5);
	});
	$('.feedback-right-weblink').on('click', ' > li', function () {
		var row = $(this).index();
		curClick = row;
	});
	$('.feedback-left-menu').on('click', ' > li', function () {
		var row = $(this).index();
		curClick = row;
		showFeedbackMenu(row);
	});
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		feedbackActiveMenu();	
	});
	
	$('#qr-generate3').click(function(){
		window.open('qr-generated.html?p='+nice1+'&s=1&size='+$("#qr-size3 :radio:checked").val(),'_blank');
	});
	
	if(isdonewizard > 0){
		places = locId.split('|');
		showLoader();
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getshorturl',async: true,success:function(result){
			hideLoader();
			arrayDataURL =  $.parseJSON(result);
			var title = 'Setup Wizard - Step 6 / 6',nicelink='';
			if(liteID == userArray.productId){
				nicelink = newvanitylink; 
			}else if(basicID == userArray.productId || proID == userArray.productId){
				nicelink = newvanitylink;
			}
			//$('#feedback #promotelink').val('camrally.com/'+nicelink);
				wizardstep7();
				var endhtml = nicelink;
				var body = '<p style="text-align:left">Congratulations! You have completed the setup.</p>' 
						 +'<p style="text-align:left;padding-top:7px">Start promoting your Camrally link now! (<a href="'+domainpath+endhtml+'" target="_blank">'+domainpath+endhtml+'</a>)</p>';
				$.box_Dialog(body, {
					'type':     'question',
					'title':    '<span class="color-white">'+title+'<span>',
					'center_buttons': true,
					'show_close_button':false,
					'overlay_close':false,
					'buttons':  [{caption: 'okay',callback:function(){
						curClick = 0;
						
						window.open(domainpath+endhtml,'_blank');
						setTimeout(function(){ $( ":mobile-pagecontainer" ).pagecontainer( "change",'index.html',{})},300);
					}}]	
				});	
			//}		
			//setshorturl(2);
		}});
	}
	function setshorturl(newurl){
		if($.isPlainObject(arrayDataURL)){
			if(typeof(arrayDataURL.source_1) != 'undefined'){
				$('#shortlink3').val('camrally.com/'+arrayDataURL.source_1.link);
				$('#txtlabel1').val(decodequote(arrayDataURL.source_1.label));
				$(".panel-selfiex .link").html('camrally.com/'+arrayDataURL.source_1.link);
				$(".QRimage3").html('');
				$(".QRimage3").qrcode({render: 'image',fill: '#000',size: 50,text: 'camrally.com/'+arrayDataURL.source_1.link});
				openlink2 = domainpath+arrayDataURL.source_1.link; 
				nice1 = arrayDataURL.source_1.link;
				if(newurl < 2){
					alertBox('A new URL is generated.','You may print out the new messages/QR Codes or share this link: <a href="http://camrally.com/'+arrayDataURL.source_1.link+'" target="_blank">camrally.com/'+arrayDataURL.source_1.link+'</a> now.<p>Please download the stats if you wish check your "label" data. </p>');
				}	
			}
			if(typeof(arrayDataURL.source_0) != 'undefined'){
				$('#shortlink2').val('camrally.com/'+arrayDataURL.source_0.link);
				$('#txtlabel2').val(decodequote(arrayDataURL.source_0.label));
				$(".panel-outselfie .link").html('camrally.com/'+arrayDataURL.source_0.link);
				$(".QRimage2").html('');
				$(".QRimage2").qrcode({render: 'image',fill: '#000',size: 50,text: 'camrally.com/'+arrayDataURL.source_0.link});
				openlink1 = domainpath+arrayDataURL.source_0.link; 
				nice2 = arrayDataURL.source_0.link;
				if(newurl < 2){
					alertBox('A new URL is generated.','You may print out the new messages/QR Codes or share this link: <a href="http://camrally.com/'+arrayDataURL.source_0.link+'" target="_blank">camrally.com/'+arrayDataURL.source_0.link+'</a> now.<p>Please download the stats if you wish check your "label" data. </p>');
				}	
			}
		}
	}
});

	function showFeedbackMenu(row){

	$(".feedback-weblink").hide();$(".tellafriend").hide();$(".feedback-photo").hide();$(".survey").hide();
		if(row == 1){
			$( '#feedback .right-content' ).addClass("bgwhite");
			if(customArray.nicename == ''){
				alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				if(nice1 == ''){
					places = locId.split('|');
					showLoader();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getshorturl',async: true,success:function(result){
						hideLoader();
						arrayDataURL =  $.parseJSON(result);
						nice1 = domainpath+arrayDataURL.source_1.link;
						$(".feedback-weblink").show();
					}});
				}else
					$(".feedback-weblink").show();
			}
		}else if(row == 0){
			if(customArray.nicename == ''){	
				alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				if(nice1 == ''){
					places = locId.split('|');
					showLoader();
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getshorturl',async: true,success:function(result){
						hideLoader();
						arrayDataURL =  $.parseJSON(result);
						nice1 = domainpath+arrayDataURL.source_1.link;
						$('#feedback #promotelink').val('camrally.com/'+arrayDataURL.source_1.link);
						$(".tellafriend").show();
					}});
					//$('#feedback #emaillink').val('camrally.com/'+customArray.nicename+'=e');
				}else{ 
					$('#feedback #promotelink').val('camrally.com/'+arrayDataURL.source_1.link);
					$(".tellafriend").show();
				}
			}	
			$( '#feedback .right-content' ).addClass("bgwhite");
			
		}else if(row == 2){
			$( '#feedback .right-content' ).addClass("bgwhite");
			if(customArray.nicename == ''){
				alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				$('#surveyopenlink').val('http://camrally.com/app/campaign.html?p='+customArray.nicename+'&s=5');
				$(".survey").show();
			}	
		}else if(row == 3){
			$( '#feedback .right-content' ).addClass("bgwhite");
			$('#photolink').val('http://camrally.com/app/campaign.html?p='+customArray.nicename+'&s=2');
			if(customArray.nicename == ''){	
				alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				//if(userArray.productId != proID && userArray.productId != pro12 && userArray.productId != pro24 && userArray.productId != enterprise12 && userArray.productId != enterprise24 && userArray.productId != enterprise)
					//alertBox('no access','Please upgrade to pro plan & above to access this feature');
				//else	
					$(".feedback-photo").show();
			}
		}else if(row == 4){	
			
		}
		feedbackActiveMenu();
	}
	
	function feedbackActiveMenu(){
		$( "#feedback .left-header" ).html('Campaign Page Links');
	    $( "#feedback .right-header" ).html( placename );
		if($( window ).width() > 600){
			$('#feedback .feedback-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
			$('#feedback .feedback-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
$(document).on('pageshow','#feedback', function () { 
	var height = ($( window ).height() / 16) - 5;iframeisload=0,nice1 = '';
	$('.star').show();
	$("#tellFrame").hide();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	$('#feedback .ui-content').css({"background-color":'#E6E7E8'})
	$( "#feedback .left-header" ).html('Collect Feedback / Selfie');	
	if($( window ).width() <= 600){
		$( '.main-wrap .left-content' ).show();
		$( '.main-wrap .right-content' ).hide();
		$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );	
		if(isdonewizard > 0){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}
	}	
	$( "#feedback .right-header" ).html( placename );
	var placeId = locId.split('|');
	showLoader();
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt=getFeedbackUser',success:function(result){
		customArray =  $.parseJSON(result);
		hideLoader();
		/*
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+placeId[0]+'&opt=getshorturlemail',async: true,success:function(result){
			arrayDataURL =  $.parseJSON(result);
			hideLoader();
			$('#feedback #emaillink').val('camrally.com/'+arrayDataURL.source_e.link);
		}}); */
		showFeedbackMenu(curClick);
		feedbackActiveMenu();
	 }});	
		
});

$(document).on('pageshow','#widget', function () { 
	var height = ($( window ).height() / 16) - 5;
	var placeId = locId.split('|'),limit=5;
	var start = 0,offset=limit,tabSelect,page=0;
	reviewActiveMenu();
    $('.star').show();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	// $( "#reviews .left-header" ).html('Manage Feedback / Reviews');
	// $( "#reviews .right-header" ).html( placename );
	showLoader();
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt=getFeedbackUser',success:function(result){
		customArray =  $.parseJSON(result);
		hideLoader();	
		$('#widget .script-tag').html('<div style="overflow-x:scroll;white-space:wrap;line-height:1.2em;padding:10px;border:1px solid #ccc">&lt;script type="text/javascript" id="script-camrally" src= "http://camrally.com/app/widget/js/widget.min.js?pubId='+customArray.nicename+'"&gt;&lt;/script&gt;</div>');
		getdatafeature();
	 }});	
	$('#widget .ui-content').css({"background-color":'#E6E7E8'});
	$('#widget .reviews-left-menu').on('click', ' > li', function () {
		$(".reviews-shared").hide();$(".reviews-notshared").hide();$(".reviews-featured").hide();
		var row = $(this).index();
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		reviewActiveMenu();
		showReviewMenu(row);
	});
	showReviewMenu(curClick);
	
	function showReviewMenu(row){
		if($( window ).width() <= 600){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		var placeId = locId.split('|');
		tabSelect = row;
		 
	}
	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		reviewActiveMenu();	
	});
	
	function reviewActiveMenu(){
		//$( "#widget .left-header" ).html('Manage Posts');
	    $( "#widget .right-header" ).html( placename );
		if($( window ).width() > 600){
			$('#widget .reviews-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
			$('#widget .reviews-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			//$( '.main-wrap .right-content' ).show();
			//$( '.main-wrap .left-content' ).hide();
			//$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
    var domainpath2 = 'http://www.camrally.com/app/widget/';
	var widgetArray = [],nomorefeature=1,nomorenotfeature=1,notfeatureStart=0,featureStart=0,notfeaturelimit=5,featurelimit=5;
	function getdatafeature(){
		$('.loading').addClass('loader');
		$.getJSON(domainpath2+"jsonwidget.php?callback=?",{pubId:customArray.nicename,feature:1,start:featureStart,limit:featurelimit}, function(data) {
			widgetArray = data
			if(typeof(data.pubId) != 'undefined'){
				$('.widget-camrally').html('pubId = "'+customArray.nicename+'" not found. Otherwise, please upgrade plan to access the advocates widget');
			}else{
				widgetArray = data;
				if(widgetArray.average.advocate < 1)
					$('.widget-camrally').html('You have not any advocates yet');
				else{
					if(featureStart == 0)
						createReview();
					featureStart = featureStart + featurelimit;
					if(widgetArray.reviews.length > 0)
						contenloop(widgetArray.reviews);
					if(widgetArray.reviews.length < 5)
						getdatanotfeature();
					if(widgetArray.reviews.length == 0){
						nomorefeature = 0;
					}
					whenresize();
				}
				$('.loading').removeClass('loader');
			}
			
		});
	}
	function getdatanotfeature(){
		$('.loading').addClass('loader');
		$.getJSON(domainpath2+"jsonwidget.php?callback=?",{pubId:customArray.nicename,feature:0,start:notfeatureStart,limit:notfeaturelimit}, function(data) {
			widgetArray = data
			notfeatureStart = notfeatureStart + notfeaturelimit;
			if(typeof(data.pubId) != 'undefined'){
					$('.widget-camrally').html('pubId = "'+customArray.nicename+'" not found. Otherwise, please upgrade plan to access the advocates widget');
			}else{
				widgetArray = data;
				if(widgetArray.average.advocate < 1)
					$('.widget-camrally').html('You have not any advocates yet');
				else{
					if(widgetArray.reviews.length > 0)
						contenloop(widgetArray.reviews);
					else if(widgetArray.reviews.length == 0)
						nomorenotfeature = 0;
				}
			}
			$('.loading').removeClass('loader');
		});
	}
	function whenresize(){
		if($('div.widget-camrally').width() > 300){
			$('.widget-camrally .pin').css({'width':'90%'});
		}else if($('div.widget-camrally').width() <= 300 && $('div.widget-camrally').width() > 250)
			$('.widget-camrally .pin').css({'width':'88%'});
		else if($('div.widget-camrally').width() <= 250 && $('div.widget-camrally').width() > 230)
			$('.widget-camrally .pin').css({'width':'85%'});
		else if($('div.widget-camrally').width() <= 230){
			$('.widget-camrally .rate-reviews p').css({'font-size':'12px'});
			$('.widget-camrally .pin').css({'width':'80%'});
		}		
	}
		function contenloop(arrayreviews){
			var div = '';
			for (var i in arrayreviews){
					div = div + '<div class="pin">';
					if(arrayreviews[i].link != ''){
						div = div +'<div class="fblink">'
							+'<a href="'+arrayreviews[i].fbId+'" target="_blank">'+arrayreviews[i].name+'</a>'
						+'</div>';
					}
					div = div +'<div class="text-center"><img alt="shared pages" src="'+photourl2+arrayreviews[i].url+'" class="pinImage"></div>'
					+'<div style="color: #576A6E;text-align:left;font-size:12px">'+arrayreviews[i].created+'</div>'
					+'</div>';
				}
			$('.comment-container-camrally').append(div);
		}
		function createReview(){
			var div = '<div class="loading"><div class="wrap-rate-header">'
				+'<div class="wrap-rate-logo">'
					+'<div class="rate-logo"><img src="http://www.camrally.com/app/images/Logo/Logo_2-small.png" /></div>'
				+'</div>'
				+'<div class="rate-reviews">'
				+'<div style="color: #777;text-align:right;font-size:14px">'+widgetArray.average.advocate+' advocates<div></div>'+widgetArray.average.follower+' followers</div>'
				+'</div>'
			+'</div>'
			+'<div class="comment-container-camrally">'
			+ '</div';
			$('.widget-camrally').html(div);

			//if(widgetArray.reviews.length > 0)
			//	contenloop(widgetArray.reviews);
			
		}
		$( window ).resize(function() { // when window resize
			whenresize();
		});
		var resizeTimeout,noReviewAtAll=0;
		$('.widget-camrally').scroll(function () {
			if($(this).scrollTop() + ($(this).innerHeight() + 200) >= this.scrollHeight) {
				clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function(){
				
				if(nomorefeature == 1)
					getdatafeature();
				else if(nomorenotfeature == 1)
					getdatanotfeature();
				}, 500);		
			}
		});
});

$(document).on('pageinit','#widget', function () {
	$('.iconReview').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();	
	});
	$("#widget img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick = setupclickmenu;defaultSetup=0;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
		}
		e.preventDefault();
	});
	$('#widget .star').click(function(){goHome();});
});


//==================================================== Reviews =============================================== 
//	Date created: Oct, 15 2014

$(document).on('pageinit','#reviews', function () {
	$('.iconReview').click(function(e){
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){ 
			$.box_Dialog('Logout now?', {'type':'confirm','title': '<span class="color-gold">'+userArray.fname +' '+userArray.lname+'<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'logout', callback: function() {
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=logout',success:function(result){
					hideLoader();
					window.location = 'index.php'
				}});		
			}},{caption: 'cancel'}]
			});
		}, 500);//to prevent the events fire twice
		e.preventDefault();	
	});
	$("#reviews img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick = setupclickmenu;defaultSetup=0;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
		}
		e.preventDefault();
	});
	$('#reviews .star').click(function(){goHome();});
});


$(document).on('pageshow','#reviews', function () { 
	var height = ($( window ).height() / 16) - 5;
	var placeId = locId.split('|'),limit=5;
	var start = 0,offset=limit,tabSelect,page=0;
	reviewActiveMenu();
	var month = new Array();
	month[01] = "January";month[02] = "February";month[03] = "March";month[04] = "April";month[05] = "May";month[06] = "June";month[07] = "July";month[08] = "August";month[09] = "September";month[10] = "October";month[11] = "November";month[12] = "December";
    $('.star').show();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	// $( "#reviews .left-header" ).html('Manage Feedback / Reviews');
	// $( "#reviews .right-header" ).html( placename );
	$('#reviews .ui-content').css({"background-color":'#E6E7E8'});
	$('.reviews-left-menu').on('click', ' > li', function () {
		$(".reviews-shared").hide();$(".reviews-notshared").hide();$(".reviews-featured").hide();
		var row = $(this).index();
		curClick = row;
		if($( window ).width() <= 600){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		reviewActiveMenu();
		showReviewMenu(row);
	});
	showReviewMenu(curClick);
	var counter = 0;
	function showHTMLShared(){
		var t = '';counter++;
		for(var i in feedbackArray){
		t = t + '<div class="divwrap" style="padding-top:5px;margin-top:10px;">'
			+'<div class="wrapProfileImg">'
				+'<div class="iconProfile">';
				   if(feedbackArray[i].fbId != '')
					t = t +'<div class="wrapImg fbImg'+counter+'"><img src="https://graph.facebook.com/'+feedbackArray[i].fbId+'/picture?type=large" /></div>';
					else 
					t = t +'<div class="wrapImg fbImg'+counter+'"><img src="http://camrally.com/app/images/profileDefault.png" /></div>';
					t = t +'<div class="profilename"><a href="https://www.facebook.com/'+feedbackArray[i].fbId+'" style="text-decoration:none;" target="_blank">'+feedbackArray[i].name+'</a></div>'
				+'</div>'
				+'<div class="imgSelfie">'
					+'<div class="wrapImg2 selfImg'+counter+'"><a href="'+domainpath+'user/'+feedbackArray[i].link+'" target="_blank"><img src="'+feedbackArray[i].url+'" /></a></div>'
				+'</div>'
			+'</div>'
		+'</div>'
		+'<div class="clear"></div>'
			t= t +'<div class="divwrap">'
			+'<table cellspacing="0">'
				+'<tr>'
					+'<th class="areas noborderleft padLeft-5 c1">Manage</th>'
					+'<th class="date c1">Date</th>'
				+'</tr>';
					t = t + '<tr>'
					t = t +'<td rowspan="'+reviewQuestion.length+'" style="vertical-align: middle">'
						+'<div style="padding-top:5px;"><fieldset id="removePhoto" data-role="controlgroup" data-iconpos="left" data-corners="false"><div class="ui-controlgroup-controls"><div class="ui-checkbox"><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="feature-'+feedbackArray[i].id+'">Feature</label><input id="feature-'+feedbackArray[i].id+'" type="checkbox" name="feature-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].feature == 1 ? 'checked="checked"' : '')+'><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="hideImg-'+feedbackArray[i].id+'">Hide</label><input id="hideImg-'+feedbackArray[i].id+'" type="checkbox" name="hideImg-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].hideimg == 1 ? 'checked="checked"' : '')+'></div></div></fieldset></div>'
						+'</td>';
						var created = feedbackArray[i].created.split('-');
						var day = created[2].split(' ');
						t = t +'<td rowspan="'+(reviewQuestion.length < 2 ? 2 : 1)+'" style="vertical-align: middle">'
							+'<div style="padding:5px 5px 0px 5px;white-space:nowrap;display: table-cell;vertical-align: middle;">'+day[0]+' '+month[parseInt(created[1])]+' '+created[0]+'</p></div>'
							+'</td>';
					+'</tr>';
			//}
				t= t +'</table>'
			+'</div>'
			+'<div class="divwrap" style="padding-bottom:10px;">'
			+'</div>';
			//}
		}
		t= t+'<div class="nextpage'+page+'"></div>';
		if(tabSelect == 0){
			page++;
			$('#feature').html('');
			$('#shared').html(t);
			$('#shared').html(t);
		}else if(tabSelect == 1){
			$('#shared').html('');
			$('#feature').html(t);
			$('#feature').html(t);
		}else if(tabSelect == 2){
			//$('#shared').html('');
			$('#notshared').html(t);
			$('#notshared').html(t);
		}else if(tabSelect == 3){ // next page load
			$('.nextpage'+(page < 1 ? 0 : page-1)).html(t);
			page++;
		}
		
		$("input[type=checkbox]").checkboxradio();
		$(".divwrap input[type='checkbox']").on('click',function(index){
			var placeId = locId.split('|');
			var str = $(this).attr('id').split('-'),ischeck=0;
			if(str[0] == 'feature'){
				ischeck = ($(this).is(':checked') ? 1 : 0);
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=setFeature&check='+ischeck+'&id='+$(this).val()+'&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
					hideLoader();	
				}});
			}else if(str[0] == 'hideImg'){
				ischeck = ($(this).is(':checked') ? 1 : 0);
				showLoader();
				$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=setHideSelfie&check='+ischeck+'&id='+$(this).val()+'&placeId='+placeId[0],success:function(result){
					hideLoader();
				}});
			}
		});
		resizePhoto('.fbImg'+counter,150,150);
		resizePhoto('.selfImg'+counter,300,300);
	}

	reviewQuestion = [];
	function getQuestion(){
		var placeId = locId.split('|');
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getQuestion&case=0&placeId='+placeId[0],success:function(result){
			reviewQuestion = $.parseJSON(result);
		}});
	}
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			start = offset + start;
			tabSelect = 3;
			showLoader();
			if(curClick == 0){
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=0&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
					feedbackArray = $.parseJSON(result);
					hideLoader();
					if(result != 0)
						showHTMLShared();
				}});
			}else if(curClick == 1){
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=1&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
					feedbackArray = $.parseJSON(result);
					hideLoader();
					if(result != 0)
						showHTMLShared();	
				}});
			}else if(curClick == 2){
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=2&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
					feedbackArray = $.parseJSON(result);
					hideLoader();
					if(result != 0)
						showHTMLShared();
				}});
			}
	}
	})
	function showReviewMenu(row){
		if($( window ).width() <= 600){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		var placeId = locId.split('|');
		tabSelect = row;
		if(row == 0){
			showLoader();
			page=0;start = 0;offset=limit;counter=0;
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=0&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
				feedbackArray = $.parseJSON(result);
				if(result == 0)
					alertBox('Please take note',"No post available.");
				else
					showHTMLShared();
				hideLoader();	
			}});
			$(".reviews-shared").show();
		}if(row == 1){
			showLoader();
			page=0;start = 0;offset=limit;counter=0;
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=1&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
				feedbackArray = $.parseJSON(result);
				if(result == 0)
					alertBox('Please take note',"No post available.");
				else
					showHTMLShared();
				hideLoader();
			}});
			$(".reviews-notshared").show();
		}if(row == 2){
			showLoader();
			page=0;start = 0;offset=limit;counter=0;
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=2&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
				feedbackArray = $.parseJSON(result);
				if(result == 0)
					alertBox('Please take note',"No post available.");
				else
					showHTMLShared();
				hideLoader();
			}});
			$(".reviews-featured").show();
		} 
	}
	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		reviewActiveMenu();	
	});
	
	function reviewActiveMenu(){
		$( "#reviews .left-header" ).html('Manage Posts');
	    $( "#reviews .right-header" ).html( placename );
		if($( window ).width() > 600){
			$('#reviews .reviews-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
			$('#reviews .reviews-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			//$( '.main-wrap .right-content' ).show();
			//$( '.main-wrap .left-content' ).hide();
			//$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
});
function resizePhoto(classes,mWidth,mHeight){
	$(classes+' img').load(function() {
	$(classes+' img').each(function() {
	
		var maxWidth = mWidth; // Max width for the image
		var maxHeight = mHeight;    // Max height for the image
		var ratio = 0;  // Used for aspect ratio
		var width = $(this).width();    // Current image width
		var height = $(this).height();  // Current image height

		// Check if the current width is larger than the max
		if(width > maxWidth){
			ratio = maxWidth / width;   // get ratio for scaling image
			$(this).css("width", maxWidth); // Set new width
			$(this).css("height", height * ratio);  // Scale height based on ratio
			height = height * ratio;    // Reset height to match scaled image
			width = width * ratio;    // Reset width to match scaled image
		}

		// Check if current height is larger than max
		if(height > maxHeight){
			ratio = maxHeight / height; // get ratio for scaling image
			$(this).css("height", maxHeight);   // Set new height
			$(this).css("width", width * ratio);    // Scale width based on ratio
			width = width * ratio;    // Reset width to match scaled image
			height = height * ratio;    // Reset height to match scaled image
		}
	});
	});
}

function limitText(limitField, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	}
}

function diabledTab(classes,tabs){
	clas = 'ui-state-disabled';
	$(classes + ' li').each(function (index) {
		if($.inArray(index,tabs) == -1)
			$(this).removeClass(clas);
		else
			$(this).addClass(clas);
	});
}
function diabledbox(classes,tabs){
	clas = 'ui-state-disabled';
	$(classes + ' div.ui-input-text').each(function (index) {
		if($.inArray(index,tabs) == -1)
			$(this).removeClass(clas);
		else
			$(this).addClass(clas);
	});
}	
