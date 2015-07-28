var curClick=0,locId=0,frmpagemanage=0,setupclickmenu=0,defaultSetup=0,noPhoto = 'images/template/no-photo.gif',loadingPhoto = 'images/template/no-photo-tran.gif',isprofileupdated=0,reviewQuestion=[],feedbackArray=[],featureArray=[],inviteEmailvisited=0,isAdminCreatedLocation=0,lab='',vanitylinkupdate=0,newvanitylink='',selfieonly = 0,bgwizard=0;
var locArray=[],userArray=[],customArray=[],viewOnce=0,geocoder,lat=0,lng=0,domainFile="http://camrally.com";chargifydomain = 'https://tabluu.chargify.com';
var locDefault = '',placeId=0,placename='',keyId=0,loader='',activeLocLength=1,isfocus=0,t=0,comp_id_old=0,locname='',arraylabel=[];
var online ='images/template/active.png',onlineBg='images/template/activeOnline.png',offline ='images/template/inactive.png',offlineBg='images/template/activeOffline.png',imagesArray=[],txtdescription='',txtimg='',product_plan_array=[],component_array=[],transac=[],activity_array=[],issetup = 0,postwizard=0,isselfie=0;
//live mode chargify ids
var liteID = 3356308,basicID=3356305,proID=3356306;
//live component chargify ids
var liteID=34,com_basicID=26331,com_basic12 = 39047,com_basic24 = 39048,com_proID=26332,com_pro12 = 39050,com_pro24 = 39051,com_enterprise=26333,com_enterprise12 =39053,com_enterprise24 =39054,newentryloc = 0; 
//compoentprice
com_basicID_price=9.90,com_basic12_price = 99.00,com_basic24_price = 178.20,com_proID_price=29.90,com_pro12_price = 299.00,com_pro24_price = 538.20,com_enterprise_price=59.90,com_enterprise12_price =599.00,com_enterprise24_price =1078.20;
var istest=false,domainpath='',pathfolder='';
var creditsFree=0,creditsBasic = 2000, creditsPro = 5000, creditsEnterprise = 10000,creditsPrise = 6000;
var newplaceId,profilewizardsetup=0,profilewizardwebImg = 0,uicwizardsetup=0,questionwizardsetup=0,campaignwizard=0,vanitywizard=0,emailwizardsetup=0,resizeTimeout,isdonewizard=0,logowizard=0;
var state_Array = ['unpaid','canceled'];

$(document).bind('mobileinit', function(){
     $.mobile.metaViewportContent = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
	 $('input[type="text"]').textinput({ preventFocusZoom: true });
});

