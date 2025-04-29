const default_speed = 200;



jQuery.fn.extend ({
	
	
	ancestor: function (selector) {
		var next_item = this;
		
		while (!next_item.matches (selector)) {
			next_item = next_item.parent ();
			if (is_null (next_item)) return null;
		}// while;
		
		return next_item;
	}/* ancestor */,

		
	ancestors: function (selector) { return $(this).ancestor (selector); },
	
	
	appear: function (options) {
		
		var oncomplete = is_function (options) ? options : null;
		
		if (is_empty (options) || is_function (options)) options = {}
		if (is_empty (options.speed)) options.speed = default_speed;

		if (isset (oncomplete)) options.oncomplete = oncomplete;

		this.css ({ 
			opacity: 0,
			visibility: "visible"
		});
		if (this.css ("display").equals ("none")) this.css ("display", "inherit");
		this.animate ({ 
			opacity: 1
		}, {
			duration: options.speed,
			complete: function () {
				if (is_function (options.oncomplete)) options.oncomplete (this);
			}/* complete */
		});
		return this;
	}/* appear */,
	
	
	coalesce: function () {
		var options = Array.from (arguments);
		if (this.exists) return this;
		for (var index in options) {
			var item = $(options [index]);
			if (!options.hasOwnProperty (index)) continue;
			if (item.exists) return item;
		}// for;
		return null;
	}/* coalesce */,
	
	
	disappear: function (oncomplete) {
		this.animate ({ opacity: 0 }, { complete: function () {
			if (is_function (oncomplete)) oncomplete ();
		}});
		return this;
	}/* disappear */,
	
	
	descendant: function (selector) { return $(this).find (selector); },
	descendants: function (selector) { return $(this).find (selector); },
	
	
	fade_in: function (options) {
		
		var oncomplete = is_function (options) ? options : null;
		
		if (not_set (options) || is_function (options)) options = {};
		if (not_set (options.speed)) options.speed = default_speed;
		if (isset (oncomplete)) options.oncomplete = oncomplete;

		this.animate ({ opacity: 1 }, { 
			duration: options.speed,
			complete: options.oncomplete
		});
		
	}/* fade_in */,
	
	
	fade_out: function (options) {

		if (not_set (options) || is_function (options)) options = {};
		if (not_set (options.speed)) options.speed = default_speed;
		if (isset (oncomplete)) options.oncomplete = oncomplete;
		
		this.animate ({ opacity: 0 }, { 
			duration: options.speed,
			complete: options.oncomplete
		});

	}/* fade_out */,
	
	
	family: function (selector) {
		var result = this.descendants (selector);
		jQuery.extend (result, this.filter (selector));
		return result;
	}/* family */,
	
	
	get_dimensions: function (container, handler) {
		
		var result = null;
		var orphaned = this.orphan;
		
		if (orphaned) var control = this.cloaked.appendTo (coalesce (container, $(body)));
			
		result = this.dimensions;
		
		if (is_function (handler)) handler (result);
		
		if (orphaned) {
			this.detach ();
			control.remove ();
		}// if;
		
		return result;
		
	}/* get_dimensions */,
	
	
	hide_control: function () {
		this.css ("visibility", "hidden");
	}/* hide_control */,
	
	
	show_control: function () {
		this.css ("visibility", "visible");
	}/* show_control */,
	
	
	is_not: function (selector) {
		return !this.is (selector);
	}/* is_not */,
	
	
	item: function (index) {
		return $(this.get (index));
	}/* item */,
	
	
	jquery_attr: function (value) {
		var result = function (value) {
			return eval (value);
		}.call (this, this.attr (value));
		return result;
	}/* jquery_attr */,
	
	
	load: function () {
		this.descendants ("[onload]").each (function (index, item) {
	    	if (new Array ("body", "iframe", "iframe", "link", "style").contains ($(item).prop ("tagName"))) return; 
	        $(item).prop ("onload").call (item);
	    });
	}/* load */,
	
	
	matches: function (selector) {
		if (selector.indexOf (":") > 0) {
			var item = selector.split (":");
			return this.css (item [0]).equals (item [1]);
		}// if;
		return this.is (selector);
	}/* matches */,
	
	
	offset_left: function (base_value) {
		var matrix = $(this).css ("transform").match (/matrix\((.+?)\)/);
		var values = isset (matrix) ? matrix [1].split (",") : null;
		var offset = isset (values) ? values [4] : 0;
		return (isset (base_value, true) ? base_value : this.offset ().left) + parseInt (offset);
	}/* offset_left */,
	
	
	offset_top: function (base_value) {
		var matrix = $(this).css ("transform").match (/matrix\((.+?)\)/);
		var values = isset (matrix) ? matrix [1].split (",") : null;
		var offset = isset (values) ? values [5] : 0;
		return (isset (base_value, true) ? base_value : this.offset ().top) + parseInt (offset);
	}/* offset_top */,
	
	
	prototype: function (new_prototype) {
		this.each (function (index, item) {
			item.prototype = new_prototype;
		});
	}/* prototype */,
	
	tagname: function () {
		return $(this).prop ("tagName");
	}/* tagname */,
	
	
	remove_style: function (offending_style) {
		
		var result = null;
		var styles = this.attr ("style").split (";");
		
		for (var style of styles) {
			var item = style.split (":");
			if (is_null (item) || (item.length != 2)) continue;
			if (item [0].trim () == offending_style) continue;
			if (is_null (result)) result = new Array ();
			result.push (item [0] + ":" + item [1]);
		}// for;
		
		this.attr ("style", result.join (";"));
		
		return this;
		
	}/* remove_style */,
	
	
	reset: function () {
		if (!$(this).is ("form")) return false;
		for (var form in $(this)) {
			if (!(form instanceof HTMLFormElement)) continue;
			form.reset ();
		}// for;
	}/* reset */,
	
	
	resize: function (dimensions, oncomplete) {
		this.animate (dimensions, { complete: oncomplete });
	}/* resize */,
	
	
	serialize_values: function () {
		
		var values = $(this).descendants (":input").serializeArray ();
		
		
		function create_form_data (values) {
			
			var result = null;
			
			for (var index in values) {
				if (!values.hasOwnProperty (index)) continue;
				if (is_null (result)) result = new FormData ();
				result.append (values [index].name, values [index].value);
			}// for;
			
			
			// CONSTRUCTION ZONE - Add code to process files if necessary
			
			
			return result;
			
		}// create_form_data;
		
		
		for (var argument in Array.from (arguments)) {
			if (!arguments.hasOwnProperty (argument)) continue;
			for (var key in arguments [argument]) {
				if (!arguments [argument].hasOwnProperty (key)) continue;
				values.push ({ key: arguments [argument][key] });
			}// for;
		}// for;
		return create_form_data (values);
	}/* serialize_values */,
	
	
	set_contents: function (contents) {
		if (is_jquery (contents)) return this.html (contents.outer_html);
		if (is_string (contents)) return this.html (contents);
		throw "Unrecognized content in set_contents";
	}/* set_contents */
	
});


