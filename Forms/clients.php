<?php


require_once ("Library/Classes/page.php");


class history_page extends page {

	function process () {
		switch (request ("option")) {
			case "alius": require_once ("clients/alius.php"); break;
			case "bundion": require_once ("clients/bundion.php"); break;
			case "fis": require_once ("clients/fis.php"); break;
			case "cosos": require_once ("clients/cosos.php"); break;
			case "aspire": require_once ("clients/aspire.php"); break;
			case "capiq": require_once ("clients/capiq.php"); break;
			case "doi": require_once ("clients/doi.php"); break;
			case "eagle": require_once ("clients/eagle.php"); break;
			case "ecosystems": require_once ("clients/ecosystems.php"); break;
			case "fimac": require_once ("clients/fimac.php"); break;
			case "ghx": require_once ("clients/ghx.php"); break;
			case "internetau": require_once ("clients/internetau.php"); break;
			case "kinder": require_once ("clients/kinder.php"); break;
			case "lb_media": require_once ("clients/lb_media.php"); break;
			case "nexdata": require_once ("clients/nexdata.php"); break;
			case "ninemsn": require_once ("clients/ninemsn.php"); break;
			case "oncommand": require_once ("clients/oncommand.php"); break;
			case "partminer": require_once ("clients/partminer.php"); break;
			case "widget": require_once ("clients/widget.php"); break;
			default: require_once ("clients/home.php"); break;
		}// switch;
	}// process;

}// history_page;


(new history_page ())->process ();