$(document).ready(function(){
	$('.fancybox').fancybox();
	if(istest == true){
			//test mode chargify ids
		basicID=3361656,basic12 = 3602785,basic24 = 3602788,liteID = 3710751; 
		//test component chargify ids
		com_basicID=27367,com_basic12 = 69598,liteID = 69599,com_proID=27368,com_pro12 = 69600,com_pro24 = 69601,com_enterprise=69597,com_enterprise12 =69602,com_enterprise24 =69603;
		chargifydomain = 'https://tripbull.chargify.com';
		domainpath = '';pathfolder = 'http://camrally.com/app/';
	}else{
		domainpath = 'http://camrally.com/';
		chargifydomain = 'https://tabluu.chargify.com';
		pathfolder = 'http://camrally.com/app/';
	}
});

	function wizardAlert(whatsetup,level,steps){
		//showLoader();
		//var steps = 6;//(selfieonly == 1 ? 7 : 7);
		if(whatsetup == 1){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Please set your correct time zone.</p>';
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
			var body = '<p>Please upload your profile image (for individuals) or a logo of your organization.</p>';
			var redirect = "profile.html";
			curClick = 1;
        }else if(whatsetup == 5){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p style="text-align:left;">Please upload one image related to your campaign.</p>'
						+'<p style="text-align:left;">You may return to the image section later & upload up to 8 images.</p>';
			var redirect = "profile.html";
			createProfileMenu2();
        }else if(whatsetup == 6){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Please upload your campaign poster & enter your campaign message.</p>';
			var redirect = "setup.html";
			curClick = 1;
		 }else if(whatsetup == 7){
			var title = 'Setup Wizard - Step '+level+' / '+ steps;
			var body = '<p>Customize your Camrally link.</p>';
			var redirect = "profile.html";
			curClick = 1;
        }else if(whatsetup == 8){
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
				hideLoader();var j=0;
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
				if(customArray.city == ''){
					profilewizardsetup=1;logowizard=1; 
					wizardAlert(3,1,6);
				}else if(customArray.logo == ''){
					bgwizard = 1;campaignwizard=1;imgproductwizard=1;profilewizardwebImg = 1;
					wizardAlert(4,2,6);	
				}else if(j == 0){
					wizardAlert(5,3,6);
				}else if(campaignwizard == 1){
					vanitywizard=1;
					wizardAlert(6,4,6);
				}else if(vanitywizard == 1){
					wizardcreatedlink=1;
					wizardAlert(7,5,6);			
				}else if(locOption[2] < 1){
					issetup = 1;uicwizardsetup = 0;
					wizardAlert(8,6,6);
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
							hideLoader();var j=0;
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
							if(customArray.city == ''){
								profilewizardsetup=1;logowizard=1; 
								wizardAlert(3,3,6);
							}else if(customArray.logo == ''){
								bgwizard = 1;campaignwizard=1;imgproductwizard=1;profilewizardwebImg = 1;
								wizardAlert(4,4,6);	
							}else if(j == 0){
								wizardAlert(5,5,6);
							}else if(campaignwizard == 1){
								vanitywizard=1;
								wizardAlert(6,6,6);
							}else if(vanitywizard == 1){
								wizardcreatedlink=1;
								wizardAlert(7,7,6);			
							}else if(locArray[0].setup < 1){
								issetup = 1;uicwizardsetup = 0;
								wizardAlert(8,8,8);
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
					if(customArray.city == '')	
						alertBox('setup incomplete','Go to Setup > Your Camrally Page ');
					else if(customArray.fbImg == '' && customArray.optsocialpost < 1)
						alertBox('setup incomplete','Go to Setup > Customers\' Social Media Posts > Default Image for Facebook Posts ');
					//else if(j < 2)
					//	alertBox('setup incomplete','Go to Setup > Your Tabluu (Business) Page ');						
					else if(customArray.nicename == "")
						alertBox('setup incomplete','Go to Setup > Your Camrally Page > Create Your Camrally Page');
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
					if(customArray.city == '')	
						alertBox('setup incomplete','Go to Setup > Your Camrally Page ');
					else if($.trim(customArray.fbImg) == '' && customArray.optsocialpost < 1)
						alertBox('setup incomplete','Go to Setup > Customers\' Social Media Posts > What to Post to Social Media? ');
					//else if(j < 2)
						//alertBox('setup incomplete','Go to Setup > Your Tabluu (Business) Page ');						
					else if(customArray.nicename == "")
						alertBox('setup incomplete','Go to Setup > Your Camrally Page > Create Your Camrally Page');
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
		$('#review-widget').click(function(){
			curClick = 0;
			if($.inArray(userArray.state,state_Array) == -1)
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "widget.html",{ });
			else
				alertBox('no access','Please subscribe.');
		});
		$('#manageFeedback').click(function(){
			curClick = 0;
			if(userArray.productId == liteID)
				alertBox('no access','Please upgrade to basic plan & above to access this feature');
			else{
				if($.inArray(userArray.state,state_Array) == -1)
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "reviews.html",{ });
				else
					alertBox('no access','Please subscribe.');
					
			}	
		});
		$('#dashboard img.logo').css({'margin': '1em 0 0 1.6em'});
		$("#dashboard img.logo").click(function (){  //logo click
			if($( window ).width() <= 600){
				$('#dashboard img.logo').attr('src','images/template/logo_home.png');
				$('#dashboard img.logo').css({'margin': '1em 0 0 1.6em'});
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
					if( parseInt(curActive) >= parseInt(activeLocLength) ){
						defaulAlertBox('confirm','please confirm','Make this campaign online?',2);
					}else
						defaulAlertBox('confirm','insufficent campaign subscriptions','Please subscribe to more campaigns...',4);
				}
			}else
				defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
		});	
			$("#del-place").click(function () {  // delete place
		if(userArray.permission < 2 )
			defaulAlertBox('confirm','please confirm','Delete this campaign?',1);
		else
			defaulAlertBox('alert','invalid request','Please contact your administrator(s) for this request.',1);
	});	
	
	$(".addnew-loc li a").click(function () {  // listview when tried to add new location
		$('.addnew-loc').hide();
		$('.text-loc').show();
		$('#text-6').focus();
	});	
	
	$( ".text-loc .ui-input-text input" ).blur(function() { // input text when it blur
		if($('#text-6').val() == ''){
			$('.addnew-loc').show();
			$('.text-loc').hide();
		}
	});
	
	$( "#text-6" ).keypress(function(e) {
		
		if(e.which == 13){
            var user = userArray;
			var name = $.trim($("#text-6").val());
            if(user.permission < 2){
                var rows = locArray.length; //get total length of location
                /*if(user.productId == everFree){
                    if(rows > 0){
                        defaulAlertBox('alert','no access',"Please upgrade to basic plan & above to add more campaign.");
                    }else{
                        _setBusinessName(name);
                    }
                }else{ */
					 _setBusinessName(name);
				//}
		  }else
			defaulAlertBox('alert','invalid request',"Please contact your administrator(s) for this request");
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
	
		var subs=0,curActive = parseInt(userArray.addLoc) + 1;
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
				$('#dashboard img.logo').attr('src','images/template/logo_home.png');
				$('#dashboard img.logo').css({'margin': '1em 0 0 1.6em'});
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
		if(row == 0){
			$('.right-menu-admin').show();
		}else if(row == 1){
			$('.right-menu-settings').show();	
		//}else if(row == 3){
			//$('.right-menu-send').show();
		}else if(row == 2){
			$('.right-menu-plan').show();
		}else if(row > 2){
			$('#visit-tabluu-page').hide();
			placeId= locId;
			var index = row - 3;
			if(locArray[index].nicename){
				if(newvanitylink != ''){
					locArray[index].vlink = newvanitylink;
					newvanitylink= '';
				}		
				if(locArray[index].vlink != '')
					$('#visit-tabluu-page a').attr('href',domainpath+locArray[index].vlink);
				else
					$('#visit-tabluu-page a').attr('href',domainpath+locArray[index].nicename+'.html');
				$('#visit-tabluu-page').show();
			}	
			$('.right-menu-loc').show();
		}
	}
	function DashMenu(){
		/*locDefault = '<li ><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Help<span class="listview-arrow-default listview-arrow-active"></span></a></li><li><a href="#">User Admin<span class="listview-arrow-default"></span></a></li><li ><a href="#">Global Settings<span class="listview-arrow-default"></span></a></li><li ><a href="#">Send Emails<span class="listview-arrow-default"></span></a></li><li ><a href="#">Subscriptions<span class="listview-arrow-default"></span></a></li>'; */
		locDefault = '<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">User Admin<span class="listview-arrow-default"></span></a></li><li ><a href="#">Global Settings<span class="listview-arrow-default"></span></a></li><li ><a href="#">Subscriptions<span class="listview-arrow-default"></span></a></li>';
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
					$('#dashboard img.logo').attr('src','images/template/logo.png');
					$('#dashboard img.logo').css({'margin': '1em 0 0 0.5em'});
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
					$('#dashboard img.logo').attr('src','images/template/logo.png');
					$('#dashboard img.logo').css({'margin': '1em 0 0 0.5em'});
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
				hadError(lastId);
				if(activeLocLength > 0)
					activeLocLength--;
				customArray=[];
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
				curClick=1;defaultSetup=0;
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
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
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
		selfieonly = 0;vanitywizard=0;bgwizard = 0;campaignwizard=0;imgproductwizard=1;profilewizardwebImg = 0;wizardcreatedlink=0;issetup = 0;uicwizardsetup = 0;profilewizardsetup=0;logowizard=0;
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
		function updateTextcampaign(){
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'opt=detailscampaign&placeId='+places[0]+'&'+$('#frmselfies').serialize(),success:function(result){
				hideLoader();
				customArray.businessName=$("#namecampaign").val();customArray.brand=$("#txtbrand").val();customArray.tag1=$("#txtcamp1").val();customArray.tag2=$("#txtcamp2").val();customArray.btntext=$("#txtbtnselfie").val();customArray.category=$("#select-category").val();
				$.box_Dialog('successfully updated', {
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
		$('#setup #submit-tagline').click(function(e){
			e.preventDefault();
			var placeId = locId.split('|');
				if($("#namecampaign").val() == '')
					uicAlertBox('incomplete information','Please input occasion','#namecampaign');
				else if($("#select-category").val() == '')
					uicAlertBox('incomplete information','Please select category','#select-category');	
				else if($("#txtbrand").val() == '')
					uicAlertBox('incomplete information','Please add your brand','#txtbrand');
				else if($("#txtcamp1").val() == '')
					uicAlertBox('incomplete information','Please add your slogan','#txtcamp1');
				else if($("#txtcamp2").val() == '')
					uicAlertBox('incomplete information','Please add your slogan','#txtcamp2');
				else if($("#txtbtnselfie").val() == '')
					uicAlertBox('incomplete information','Please add your text button','#txtbtnselfie');
				else if(customArray.backgroundImg == '')
					uicAlertBox('incomplete information','Please upload campaign poster','#uploadbackground');		
				else{	
					updateTextcampaign()
				}
		});
		$('#placeIdbackground').val(places[0]);
		$('#setup #delCampaign').click(function(e){
			e.preventDefault();
			$.box_Dialog('All feedback data for this campaign will be deleted.', {'type':'confirm','title': '<span class="color-gold">warning!<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [
			{caption: 'yes', callback: function() {
					showLoader();
					$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=createTable&case=0&set=0',success:function(lastId){
						hideLoader();
					}});
				}},{caption: 'no',callback:function(){ 
			}}]
			});
		});		
		$('#uploadbackground').click(function(e){e.preventDefault();$('#filebackground').click();});
		$('#filebackground').on('change',function(){ // save fb photo
			showLoader();
			$('#frmbackground').ajaxSubmit({beforeSubmit:  beforeSubmitImage2,success: showResponsebck,resetForm: true });
		});
		
		function showResponsebck(responseText, statusText, xhr, $form)  { 
			hideLoader();
			$('#frmbackground').css({display:'none'});
			var logoArray = $.parseJSON(responseText);			
			$('#backgroundthumb').attr('src', logoArray.bckimage);
			customArray.backgroundImg = responseText;
		}			
			
		$("#backgroundthumb").click(function (){ 
			if(customArray.backgroundImg != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
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
		
		if($( window ).width() < 600){
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
			}
		if(campaignwizard == 1){
			clas = 'ui-state-disabled';
			curClick = 1;
			showHideMenuSetup(curClick);
			defaultMenuSetup();
			diabledTab('#setup .setup-left-menu',[0,2,3]);
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
		var addli='',newnice = (customArray.link == null || customArray.link == '' ? customArray.nicename+'.html' : customArray.link);
		if(customArray.city != ''){
			if(customArray.nicename == "")
				addli = '<li ><a href="#" id="create-page" data-prefetch="true">Create Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
			else
				addli = '<li ><a href="'+domainpath+newnice+'" class="link-visit-page" target="_blank">Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="vanity">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';
		}else{
			if(customArray.nicename != "")
				addli = '<li ><a href="'+domainpath+newnice+'" class="link-visit-page" target="_blank" >Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
			var newli = '<ul class="profile-left-menu1" id="setup-profile-menu" data-role="listview"><li ><a href="profile.html" data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true" class="vanity">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html" data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li ><a href="profile.html"  data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';	
				
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
			if(questionwizardsetup == 1){
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
		
		function showHideMenuSetup(row){
			curClick = row;
			$('.panel-question').hide();$('.panel-post').hide();$('.panel-profile').hide();$('.panel-UIC').hide();$('.setup-cust-post').hide();$('.setup-email-alert').hide();$('.panel-fbpost').hide();$('.panel-redirect').hide();	
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
					$('#backgroundthumb').attr('src', logoArray.bckimage);
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
				},300);	
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
				$('#txtwebdesired').val('');
				$('#txtwebdesired').val(customArray.websiteURL);
				$('#optionredirect input[value="'+customArray.redirect+'"]').attr('checked',true).checkboxradio('refresh');
				if(customArray.redirect == 1)
					$('.txtdesirepage').show();
			}
		}
		$('#optionredirect').change(function(){
			if($("#optionredirect :radio:checked").val() == 1){
				$('#txtwebdesired').val('');
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
					if(redirectwizardsetup == 1)
						setTimeout(function(){redirectwizardsetup=0;wizardsetup();},300);
				}}]
			});	
		}
		$('#submit-redirect').click(function(e){
			places = locId.split('|');
			if($("#optionredirect :radio:checked").val() == 1){
				if($('#txtwebdesired').val() == '')
					uicAlertBox('incomplete information','Please input website url','#txtwebdesired');
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
		 })
		$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );		
			/*if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
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
		if(newvanitylink != "")
			$('.link-visit-page').attr('href',domainpath+newvanitylink);
		$('#submit-desc').click(function(e){ //save description
			showLoader();
			var str = strencode($('#campaign-desc').sceditor('instance').val());
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=textdesc&val='+str,success:function(lastId){
				hideLoader();
				customArray.description = str;
				alertBox('update successful','Description section has been updated');
			}});
		});		
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
				addli = '<li '+clas+'><a href="'+domainpath+newnice+'" target="_blank" class="link-visit-page" >Your Camrally Page<span class="listview-arrow-default"></span></a></li>';
				var newli = '<ul class="profile-left-menu2" id="setup-profile-menu" data-role="listview"><li '+clas+'><a href="profile.html"  data-prefetch="true">Profile<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="profile.html" data-prefetch="true" class="addlogo">Your Profile Image or Organizational Logo<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="#"  data-prefetch="true" class="addlogo">Your Custom Camrally URL<span class="listview-arrow-default"></span></a></li><li><a href="profile.html" data-prefetch="true">Images<span class="listview-arrow-default"></span></a></li><li '+clas+'><a href="profile.html" data-prefetch="true">Map (Marker & Display)<span class="listview-arrow-default"></span></a></li>'+addli+'</ul>';
		//}
		
			$('.profile-left-menu2').html(newli);
			$('.profile-left-menu2').on('click', ' > li', function () {
				//if($(this).index() == 1){
					//defaultSetup = 2;
					//$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{});
				if($(this).index() > 4){
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
			if($( window ).width() > 600){
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
			if($( window ).width() <= 600){
				$( '.main-wrap .left-content' ).hide();
				$( '.main-wrap .right-content' ).show();
				$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
			}
			$('.pro-section').hide();$('.desc-section').hide();$('.open-section').hide();$('.photo-section').hide();$('.map-section').hide();$('.pro-vanity').hide();
			if(row == 0){
				$('.pro-section').show();
			}else if(row == 1){
				$('.open-section').show();	
			}else if(row == 2){
				if(userArray.productId == liteID){
					alertBox('no access','Please upgrade to basic plan & above to access this feature');
				}else{		
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
				}
			
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
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
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
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=updatevanity&case=1'+'&str='+encodeURIComponent(encodequote(vanitystr)),success:function(data){
				hideLoader();
				if(data == 'exist')
					setTimeout(function(){alertBox('not available','This entry is not available anymore. Please try another one.');},300);
				else{
					$('#vanity-reset').show();
					$('#vanity-str').val(data);newvanitylink = data;
					$('.link-visit-page').attr('href',domainpath+data); 
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
						$('#vanity-str').val('');$('#vanity-reset').hide();
						//$('.van-link-default').html('<a href="'+domainpath+customArray.nicename+'" target="_blank" style="text-decoration:none;font-weight: normal;font-size: 16px">https://camrally.com/'+customArray.nicename+'.html</a>');
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
			if(responseText == 'greater'){
				alertBox('incorrect logo size','Please upload a logo image with max width 600px & max height 600px');
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
			$('#submit-map').hide();
			alertBox('default map is shown','Please update the profile section to see your business location on the map');
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
	   $('input[type="text"]').textinput({ preventFocusZoom: true });
		$( "input" ).focus(function() {
			isfocus = 1;
		});
		//diabledbox('#frmpro',[1,2,3]);
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
		// setting up values
		$('#webthumb1').attr('src', noPhoto);$('#webthumb2').attr('src', noPhoto);$('#webthumb3').attr('src', noPhoto);$('#webthumb4').attr('src', noPhoto);$('#webthumb5').attr('src', noPhoto);$('#webthumb6').attr('src', noPhoto);$('#webthumb7').attr('src', noPhoto);$('#webthumb8').attr('src', noPhoto);$('#txtorg').val('');$('#txtadd').val('');$('#txtcity').val('');$('#txtcountry').val('');$('#txtzip').val('');$('#txtpho').val('');$('#txtfb').val('');$('#txtweb').val('');$('#txtlink').val('');$('#txttwit').val('');$('#txtproemail').val('');$('#txtbooknow').val('');
		var str = $.trim(customArray.booknow);
		if(str != '' && str.indexOf("campaign.html") == -1){
			$('#txtbooknow').val(customArray.booknow);			
		}else{
			$('#txtbooknow').val('http://camrally.com/app/campaign.html?p='+customArray.nicename+'&s=b');	
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
		

        
		function checkProfileBox(){
			var r=true,txtName = $('#txtname').val(),txtAdd = $('#txtadd').val(), txtCity = $('#txtcity').val(),txtContact = $('#txtpho').val(),txtCountry=$('#txtcountry').val(),txtZip=$('#txtzip').val(),txtemail=$('#txtproemail').val(),txtcustombutton=$('#txtbooknowlabel').val(),txtcustombuttonurl=$('#txtbooknow').val();
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var email=txtemail;
			if(txtName == ''){
				alertBox('incomplete information','Please input a business name');
				r=false;        
			}else if(txtAdd == ''){
				alertBox('incomplete information','Please input an address');
				r=false;
			}else if(txtCity == ''){
				alertBox('incomplete information','Please input a city');
				r=false;        
			}else if(txtCountry == ''){
				alertBox('incomplete information','Please input a country');
				r=false;        
			}else if(txtZip == ''){
				alertBox('incomplete information','Please input a ZIP / Postal code');
				r=false;        
			}else if(!regex.test(email)){
				alertBox('invalid email address','Please enter a valid email address');
				r=false;        
			}else if(txtcustombutton == '' && txtcustombuttonurl != ''){
				alertBox('incomplete information','Please input a custom button (this is required since you filled up the custom button url)');
				r=false;        
			}
			return r;
		}	
       		$('#txtbooknowlabel').keyup(function(e){     
				limitText(this,30);
			});
			
        function saveProfile(){
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
					'buttons':  [{caption: 'okay',callback:function(){setTimeout(function() {createProfileMenu2();}, 300);}}]
				});	
			}});	
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
				 //saveProfile();
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
		$('#submit-desc').click(function(e){ //save description
			$('<div id="overlay"> </div>').appendTo(document.body);
			var str = strencode($('#textarea-desc').sceditor('instance').val());
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=textdesc&val='+str,success:function(lastId){
				$('#overlay').remove();
				customArray.description = str;
				alertBox('update successful','Description section has been updated');
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
				alertBox('incorrect image size','Please upload images products with min width 600px & min height 200px');
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
				curClick=1;defaultSetup=1;
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
				if(userArray.productId == liteID)
					 alertBox('no access','Please upgrade to basic plan & above to access this feature');
				else
					$('.uic-section-bg').show();
			}else if(row == 1){
				$('.uic-section-tb').show();
			}else if(row == 2){
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
			$('#txtshare1').val((boxArray.share[0] != '' ? decodequote(boxArray.share[0]) : 'no'));
			$('#txtshare2').val((boxArray.share[1] != '' ? decodequote(boxArray.share[1]) : 'yes'));
			$('#txt-logout').val((typeof(boxArray.logout) != 'undefined' ? decodequote(boxArray.logout[0]) : 'okay'));
			$('#follow-no').val((typeof(boxArray.follow) != 'undefined' ? decodequote(boxArray.follow[0]) : 'no'));
			$('#follow-yes').val((typeof(boxArray.follow) != 'undefined' ? decodequote(boxArray.follow[1]) : 'yes'));
			$('#btncam1').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[0]) : 'cancel'));
			$('#btncam2').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[1]) : 'snap'));
			$('#btncam3').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[2]) : 'discard'));
			$('#btncam4').val((typeof(boxArray.cambtnoption) != 'undefined' ? decodequote(boxArray.cambtnoption[3]) : 'use'));
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
			if($('#txtbox12').val().search(/<brand>/i) == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;brand&gt" and "&lt;privacy_policy_link&gt" are used or entered correctly.','#txtbox12');
				$('#txtbox12').focus();
			}else if($('#txtbox12').val().search('<privacy_policy_link>') == '-1'){
				found = false;
				uicAlertBox('incorrect entry / entries','Please ensure that "&lt;brand&gt" and "&lt;privacy_policy_link&gt" are used or entered correctly.','#txtbox12');
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
				JSON.stringify({"share":[$('#txtshare1').val(),$('#txtshare2').val()],"logout":[$('#txt-logout').val()],"follow":[$('#follow-no').val(),$('#follow-yes').val()],"cambtnoption":[$('#btncam1').val(),$('#btncam2').val(),$('#btncam3').val(),$('#btncam4').val()],"btnshare":[$('#txt-share').val()]});
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
			/*if($( window ).width() > 600){
				$( '.main-wrap .left-content' ).show();
				$( '.main-wrap .right-content' ).show();		
				$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
				$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
			}else{
				if(screen.width > 600){
					alert(screen.width);
					$( '.main-wrap .left-content' ).show();
					$( '.main-wrap .right-content' ).hide();
					$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
				}
			} */
			//is_resize();	
			$( ".right-header" ).html( placename );	
			defaultMenuUIC();
		});
	});
	
