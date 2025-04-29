$(document).ready (function () {
	
	switch ($(body).css ("opacity") == 0) {
		case true: $(body).animate ({ opacity: 1 }, { complete: $("body").load () }); break;
		default: $("body").load ();
	}// switch;
	
});


new MutationObserver (function (mutations) {
	
	var nodes = new jQuery ();
		
	for (let mutation of mutations) {
		if (not_set (mutation.addedNodes)) continue;
		for (let node of mutation.addedNodes) {
			if (node instanceof Text) continue;
			nodes = nodes.add ($(node));
		}// for;
	}// for;
		

    nodes.family ("input[type=numeric]").keypress (function (event) {
        if ((event.which < 32) || (event.which > 126)) return true; 
        return jQuery.isNumeric ($(this).val () + String.fromCharCode (event.which));
    });// numeric.keypress;

    
	nodes.family ("form.ajax").each (function (index, item) {
		$(item).submit (function (event) { return false; });
		item.reset ();
	});
	

	nodes.family ("[onclick]").each (function (index, item) {
		item.addEventListener ("click", function (event) {
			event.stopPropagation ();
		});
	});

}).observe (document, {
	childList: true,
	subtree: true
}, false) ;

	
	
document.addEventListener ("keydown", function (event) {
	
	var keycode = parseInt (event.keyCode || event.which);
	if (keycode == 27) $("[onescape], [onclickescape]").each (function (index, item) {
		run (item, "onescape");
		run (item, "onclickescape");
	});
	
})/* document.keydown */;


document.addEventListener ("click", function (event) {
	
	$("[onpageclick], [onclickescape]").each (function (index, item) {
		run (item, "onpageclick");
		run (item, "onclickescape");
	});
	
})/* document.click */;