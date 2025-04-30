import APIClass from "Classes/Data/APIClass";


const host: string = "https://localhost:7006";


export default class APIHandler extends APIClass {

	public get_data<TModel> (command: string, parameters: any = null): Promise<TModel> {
		return new Promise<TModel> (resolve => this.fetch_data (command, parameters).then ((data: TModel) => {
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