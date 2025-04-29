<html>


<?php 

	const menu_speed = 150;

?>


<head>

	<title>Roger L. "Rex" Main</title>
	
	<link rel="stylesheet" href="/Styles/Library/common.css" />
	<link rel="stylesheet" href="/Styles/Local/common.css" />

	<script src="/Scripts/Library/Common/External/jquery.js"></script>
	<script src="/Scripts/Library/Common/External/jquery-ui.js"></script>
	<script src="/Scripts/Library/Common/External/jquery.cookie.js"></script>
	                      
	<script src="/Scripts/Library/Common/common.js"></script>
	<script src="/Scripts/Library/Common/extensions.js"></script>
	<script src="/Scripts/Library/Common/prototypes.js"></script>
	<script src="/Scripts/Library/Common/initialize.js"></script>
	                      
	<script src="/Scripts/Library/Controls/fade.list.js"></script>
	<script src="/Scripts/Library/Controls/fade.panel.js"></script>
 	<script src="/Scripts/Library/Controls/popup.panel.js"></script>
 	<script src="/Scripts/Library/Controls/sweep.panel.js"></script>
 	<script src="/Scripts/Library/Controls/slide.panel.js"></script>
 	<script src="/Scripts/Library/Controls/dialog.window.js"></script>
	<script src="/Scripts/Library/Controls/push.notifications.js"></script>
 	
 	<script src="/Scripts/Local/custom.js"></script>
 	<script src="/Scripts/Local/home.js"></script>

</head>


<script>

	function register_user () {

 		alert ("Hello " + $("chatbox input[type='text']").value);
		return false;
		
	}// register_user;

</script>


<style>


	@font-face {
		font-family: "title-banner";
		src: url("Fonts/AspireDemibold-YaaO.ttf");
	}/* @font-face */

	@font-face {
		font-family: "title-script";
		src: url("Fonts/mixtim-regular.ttf");
	}/* @font-face */

	@font-face {
		font-family: "text-script";
		src: url("Fonts/MochaFrappuccino-Regular.ttf");
	}/* @font-face */


</style>


<body>

	<sweep-panel id="loading_panel" direction="right" visible="false" class="centered">
		Loading
		<img src="Images/ajax-loader.gif" />
	</sweep-panel> 

		
	<fade-panel id="fade_panel">
	
		<div id="header_panel">

			<div class="banner">
			
				<div>
					<div class="banner-title" onclick="location.reload ();">Roger L. "Rex" Main</div>
					<div class="banner-subtitle">
						720 322 5154<br />
						rex@rogerlmain.com
					</div>
				</div>
				
				<div class="column-centered">
				
					<fade-list id="main_menu" speed="<?=menu_speed?>">
						<fade-item class="main_menu" onclick="show_menu (this, 'services_menu');">What I can do</fade-item>
						<fade-item class="main_menu" onclick="show_menu (this, 'history_menu');">What I have done</fade-item>
					</fade-list>
					
					<div class="submenus">
					
						<fade-list name="services_menu" class="menu-list" speed="<?=menu_speed?>">
							<fade-item class="submenu" onclick="change_page ('technical');">Development</fade-item>
							<fade-item class="submenu" onclick="change_page ('management');">Management</fade-item>
						</fade-list>
						
						<fade-list name="history_menu" class="menu-list" speed="<?=menu_speed?>">
							<fade-item class="submenu" onclick="change_page ('clients');">Clients</fade-item>
							<fade-item class="submenu" onclick="change_page ('education');">Education</fade-item>
							<fade-item class="submenu" onclick="change_page ('organizations');">Organizations</fade-item>
						</fade-list>
							
					</div>
	
				</div>
					
			</div>


			<slide-panel id="menu_panel" onclickescape="$(this).descendants ('fade-item').fade_out ();"></slide-panel>

			
			<slide-panel id="chat_window" class="chatbox_window" closed="true">

				<contents><div id="signin_window"><?=(new page ())->chatbox (Array (
					"id" => "chatbox",
					"signin_text" => "Tell me your name...",
					"signin_button" => false
				))?></div></contents>
				<tag
					closed_click="$(this).parent ().slide_out (() => { $(this).html ('And then chat with Rex!'); });"
					open_click="return register_user ();"
				>Psst! Rex is online! Chat with him now!</tag>
			
			</slide-panel>
			
		</div>
		
				
		<div id="main_panel">

			<popup-panel id="home_tip" class="starburst" easing="bounce" delay="4" style="left: 12em; top: 18em; transform: rotate(-12deg);">
				
				<contents>
					<div class="header">Did you know?</div>
					<div class="contents">Almost all of the images that you see here were taken by Rex, who is an avid photographer!</div>
				</contents>
					
			</popup-panel>
			
			<sweep-panel direction="down" top="43%" left="34%" visible="true"><img src="Images/harbour.png" class="outlined" style="width: auto; height: 24vh;" microhelp="Venice Beach, Los Angeles, California" /></sweep-panel>		
			<sweep-panel direction="left" top="17%" left="24%" visible="true"><img src="Images/fire.png" class="outlined" style="width: 12vw; height: auto;" /></sweep-panel>
			<sweep-panel direction=up top="13%" left="32%" visible="true"><img id="beach_photo" src="Images/beach.png" class="outlined" style="width: auto; height: 24vh;" /></sweep-panel>		
			<sweep-panel direction="right" top="25%" left="57%" visible="true"><img src="Images/vla.jpg" class="outlined" style="width: 14vw; height: auto;" /></sweep-panel>
			
		</div>
		
	</fade-panel>

</body>


</html>