function strencode(str){
	return String(str).replace(/&amp;/,"|one").replace(/&lt;/,"|two").replace(/&gt;/,"|three").replace(/&quot;/,"|four").replace(/#/,"|five");
}
function strdecode(str){
	return String(str).replace(/\|one/,"&amp;").replace(/\|two/,"&lt;").replace(/\|three/,"&gt;").replace(/\|four/,"&quot;").replace(/\|five/,"#");
}
function encodequote(str){
	return String(str).replace(/\|quote/,"&quot;").replace(/,/g,'<comma>').replace(/"/g,'<double>').replace(/'/g,'<quote>');
}
function decodequote(str){
	return String(str).replace(/<double>/g,'"').replace(/<comma>/g,',').replace(/<quote>/g,"'").replace(/{}/g,'"').replace(/{_}/g,"'");
}
$(document).on('pageinit','#send-email', function () {
	$('.iconsend').click(function(e){
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
	$("img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=3;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html",{ });
		}
		e.preventDefault();
	});	
	$('#send-email .star').click(function(){goHome();});
});


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
   function initiazePlan(){
		var plan='',txtPlan='';$('#lblExpired').show();$('.ifcancel').show(),$('.addlocation').hide();$('.btncancelplan').hide();$('#lblcostLoc').hide();$('#lblTotal').hide();$('#lblperLoc').show();$('.btnreactivate').hide();$('#submit-planremove').hide();
		var state = userArray.state,currentPlan='';
		state= state.substr(0, 1).toUpperCase() + state.substr(1);
		$('#lblStatus').html('Status: '+state);
		$('#lblPlan').html('Current plan: '+txtPlan);
		if($.inArray(userArray.state,state_Array) == -1){
			if(userArray.productId == liteID){
				$('#lblExpired').hide();
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
			getProductId();
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
			curClick=0;
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
	$('.star').show();
    var listuser= [],locDefault=''; 
	var height = ($( window ).height() / 16) - 5;
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
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
		showHideMenuAdmin(curClick);
		defaultMenuAdmin();
	}});
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
			if(userArray.productId == liteID) //free 30 days  
				numUsers = (parseInt(userArray.addLoc) + 1) * 1;
			else if(userArray.productId == basicID) //basic
				numUsers = (parseInt(userArray.addLoc) + 1) * 3;		
			else if(userArray.productId == proID ) //plan 
				numUsers = (parseInt(userArray.addLoc) + 1) * 7;
			if(totalUsers.length < numUsers){  
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
								alertBox('invitation sent','An invitation email has been sent.');
							}});
						}	
					}});
					}	
			}else
				alertBox('maximum # of users reached',"Unable to add new user(s). Your current plan allow users # up to: "+numUsers);
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
		    if(userArray.permission > 1 )
				alertBox('request not granted',"Unauthorized or invalid request");
			else{	
				$( '#admin .right-content' ).removeClass("right-bgblue");
				$( '#admin .right-content' ).addClass("bgwhite");
				$('.panel-new').show();
			}
		}else if(row == 1){
			if(userArray.permission > 1 )
				alertBox('request not granted',"Unauthorized or invalid request");
			else{	
				$( '#admin .right-content' ).removeClass("bgwhite");
				$( '#admin .right-content' ).addClass("right-bgblue");
				$('.panel-users').show();
			}	
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
		/*if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		//is_resize();
		}	*/
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
						 $.box_Dialog('This user no longer have access to your account', {'type':     'question','title':    '<span class="color-gold">user removed<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'okay',callback: function(){
						    initializeManage();
						 }}]
						});
					}});
				}},{caption: 'no'}]
			});
		}else{
			showHideMenuManage(curClick);
			defaultMenuManage();
			alertBox('unauthorized request',"You don't have rights to delete this user");
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
					 alertBox('location access updated','The new location access for this user is updated');
				}});
			}else
				alertBox('invalid',"Please check one or more Locations");
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
		/*if($( window ).width() > 600){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).show();		
			$( '.main-wrap .left-content' ).css( {"max-width":'40%'} );
			$( '.main-wrap .right-content' ).css( {"max-width":'60%'} );
		}else{
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}	*/
		//is_resize();
		defaultMenuManage();
	});
});
//==================================================== survey =============================================== 
//	Date created: January, 08 2015

