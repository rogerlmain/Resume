const fade_speed = 700;

const default_padding = "1em";
const default_popup_delay = 0.5;


function arm_popup (panel, duration) {
	
	setTimeout (function () {
		panel.show ();
	}, (duration || default_popup_delay) * 1000);

}// arm_popup;


function equalize (image_panel, blurb) {
	
	
	
	let top = 0;
	let title_height = image_panel.children ("div.title").outerHeight (true);
	
	let height = max (image_panel.dimensions.height, blurb.dimensions.height);
	
	if (height == blurb.dimensions.height) height += title_height;
	
	top = ($("#main_panel").dimensions.height - height) / 2;
	
	image_panel.css ("top", top);
	blurb.css ("top", top + title_height);
	
}// equalize;


function load_page (path) {
	
	let ajax_path = path.split ("/");
	
	
	function load_images () {
		
		if (!images_loaded ()) return setTimeout (load_images, default_timeout);
		
		$("#loading_panel").dom_object.exit (function () {
			$("#main_panel sweep-panel").each (function (index, item) {
				item.enter ();
			});
		});
		
	}// load_images;
	

	if ($("div.overlay sweep-panel").onscreen) {
		setTimeout (function () {
			load_page (path);
		}, default_timeout);
		return;
	}// if;
	
	
	$("#loading_panel").dom_object.enter (function () {
		jQuery.ajax ({
			method: "post",
			data: {
				action: ajax_path [0],
				option: ajax_path [1]
			}/* data */,
			success: function (response) {
				$("#main_panel").html (response);
				load_images (); 
			}/* success */
		});
	});
	
}// load_page;


function change_page (path) {
	$("#main_panel sweep-panel").each (function (index, item) {
		item.exit (function () {
			if (index == 0) load_page (path);
			item.remove ();
		});
	});
}// change_page;


function show_homepage () {
	$("fade-panel#fade_panel").appear ({ 
		speed: fade_speed,
		oncomplete: function () {
			$("#main_menu").dom_object.run (function () {
				arm_popup ($("popup-panel"));
			});
		}/* oncomplete */
	});
}// show_homepage;


function show_menu (menu_item, submenu_id) {
	
	let panel = $("#menu_panel").dom_object;
	
	if (panel.open) {
		$(panel).descendants ("fade-list").fade_out (function () {
			panel.load_contents ($("div.submenus [name=" + submenu_id + "]").clone (true), function () {
				$(panel).descendants ("fade-list").dom_object.run ();
			});
		});
		return;
	}// if;
	
	panel.load_contents ($("div.submenus [name=" + submenu_id + "]").clone (true), function () {
		panel.slide_out (() => {
			$(panel).descendants ("fade-list.menu-list").dom_object.run ();
		});
	});

}// show_menu;


function load_homepage () {
	
	let loading_panel = $("#loading_panel");
	let panel_object = loading_panel.dom_object;
	
	if (images_loaded ()) {
		panel_object.exit ({ 
			direction: "right",
			onexit: show_homepage
		});
		return;
	}// if;
	
	if (panel_object.offscreen) {
		panel_object.enter ({
			direction: "right",
			onenter: load_homepage
		});
		return;
	}// if;
	
	setTimeout (load_homepage, default_timeout);
		
}// load_homepage;


$(window).ready (load_homepage);



