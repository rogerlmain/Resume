class fade_list extends HTMLElement {
	
	run () {
		
		$(this).descendants ("fade-item").dom_object.fade_in ();
		
	}// run;
	
}// fade_list;


class fade_item extends HTMLElement {
	
	
	fade_in () {
		$(this).fade_in (function () {
			var sibling = $(this).next ();
			if (isset (sibling)) sibling.dom_object.fade_in ();
		})
	}// fade_in;
	
	
	connectedCallback () {
		
		var control = $(this);
		
		control.css ({
			display: "block",
			opacity: 0
		});
		
	}// connectedCallback;
	
}// fade_item;


customElements.define ("fade-list", fade_list);
customElements.define ("fade-item", fade_item);

