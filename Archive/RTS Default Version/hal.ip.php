<?php


    require_once ("Library/Classes/common.php");


    function get_client_ip () {
        
        $ip_address = $_SERVER ["REMOTE_ADDR"];
        
        if (!empty ($_SERVER ["HTTP_X_FORWARDED_FOR"])) $ip_address = $_SERVER ["HTTP_X_FORWARDED_FOR"];
        if (!empty ($_SERVER ["HTTP_CLIENT_IP"])) $ip_address = $_SERVER ["HTTP_CLIENT_IP"];
        
    }// get_client_ip;
    
    
    function get_recorded_ip () {
		if (($ip = file_get_contents ("ip.address.data")) === false) return blank;
		return $ip;
	}// get_recorded_ip;
	
	
	function save_current_ip ($ip) {
		file_put_contents ("ip.address.data", $ip);
	}// save_current_ip;
	
	
    $client_ip = get_client_ip ();
    $recorded_ip = get_recorded_ip ();
    
    if ($client_ip != $recorded_ip) save_current_ip ($current_ip);

    
?>