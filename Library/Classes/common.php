<?php


define ("public_push_key", "BOszdRfcGxN92YoeyYT1U9_pOBvV4quYy7MliU9ruWWLsNbXnAqDH67rcAHWC4NLuL1q3NghepUdrxO5SZomK60");
define ("private_push_key", "d5qecTksRHbuvToRkacT2DwdtntpWEHyclzYNPqskR0");


define ("root_folder", $_SERVER ["DOCUMENT_ROOT"]);
define ("blank", "");
define ("comma", ",");


class common {
	
	
	const blank = "";
	
	
	private static function url () {
		return (empty ($_SERVER ["HTTPS"]) ? "http" : "https") . "://" . $_SERVER ["HTTP_HOST"];
	}// url;
	
	
	/********/
	
	
	protected static function start_buffer () {
		ob_start ();
	}// start_buffer;
	
	
	protected static function end_buffer () {
		$result = ob_get_contents ();
		ob_end_clean ();
		return $result;
	}// end_buffer;
	
	
	/********/
	
	
	public function join ($glue, $pieces) {
		return implode ($glue, $pieces);
	}// join;
	
	
	public function split ($delimiter, $string) {
		return explode ($delimiter, $string);
	}// split;
	
	
	/********/
	
	
	public static function boolean_value ($value) {
		if (is_bool ($value)) return $value;
		if (is_string ($value) && is_numeric ($value)) return (intval ($value) != 0);
		if (is_numeric ($value)) return ($value != 0);
		if (is_string ($value)) return (trim (strtolower ($value)) == "true");
		throw new Exception ("unrecognized value passed to boolean_value");
	}// boolean_value;
	
	
	public static function coalesce () {
		foreach (func_get_args () as $item) {
			if (self::not_null ($item)) return $item;
		}// foreach;
		return null;
	}// coalesce;
	
	
	public static function get_value ($object, $field) {
		if (is_array ($object)) return array_key_exists ($field, $object) ? $object [$field] : null;
		if (is_object ($object)) return property_exists ($object, $field) ? $object->$field : null;
		return null;
	}// get_value;
	
	
	public static function set_global ($name, $value) {
		if (isset ($GLOBALS [$name])) return;
		$GLOBALS [$name] = $value;
	}// set_global;
	
	public static function global ($variable) {
		return $GLOBALS [$variable];
	}// global;
	
	
	public static function is_empty ($value) {
		if (is_null ($value)) return true;
		if (is_array ($value) && (count ($value) == 0)) return true;
		return false;
	}// is_empty;
	
	
	public static function is_null ($value) {
		return ($value == null);
	}// is_null;
	
	
	public static function load_control ($control_name, $parameters = null) {
		self::start_buffer ();
		if (isset ($parameters)) {
			foreach ($parameters as $attribute_name => $value) {
				$$attribute_name = $value;
			}// foreach;
		}// foreach;
		include (self::root_path ($control_name));
		$result = self::end_buffer ();
		return $result;
	}// load_control;
	
	
	public static function not_empty ($value) {
		return !is_empty ($value);
	}// not_empty;
	
	
	public static function not_null ($value) {
		return !is_null ($value);
	}// not_null;
	
	
	public static function not_set ($value) {
		return !isset ($value);
	}// not_set;
	
	
	public static function padded_integer ($integer, $length) {
		return str_pad (strval ($integer), $length, "0", STR_PAD_LEFT);
	}// padded_integer;
	
	
	public static function quoted ($text, $double = true) {
		$character = $double ? '"' : "'";
		$text = str_replace ($character, "\\{$character}", $text);
		return "{$character}{$text}{$character}";
	}// quoted;
	
	
	public static function record_error ($error) {
		
		$i = 0;
		
		// do something with the error, here
		
	}// record_error;
	
	
	public static function root_path ($filename) {
		$result = $_SERVER ["DOCUMENT_ROOT"] . "/" . $filename;
		return $result;
	}// root_path;
	
	
	public static function root_url ($path) {
		$result = self::url () . "/" . $path;
		return $result;
	}// root_url;
	
	
	public static function tag_attribute ($name, $value) {
		if (common::not_set ($value) or ($value === false)) return blank;
		return "{$name}='{$value}'";
	}// tag_attribute;
	
	
	public static function write () {
		$parameters = func_get_args ();
		foreach ($parameters as $parameter) {
			echo $parameter;
		}// foreach;
	}// write;
	
			
	public static function writeln () {
		if (is_null ($parameters = func_get_args ())) return;
		$html = (end ($parameters) !== true);
		$delimiter = $html ? "<br />" : "\n";
		if (!$html) array_pop ($parameters);
		foreach ($parameters as $parameter) {
			echo $parameter . $delimiter;
		}// foreach;
	}// writeln;
	
	
}// Common;



/**** Global Functions ****/


function not_empty ($value) {
	return common::not_empty ($value);
}// not_empty;


function not_set ($value) {
	return common::not_set ($value);
}// not_set;


function request ($field) {
	return array_key_exists ($field, $_REQUEST) ? $_REQUEST [$field] : null;
}// request;


function tag_attribute ($name, $value) {
	return common::tag_attribute ($name, $value);
}// tag_attribute;


function write () {
	call_user_func_array ("common::write", func_get_args ());
}// write;


function writeln () {
	call_user_func_array ("common::writeln", func_get_args ());
}// writeln;



