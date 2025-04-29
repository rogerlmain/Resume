//	RMPC Common
//	(C) Copyright 2020 - Roger L. Main
//	All rights reserved


const blank = "";
const space = " ";

const new_line = "\n";
const line_break = "<br />";

const body = "body";

const root_url = (isset (window) ? window.location.protocol + "//" + window.location.host : null);


/********/


function base64_encode (input, trimmed) {
	return (trimmed === true) ? btoa (input).trim ("=") : btoa (input);
}// base64_encode;


function coalesce () {
	var values = Array.from (arguments);
	for (let value of values) {
		if (isset (value)) return value;
	}// for;
	return null;
}// coalesce;


function debug () {
	alert (Array.from (arguments).join ("\n"));
}// debug;


function extend () {
	var result = null;
	var values = Array.from (arguments);
	for (var value of values) {
		if (is_null (result)) {
			result = json_decode (json_encode (value));
			continue;
		}// if;
		if (isset) jQuery.extend (result, value);
	}// for;
	return result;
}// extend;


function hashed (value) {
	return (value.charAt (0) == "#") ? value : "#" + value; 
}// hashed;


function unhashed (value) {
	return (value.charAt (0) == "#") ? value.substring (1) : value;
}// unhashed;


function is_array (value) {
	return value instanceof Array;
}// is_array;


function is_blank (value) {
	return (value === blank);
}// is_blank;


function is_boolean (value) {
	return (typeof value == "boolean");
}// is_boolean;


function is_empty (value, allow_zero) {
	if (jQuery.isNumeric (value) && (allow_zero == true)) return false;
	return !isset (value) || ((is_array (value) || is_jquery (value)) && (value.length == 0));
}// is_empty;


function is_event (value) {
	return (value instanceof Event);
}// is_event;


function is_function (value) {
	return (value instanceof Function);
}// is_function;


function is_jquery (value) {
	return value instanceof jQuery;
}// is_jquery;


function is_null (value) {
	return (value === null);
}// is_null;


function is_numeric (value) {
	return !isNaN (parseFloat (value)) && isFinite (value);
}/* is_numeric */


function is_object (value) {
	return ((value instanceof Object) && (!is_function (value)));
}// is_object;


function is_string (value) {
	return (typeof value == "string");
}// is_string;


function isset (value, allow_numbers = false) {
	if ((allow_numbers === true) && (jQuery.isNumeric (value))) return true;
	return not_null (null_if (value, new Array (undefined, blank)));
}// isset;


function images_loaded () {
	var result = true;
	$("img").each (function (index, item) {
		if (!item.complete) return result = false;
	});
	return result;
}// images_loaded;


function json_decode (json) {
	return JSON.parse (json);
}// json_decode;

function json_encode (value) {
	return JSON.stringify (value);
}// json_encode;


function max () {
	
	let result = 0;
	
	for (value of Array.from (arguments)) {
		if (value > result) result = value;
	}// for;
	
	return result;
	
}// max;


function min () {
	
	let result = null;
	
	for (value of Array.from (arguments)) {
		result = ((is_null (result) || (value < result)) ? value : result);
	}// for;
	
	return result;
	
}// min;


function merge () {
	
	var result = null;
	var arrays = Array.from (arguments);
	
	if (arrays.length == 1) return arrays [0];
	
	for (var index in arrays) {
		var next_array = arrays [index]; 
		if (!array.hasOwnProperty (index)) continue;
		if (is_null (result)) {
			result = next_array;
			continue;
		}// if;
		result = result.concat (next_array);
	}// for;
		
	return result;
	
}// merge;


function modelled (object) {
	return $("<div />").html (object);
}// modelled;


function not_event (value) {
	return (!is_event (value));
}// not_event;


function not_jquery (value) {
	return !is_jquery (value);
}// not_jquery;


function not_null (value) {
	return (value != null);
}// not_null;


function not_object (value) {
	return (!is_object (value));
}// not_object;


function not_set (value, allow_blanks) {
	if ((allow_blanks === false) && is_blank (value)) value = null;
	return (is_null (value) || (value === undefined));
}// not_set;


function null_if (value, conditions) {
	if (!Array.isArray (conditions)) conditions = new Array (conditions);
	for (var condition in conditions) {
		if (!conditions.hasOwnProperty (condition)) continue;
		if (value == conditions [condition]) return null;
	}// for;
	return value;
}// null_if;


function null_value (item) {
	return isset (item) ? item : null;
}// null_value;


function null_string (item) {
	return isset (item) ? item : blank;
}// null_string;


function pause () {
	alert ((arguments.length > 0) ? Array.from (arguments).join ("\n") : "Paused...");
}// pause;


function preview_image (file_object, image) {
	
	function image_handler () {
		image.load_image (file_object, function () {
			image.appear ();
		});
	}// image_handler;
	
	switch (image.visible) {
		case true: image.disappear (image_handler); break;
		default: image_handler (); break;
	}// switch;
	
}// preview_image;


function quoted (text, single) {
	if (not_set (single)) single = false;
	var character = single ? "'" : "\"";
	return character + text + character;
}// quoted;


function root_path (file_path) {
	if (file_path.charAt (0) != "/") file_path = "/" + file_path;
	return root_url + file_path;
}// root_path;


function run (tag, attribute) {
	var control = $(tag);
	var command = control.attr (attribute);
	if (isset (command)) new Function (command).call (control.dom_object, new Event (attribute)); 
}// run;


function write () {
	alert (Array.from (arguments).join (space));
}// write;


function writeln () {
	var eol = "\n";
	var short_length = arguments.length - 1;
	var last_argument = arguments [short_length];
	if (last_argument === true) {
		eol = "<br />";
		return is_boolean (last_argument) ? Array.from (arguments).slice (0, short_length).join (eol) : Array.from (arguments).join (eol);
	}// if;
	alert (is_boolean (last_argument) ? Array.from (arguments).slice (0, short_length).join (eol) : Array.from (arguments).join (eol));	
}// writeln;


