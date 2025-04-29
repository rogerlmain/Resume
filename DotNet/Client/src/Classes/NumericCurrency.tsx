export {};


declare global {

	interface HTMLElement {
		numericInput (): boolean;
	}// HTMLElement;

	interface HTMLInputElement {
		pad_decimals (quantity: number);
		set_commas ();
		clear_commas ();
		valid_keystroke (event: KeyboardEvent);
	}// HTMLInputElement;


	interface Object {
		get isCurrency (): boolean;
		get isNumeric (): boolean;
	}// Object;


}// global;


HTMLElement.prototype.numericInput = function (): boolean {
	return (this.tagName.toLowerCase () == "input") && (["numeric", "currency"].contains (this.getAttribute ("type")));
}// numericInput;


HTMLInputElement.prototype.pad_decimals = function (quantity: number) {

	let parts: StringArray = this.value.split (".");

	if (parts.length == 1) parts.push (String.Empty); // No decimals. Add it.
	if (parts [0].trim ().length == 0) parts [0] = "0";

	while (parts [1].length < quantity) parts [1] += "0";
	this.value = parts.join (".");

}// pad_decimals;


HTMLInputElement.prototype.set_commas = function () {

	let number = String.Empty;
	let parts = this.value.split (".");
	let negative = parts [0][0] == "-";

	if (negative) parts [0] = parts [0].substring (1);

	for (let i = 0; i < parts [0].length; i++) {
		number = `${parts [0][parts [0].length - (i + 1)]}${((i > 0) && ((i % 3) == 0)) ? comma : String.Empty}${number}`;
	}// for;

	this.value = `${negative ? "-" : String.Empty}${number}${(parts.length > 1) ? "." + parts [1] : String.Empty}`;
	
}// set_commas;


HTMLInputElement.prototype.clear_commas = function () {

	let parts = this.value.split (".");
	let negative = parts [0][0] == "-";

	if (negative) parts [0] = parts [0].substring (1);

	this.value = `${negative ? "-" : String.Empty}${parts [0].parseNumeric ()}${(parts.length > 1) ? "." + parts [1] : String.Empty}`;

}// clear_commas;


HTMLInputElement.prototype.valid_keystroke = function (event: KeyboardEvent) {

	let decimal_places: number = (this.getAttribute ("type") == "currency") && !this.hasAttribute ("decimalPlaces") ? currency_decimals : (this.getAttribute ("decimalPlaces")?.parseInt () ?? 0);
	let leading_zeros: number = this.getAttribute ("leadingZeros")?.parseInt () ?? 0;
	let negative_numbers: boolean = this.getAttribute ("negativeNumbers")?.toLowerCase () == "true";

	let value = `${this.value.substring (0, this.selectionStart)}${event.key}${this.value.substring (this.selectionEnd)}`;

	if (action_keys.contains (event.key)) return true; // allow permissable control keys: tab, delete, backspace etc. (see control keys in Globals.tsx for details)
	if (control_keys.contains (event.key) && event.ctrlKey) return true; // allow copy/paste/select all

	if (value.trim () != value) return event.preventDefault (); // leading or trailing spaces are not allowed
	if (!digits.includes (parseInt (value [0])) && (value [0] != "-")) return event.preventDefault (); // leading garbage
	if ((value [0] == "-") && !negative_numbers) return event.preventDefault (); // negative numbers not allowed

	let parts = value.split (".");

	if ((parts.length > 2) || ((parts.length > 1) && (decimal_places == 0))) return event.preventDefault (); // too many decimal points or decimals not allowed
	if ((parts.length == 2) && (((parts [1] != String.Empty) && !parts [1].isInteger) || (parts [1].length > decimal_places))) return event.preventDefault (); // garbage in decimal section or too many decimal places

	if (parts [0][0] == "-") parts [0] = parts [0].substring (1);

	if ((parts [0] != "0") && (parts [0].leadingCharacters ("0") > leading_zeros)) return event.preventDefault (); // too many leading zeros
	if ((parts [0] != String.Empty) && !parts [0].isInteger ()) return event.preventDefault (); // garbage in number section

	return true;

}// valid_keystroke;


Object.defineProperties (Object.prototype, {

	isCurrency: { 
		get: function () {
			return ((this instanceof HTMLInputElement) && (this.getAttribute ("type").toLowerCase () == "currency"));
		}// get;
	},// isCurrency;

	isNumeric: {
		get: function () {
			return ((this instanceof HTMLInputElement) && (this.getAttribute ("type").toLowerCase () == "numeric"));
		}// get;
	},// isNumeric;

});


document.addEventListener ("readystatechange", () => {

	if (document.readyState != "complete") return;

	document.addEventListener ("keydown", (event: KeyboardEvent) => {
		
		let active_element: HTMLInputElement = document.activeElement as HTMLInputElement;

		if (!active_element.numericInput ()) return true; // this is not for you
		return active_element.valid_keystroke (event);

	});

});


// Numeric and currency field observer

new MutationObserver ((mutations: Array<MutationRecord>) => {

	mutations.forEach (() => {

		
		document.querySelectorAll ("input").forEach ((field: HTMLInputElement) => {

			if (!(field.isCurrency || field.isNumeric)) return;

			if (!(field.onpaste)) field.onpaste = () => setTimeout (() => {

				let value: string = field.value.parseNumeric ();

				let decimal_places: number = (field.getAttribute ("type") == "currency") ? currency_decimals : (field.getAttribute ("decimalPlaces")?.parseInt () ?? 0);
				let negative_numbers: boolean = field.getAttribute ("negativeNumbers")?.toLowerCase () == "true";

				if ((value [0] == "-") && !negative_numbers) value = value.substring (1);

				let parts = value.split (".");

				if (decimal_places == 0) return field.value = parts [0];

				if (parts [1].length > decimal_places) {
					parts [1] = parts [1].substring (0, decimal_places);
					value = `${parts [0]}.${parts [1]}`;
				}// if;

				field.value = value;

			});

			if (!field.onfocus) field.onfocus = () => {
				if (field.getAttribute ("commas") == "true") field.clear_commas ();
			}// onfocus;

			if (!field.onblur) field.onblur = () => {
				if (field.getAttribute ("commas") == "true") field.set_commas ();
				if (field.isCurrency) field.pad_decimals (currency_decimals);
			}// onblur;

		});

	});

}).observe (document, { childList: true, subtree: true });
