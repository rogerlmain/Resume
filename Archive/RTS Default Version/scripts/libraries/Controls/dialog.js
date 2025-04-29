/*	

	Parameters:
		dialog_name: [optional] for multiple dialog windows
		
		contents: jQuery object or text [optional with eyecandy]
		eyecandy: jQuery object or text [optional with contents]
		
		buttons: jQuery object (?)
		action / option: ajax parameters
		
		hover: boolean (position where clicked): default false
		cursor: boolean (moves with cursor): default false
		blackscreen: boolean (show blackscreen): default true
		escape: boolean (allow "escape" key to close the window): default true
		
		position: (top or bottom, left or right) [default: bottom / right]
		
		
	Classes:
	
		div.blackscreen
		div.dialog-frame
		div.dialog-window

*/


const dialog_buttons = { close: "Close" }


function dialog_window (parameters) {
	
	
	const buffer = 5; 
	

	var self = this;
	var options = null;
	
	var dialog = null;
	var contents = null;
	var position = null;

	
	/********/

	
	Object.defineProperties (this, {
		
		hovering: {
			get: function () {
				return self.options.hover === true;
			}/* getter */
		}/* hovering */,
	
		cursor_location: {
			get: function () {
				return self.options.cursor == true;
			}/* getter */
		}/* cursor_location */
		
	});
	
	/********/
	
	
	function add_buttons (window, buttons) {
		
		if (not_set (buttons)) return;
		
		var button_bar = window.descendants ("div.button-bar");
		
		if (button_bar.vacant) button_bar = $("<div />").addClass ("button-bar").appendTo (window);
		
		for (var button of buttons) {
			var button_object = $("<button />").appendTo (button_bar);
			if (button == dialog_buttons.close) button_object.html ("Close").attr ("onclick", "return new dialog_window ().hide ();");
		}// for;
		
	}// add_buttons;


	function get_dialog (dialog_name) {
		
		var dialog = isset (dialog_name) ? $(dialog_name) : null;
		
		if (is_empty (dialog)) dialog = $("<div />").addClass ("dialog").appendTo ($("body"));
		
		dialog.blackscreen = dialog.children ("div.blackscreen");
		dialog.window = dialog.children ("div.dialog-window");
		dialog.frame = dialog.window.children ("div.dialog-frame");
		
		if (dialog.blackscreen.vacant) dialog.blackscreen = $("<div />").css ({
			backgroundColor: "black", 
			position: "absolute",
			left: 0,
			top: 0,
			width: "100%",
			height: "100%",
			opacity: 0,
			zIndex: -1
		}).addClass ("blackscreen").appendTo (dialog);

		if (dialog.window.vacant) dialog.window = $("<div />").css ({
			position: "absolute",
			opacity: 0,
			zIndex: -1
		}).addClass ("dialog-window").attr ("onescape", "new dialog_window ().hide ();").appendTo (dialog);

		if (dialog.frame.vacant) dialog.frame = $("<div />").css ({
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}).addClass ("dialog-frame").appendTo (dialog.window);

		if ((self.options.hover !== true) && (self.options.cursor !== true)) dialog.window.css ({
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)"
		});

		return dialog;
		
	}// get_dialog;

	
	function get_eyecandy (contents) {
		
		var eyecandy = (contents instanceof jQuery) ? contents.clone ().removeClass ("hidden") : $("<div>").html (contents);
		return eyecandy;
		
	}// get_eyecandy;
	
	
	function merge_parameters () {
		
		let parameters = Array.from (arguments);
		let result = null;
		
		for (let parameter of parameters) {
			if (not_object (parameter)) continue;
			if (is_null (result)) {
				result = parameter;
				continue;
			}// if;
			for (let index in parameter) {
				if (!parameter.hasOwnProperty (index)) continue;
				let item = parameter [index];
				result [index] = item;
			}// for;
		}// for;
		
		return result;
			
	}// merge_parameters;
	
	
	function parse_parameters (parameters, object) {
		
		if (not_set (parameters)) parameters = {}
		if (not_set (object)) object = self;
		
		object.options = merge_parameters (object.options, parameters);
		
		object.dialog = (parameters.dialog || object.dialog || get_dialog (object.dialog_name));
		object.contents = (parameters.contents || object.contents || get_eyecandy (object.options.eyecandy));
		object.position = (parameters.position || object.position || {});
		
	}// parse_parameters;


	function resize_dialog (contents, oncomplete) {
		self.dialog.frame.animate ($(contents).get_dimensions (self.dialog.frame), {
			complete: oncomplete
		});
	}// resize_dialog;

	
	function reposition_window (event) {
		
		if (not_set (self.position.horizontal)) self.position.horizontal = "left";  
		if (not_set (self.position.vertical)) self.position.vertical = "bottom";  
		
		if (not_event (event)) return;
		
		self.dialog.window.css ({
			left: self.position.horizontal.matches ("left") ? (event.clientX + buffer) : (event.clientX - (self.dialog.window.complete_width + buffer)),
			top: self.position.vertical.matches ("top") ? (event.clientY + buffer) : (event.clientY - (self.dialog.window.complete_height + buffer))
		});
		
	}// reposition_window;
	
	
	function show_window (event) {
		
		self.dialog.frame.set_contents (self.contents);
		
		if (self.options.cursor === true) $(document).dom_object.addEventListener ("mousemove", reposition_window);
		if (((self.options.cursor === true) || (self.options.hover === true)) && is_event (event)) reposition_window (event);
		
		self.dialog.window.appear (function () {
			if (isset (self.options.action) && isset (self.options.option)) jQuery.ajax ({
				data: extend ({
					action: self.options.action,
					option: self.options.option,
				}, self.options.data),
				success: function (response) { 
					self.show ({
						event: event,
						contents: $("<div />").html (response),
						buttons: self.options.buttons
					}); 
				}/* success */
			})// if;
		})// appear;
		
	}// show_window;
	
	
	/********/
	
	
	this.hide = function (dialog_name) {
		
		self.dialog.window.disappear (function () {
			self.dialog.blackscreen.disappear (function () {
				self.dialog.blackscreen.css ("z-index", -1);
				self.dialog.window.css ({ zIndex: -1 });
				self.dialog.frame.remove_style ("width").remove_style ("height");
				self.contents = null;
			});
		});
		
		return false;
		
	}// hide_dialog;
	
	
	this.show = function (parameters) {
		
		var event = null;
		
		if (is_event (parameters)) {
			event = parameters;
			parameters = {}
		}// if;
		
		if (is_event (parameters.event)) event = parameters.event;

		parse_parameters (parameters);
		
		if (not_set (self.contents) && not_set (self.options.eyecandy)) return alert ("Development error: show_dialog called with no content or eyecandy defined.");
		if (not_set (event) && (self.hovering || self.cursor_location)) return alert ("Development error: hover or cursor location set with no event specified");

		self.dialog.blackscreen.css ("z-index", 10);
		self.dialog.window.css ("z-index", 15);
		
		if (self.dialog.window.showing) {
			self.dialog.frame.disappear (function () {
				var content_object = $("<div />").html (self.contents);
				add_buttons (content_object, self.options.buttons);
				resize_dialog (content_object, function () {
					self.dialog.frame.set_contents (content_object);
					self.dialog.frame.appear ();
				});
			});
			return;
		}// if;
		
		switch (self.options.blackscreen) {
			case false: show_window (event); break;
			default: self.dialog.blackscreen.remove_style ("visibility").animate ({ opacity: 0.5 }, { complete: function () { show_window (event); } }); break
		}// switch;
		
		return false;
		
	}// show;
	
	
	/********/

	
	if (isset (dialog_window.object)) {
		parse_parameters (parameters, dialog_window.object);
		return dialog_window.object;
	}// if;

	dialog_window.object = this;
	parse_parameters (parameters);
	
	
}// dialog_window;


