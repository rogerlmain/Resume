export {};


declare global {

	interface StringConstructor {

		Empty: string;
		Space: string;
		Comma: string;
		Underscore: string;

		isString (candidate: any): boolean;

	}// StringConstructor;


	interface String {

		after (value: string): boolean;
		before (value: string): boolean;
		isInteger (): boolean;
		leadingCharacters (char: string)
		matches (candidate: string): boolean;
		parseInt (): number;
		parseNumeric (): string;
		parts (delimiter: string, minimum: number, maximum: number): StringArray;
		plural (count: number): string;
		titleCase (strip_spaces?: boolean): string;
		trimmedStart (value: string);
		trimmedEnd (value: string);
		trimmed (value: string): string;

		get cleaned (): string;
		get is_numeric (): boolean;
		get null_value (): string;
		get underscored (): string;


	}// String;

}// declare global;


/**** String Prototype Functions ****/


String.Empty = "";
String.Space = " ";
String.Comma = ",";
String.Underscore = "_";


String.isString = function (candidate: any) { return typeof candidate == "string" }


String.prototype.after = function (value: string) { return this.cleaned > value.cleaned }
String.prototype.before = function (value: string) { return this.cleaned < value.cleaned }


String.prototype.isInteger = function () {

	for (let char of this) {
		if (char == "-") continue;
		if (!digits.contains (parseInt (char))) return false;
	}// for;

	return true;

}// isInteger;


String.prototype.leadingCharacters = function (char: string): number {

	let result: number = 0;
	let value: String = this;

	while ((value.length > 0) && (value [0] == char)) {
		result++;
		value = value.substring (1);
	}// while;

	return result;

}// leadingCharacters;


String.prototype.matches = function (candidate: string) { return this.cleaned == candidate.cleaned }


String.prototype.parseInt = function (): number { return (~~this).toString () == this ? ~~this : null }


String.prototype.parseNumeric = function (allow_negatives: boolean = true, allow_decimals: boolean = true) {

	let result = String.Empty;

	for (let index = 0; index < this.length; index++) {
		if (allow_negatives && (this [index] == "-") && (index == 0)) { result += this [index]; continue; }
		if (allow_decimals && (this [index] == ".") && (!result.includes ("."))) { result += this [index]; continue; }
		if (digits.contains (parseInt (this [index]))) result += this [index];
	}// for;

	return result;

}// parseNumeric;


String.prototype.parts = function (delimiter: string, minimum: number = null, maximum: number = null): StringArray {

	let result: StringArray = this.split (delimiter);

	if (is_null (minimum)) return result;
	if (is_null (maximum)) maximum = minimum;

	if ((result.length < minimum) || (result.length > maximum)) {
		let expectation = (minimum == maximum) ? minimum : `at least ${minimum} and as many as ${maximum}`;
		throw `Invalid number of parts for ${this}. Expected ${expectation}. Found ${result.length}`;
	}// if;

	return result;

}// parts;


String.prototype.plural = function (count: number): string { return (count != 1 ? `${this}s` : this.toString ()) }


String.prototype.titleCase = function (strip_spaces: boolean = false): string {

	let words: String [] = this.replaceAll (underscore, String.Space).split (String.Space);
	let result: String [] = new Array ();

	words.forEach (word => {
		result.push (`${word.trim ().substring (0, 1).toUpperCase ()}${word.substring (1).toLowerCase ()}`);
	});

	return result.join (strip_spaces ? String.Empty : String.Space);

}// titleCase;


String.prototype.trimmedStart = function (value: string = String.Empty): string {

	let new_value = this.toString ();

	while (new_value.startsWith (value)) new_value = new_value.substring (1);
	return new_value;

}// trimmedStart;


String.prototype.trimmedEnd = function (value: string = String.Empty): string {

	let new_value = this.toString ();

	while (new_value.endsWith (value)) new_value = new_value.substring (0, new_value.lastIndexOf (value));
	return new_value;

}// trimmedEnd;


String.prototype.trimmed = function (value: string = String.Empty) {
	return this.trimmedStart (value).trimmedEnd (value);
}// trimmed;


Object.defineProperties (String.prototype, {
	cleaned: { get: function () { return this.trim ().toLowerCase () } },
	is_numeric: { get: function (): boolean { return this.parseNumeric ().toString () == this } },
	null_value: { get: function (): string { return (this.trim () == String.Empty) ? null : this } },
	underscored: { get: function (): string { return (this.toLowerCase ().trim ().replace (String.Space, String.Underscore)) } }
});