<!DOCTYPE html>
<html>
<head>
	<title>Subscriptions Plan Panel</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type='text/javascript'>window.location='index.html'</script>
</head>
<body>
	
		<div id="plan" data-role="page" data-ajax="false">
			<div class="content-wrap">
				<div data-role="header">
					<img src="images/Logo/logo-arrow.png" class="logo fl" width="143" height="auto" />
					<div class="logout-wrap">
						<img src="images/template/star.png" class="star hide" />
						<img src="images/template/logout.png" class="logout fr iconplan" />
					</div>
				</div><!-- /header -->			
				<div role="main" class="ui-content">
					<div class="main-wrap">
						<div class="left-content fl">
							<div class="left-header">Subscriptions</div>			
							<ul class="plan-left-menu" data-role="listview">
								<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active">Plan &amp; Campaign<span class="listview-arrow-default listview-arrow-active"></span></a></li>
								<li><a href="#">Transactions<span class="listview-arrow-default"></span></a></li>
								<li><a href="#">Activity<span class="listview-arrow-default"></span></a></li>
							</ul>							
						</div>
						<div class="right-content bgwhite fr">
							<div class="right-header"></div>
							<section class="panel-sub-plan hide">									
								<p class="font-17 fl" id="lblStatus">Status:</p>
								<div class="clear" style="padding-top:0.5em"></div> 
								<p class="font-17 fl" id="lblPlan">Current plan:</p>
								<div class="ifcancel">
									<p class="font-17 fl" id="lblTotal">Total (plan + subscribed campaign) =</p>
									<div class="clear" style="padding-top:0.5em"></div>
									<p class="font-17 fl" id="lblExpired">expiration date:</p>
									<div class="hide">
									<div class="clear" style="padding-top:1em"></div>
									
									<select name="changeAplan" id="changeAplan">
										<option value="" selected="selected">Change a plan</option>
									</select>
									</div>
									<div class="btn-submit hide">
										<button class="ui-btn" id="submit-planchange">Change</button>
									</div>
									<div class="clear" style="padding-top:0.5em"></div>
									<div class="btn-submit btncancelplan hide">
										<button class="ui-btn" id="submit-plancancel">Cancel My Plan</button>
									</div> 
								</div>
								<div class="hide">
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="btn-submit btnreactivate">
									<button class="ui-btn" id="submit-reactivate">Reactivate My Plan</button>
								</div>
								</div>		
																
								<p class="font-17 fl" id="lblTotalSubs">Total # of campaign</p>
								<div class="hide">
								<div class="clear" style="padding-top:0.5em"></div>
								<p class="font-17 fl" id="label7">Free: 1</p>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<p class="font-17 fl" id="label8">Subscribed:</p>
								<div class="hide">
								<div class="ifcancel">
								<div class="clear" style="padding-top:0.5em"></div>
								<p class="font-17 fl" id="lblperLoc">Cost per subscribed campaign: </p>
								<div class="clear" style="padding-top:0.5em"></div>
								<p class="font-17 fl" id="lblcostLoc">Total cost of all subscribed campaign:</p>
								<div class="clear" style="padding-top:1em"></div>
								<div class="btn-submit addlocation hide">
									<button class="ui-btn" id="submit-planadd">Add Campaign(s)</button>
								</div>
								<div class="clear" style="padding-top:0.5em"></div>
								<div class="btn-submit hide">
									<button class="ui-btn" id="submit-planremove">Remove Campaign(s)</button>
								</div>
								</div>
								</div>
							</section>
							<section class="panel-sub-location hide">
								<div class="clear tranwrap" style="overflow-x:scroll;">
									<p>Recent Completed Transactions</p>
									<div class="clear" style="padding-top:0.5em"></div>
										<div class="clear" style="padding-top:0.5em"></div>
										<div class="transaction"></div>
								</div>	
							</section>
							<section class="panel-activity hide">
								<div class="clear activitywrap" style="overflow-x:scroll;">
									<p>Recent Completed Activities</p>
									<div class="clear" style="padding-top:0.5em"></div>
										<div class="clear" style="padding-top:0.5em"></div>
										<div class="activity"></div>
								</div>	
							</section>							
						</div>
					</div>			
				</div><!-- /content -->
				<?php require_once('footer.html'); ?>
			</div>
		</div><!-- /page -->
</body>
</html>