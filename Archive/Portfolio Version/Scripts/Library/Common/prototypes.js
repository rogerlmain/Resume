/******** Properties ********/


Object.defineProperties (Array.prototype, {
	
	empty: {
		get: function () { return (this.length == 0); }
	}/* empty */

});


Object.defineProperties (String.prototype, {
	
	blank: {
		get: function () { return (this.matches (blank)); }
	}/* empty */

});


Object.defineProperties (HTMLElement.prototype, {
	
	full_signature: {
		get: function () {
			
			let result = null;
			let node = this;
			
			while (isset (node)) {
				if (is_null (result)) result = new Array ();
				result.push (node.signature);
				node = node.parentNode;
			}// while;
			
			return (is_null (result) ? result : result.reverse ().join (space));
		}/* getter */
	}/* full_signature */,

	
	signature: { 
		get: function () {
			return (this.tagName + (isset (this.id) ? "#" + this.id : blank) + (isset (this.classList) ? "." + Array.from (this.classList).join (".") : blank)).trim ().toLowerCase ();
		}/* getter */
	}/* signature */,
	
	
	is_unique_signature: {
		get: function () {
			return ($(this.signature).length == 1);
		}/* getter */
	}/* is_unique_signature */
		
});


/******** Methods ********/


Array.prototype.cleaned = function (empty_as_null) {
	let result = new Array ();
	for (item of this) {
		if (item.blank) continue;
		result.push (item);
	}// for;
	return ((empty_as_null === true) && (result.empty)) ? null : result;
}// cleaned;


Array.prototype.contains = function (needle) {
	for (item of this) {
		if (item == needle) return true;
	}// for;
	return false;
}// contains;


/********/


String.prototype.presplit = String.prototype.split;


/********/


String.prototype.contains = function (value) {
	return this.indexOf (value) > -1;
}// String.prototype.contains; 


String.prototype.matches = String.prototype.equals = function (text) {
	if (!is_string (text)) return false;
	return this.trim ().toLowerCase () == text.trim ().toLowerCase (); 
}// String.prototype.equals;


String.prototype.split = function (delimiter, empty_as_null, include_blanks) {
	let result = (include_blanks === true) ? this.presplit (delimiter) : this.presplit (delimiter).cleaned (empty_as_null);
	return result; //(is_empty (result) && (empty_as_null !== false)) ? null : result;
}// String.prototype.doit;


String.prototype.trim = function (character) {

	switch (isset (character)) {
		case true: if (character.match (/[\\\^\$\.\|\?\*\+\(\)\[\{]/g)) character = "\\" + character; break;
		default: character = "\\s"; break; 
	}// switch;
	
	let result = this.replace (new RegExp ("^[" + character + "]+|[" + character + "]+$", "g"), blank);
	return result;
	
}// String.prototype.trim;


String.prototype.base64_encoded = function (trimmed) {
	 return base64_encode (this, trimmed);
}// String.prototype.base64_encoded;






