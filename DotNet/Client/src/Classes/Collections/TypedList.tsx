import { IDValueList, IDValue } from "Models/BaseModels";


export default abstract class TypedList extends Array {

	private clear = () => {
		while (this.length > 0) { delete this [0] }
	};// clear;


	/********/


	protected DataType: any;
	protected IDField: string = "id";
	protected TextField: string = "value";


	/********/


	public assign (values: AnyArray | Object): typeof this {
		this.clear ();
		if (!Array.isArray (values)) values = [values];
		(values as AnyArray).forEach ((value: any) => this.push (new this.DataType ().assign (value)));
		return this;
	};// assign;


	public get id_values (): IDValueList {

		let result: IDValueList = new IDValueList ().assign (this.map ((item: typeof this.DataType) => new IDValue ().assign ({
			id: item [this.IDField],
			value: item [this.TextField]
		})));

		return result;

	}// id_values;

	
}// TypedList;


