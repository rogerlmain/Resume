type FilterCallback = (value: any, index: number, array: AnyArray) => {};


export default abstract class TypedArray extends Array {

	protected DataType: any;


	/********/


	public filter (callback: FilterCallback): (typeof this) { return (super.filter (callback) as (typeof this)) }


	public freeze_sorted (field_name: string, frozen_field: string): (typeof this) {

		let result: (typeof this) = super.sortby (field_name) as (typeof this);
		
		return result.toSorted ((previous: Object) => {
			return (previous.nested_field (field_name) == frozen_field) ? -1 : 1;
		}) as (typeof this);

	}// freeze_sorted;


	public append (value: (typeof this.DataType)) { 
		let clone = this.clone ();
		clone.push (value);
		return clone;
	}// append;


	public assign (values: AnyArray | Object): typeof this {
		this.clear ();
		if (!Array.isArray (values)) values = [values];
		(values as AnyArray).forEach ((value: any) => this.push (new this.DataType ().assign (value)));
		return this;
	};// assign;


	public clear = () => {
		while (this.length > 0) { delete this [0] }
	};// clear;


	public clone = () => this.Replica.assign (this);


	public merge (values: (typeof this), copy: boolean = false): (typeof this) { 

		values.forEach ((item: typeof this.DataType) => {
			this.push (copy ? item.clone () : item);
		});

		return this;

	}// merge;


	public constructor (data_type: any = null, values: any = null) {
		super ();
		if (isset (data_type)) this.DataType = data_type;
		if (isset (values)) this.assign (values);
	}// constructor;

}// TypedArray;
