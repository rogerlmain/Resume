const blank = "";
const space = " ";

const new_line = "\n";
const line_break = "<br />";

const body = "body";

const root_url = window.location.protocol + "//" + window.location.host;


/********/


function coalesce () {
	var values = Array.from (arguments);
	for (let value of values) {
		if (isset (value)) return value;
	}// for;
	return null;
}// coalesce;


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


function not_set (value) {
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


function observe_mutation (selector, handler) {
	
	new MutationObserver (function (mutations) {
		mutations.forEach (function (mutation) {
			if (isset (selector) && $(mutation).is_not (selector)) return;
			handler (mutation);
		});    
	}).observe (document, {
		attributes: true, 
		characterData: true, 
		childList: true
	});
		
	handler ($(selector));
		
}// observe_mutation;


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
	if (isset (command)) new Function (command).call (control.dom_object); 
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