$(document).on('pageinit','#onspot', function () {
	var iframeisload=0;
	$('.icononspot').click(function(e){
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
	$("#onspot img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
			$('#onspot .onspot-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick = 0;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "feedback.html",{ });
		}
		e.preventDefault();
	});
	$('#onspot .star').click(function(){goHome();});
	$('.onspot-left-menu').on('click', ' > li', function () {
		var row = $(this).index();
		curClick = row;
		onspotbackMenu(row);
	});
	$('#anyopen').click(function(e){
		e.preventDefault();
		feedbackpage(3);
		//window.open('rateone.html?p='+customArray.nicename+'&s=3','_blank');
	});
});

	
	function onspotbackMenu(row){
		var placeId = locId.split('|');
		$(".onspot-section-anywhere").hide();$(".onspot-section-survey").hide();
		$( '#onspot .right-content' ).addClass("bgwhite");
		if(row == 0){
			//$('#surveyopenlink').val(pathfolder+'rateone.html?p='+customArray.nicename+'&s=5');
			$(".onspot-section-survey").show();
		}else if(row == 1){
			$('#anyopenlink').val(pathfolder+'rateone.html?p='+customArray.nicename+'&s=3');
			$(".onspot-section-anywhere").show();
		}
		onspotActiveMenu();
	}
	function onspotActiveMenu(){
		if($( window ).width() > 600){
			$('#onspot .onspot-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");
				}
			});	
		}else{
			$('#onspot .onspot-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
$(document).on('pageshow','#onspot', function () { 
	var height = ($( window ).height() / 16) - 5;
	$('.star').show();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	$('#onspot .ui-content').css({"background-color":'#E6E7E8'})
	$( "#onspot .left-header" ).html('Tablet "On the Spot" Feedback');
	$( "#onspot .right-header" ).html( placename );
	showLoader();
	var placeId = locId.split('|');
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt=getFeedbackUser',success:function(result){
		hideLoader();
		customArray =  $.parseJSON(result);
		onspotbackMenu(curClick);	
		if(customArray.isselfie == 1){
			diabledTab('.onspot-left-menu',[1]);
		}
	}});
	
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
		feedbackpage('e');
		//window.open('rateone.html?p='+customArray.nicename+'&s=2','_blank');
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
		if($( window ).width() <= 600){
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}
		showFeedbackMenu(row);
	});
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		feedbackActiveMenu();	
	});
	$('#submit-shortlink3').click(function(){
		window.open(domainpath+customArray.nicename+'=1','_blank');
	});
	$('#qr-generate3').click(function(){
		window.open('qr-generated.html?p='+nice1+'&s=1&size='+$("#qr-size3 :radio:checked").val(),'_blank');
	});
	places = locId.split('|');
	showLoader();
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getshorturl',async: true,success:function(result){
		hideLoader();
		arrayDataURL =  $.parseJSON(result);
		var title = 'Setup Wizard - Step 6 / 6',nicelink='';
		if(liteID == userArray.productId)
			nicelink = customArray.nicename+'.html'; 
		else if(basicID == userArray.productId || proID == userArray.productId){
			nicelink = newvanitylink;
		}
		if(isdonewizard > 0){
			wizardstep7();
			
			var body = '<p style="text-align:left">Congratulations! You have completed the setup.</p>'
					 +'<p style="text-align:left">Start promoting your Camrally mini link now! (<a href="'+domainpath+arrayDataURL.source_1.link+'" target="_blank">'+domainpath+arrayDataURL.source_1.link+'</a>)</p>';
			$.box_Dialog(body, {
				'type':     'question',
				'title':    '<span class="color-white">'+title+'<span>',
				'center_buttons': true,
				'show_close_button':false,
				'overlay_close':false,
				'buttons':  [{caption: 'okay',callback:function(){
					curClick = 0;
					window.open(domainpath+customArray.nicename,'_blank');
					$( ":mobile-pagecontainer" ).pagecontainer( "change",'index.html',{});
				}}]	
			});	
		}		
		setshorturl(2);
	}});
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
		
	$(".feedback-weblink").hide();$(".tellafriend").hide();$(".feedback-photo").hide();$(".survey").hide();$(".feedback-widget").hide();
		if(row == 1){
			$( '#feedback .right-content' ).addClass("bgwhite");
			if(customArray.nicename == ''){
				alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				$(".feedback-weblink").show();
			}
		}else if(row == 0){
			if(customArray.nicename == ''){	
					alertBox('setup incomplete','Go to Setup > Camrally Page');
			}else{
				$('#feedback #emaillink').val('http://camrally.com/'+customArray.nicename+'=e');
				$(".tellafriend").show();
				
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
		}
		feedbackActiveMenu();
	}
	
	function feedbackActiveMenu(){
		$( "#feedback .left-header" ).html('Rally for Advocates');
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
			//$( '.main-wrap .right-content' ).show();
			//$( '.main-wrap .left-content' ).hide();
			//$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
$(document).on('pageshow','#feedback', function () { 
	var height = ($( window ).height() / 16) - 5;iframeisload=0;
	$('.star').show();
	$("#tellFrame").hide();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	$('#feedback .ui-content').css({"background-color":'#E6E7E8'})
	$( "#feedback .left-header" ).html('Collect Feedback / Selfie');
	$( "#feedback .right-header" ).html( placename );
	var placeId = locId.split('|');
	showLoader();
	$.ajax({type: "POST",url:"getData.php",cache: false,data:'key='+placeId[0]+'&opt=getFeedbackUser',success:function(result){
		customArray =  $.parseJSON(result);
		hideLoader();
		showFeedbackMenu(curClick);
	  }});	
	
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
				+'<div class="iconProfile">'
					+'<div class="wrapImg fbImg'+counter+'"><img src="https://graph.facebook.com/'+feedbackArray[i].fbId+'/picture?type=large" /></div>'
					+'<div class="profilename"><a href="https://www.facebook.com/'+feedbackArray[i].fbId+'" style="text-decoration:none;" target="_blank">'+feedbackArray[i].name+'</a></div>'
				+'</div>'
				+'<div class="imgSelfie">'
					+'<div class="wrapImg2 selfImg'+counter+'"><img src="'+feedbackArray[i].url+'" /></div>'
				+'</div>'
			+'</div>'
		+'</div>'
		+'<div class="clear"></div>'
		if(isselfie == 0){
		t= t +'<div class="divwrap">'
			+'<table cellspacing="0">'
				+'<tr>'
					+'<th class="areas noborderleft padLeft-5 c1">Areas</th>'
					+'<th class="score c1">Score</th>'
					+'<th class="date c1">Date</th>'
				+'</tr>';
				for(var j in reviewQuestion){
					var rated=0;
					if(j == 0)
						rated = feedbackArray[i].rated1;
					else if(j == 1)
						rated = feedbackArray[i].rated2;
					else if(j == 2)
						rated = feedbackArray[i].rated3;
					else if(j == 3)
						rated = feedbackArray[i].rated4;
					else if(j == 4)
						rated = feedbackArray[i].rated5;
					else if(j == 5)
						rated = feedbackArray[i].rated6;
					else if(j == 6)
						rated = feedbackArray[i].rated7;		
				t = t + '<tr>'
					+'<td class="noborderleft padLeft-5"><p style="">'+reviewQuestion[j]+'</p></td>'
					+'<td class="padLeft-5">'+rated+'</td>';
					if(j < 1 ){
						var created = feedbackArray[i].created.split('-');
						var day = created[2].split(' ');
						t = t +'<td rowspan="'+(reviewQuestion.length < 2 ? 2 : 1)+'" style="vertical-align: top">'
							+'<div style="padding:5px 5px 0px 5px;white-space:nowrap;display: table-cell;vertical-align: middle;">'+day[0]+' '+month[parseInt(created[1])]+' '+created[0]+'</p></div>'
							if(reviewQuestion.length < 2){
								t = t +'<table cellspacing="0" class="manage"><tr><th class="score c1">Manage</th></tr></table>'
								+'<div style="padding-top:5px;"><fieldset id="removePhoto" data-role="controlgroup" data-iconpos="left" data-corners="false"><div class="ui-controlgroup-controls"><div class="ui-checkbox"><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="feature-'+feedbackArray[i].id+'">Feature</label><input id="feature-'+feedbackArray[i].id+'" type="checkbox" name="feature-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].feature == 1 ? 'checked="checked"' : '')+'><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="hideImg-'+feedbackArray[i].id+'">Hide</label><input id="hideImg-'+feedbackArray[i].id+'" type="checkbox" name="hideImg-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].hideimg == 1 ? 'checked="checked"' : '')+'></div></div></fieldset></div>'
							}
							+'</td>';
					}
					if(j == 1){
						t = t +'<td rowspan="1" class="c1" style="background-color:#c7e6f5;text-align:left;padding:10px 0 8px 5px;" style="vertical-align: top">Manage</td>';
					}
					if(j == 2){
						t = t +'<td rowspan="'+reviewQuestion.length+'" style="vertical-align: middle">'
						+'<div style="padding-top:5px;"><fieldset id="removePhoto" data-role="controlgroup" data-iconpos="left" data-corners="false"><div class="ui-controlgroup-controls"><div class="ui-checkbox"><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="feature-'+feedbackArray[i].id+'">Feature</label><input id="feature-'+feedbackArray[i].id+'" type="checkbox" name="feature-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].feature == 1 ? 'checked="checked"' : '')+'><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="hideImg-'+feedbackArray[i].id+'">Hide</label><input id="hideImg-'+feedbackArray[i].id+'" type="checkbox" name="hideImg-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].hideimg == 1 ? 'checked="checked"' : '')+'></div></div></fieldset></div>'
						+'</td>';
					}
				+'</tr>';
				}
				t= t +'<tr><td class="noborderleft padLeft-5"><strong>Average</strong></td>'
						+ '<td class="padLeft-5"><strong>'+feedbackArray[i].aveRate+'</strong></td>'
						if(reviewQuestion.length == 2){
							t = t +'<td rowspan="1" style="vertical-align: middle">'
							+'<div style="padding-top:5px;"><fieldset id="removePhoto" data-role="controlgroup" data-iconpos="left" data-corners="false"><div class="ui-controlgroup-controls"><div class="ui-checkbox"><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="feature-'+feedbackArray[i].id+'">Feature</label><input id="feature-'+feedbackArray[i].id+'" type="checkbox" name="feature-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].feature == 1 ? 'checked="checked"' : '')+'><label class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child" for="hideImg-'+feedbackArray[i].id+'">Hide</label><input id="hideImg-'+feedbackArray[i].id+'" type="checkbox" name="hideImg-'+feedbackArray[i].id+'" value="'+feedbackArray[i].id+'" '+(feedbackArray[i].hideimg == 1 ? 'checked="checked"' : '')+'></div></div></fieldset></div>'
							+'</td>';
						}
						+'</tr>'	
			t= t +'</table>'
		+'</div>'
		+'<div class="divwrap" style="padding-bottom:10px;">'
			+'<div class="c1 bottomborder comment" style="padding:5px;background-color:#c7e6f5;">Comment</div>'
			+'<p class="padLeft-5 comment">'+feedbackArray[i].comment+'</p>'
		+'</div>';
		}else{
			t= t +'<div class="divwrap">'
			+'<table cellspacing="0">'
				+'<tr>'
					+'<th class="areas noborderleft padLeft-5 c1">Manage</th>'
					+'<th class="date c1">Date</th>'
				+'</tr>';
				for(var j in reviewQuestion){
					var rated=0;
					if(j == 0)
						rated = feedbackArray[i].rated1;
					else if(j == 1)
						rated = feedbackArray[i].rated2;
					else if(j == 2)
						rated = feedbackArray[i].rated3;
					else if(j == 3)
						rated = feedbackArray[i].rated4;
					else if(j == 4)
						rated = feedbackArray[i].rated5;
					else if(j == 5)
						rated = feedbackArray[i].rated6;
					else if(j == 6)
						rated = feedbackArray[i].rated7;		
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
					}
				t= t +'</table>'
			+'</div>'
			+'<div class="divwrap" style="padding-bottom:10px;">'
			+'</div>';
			}
		}
		t= t+'<div class="nextpage'+page+'"></div>';
		if(tabSelect == 0){
			page++;
			$('#feature').html('');
			$('#shared').html(t);
		}else if(tabSelect == 2){
			$('#shared').html('');
			$('#feature').html(t);
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
		function showHTMLNOTSharedselfie(){
		var t = '';counter++;
		for(var i in feedbackArray){
		t = t + '<div class="divwrap" style="padding-top:5px;margin-top:10px;">'
			+'<div class="wrapProfileImg">'
				+'<div class="iconProfile">'
					+'<div class="wrapImg fbImg'+counter+'"><img src="https://graph.facebook.com/'+feedbackArray[i].fbId+'/picture?type=large" /></div>'
					+'<div class="profilename"><a href="https://www.facebook.com/'+feedbackArray[i].fbId+'" style="text-decoration:none;" target="_blank">'+feedbackArray[i].name+'</a></div>'
				+'</div>'
				+'<div class="imgSelfie">'
					+'<div class="wrapImg2 selfImg'+counter+'"><img src="'+feedbackArray[i].url+'" /></div>'
				+'</div>'
			+'</div>'
		+'</div>'
		+'<div class="clear"></div>'
			t= t +'<div class="divwrap">'
			+'<table cellspacing="0">'
				+'<tr>'
					+'<th class="date c1">Date</th>'
				+'</tr>';
				for(var j in reviewQuestion){
					var rated=0;
					if(j == 0)
						rated = feedbackArray[i].rated1;
					else if(j == 1)
						rated = feedbackArray[i].rated2;
					else if(j == 2)
						rated = feedbackArray[i].rated3;
					else if(j == 3)
						rated = feedbackArray[i].rated4;
					else if(j == 4)
						rated = feedbackArray[i].rated5;
					else if(j == 5)
						rated = feedbackArray[i].rated6;
					else if(j == 6)
						rated = feedbackArray[i].rated7;		
					t = t + '<tr>'
						var created = feedbackArray[i].created.split('-');
						var day = created[2].split(' ');
						t = t +'<td rowspan="'+(reviewQuestion.length < 2 ? 2 : 1)+'" style="vertical-align: middle">'
							+'<div style="padding:5px 5px 0px 5px;white-space:nowrap;display: table-cell;vertical-align: middle;">'+day[0]+' '+month[parseInt(created[1])]+' '+created[0]+'</p></div>'
							+'</td>';
					+'</tr>';
					}
				t= t +'</table>'
			+'</div>'
			+'<div class="divwrap" style="padding-bottom:10px;">'
			+'</div>';
			
		}
		t= t+'<div class="nextpage'+page+'"></div>';
		if(tabSelect == 3){ // next page load
			$('.nextpage'+(page < 1 ? 0 : page-1)).html(t);
			page++;
		}else{
			page++;
			$('#notshared').html(t);
		}
		
		resizePhoto('.fbImg'+counter,150,150);
		resizePhoto('.selfImg'+counter,300,300);
	}
	function showHTMLNotShared(){
		var t = '';
		for(var i in feedbackArray){
		t = t +'<div class="divwrap" style="margin-top:10px;">'
			+'<table cellspacing="0">'
				+'<tr>'
					+'<th class="noborderleft padLeft-5 c1">Areas</th>'
					+'<th class="score c1">Score</th>'
					+'<th class="date c1">Date</th>'
				+'</tr>';
				for(var j in reviewQuestion){
					var rated=0;
					if(j == 0)
						rated = feedbackArray[i].rated1;
					else if(j == 1)
						rated = feedbackArray[i].rated2;
					else if(j == 2)
						rated = feedbackArray[i].rated3;
					else if(j == 3)
						rated = feedbackArray[i].rated4;
					else if(j == 4)
						rated = feedbackArray[i].rated5;
					else if(j == 5)
						rated = feedbackArray[i].rated6;
					else if(j == 6)
						rated = feedbackArray[i].rated7;		
				t = t + '<tr>'
					+'<td class="noborderleft padLeft-5">'+reviewQuestion[j]+'</td>'
					+ '<td class="center">'+rated+'</td>';
					if(j < 1 ){
						var created = feedbackArray[i].created.split('-');
						var day = created[2].split(' ');
						var totalquestion = parseInt(reviewQuestion.length) + 1;
						t = t +'<td class="center" rowspan="'+totalquestion+'" style="vertical- align:middle;">'
							+'<div style="padding:5px;"><p>'+day[0]+' '+month[parseInt(created[1])]+' '+created[0]+'</p>'
							+'</div>'
						+'</td>';
					}
				+'</tr>';
				}
				t= t +'<tr><td class="noborderleft padLeft-5"><strong>Average</strong></td>'
						+ '<td class="center"><strong>'+feedbackArray[i].aveRate+'</strong></td></tr>'
			t= t +'</table>'
		+'</div>'
		+'<div class="divwrap" style="padding-bottom:10px;background-color:#EFF0F1">'
			+'<div class="c1 bottomborder" style="padding:5px;background-color:#c7e6f5;">Comment</div>'
			+'<p class="padLeft-5">'+feedbackArray[i].comment+'</p>'
		+'</div>';
		}
		t= t+'<div class="nextpage'+page+'"></div>';		
		if(tabSelect == 3){ // next page load
			$('.nextpage'+(page < 1 ? 0 : page-1)).html(t);
			page++;
		}else{
			page++;
			$('#notshared').html(t);
		}		
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
					if(result != 0){
						if(isselfie == 1)
							showHTMLNOTSharedselfie();
						else
							showHTMLNotShared();
					}		
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
		var placeId = locId.split('|');
		tabSelect = row;
		if(row == 0){
			showLoader();
			page=0;start = 0;offset=limit;counter=0;
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=0&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
				feedbackArray = $.parseJSON(result);
				if(result == 0)
					alertBox('Please take note',"No post available.");
				else{
					if(reviewQuestion.length < 1){
						$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getQuestion&case=0&placeId='+placeId[0],success:function(result){
							reviewQuestion = $.parseJSON(result);
							showHTMLShared();
						}});
					}else
						showHTMLShared();
				}
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
				else{
					if(reviewQuestion.length < 1){
						$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getQuestion&case=0&placeId='+placeId[0],success:function(result){
							reviewQuestion = $.parseJSON(result);
							if(isselfie == 1)
								showHTMLNOTSharedselfie();
							else
								showHTMLNotShared();
						}});
					}else{
						if(isselfie == 1)
							showHTMLNOTSharedselfie();
						else
							showHTMLNotShared();
					}	
				}
				hideLoader();
			}});
			$(".reviews-notshared").show();
		}if(row == 2){
			//if(reviewQuestion.length < 1)
				//getQuestion();
			showLoader();
			page=0;start = 0;offset=limit;counter=0;
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getFeedback&case=2&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
				feedbackArray = $.parseJSON(result);
				if(result == 0)
					alertBox('Please take note',"No post available.");
				else{
					if(reviewQuestion.length < 1){
						$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getQuestion&case=0&placeId='+placeId[0],success:function(result){
							reviewQuestion = $.parseJSON(result);
							showHTMLShared();
						}});
					}else
						showHTMLShared();
				}
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
		$( "#reviews .left-header" ).html('Manage Advocates');
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
//==================================================== Reviews Widget =============================================== 
//	Date created: Nov, 5 2014

