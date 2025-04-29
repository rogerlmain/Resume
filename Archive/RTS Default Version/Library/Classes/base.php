<?php


require_once ("common.php");


class base extends common {
	
	
	protected function cookie_value ($name) {
		if (array_key_exists ($name, $_COOKIE)) return $_COOKIE [$name];
		return null;
	}// cookie_value;
	
	
	protected function request ($name) {
		return array_key_exists ($name, $_REQUEST) ? $_REQUEST [$name] : null;
	}// request;
	
	
}// base;

