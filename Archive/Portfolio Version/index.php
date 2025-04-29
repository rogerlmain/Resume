<?php


	require_once ("Library/Classes/page.php");


	class resume extends page {
		
		function process () {
			switch (request ("action")) {
				case "education": require_once ("Forms/education.php"); break;
				case "technical": require_once ("Forms/technical.php"); break;
				case "clients": require_once ("Forms/clients.php"); break;
				case "management": require_once ("Forms/management.php"); break;
				case "organizations": require_once ("Forms/organizations.php"); break;
				default: require_once ("Forms/home.php"); break;
			}// switch;
		}// process;
		
	}// class;
	
	
	(new resume ())->process ();