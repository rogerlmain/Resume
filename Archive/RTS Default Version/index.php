<?php


	require_once ("libraries/Classes/page.php");


	class resume extends page {
		
		function process () {
			switch (request ("action")) {
				default: require_once ("forms/home.php"); break;
			}// switch;
		}// process;
		
	}// class;
	
	
	(new resume ())->process ();