Object.defineProperties (jQuery.fn, {
	
	
	cloaked: {
		get: function () {
			var result = $("<div />").append (this).addClass ("cloaked");
			return result;
		}/* getter */
	}/* cloaked */,
	
	
	complete_height: {
		get: function () {
			return parseInt (this.outerHeight () + parseFloat (this.css ("marginTop"))  + parseFloat (this.css ("marginBottom")));
		}/* getter */
	}/* complete_height */,
	
	
	complete_width: {
		get: function () {
			return parseInt (this.outerWidth () + parseFloat (this.css ("marginLeft"))  + parseFloat (this.css ("marginRight")));
		}/* getter */
	}/* complete_width */,
	
	
	dimensions: {
		get: function () {
			if (this.orphan) return this.get_dimensions ($("body"));
			return {
				width: this.dom_object.offsetWidth,
				height: this.dom_object.offsetHeight
			};
		}/* getter */
	}/* dimensions */,
	
	
	dom_object: {
		get: function () {
			return this.get (0);
		}/* getter */
	}/* dom_object */,
	
	
	exists: {
		get: function () {
			return this.length > 0;
		}// get;
	}/* exists */,
	
	
	hidden: {
		get: function () {
			return ((this.css ("opacity") == 0) || (this.css ("visibility") == "hidden") || (this.css ("display") == "none"));
		}/* getter */
	}/* hidden */,
	
	
	outer_html: {
		get: function () {
			var result = blank;
			if (this.length == 0) return result;
			this.each (function (index, item) {
				if (isset (result)) result += line_break + line_break;
				result += item.outerHTML;
			});
			return result;
		}/* getter */
	}/* outer_html */,
	
	
	outer_width: {
		get: function () {
			return this.outerWidth ();
		}/* getter */
	}/* outer_width */,
	
	
	orphan: {
		get: function () {
			return !(this.parent ().exists);
		}/* getter */
	}/* orphan */,
	
	
	showing: {
		get: function () {
			if (this.css ("visibility") == "hidden") return false;
			if (this.css ("display") == "none") return false;
			if (this.css ("opacity") == 0) return false;
			return true;
		}/* getter */
	}/* showing */,
	
	
	vacant: {
		get: function () {
			return this.length == 0;
		}/* getter */
	}/* showing */,
	
	
	visible: {
		get: function () {
			return !this.hidden;
		}/* get */
	}/* visible */

	
});


