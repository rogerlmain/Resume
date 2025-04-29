export {};


/**** Generic Global Definitions ****/


declare global {

	var coalesce: 

	var form_fields: string;
	var form_items: string;

	var currency_decimals: number;
	var numeric_decimals: number;

	var comma: string;
	var underscore: string;

	var digits: Array<number>;
	var action_keys: StringArray;
	var control_keys: StringArray;

	var no_data: string;

	var key_name: Function;

	var is_empty: Function;
	var not_empty: Function;

	var isset: Function;
	var not_set: Function;

	var is_null: Function;
	var not_null: Function;

	var is_defined: Function;
	var not_defined: Function;

	var is_array: Function;
	var is_function: Function;
	var is_object: Function;
	var is_string: Function;

	var conditional: Function;

	var event_handler: EventTarget;

}// global;


export enum DateFormats {
	readable,
	database
}// DateFormats;


export enum HoldingsStatus {
	live = "Live",
	dead = "Dead",
	defunct = "Defunct",
}// HoldingsStatus;


global.coalesce = function () {

	let index: number;

	for (index = 0; index < arguments.length; index++) {
		if (not_null (arguments [index])) return arguments [index];
	}// for;

	return null;

}// coalesce;
	

global.form_items = "input, select, textarea";
global.form_fields = "input:not([type='hidden']), select, textarea";

global.currency_decimals = 4;
global.numeric_decimals = 6;

global.comma = ",";
global.underscore = "_";

global.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
global.action_keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Backspace", "Delete", "Escape"];
global.control_keys = ["c", "v", "a"]; // use in conjunction with ctrl key

global.no_data = "No data available";

global.is_empty = (value: any): boolean => (String.isString (value) && (value == String.Empty)) || (Array.isArray (value) && (value.length == 0));
global.not_empty = (value: any): boolean => !is_empty (value);

global.isset = (value: any): boolean => not_null (value) && (value != undefined);
global.not_set = (value: any): boolean => !isset (value);

global.is_null = (value: any): boolean => (value === null);
global.not_null = (value: any): boolean => !is_null (value);

global.is_defined = (value: any): boolean => isset (value) && not_empty (value);
global.not_defined = (value: any): boolean => !is_defined (value);

global.is_array = (value: any) => value instanceof Array;
global.is_function = (value: any): boolean => (value instanceof Function);
global.is_object = (value: any): boolean => ((value instanceof Object) && (!is_function (value)));
global.is_string = (value: any): boolean => (typeof value == "string");

global.conditional = (condition: boolean, output: any): string => condition ? output : String.Empty;

global.event_handler = new EventTarget ();


