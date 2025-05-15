import { StringList } from "Classes/Globals";


export {}


declare global {

	interface ObjectConstructor {
		isFunction (candidate: any): boolean;
		isObject (candidate: any): boolean;
	}// ObjectConstructor;

	interface Object {
		assign (template: any): any;
		nested_field (field_name: string): any;
		get Keys (): StringArray;
		get Replica (): any;
	}// Object;

}// global;


/**** ObjectConstructor Prototypes ****/


Object.isFunction = function (candidate: any): boolean { return (typeof candidate == "function") }
Object.isObject = function (candidate: any): boolean { return (typeof candidate == "object") }


/**** Object Prototypes ****/


Object.prototype.assign = function (template: any): any {
	return Object.assign (this, template);
}// assign;


Object.prototype.nested_field = function (field_names: string) {
	let name_list: StringList = field_names.split (period).cleaned;
	if (name_list.length == 1) return this [name_list [0]];
	return this [name_list [0]].nested_field (name_list.slice (1).join (period));
}// nested_field;


Object.defineProperties (Object.prototype, {
	Keys: { get: function (): StringArray { return Object.keys (this) } },
	Replica: { get: function (): any { return new (Object.getPrototypeOf (this).constructor) () } },
});
