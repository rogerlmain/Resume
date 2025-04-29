Array.prototype.contains = function (needle) {
	for (item of this) {
		if (this == needle) return true;
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


String.prototype.split = function (delimiter) {
	var result = this.presplit (delimiter);
	return is_empty (result) ? null : result;
}// String.prototype.doit;

