type FilterCallback = (value: any, index: number, array: AnyArray) => {};


export default class TypedArray extends Array {

	public Datatype: any;


	/********/


	public filter (callback: FilterCallback): (typeof this) { return (super.filter (callback) as (typeof this)) }


	public freeze_sorted (field_name: string, frozen_field: string): (typeof this) {

		let result: (typeof this) = super.sortby (field_name) as (typeof this);
		
		return result.toSorted ((previous: Object) => {
			return (previous.nested_field (field_name) == frozen_field) ? -1 : 1;
		}) as (typeof this);

	}// freeze_sorted;


	public append (value: (typeof this.Datatype)) { 
		let clone = this.clone ();
		clone.push (value);
		return clone;
	}// append;


	public assign (values: AnyArray | Object): typeof this {
		this.clear ();
		if (!Array.isArray (values)) values = [values];
		(values as AnyArray).forEach ((value: any) => this.push (new this.Datatype ().assign (value)));
		return this;
	};// assign;


	public clear = () => {
		while (this.length > 0) { delete this [0] }
	};// clear;


	public clone = () => this.Replica.assign (this);


	public merge (values: (typeof this), copy: boolean = false): (typeof this) { 

		values.forEach ((item: typeof this.Datatype) => {
			this.push (copy ? item.clone () : item);
		});

		return this;

	}// merge;


	public constructor (element_type: any, values: AnyArray | Object = null) {
		super ();
		this.Datatype = element_type;
		if (isset (values)) this.assign (values);
	}// constructor;

}// TypedArray;