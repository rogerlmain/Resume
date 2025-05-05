export {}


declare global {

	interface Array<T> {

		add (value: T): Array<T>
		append<TModel> (value: TModel, copy?: boolean): Array<TModel>
		assign (template: Array<any>, data_type?: any): Array<T>
		contains (value: T, case_sensitive?: boolean): boolean;
		filteredMap (processor: (item: any) => any): AnyArray;
		getDates (fieldname: string): Array<Date>
		getIndex (value: T, case_sensitive?: boolean, fromIndex?: number): number;
		getIntegers (allow_non_numeric?: boolean): Array<number>
		insert (item: any, fieldname?: string): void;
		list (fieldname: string): Array<any>
		remove (value: T): Array<T>
		sortby (fieldname: string, copy?: boolean): Array<T>;
		sorted (fieldname: string): Array<T>

		get cleaned (): Array<T>;
		get empty (): boolean

	}// Array<T>;

}// global;


/********/


Array.prototype.add = function<T> (value: T): Array<T> {
	if (!this.contains (value)) this.push (value);
	return this;
}// add;


Array.prototype.append = function<TModel> (value: TModel, copy: boolean = false): Array<TModel> {

	if (Array.isArray (value)) {
		if (copy) return this.concat (value);
		value.forEach ((item: any) => this.push (item));
		return this;
	}// if;

	if (copy) return this.concat ({value});
	this.push (value);
	return this;

}// append;


Array.prototype.assign = function (template: AnyArray, data_type: any = Object): Array<any> {

	let result: AnyArray = null;

	template.forEach (item => {
		if (is_null (result)) result = new Array<any> ();
		result.push (new data_type ().assign (item));
	});

	return result;

}// assign;


Array.prototype.contains = function<TModel> (value: TModel, case_sensitive: boolean = false) { return this.getIndex (value, case_sensitive) > -1 };


Array.prototype.filteredMap = function (processor: (item: any) => any): AnyArray {
	let result: AnyArray = this.map (processor).filter ((item: any) => isset (item));
	return (is_empty (result) ? null : result);
}// filteredMap;


Array.prototype.getDates = function (fieldname: string): Array<Date> {

	let result: Array<Date> = null;

	this.forEach (item => {
		if (not_set (item [fieldname])) return;
		if (is_null (result)) result = new Array<Date> ();
		if (!["string", "Date"].contains (typeof item [fieldname])) throw ("Invalid data type in getDates");
		result.push ((typeof (item [fieldname]) == "string") ? new Date (item [fieldname]) : item [fieldname]);
	});

	return result;

}// getDates;


Array.prototype.getIndex = function<TModel> (value: TModel, case_sensitive: boolean = true, fromIndex: number = 0): number {

	for (let index: number = fromIndex; index < this.length; index++) {
		if ((String.isString (value) && case_sensitive) ? this [index].matches (value) : (this [index] == value)) return index;
	}// for;

	return -1;

}// getIndex;


Array.prototype.getIntegers = function (allow_non_numeric: boolean = false): Array<number> {

	let result: Array<number> = null;

	this.forEach ((value: string) => {

		if (value == String.Empty) value = "0";
		if (!value.isInteger () && !allow_non_numeric) {
			throw `Invalid value in Array.prototype.getIntegers: ${value}`;
		}
		if (is_null (result)) result = new Array<number> ();

		result.push (value.parseInt () ?? 0);

	});

	return result;

}// getIntegers;


Array.prototype.insert = function (item: any, fieldname: string = "value") {

	for (let index = 0; index < this.length; index++) {
		if (this [index][fieldname] > item [fieldname]) return this.splice (index, 0, item);
	}// for;

	this.push (item);

}// insert;


Array.prototype.list = function (fieldname: string): Array<any> {

	let result = null;

	this.forEach ((item: any) => {
		if (is_null (result)) result = new Array<any> ();
		result.push (item [fieldname]);
	});

	return result;

}// list;


Array.prototype.remove = function<T> (value: T): Array<T> {
	if (isset (value)) this.splice (this.indexOf (value), 1);
	return this;
}// remove;


Array.prototype.sortby = function<T> (fieldname: string, copy: boolean = true): Array<T> {

	let sort_routine: (a: any, b: any) => number = (previous: Object, next: Object) => next.nested_field (fieldname) < previous.nested_field (fieldname) ? 1 : -1;

	if (copy) return this.toSorted (sort_routine);
	return this.sort (sort_routine);

}// sortby;


Array.prototype.sorted = function<T> (fieldname: string): Array<T> {
	let result: Array<T> = this.toSorted ((previous: Object, next: Object) => next [fieldname] < previous [fieldname] ? 1 : -1);
	return result;
}// sorted;


Object.defineProperties (Array.prototype, {

	cleaned: { 
		get: function<T> (): Array<T> {

			for (let index = (this.length - 1); index > -1; index--) {
				if (this [index].matches (String.Empty)) this.splice (index, 1);
			}// for;

			return this;

		}// get;
	},// cleaned;

	empty: { get: function () { return this.length == 0 } },

});