$(document).on('pageinit','#widget', function () {
	$('.iconwidget').click(function(e){
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

$(document).on('pageshow','#widget', function () { 
	var height = ($( window ).height() / 16) - 5;
	var placeId = locId.split('|'),resizeTimeout,widgetArray= [],reviewProduct= [];
	curClick = 0,limit=2,reviewAvg=[],reviewQuestion=[],reviewWidget=[];
	var start = 0,offset=limit,page=0,emptyArray=0;
	widgetActiveMenu();
	$('.star').show();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	 $( "#widget .left-header" ).html('Review / Selfie Widget');
	  $( "#widget .right-header" ).html( placename );
	
    function getWidgetReview(){
		page=0;start = 0;offset=limit;counter=0;
		showLoader();
		$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getWedgetFeedback&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
			reviewWidget = $.parseJSON(result);
			if(reviewWidget.length < 1){
				alertBox('note',"You don't have any review or selfie that are shared on the social media yet.");
				hideLoader();
			}else{
				if(reviewAvg.length < 1){
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getReviewtAverage&placeId='+placeId[0],success:function(result){
						reviewAvg = $.parseJSON(result);
						createReview();
					}});
				}
				if(reviewQuestion.length < 1){
					$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getQuestion&case=0&placeId='+placeId[0],success:function(result){
						reviewQuestion = $.parseJSON(result);
						contenloop(reviewWidget,reviewQuestion);
						hideLoader();
					}});
				}
			}
		}});
	}
	showWidgetMenu(curClick);
	function showWidgetMenu(row){
		var placeId = locId.split('|');
		$('.thirdwidget').hide();
		if(row == 0){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+placeId[0]+'&opt=getReviewProduct',success:function(result){
				reviewProduct =  $.parseJSON(result);
				if(reviewProduct.nicename == '')
					alertBox('setup incomplete','Go to Setup > Your Camrally Page');
				else if(reviewProduct.productId != proID && reviewProduct.productId != enterprise && reviewProduct.productId != pro12 && reviewProduct.productId != pro24 && reviewProduct.productId != enterprise12 && reviewProduct.productId != enterprise24)
					alertBox('no access','Please upgrade to pro plan & above to access this widget');
				else{
					$('.thirdwidget').show();
					$('.script-tag').html('<div style="overflow-x:scroll;white-space:wrap;line-height:1.2em;padding:10px;border:1px solid #ccc">&lt;script type="text/javascript" id="script-tabluu" src= "http://camrally.com/app/widget/widget.min.js?pubId='+reviewProduct.nicename+'"&gt;&lt;/script&gt;</div>');
					getWidgetReview();
				}
				hideLoader();
			}});
		}
	}
	function removeClass(){
		if($('.comment-container').width() > 400){
			$('.wrap-widget').css({'font-size':'16px'});
			if($('.rate-wrap div').hasClass('m-rate-wrap-avatar')){
				$('.rate-wrap div.m-rate-wrap-avatar').addClass('rate-wrap-avatar');
				$('.rate-wrap div.rate-wrap-avatar').removeClass('m-rate-wrap-avatar');
			}
			if($('.rate-wrap div').hasClass('m-rate-avatar')){
				$('.rate-wrap div.m-rate-avatar').addClass('rate-avatar');
				$('.rate-wrap div.rate-avatar').removeClass('m-rate-avatar');
			}	
			if($('.comment-container div').hasClass('m-rate-wrap-comment')){
				$('.comment-container div.m-rate-wrap-comment').addClass('rate-wrap-comment');
				$('.comment-container div.rate-wrap-comment').removeClass('m-rate-wrap-comment');
			}
		}else{
			$('.wrap-widget').css({'font-size':'14px'});
			if($('.rate-wrap div').hasClass('rate-wrap-avatar')){
				$('.rate-wrap div.rate-wrap-avatar').addClass('m-rate-wrap-avatar');
				$('.rate-wrap div.m-rate-wrap-avatar').removeClass('rate-wrap-avatar');
			}
			if($('.rate-wrap div').hasClass('rate-avatar')){
				$('.rate-wrap div.rate-avatar').addClass('m-rate-avatar');
				$('.rate-wrap div.m-rate-avatar').removeClass('rate-avatar');
			}	
			if($('.comment-container div').hasClass('rate-wrap-comment')){
				$('.comment-container div.rate-wrap-comment').addClass('m-rate-wrap-comment');
				$('.comment-container div.m-rate-wrap-comment').removeClass('rate-wrap-comment');
			}		
		}
		
	}
	function contenloop(arrayreviews,arrayquestion){
		var div = '';
		
		for (var i in arrayreviews){
			div = div + '<div class="pin">'
				+'<p class="fblink">'
					+'<a href="https://www.facebook.com/'+arrayreviews[i].fbId+'" target="_blank">'+arrayreviews[i].name+'</a>'
				+'</p>'
				+'<div class="text-center"><img alt="fb profile" src="'+(parseInt(arrayreviews[i].hideimg) < 1 ? 'https://graph.facebook.com/'+arrayreviews[i].fbId+'/picture?type=large' : 'images/fbDefault.png')+'" class="pinImage"></div>';
				if(isselfie == 0){
					div = div +'<div class="wrap-iconstar">'
						+'<div class="my-rating">'
							+'My rating: '+arrayreviews[i].aveRate+'/5'
						+'</div>'
						+'<div class="staricon">'
							+'<span class="stargrey2"><span class="staryellow2" style="'+arrayreviews[i].style+'"></span></span>'
						+'</div>'
					+'</div>'
						+'<p class="p-rating">';
						for(var j in arrayquestion){
							var rated=0,comma='.';
							if(j < (arrayquestion.length - 1))
								comma = ',';
							if(j == 0)
								rated = arrayreviews[i].rated1;
							else if(j == 1)
								rated = arrayreviews[i].rated2;
							else if(j == 2)
								rated = arrayreviews[i].rated3;
							else if(j == 3)
								rated = arrayreviews[i].rated4;
							else if(j == 4)
								rated = arrayreviews[i].rated5;
							else if(j == 5)
								rated = arrayreviews[i].rated6;
							else if(j == 6)
								rated = arrayreviews[i].rated7;
							div = div  +'<span>'+arrayquestion[j]+': '+rated+'/5'+comma+'</span> ';
						}	
						div = div +'</p>'
						+'<p class="comment">'+arrayreviews[i].comment+'</p>';
				}else
					div = div +'<div style="padding-bottom:10px;"></div>';
				div = div +'</div>';
			}
			
			$('.comment-container').append(div);
	}
	/*
	function contenloop_orig(arrayreviews,arrayquestion){
		var div = '';
		for (var i in arrayreviews){
			div = div +'<div class="rate-wrap">'
				+'<div class="'+(($(".comment-container").width() > 400) ? 'rate-wrap-avatar' : 'm-rate-wrap-avatar')+'">'
					+'<div class="'+(($(".comment-container").width() > 400) ? 'rate-avatar' : 'm-rate-avatar')+'">'
						+'<img src="'+(parseInt(arrayreviews[i].hideimg) < 1 ? 'https://graph.facebook.com/'+arrayreviews[i].fbId+'/picture?type=large' : 'images/fbDefault.png')+'" />'
						+'<div class="name-profile"><a href="https://www.facebook.com/'+arrayreviews[i].fbId+'" target="_blank">'+arrayreviews[i].name+'</a></div>'
					+'</div>'
				+'</div>'
				+'<div class="'+(($(".comment-container").width() > 400) ? 'rate-wrap-comment' : 'm-rate-wrap-comment')+'">'
					 +'<div class="star-icon">'
						+'<span class="stargrey2"><span class="staryellow2" style="'+arrayreviews[i].style+'"></span></span>'
					  +'</div>'
						+'<div class="view-icon">'
							+'<div class="wrap-view-img">'
								+'<img alt="view image" src="images/viewIcon.png">'
							+'</div>'
						+'</div>'
					 +'<div class="wrap-tag">';
					 for(var j in arrayquestion){
						var rated=0,comma='';
						if(j < (arrayquestion.length - 1))
							comma = ',';
						if(j == 0)
							rated = arrayreviews[i].rated1;
						else if(j == 1)
							rated = arrayreviews[i].rated2;
						else if(j == 2)
							rated = arrayreviews[i].rated3;
						else if(j == 3)
							rated = arrayreviews[i].rated4;
						else if(j == 4)
							rated = arrayreviews[i].rated5;
						else if(j == 5)
							rated = arrayreviews[i].rated6;
						else if(j == 6)
							rated = arrayreviews[i].rated7;
						div = div  +'<span>'+arrayquestion[j]+': <b>'+rated+'/5</b>'+comma+'</span>';
					}
					div = div  +'</div>';
					if(arrayreviews[i].comment != ''){
					div = div  +'<div class="comment">'
							+'<p>'+arrayreviews[i].comment+'</p>'
						+'</div>';
					}
				div = div  +'</div>'
			+'</div>';
		}
		$('.comment-container').append(div);
	} */
	function createReview(){
	/*
		var div = '<div class="wrap-rate-header">'
			+'<div class="wrap-rate-logo">'
				+'<div class="rate-logo"><img src="images/template/logo_home.png" /></div>'
			+'</div>'
			+'<div class="rate-reviews">';
				//+'<div class="staricon">'
					//+'<span class="stargrey2"><span class="staryellow2" style="'+reviewAvg.style+'"></span></span>'
				//+'</div><div style="clear:both;"></div>'
				if(isselfie == 0){
					div = div + '<p style="color:#777">'+reviewAvg.totalavg+' out of 5</p>';
					div = div +'<p><span><a href="baseshared.php?id='+placeId[0]+'" class="fancybox fancybox.iframe sharedlink" style="#00AEEF">'+reviewAvg.totalrev+(isselfie == 0 ? ' reviews' : ' selfies')+'</a></span></p>'
				}else{
					div = div +'<p><span style="#00AEEF">'+reviewAvg.totalrev+(isselfie == 0 ? ' selfies' : ' selfies')+'</span></p>'
				}
			+'</div>'
			+'</div>'
		+'</div>'
		+'<div class="comment-container">'
		
		+ '</div>';
		$('.wrap-widget').html(div);  */
		var div = '<div class="wrap-rate-header">'
			+'<div class="wrap-rate-logo">'
				+'<div class="rate-logo"><img src="images/template/logo_home.png" /></div>'
			+'</div>'
			+'<div class="rate-reviews">';
                if(isselfie == 0){
				div = div +'<p style="color:#777">'+reviewAvg.totalavg+' out of 5</p>'
				+'<p><span><a href="baseshared.php?id='+placeId[0]+'" class="fancybox fancybox.iframe sharedlink">'+reviewAvg.totalrev+' reviews</a></span></p>';
				}else
					div = div +'<p><span style="color: #38c;">'+reviewAvg.totalrev+' selfies'+'</span></p>';
			div = div +'</div>'
			+'</div>'
		+'</div>'
		+'<div class="comment-container">'
		
		+ '</div>';
		$('.wrap-widget').html(div);
	}
	
	$(window).scroll(function() {
		if($(window).scrollTop() >= $(document).height() - $(window).height()) {
			start = offset + start;
			if(emptyArray < 1){
				showLoader();
				$.ajax({type: "POST",url:"getData.php",cache: false,data:'opt=getWedgetFeedback&placeId='+placeId[0]+'&start='+start+'&offset='+offset,success:function(result){
					reviewWidget = $.parseJSON(result);
					if(reviewWidget.length > 0)
						contenloop(reviewWidget,reviewQuestion);
					else
						emptyArray = 1;
					hideLoader();
				}});
			}	
		}
	});
	
	$( window ).resize(function() { // when window resize
		//alert($('.comment-container').height() + ' '+ $('.comment-container').width())
		//clearTimeout(resizeTimeout);
		//resizeTimeout = setTimeout(function(){removeClass();}, 500);//to prevent the events fire twice
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		widgetActiveMenu();	
	});

	function widgetActiveMenu(){
		if($( window ).width() > 600){
			$('#widget .widget-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
			$('#widget .widget-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
});
//==================================================== newly created tab from setup Customers Facebook Posts  =============================================== 
//	Date created: November, 22 2014
function limitText(limitField, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	}
}
$(document).on('pageinit','#fbpost', function () {
	$('.iconfbpost').click(function(e){
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
	 $("#fbpost img.logo").click(function (e){  //logo click
		if($( window ).width() <= 600 && !$('.left-content').is(":visible")){
			$( '.main-wrap .left-content' ).show();
			$( '.main-wrap .right-content' ).hide();
			$( '.main-wrap .left-content' ).css( {"max-width":'100%'} );
		}else if(($( window ).width() <= 600 && $('.left-content').is(":visible")) || $( window ).width() > 600){
			curClick=0;defaultSetup=3;
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "setup.html",{ });
		}
		e.preventDefault();
	});	
	
	$('#txtoccation,#txtcamp1,#txtcamp2,#txtinfodate').keyup(function(e){     
		limitText(this,40);
    });

	$('#fbpost #btncampaign').keyup(function(e){     
		limitText(this,22);
    });

	$('#fbpost .star').click(function(){goHome();});

	/*
	$('#optPost').click(function(){
		if($("#optPost :radio:checked").val() > 0){
			alert('show')
			$('.ownimg').show();
		}else{
			alert('show')
			$('.ownimg').hide();
		}	
	}) */
	$("input[type='radio']").bind( "click", function(event, ui) {
		   if($("#optPost :radio:checked").val() == 1){
				$('.ownimg').hide();
				$('.selfie-2').hide();
			}else if($("#optPost :radio:checked").val() == 0){
				$('.ownimg').show();
				$('.selfie-2').hide();
			}else if($("#optPost :radio:checked").val() == 2){
				$('.selfie-2').show();
				$('.ownimg').hide();
				var arraytagline =  $.parseJSON(customArray.taglineselfie);
				$("#txtoccation").val(arraytagline.txtoccation);$("#txtinfodate").val(arraytagline.txtinfodate);$("#txtcamp1").val(arraytagline.tagline1);$("#txtcamp2").val(arraytagline.tagline2);
			}
	});
	
});

$(document).on('pageshow','#fbpost', function () { 
	var height = ($( window ).height() / 16) - 5;
	var placeId = locId.split('|');
	$('.star').show();
	$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
	$('#fbpost .ui-content').css({"background-color":'#E6E7E8'});
	showFbpostMenu(curClick);
	var clas = 'ui-state-disabled';
	if(postwizard == 1){
		diabledTab('.fbpost-left-menu',[1,2]);
	}else{
		//$('.fbpost-left-menu li').each(function (index) {
		//	$(this).removeClass(clas);
		//});	
        if(customArray.isselfie == 1)
			diabledTab('.fbpost-left-menu',[1,2]);		
	}
	
	function showFbpostMenu(row){
		$(".panel-fbpost").hide();$(".panel-post").hide();$(".setup-cust-post").hide();
		if(row == 0){
			showLoader();
			$.ajax({type: "POST",url:"getData.php",cache: false,data:'placeId='+places[0]+'&opt=getImages&',async: false,success:function(result){
				hideLoader(); 
				if(result != 0){
					imagesArray =  $.parseJSON(result);
				}
				$('.panel-fbpost').show(); 
			}});
			/*
			var clas = 'ui-state-disabled';
			$('#optPost .ui-controlgroup-controls div').each(function (index) {
				if(customArray.isselfie == 1 && (index == 0 || index == 2))
					$(this).addClass(clas);
				else if(customArray.isselfie == 0 && index == 1)
					$(this).addClass(clas);
			});	*/
			$('#optPost input[value="'+customArray.optsocialpost+'"]').attr('checked',true).checkboxradio('refresh');
			if(customArray.optsocialpost == 1){
				$('.ownimg').hide();
				$('.selfie-2').hide();
			}else if(customArray.optsocialpost == 0){
				$('.ownimg').show();
				$('.selfie-2').hide();
			}else if(customArray.optsocialpost == 2){
				$('.selfie-2').show();
				$('.ownimg').hide();
				var arraytagline =  $.parseJSON(customArray.taglineselfie);
				$("#txtoccation").val(arraytagline.txtoccation);$("#txtinfodate").val(arraytagline.txtinfodate);$("#txtcamp1").val(arraytagline.tagline1);$("#txtcamp2").val(arraytagline.tagline2);
			}
		}else if(row == 1){
			$(".panel-post").show();
		}else if(row == 2){
			if(userArray.productId != proID && userArray.productId != enterprise && userArray.productId != pro12 && userArray.productId != pro24 && userArray.productId != enterprise12 && userArray.productId != enterprise24)
				 alertBox('no access','Please upgrade to pro plan & above to access this feature');
			else
				$('.setup-cust-post').show();
		}
		fbpostActiveMenu();
	}


	// default facebook post image script
		$('#placeidfb').val(places[0]);
		$('#fbthumb').attr('src', noPhoto);
		if(customArray.fbImg != ''){
			$('#fbthumb').attr('src', customArray.fbImg);
			$('#frmfb').css({display:'none'});	
		}else{
			$('#fbthumb').attr('src', 'images/template/no-photo.gif');
			$('#frmfb').css({display:'inline'});
		}	
		
		$("#fbthumb").click(function (){
			if(customArray.fbImg != ''){
				$.box_Dialog('Delete this image?', {'type':'confirm','title': '<span class="color-gold">please confirm<span>','center_buttons': true,'show_close_button':false,'overlay_close':false,'buttons':  [{caption: 'yes', callback: function() {
						showLoader();
						$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=delImg&id='+imagesArray.fbImg.id,success:function(lastId){
							hideLoader();
							if(lastId > 0){
								customArray.fbImg = '';$('#frmfb').css({display:'inline'});	
								$('#fbthumb').attr('src', noPhoto);
							}else
								alertBox('error detected','Please try again');
						}});
					}},{caption: 'no'}]
				});	
			}	
		});

	   $('#upload').click(function(e){e.preventDefault();$('#idfb').val(imagesArray.fbImg.id);$('#filefb').click();}); 
		$('#filefb').on('change',function(){ // save fb photo
			$('<div id="overlay"> </div>').appendTo(document.body);
			$('#frmfb').ajaxSubmit({beforeSubmit:  beforeSubmitfb,success: showResponse,resetForm: true });
		});
		
		function showResponse(responseText, statusText, xhr, $form)  { 
		   if(responseText == 'less'){
				hideLoader();
				$('#fbthumb').attr('src', noPhoto);
				alertBox('incorrect image size','Please upload image with min width 600px & min height 200px');
			}else{	
				$('#overlay').remove();$('#frmfb').css({display:'none'});			
				$('#fbthumb').attr('src', responseText);
				customArray.fbImg = responseText;
			}
		}

		function beforeSubmitfb(){
			//check whether client browser fully supports all File API // if (window.File && window.FileReader && window.FileList && window.Blob)
			if (window.File){
				   var fsize = $('#filefb')[0].files[0].size; //get file size
				   var ftype = $('#filefb')[0].files[0].type; // get file type
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
							$('#fbthumb').attr('src', loadingPhoto);
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
	//end default facebook post image script
	
	/* code for panel-post */
	if(customArray.reviewPost != ''){
		var reviewPost = $.parseJSON(customArray.reviewPost);
		$('#sharefb input[value="'+reviewPost.posted+'"]').attr('checked',true).checkboxradio('refresh');
		val = new Array();
		val['1']='1.0';val['1.25']='1.25';val['1.5']='1.5';val['1.75']='1.75';val['2']='2.0';val['2.25']='2.25';val['2.75']='2.75';val['3']='3.0';val['3.25']='3.25';val['3.5']='3.5';val['3.75']='3.75';val['4']='4.0';val['4.25']='4.25';val['4.5']='4.5';val['4.75']='4.75';
		val2 = ['1.0','1.25','1.5','1.75','2.0','2.25','2.5','2.75','3.0','3.25','3.5','3.75','4.0','4.25','4.5','4.75'];
		var percent = val[reviewPost.percent];
		if(typeof(val[reviewPost.percent]) == 'undefined')
			percent = val2[reviewPost.percent];
		$('#sharelimit input[value="'+percent+'"]').attr('checked',true).checkboxradio('refresh');
	}else{
		$('#sharefb input[value="1"]').attr('checked',true).checkboxradio('refresh');	
		$('#sharelimit input[value="3.0"]').attr('checked',true).checkboxradio('refresh');			
	}
	 $('#submit-postfb').click(function () {
			showLoader();
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=setcustom&case=10&posted='+$("#sharefb :radio:checked").val()+'&percent='+$("#sharelimit :radio:checked").val(),success:function(lastId){
				hideLoader();
				customArray.reviewPost = lastId;
				alertBox('update','successfully updated');
			}});
		});
	/* end of code for panel-post */	
	
	/* code for setup-cust-post */
	if(customArray.fbpost != ''){
		try {arrayfbpost = $.parseJSON(customArray.fbpost);}
		catch(err) {arrayfbpost = {fbpost:customArray.fbpost,postdesc:'My review of <brand>'}}
	}else{
		arrayfbpost = {fbpost:'<comment> <brand> gets a <rating> out of <max_rating> rating from me. <tabluu_url> <address>, <tel>',postdesc:'My review of <brand>'}
	}
		
	var address = customArray.address +', '+ customArray.city +', '+customArray.country;
	var preview = String(arrayfbpost.fbpost).replace(/<brand>/g,customArray.businessName).replace(/<rating>/,'4.3').replace(/<max_rating>/,'5').replace(/<tabluu_url>/,'<span style="text-decoration:underline;color:blue;">http://camrally.com/'+customArray.nicename+'.html</span>').replace(/<address>/,address).replace(/<tel>/,customArray.contactNo).replace(/<comment>/,'Awesome!');
	$('.preview').html(preview);
	$('#txtFBPost').val(decodequote(arrayfbpost.fbpost));

	var preview = String(arrayfbpost.postdesc).replace(/<brand>/g,customArray.businessName);
	$('.preview2').html(preview);
	$('#postdesc').val(decodequote(arrayfbpost.postdesc));
	
	$("#fblinkupdate").click(function (e){ 
		e.preventDefault();
		places = locId.split('|');
		var found= true;
		
		if($('#txtFBPost').val().search(/<brand>/i) == '-1'){
			found = false;
			alertBox('incorrect entry / entries','Please ensure that "&lt;comment&gt",, "&lt;brand&gt" and "&lt;tabluu_url&gt" are used or entered correctly.');
		}else if($('#txtFBPost').val().search(/<tabluu_url>/i) == '-1'){
			found = false;
			alertBox('incorrect entry / entries','Please ensure that "&lt;comment&gt", "&lt;brand&gt" and "&lt;tabluu_url&gt" are used or entered correctly.');
		}else if($('#txtFBPost').val().search(/<comment>/i) == '-1'){
			found = false;
			alertBox('incorrect entry / entries','Please ensure that "&lt;comment&gt", "&lt;brand&gt" and "&lt;tabluu_url&gt" are used or entered correctly.');	
		}
		if(found){
			showLoader();
			var address = customArray.address +', '+ customArray.city +', '+customArray.country;
			var preview = String($('#txtFBPost').val()).replace(/<brand>/,customArray.businessName).replace(/<rating>/,'4.3').replace(/<max_rating>/,'5').replace(/<tabluu_url>/,'<span style="text-decoration:underline;color:blue;">http://camrally.com/'+customArray.nicename+'.html</span>').replace(/<address>/,address).replace(/<tel>/,customArray.contactNo).replace(/<comment>/,'Awesome!');
			var preview2 = String($('#postdesc').val()).replace(/<brand>/,customArray.businessName);
			$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=fblink&'+$('#frmpost2social').serialize(),success:function(lastId){
				hideLoader();
				customArray.fbpost = {fbpost:$('#txtFBPost').val(),postdesc:$('#postdesc').val()}
				$('.preview').html(preview);
				$('.preview2').html(preview2);
			}});
		}
	});
	
	$("#fblinkreset").click(function (e){
		e.preventDefault();
		places = locId.split('|');
		$('<div id="overlay"> </div>').appendTo(document.body);
		var defaultstr = '<comment> <brand> gets a <rating> out of <max_rating> rating from me. <tabluu_url> <address>, <tel>.';
		var defaultstr2 = 'My review of <brand>';
		var address = customArray.address +', '+ customArray.city +', '+customArray.country;
		var preview2 = String(defaultstr2).replace(/<brand>/g,customArray.businessName);
		var preview = String(defaultstr).replace(/<brand>/g,customArray.businessName).replace(/<rating>/,'4.3').replace(/<max_rating>/,'5').replace(/<tabluu_url>/,'<span style="text-decoration:underline;color:blue;">http://camrally.com/'+customArray.nicename+'.html</span>').replace(/<address>/,address).replace(/<tel>/,customArray.contactNo).replace(/<comment>/,'Awesome!');
		$('#txtFBPost').val(defaultstr);
		$('.preview').html(preview);
		$('#postdesc').val(defaultstr2);
		$('.preview2').html(preview2);
		$.ajax({type: "POST",url:"setData.php",cache: false,data:'placeId='+places[0]+'&opt=fblink&'+$('#frmpost2social').serialize(),success:function(lastId){
			$("#overlay").remove();
			customArray.fbpost = {fbpost:defaultstr,postdesc:defaultstr2};
		}});
	});
	/* end of code for setup-cust-post */
	$('.fbpost-left-menu').on('click', ' > li', function () {
		curClick = $(this).index();  
		showFbpostMenu(curClick);
		fbpostActiveMenu();
		if($( window ).width() > 600){
			$(this).find( "a" ).addClass('ui-btn-active'); 
			$(this).find( "span" ).addClass("listview-arrow-active");
		}else{
			$('.fbpost-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );		
		}	
	});	
	$( window ).resize(function() { // when window resize
		var height = ($( window ).height() / 16) - 5;
		$( '.ui-content,.left-content,.right-content').css( {"min-height":height.toFixed() + 'em'} );
		fbpostActiveMenu();	
	});
	function fbpostActiveMenu(){
		//$( "#fbpost .left-header" ).html('Customers? Facebook Posts');
		$( "#fbpost .right-header" ).html( placename );
		if($( window ).width() > 600){
			$('#fbpost .fbpost-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
		//alert('ste')//&& !$('.left-content').is(":visible")
			$('#fbpost .fbpost-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
		}	
	}
});

	function showFbpostMenu(row){
		$(".panel-social-add").hide();$(".panel-social-select").hide();$(".panel-social-manual").hide();
		if(row == 0){
			 $(".panel-social-add").show();  
		}else if(row == 1){
			$(".panel-social-select").show();
		}else if(row == 2){
			$(".panel-social-manual").show();
		}
		socialActiveMenu();
	}
	function socialActiveMenu(){
		//$( "#fbpost .left-header" ).html('Customers? Facebook Posts');
		$( "#social .right-header" ).html( placename );
		if($( window ).width() > 600){
			$('#social .social-left-menu li').each(function (index) {
				if(index == curClick){
					$(this).find( "a" ).addClass('ui-btn-active'); 
					$(this).find( "span" ).addClass("listview-arrow-active");
				}else{
					$(this).find( "a" ).removeClass('ui-btn-active'); 
					$(this).find( "span" ).removeClass("listview-arrow-active");				
				}
			});	
		}else{
			$('#social .social-left-menu li a').each(function (index) {
				$(this).removeClass("ui-btn-active");
				$(this).find( "span" ).removeClass("listview-arrow-active");
			});
			$( '.main-wrap .right-content' ).show();
			$( '.main-wrap .left-content' ).hide();
			$( '.main-wrap .right-content' ).css( {"max-width":'100%'} );
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
