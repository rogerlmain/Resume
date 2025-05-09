import "Classes/Prototypes/ArrayPrototypes";
import "Classes/Prototypes/HTMLElementPrototypes";
import "Classes/Prototypes/HTMLDivElementPrototypes";


import { DateFormat, StringList } from "Classes/Globals";
import { Component } from "react";


export {};


declare global {

	interface DateConstructor {
		current_date (): Date;
		earlier (value: Date);
		format (date_value: string | Date, format?: DateFormat): string;
		isDate (candidate: any): boolean;
		later (value: Date);
		month_name (month: number): string;
		today (format?: DateFormat): string;
		weekday_name (day: number): string;
	}// DateConstructor;


	interface Date {
		appended_day (): string;
		format (template: string | DateFormat): string;
		timestamp (): number;
		toUnix (): number;
	}// Date;


	interface Element{
		hasClass (class_name: string): boolean;
	}// Element;


	interface FormData {
		get_data (): FormData;
	}// FormData;


	interface NumberConstructor {
		isNumber (candidate: any): boolean;
	}// NumberConstructor;


	interface Number {

		format (decimal_places: number): string;
		padded (digits: number): string;
		padFractions (decimal_places: number);
		round_to (decimal_places: number): number;
		truncate_to (decimal_places: number): number;

		get length (): number;

	}// Number;


	interface ObjectConstructor {

		isFunction (candidate: any): boolean;
		isObject (candidate: any): boolean;
		isObjectLike (candidate: any): boolean;

		notObject (candidate: any): boolean;
		notObjectLike (candidate: any): boolean;

	}// ObjectConstructor;


	interface Object {

		assign (template: any): any;
		copy (...candidates: Object []): Object;
		hasKey (key_name: string): boolean;
		matches (candidate: any): boolean;
		nested_field (field_name): any;
		merge (...candidates: Object []): Object;
		toJson (): string;

		get Duplicate (): any;
		get GetType (): Function;
		get GetTypeName (): string;
		get Keys (): StringArray;
		get NoData (): boolean;
		get Properties (): StringList;
		get Replica (): any;

	}// Object;


	interface StringConstructor {

		Empty: string;
		Space: string;
		Comma: string;
		Underscore: string;

		isString (candidate: any): boolean;

	}// StringConstructor;


	interface String {

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

		get is_numeric (): boolean;
		get null_value (): string;
		get underscored (): string;


	}// String;

}// declare global;


/**** React Component Prototype Functions ****/


let nativeSetState = Component.prototype.setState;

Component.prototype.setState = function (state: any, callback?: () => void): boolean | Promise<boolean> {
	nativeSetState.call (this, state, callback);
	return true;
}// setState;


/**** Date Extension Functions ****/


Date.current_date = function (): Date { return new Date () }

Date.earlier = function (value: String | Date): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) < new Date ();
	return result;
}// earlier;


