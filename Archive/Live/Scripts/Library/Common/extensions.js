const default_speed = 400;
const default_timeout = 100;


/**** jQuery Extension Methods ****/


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
		var self = $(this);
		
		if (is_empty (options) || is_function (options)) options = {}
		if (is_empty (options.speed)) options.speed = default_speed;
		if (isset (oncomplete)) options.oncomplete = oncomplete;

		if (!images_loaded ()) return setTimeout (function () {
			self.appear (options);
		}, default_timeout);

		if (self.css ("display").equals ("none")) self.css ("display", "inherit");
		
		self.css ({ 
			opacity: 0,
			visibility: "visible"
		});
		
		self.animate ({ 
			opacity: 1
		}, {
			duration: options.speed,
			complete: function () {
				if (is_function (options.oncomplete)) options.oncomplete (self);
			}/* complete */
		});
		
		return self;
		
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
	
	
	first_cousin: function (common_ancestor) {
		return $(this.cousins (common_ancestor).get (0));
	}/* first_cousin */,
	
	
	last_cousin: function (common_ancestor) {
		let cousins = this.cousins (common_ancestor);
		return $(cousins.get (cousins.length - 1));
	}/* last_cousin */,
	
	
	next_cousin: function (common_ancestor) {
		
		let result = null;
		let cousins = this.cousins (common_ancestor);
		let control = this.dom_object;
		
		cousins.each (function (index, item) {
			if ((item === control) && (index < (cousins.length - 1))) {
				result = $(cousins.get (index + 1));
				return false;
			}// if;
		});
		
		return result;
		
	}/* next_cousin */,
	
	
	previous_cousin: function (common_ancestor) {
		
		let result = null;
		let cousins = this.cousins (common_ancestor);
		let control = this.dom_object;
		
		cousins.each (function (index, item) {
			if ((item === control) && (index > 1)) {
				result = $(cousins.get (index - 1));
				return false;
			}// if;
		});
		
		return result;
		
	}/* previous_cousin */,
	
	
	cousins: function (common_ancestor) {
		let classes = this.attr ("class");
		let selector = $(this).tagname + (isset (classes) ? "." + classes.split (space).join (".") : blank);
		return $(common_ancestor).descendants (selector);
	}/* cousin */,
	
	
	disappear: function (oncomplete) {
		
		let parameters = Array.from (arguments).slice (1);
		
		this.animate ({ opacity: 0 }, { complete: function () {
			if (is_function (oncomplete)) oncomplete.apply (this, parameters);
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

		let oncomplete = is_function (options) ? options : null;
		
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
		if (this.is (selector)) jQuery.extend (result, this);
		return result;
	}/* family */,
	
	
	get_dimensions: function (container, handler) {
		
		let result = null;
		let orphaned = this.orphan;
		let control = orphaned ? this.cloaked.appendTo (coalesce (container, $(body))) : this;
			
		result = control.dimensions;
		
		if (is_function (handler)) handler (result);
		if (orphaned) control.remove ();
		
		return result;
		
	}/* get_dimensions */,
	
	
	handler: function (action, method) {
		if (not_set (method)) return this.dom_object [action];
		this.dom_object [action] = method;
		this.attr (action, "this." + action + " (event);");
		return this; // for chaining;
	}/* handler */,
	
	
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
	
	
	load_image: function (file_object, onload) {
		
		if (this.is_not ("img")) return false;
		
		let self = this;
	    let file_reader = new FileReader ();
	    
	    file_reader.onload = function () {
	    	self.dom_object.src = file_reader.result;
	    	if (isset (onload)) onload ();
	    }// onload;
	    file_reader.readAsDataURL (file_object.files [0]);
	}/* load_image */,
	
	
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
	

	remove_style: function (offending_style) {
		
		var result = null;
		var styles = this.attr ("style").split (";");
		
		for (var style of styles) {
			var item = style.split (":");
			if (is_null (item) || (item.length != 2)) continue;
			if (item [0].matches (offending_style)) continue;
			if (is_null (result)) result = new Array ();
			result.push (item [0] + ":" + item [1]);
		}// for;
		
		this.attr ("style", is_array (result) ? result.join (";") : null);
		
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
	
	
	serialize_form: function () {
		let result = null;
		this.each (function (index, item) {

			let field = $(item);

			if (field.is ("input[type=file]")) return true;
			if (field.is ("select") && !Number.isInteger (field.value)) return true;
			if (not_set (field.value)) return true;
			
			if (is_null (result)) result = new Array ();
			
			result.push ({
				name: field.attr ("name"),
				value: field.value
			});
			
		});
		return result;
	}/* serialize_form */,
	
	
	serialize_values: function () {
		
		let values = this.descendants (":input").serialize_form ();
		let files = this.descendants ("input[type=file]");
		
		
		function create_form_data (items) {
			
			let result = null;
			
			for (let item of items) {
				if (not_object (item) || not_set (item.name)) continue;
				if (is_null (result)) result = new FormData ();
				result.append (item.name, item.value);
			}// for;
			
			files.each (function (index, item) {
				
				let filename = item.name;
				
				for (let file of item.files) {
					result.append (item.name + "[]", file, file.name);
				}// for;
				
			});
			
			return result;
			
		}// create_form_data;
		
		
		for (let argument of Array.from (arguments)) {
			for (let key in argument) {
				if (!argument.hasOwnProperty (key)) continue;
				if (is_null (values)) values = new Array ();
				values.push ({ name: key, value: argument [key] });
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


/**** jQuery Extension Properties ****/


Object.defineProperties (jQuery.fn, {
	
	
	checked: {
		get: function () {
			if (this.is_not ("input[type=checkbox]") && this.is_not ("input[type=radio]")) return false;
			return this.dom_object.checked;
		}/* getter */
	}/* checked */,
	
	
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
	
	
	coordinates: {
		get: function () {
			if (this.orphan) return null;
			return this.offset ();
		}/* getter */
	}/* coordinates */,
	
	
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
	
	
	id: {
		get: function ()	{ return $(this).attr ("id"); },
		set: function (id)	{ $(this).attr ("id", id); }
	}/* id */,
	
	
	inner_html:	{ get: function () { return $(this).dom_object.innerHTML; } },
	is_empty:	{ get: function () { return this.length == 0; } },
	
	
	location: {
		get: function () {
			if (this.orphan) return null;
			return {
				top: this.dom_object.offsetTop,
				left: this.dom_object.offsetLeft
			};
		}/* getter */
	}/* location */,
	
	
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
	
	
	outer_width: 	{ get: function () { return this.outerWidth (); } },
	orphan: 		{ get: function () { return !(this.parent ().exists); } },
	showing: 		{ get: function () { return !this.hidden; } },

	
	signature: {
		get: function () {
			
			let result = null;
			
			switch (this.length) {
				case 0: return result;
				case 1: return this.dom_object.signature;
			}// switch;
			
			this.each (function (index, item) {
				if (is_null (result)) result = new Array ();
				result.push (item.signature);
			});

			return result;
			 
		}/* getter */
	}/* signature */,
	
	
	tagname: 		{ get: function () { return $(this).dom_object.tagName.toLowerCase (); } },
	unchecked:		{ get: function () { return !$(this).checked; } },
	
	
	
	value: {
		get: function () { return this.val (); },
		set: function (value) { this.val (value); }
	}/* value */,
	
	
	visible: {
		get: function () {
			return !this.hidden;
		}/* get */
	}/* visible */

	
});



/**** jQuery Extension Overrides ****/


jQuery.fn.original_click = jQuery.fn.click;


jQuery.fn.click = function (method) {
	this.each (function (index, item) {
		item.onclick = method;
	});
}/* jQuery.fn.click */


