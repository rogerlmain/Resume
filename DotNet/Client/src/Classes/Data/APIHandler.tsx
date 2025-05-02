import APIClass from "Classes/Data/APIClass";
import { DateFormat } from "../Globals";


const host: string = "https://localhost:7006";


export default class APIHandler extends APIClass {

	private sanitized (model: any): any {

		let result: any = null;

		if (isset (model)) {

			if (Array.isArray (model)) model.forEach ((item: any) => {
				if (is_null (result)) result = new Array ();
				result.push (this.sanitized (item));
			});
		
			else if (Object.isObject (model)) model.Keys.forEach ((key: string) => {

				let add_item = (item: any) => {
					if (is_null (result)) result = new Object ();
					result [key] = item;
				}/* add_item */;
		
				if (is_null (model [key])) return;
				if (Date.isDate (model [key])) return add_item (model [key].format (DateFormat.database));
				if (Object.isFunction (model [key])) return add_item (model [key]);
				if (Object.isObject (model [key])) return add_item (this.sanitized (model [key]));
				add_item (model [key])
			});

			else result = model;

		}// if;

		return result;

	}// sanitized;


	public get_data<TModel> (command: string, parameters: any = null): Promise<TModel> {

		let data: any = Object.isObject (parameters) ? this.sanitized (parameters) : parameters;

		return new Promise<TModel> (resolve => this.fetch_data (command, data).then ((data: TModel) => {
			if (not_assigned (data)) return resolve (null);
			resolve (data);
		}));
	}// get_data;


	// For semantics - same as get_data
	public set_data = this.get_data;


	public constructor () {
		super (host);
	}// constructor;


}// APIHandler;