Date.format = function (date_value: string | Date, format: DateFormat = DateFormat.readable): string {

	if (is_null (date_value)) return null;

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (format == DateFormat.readable) return `${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}-${date.getFullYear ()}`;
	if (format == DateFormat.database) return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}`;

	return date.toDateString ();

}// Date.format;


Date.isDate = function (candidate: any): boolean { return candidate instanceof Date }


Date.later = function (value: String | Date): boolean {
	if (typeof value == "string") value = new Date (value as string);
	let result: boolean = (value as Date) > new Date ();
	return result;
}// later;


Date.month_name = (month: number) => { return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1] }

Date.today = function (format: DateFormat = DateFormat.readable): string { return Date.format (new Date (), format); }


Date.weekday_name = (day: number) => { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day - 1] }


/**** Date Prototype Functions ****/


Date.prototype.appended_day = function () {

	let day = this.getDate ();

	switch (day) {
		case 1: return `${day}st`;
		case 2: return `${day}nd`;
		case 3: return `${day}rd`;
		default: return `${day}th`;
	}// switch;
	
}// appended_day;


Date.prototype.format = function (template: string | DateFormat = DateFormat.readable) {

	let hours = this.getHours ();
	let month = this.getMonth ();

	let format: string = (String.isString (template) ? (template as string) : (template == DateFormat.readable ? "M-d-yyyy" : "yyyy-MM-dd"));
	let result = (format.replace ? format : String.Empty);

	result = result.
		replace ("yyyy", this.getFullYear ().padded (4)).
		replace ("MMMM", Date.month_name (month + 1)).
		replace ("MM", (month + 1).padded (2)).
		replace ("dd", this.getDate ().padded (2)).
		replace ("HH", hours.padded (2)).
		replace ("mm", this.getMinutes ().padded (2)).
		replace ("ss", this.getSeconds ().padded (2)).
		replace ("M", (month + 1).toString ()).
		replace ("ad", this.appended_day ()).
		replace ("d", this.getDate ().toString ()).
		replace ("H", ((hours % 12) || 12).toString ()).
		replace ("ap", (hours < 12) ? "am" : "pm").
		replace ("w", Date.weekday_name [this.getDay ()]);

	return result;

}// format;


Date.prototype.timestamp = function (): number { return this.valueOf () }


Date.prototype.toUnix = function (): number { return this.getTime () / 1000 }


/**** Element Prototype Functions ****/


Element.prototype.hasClass = function (class_name: string): boolean { return this.classList.contains (class_name); }


/**** FormData Prototype Functions ****/


// Removes empty elements from FormData
FormData.prototype.get_data = function (): FormData {

	let form_data = null;

	this.forEach ((value: FormDataEntryValue, key: string) => {
		if (!key.matches ("null") && is_assigned (value)) {
			if (is_null (form_data)) form_data = new FormData ();
			if (String.isString (value) && (value as string).is_numeric) return form_data.append (key, (value as String).parseNumeric ());
			form_data.append (key, value);
		}// if;
	});

	return form_data;

}// get_data;


/**** Number Prototype Functions ****/


Number.isNumber = function (candidate: any) {
	return typeof (candidate) == "number";
}// isNumber;


Number.prototype.format = function (decimal_places: number): string {
	let parts = this.toString ().split (".");
	if (parts.length == 1) parts.push ("00");
	parts [1] = parts [1].padEnd (decimal_places, "0").substring (0, decimal_places).toString ();
	return parts.join (".");
}// format;


Number.prototype.padded = function (digits: number) { return this.toString ().padStart (digits, "0") }


Number.prototype.padFractions = function (decimal_places: number): string {

	let parts: StringArray = this.toString ().parts (".", 1, 2);

	if (parts.length == 1) parts.push ("0");
	parts [1] = parts [1].padEnd (decimal_places, "0");

	return `${parts [0]}.${parts [1]}`;

}// padFractions;


Number.prototype.round_to = function (decimal_places: number): number {
	return Math.round ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// round_to;


Number.prototype.truncate_to = function (decimal_places: number): number {
	return Math.trunc ((this as number) * Math.pow(10, decimal_places)) / Math.pow (10, decimal_places);
}// truncate_to;


Object.defineProperties (Number.prototype, {
	length: {
		get: function () { return this.toString ().length }
	}// length;
});


/**** Object Extension Functions ****/


Object.isFunction = function (candidate: any): boolean {
	return (typeof candidate == "function");
}// isFunction;


Object.isObject = function (candidate: any): boolean {
	return (typeof candidate == "object");
}// isObject;


Object.isObjectLike = function (candidate: any): boolean {
	return Object.isObject (candidate) || Object.isFunction (candidate);
}// isObjectLike;


Object.notObject = function (candidate: any): boolean {
	return !Object.isObject (candidate);
}// notObject;


Object.notObjectLike = function (candidate: any): boolean {
	return !Object.isObjectLike (candidate);
}// notObjectLike;


/**** Object Prototype Functions ****/


Object.prototype.assign = function (template: any): any {
	return Object.assign (this, template);
}// assign;


Object.prototype.copy = function (...candidates: Object []): Object {

	candidates.forEach (candidate => {
		Object.assign (this, candidate);
	});

	return this;

}// copy;


Object.prototype.hasKey = function (key_name: string): boolean {
	return Object.keys (this).contains (key_name);
}// hasKey;


Object.prototype.matches = function (candidate: any) { return JSON.stringify (this) == JSON.stringify (candidate) }


Object.prototype.merge = function (...candidates: Object []): Object {

	candidates.forEach (item => {
		Object.keys (this).forEach (key => {
			if (not_set (item [key])) return;
			this [key] = item [key];
		});
	});

	return this;

}// merge;


Object.prototype.nested_field = function (field_names: string) {
	let name_list: StringList = field_names.split (period).cleaned;
	if (name_list.length == 1) return this [name_list [0]];
	return this [name_list [0]].nested_field (name_list.slice (1).join (period));
}// nested_field;


Object.prototype.toJson = function () { return JSON.stringify (this) }


Object.defineProperties (Object.prototype, {

	Duplicate: { get: function (): any { return this.Replica.assign (this) } },
	GetType: { get: function (): Function { return Object.getPrototypeOf (this).constructor } },
	GetTypeName: { get: function (): string { return Object.getPrototypeOf (this).constructor.name } },
	Keys: { get: function (): StringArray { return Object.keys (this) } },
	NoData: { get: function (): boolean { return this.hasKey ("data") && (this.data == no_data) } },
	Replica: { get: function (): any { return new (Object.getPrototypeOf (this).constructor) () } },

});


/**** String Prototype Functions ****/


String.Empty = "";
String.Space = " ";
String.Comma = ",";
String.Underscore = "_";


String.isString = function (candidate: any) { return typeof candidate == "string" }


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


String.prototype.matches = function (candidate: string) {
	return this.toLowerCase ().trim () == candidate.toLowerCase ().trim ();
}// matches;


String.prototype.parseInt = function (): number {
	return (~~this).toString () == this ? ~~this : null;
}// parseInt;


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
	is_numeric: { get: function (): boolean { return this.parseNumeric ().toString () == this } },
	null_value: { get: function (): string { return (this.trim () == String.Empty) ? null : this } },
	underscored: { get: function (): string { return (this.toLowerCase ().trim ().replace (String.Space, String.Underscore)) } }
});