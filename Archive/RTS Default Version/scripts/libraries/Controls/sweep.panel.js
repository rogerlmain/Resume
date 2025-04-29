const default_direction = "right";


class sweep_panel extends HTMLElement {
	
	
	exit (options) {
		
		var control = $(this);
		var oncomplete = is_function (options) ? options : null;
		var direction = this.is_direction (options) ? options : null;
		
		var entry_point = null;
		var end_point = null;
				
		if (is_empty (options) || is_function (options) || (this.is_direction (options))) options = {}
		if (is_empty (options.direction)) options.direction = coalesce (direction, control.attr ("direction"), default_direction);
		if (is_empty (options.speed)) options.speed = coalesce (control.attr ("duration"), default_speed);

		if (isset (oncomplete)) options.oncomplete = oncomplete;
		
		switch (options.direction) {
			case "left": entry_point = "left"; end_point = (0 - control.outerWidth ()); break;
			case "right": entry_point = "left"; end_point = $(window).width (); break;
			case "up": entry_point = "top"; end_point = (0 - control.outerHeight ()); break;
			case "down": entry_point = "top"; end_point = $(window).height (); break;
		}// switch;
		
		control.animate (this.destination (entry_point, end_point), { 
			complete: function () {
				control.hide_control ();
				if (options.oncomplete) options.oncomplete ();
			}/* complete */,
			duration: options.speed
		});
		
	}// exit;
	
	
	enter (options) {
		
		var control = $(this);
		var oncomplete = is_function (options) ? options : null;
		var direction = this.is_direction (options) ? options : null;
		
		if (is_empty (options) || is_function (options) || (this.is_direction (options))) options = {}
		if (is_empty (options.direction)) options.direction = coalesce (direction, control.attr ("direction"), default_direction);
		if (is_empty (options.destination, true)) options.destination = "50%";
		if (is_empty (options.speed)) options.speed = coalesce (control.attr ("duration"), default_speed);

		if (isset (oncomplete)) options.oncomplete = oncomplete;
		
		control.show_control ();
		
		control.animate ({ "left": options.destination }, { 
			complete: function () {
				if (isset (options.oncomplete)) options.oncomplete ();
				control.load ();				
			}/* complete */,
			duration: options.speed
		});
		
	}// exit;
	

	/*******/
	
	
	constructor () {
		
		super ();
		
		this.destination = function (direction, base_value) {
			var matrix = $(this).css ("transform").match (/matrix\((.+?)\)/);
			var values = isset (matrix) ? matrix [1].split (",") : null;
			var offset = isset (values) ? ((direction == "left") ? values [4] : values [5]) : 0;
			var result = { [direction]: base_value - parseInt (offset) };
			return result;
		}/* this.destination */
		
		this.is_direction = function (value) {
			return is_string (value) && (new Array ("top", "right", "bottom", "left").contains (value));
		}// is_direction;
		
			
	}// constructor;
	

	connectedCallback () {
		
		var control = $(this);
		
		control.css ("position", "absolute");

		if (control.attr ("visible")) {
			if (isset (control.attr ("top"))) control.css ({ top: control.attr ("top") }); 
			if (isset (control.attr ("left"))) control.css ({ left: control.attr ("left") }); 
		}// if;
			
	}// connectedCallback;
	
	
}// sweep_panel;


customElements.define ("sweep-panel", sweep_panel);
