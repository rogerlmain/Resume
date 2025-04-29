<?php


require_once ("base.php");


class cookie extends base {
	
	
	public function __get ($name) {
		return array_key_exists ($name, $_COOKIE) ? $_COOKIE [$name] : null;
	}// magic function get;
	
	
	public function __set ($name, $value) {
		setcookie ($name, $value);
	}// magic function set;
	
	
}// cookie;