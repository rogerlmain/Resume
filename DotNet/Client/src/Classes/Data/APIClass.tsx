import ErrorWindow from "Controls/Windows/ErrorWindow";
import InformationWindow from "Controls/Windows/InformationWindow";


export default abstract class APIClass {

	private base_url: string = null;


	/********/


	private fetch (url: RequestInfo, parameters: RequestInit, body: any = null): Promise<any> {
		return new Promise (resolve => {

			if (body instanceof FormData) body = Object.fromEntries (body);
			if (isset (body)) parameters ["body"] = JSON.stringify (body);

			fetch (url, parameters).then (response => {
				try {
					if (response.ok) return response.json ();
					throw "Bad request";
				} catch (except: any) {
					return { error: except.message };
				}// try;
			}).then (response => {

				if (is_null (response)) return resolve (null);

				if (isset (response ["error"])) {

					let error_message: string = response ["error"];

					if (isset (response ["exception"])) error_message = `${error_message}<br /><br />${response ["exception"]}`;
					popup_window.show (<ErrorWindow text={error_message} />);
					return resolve ("Error");

				}// if;

				if (isset (response ["message"])) {
					popup_window.show (<InformationWindow text={response ["message"]} />);
					return resolve (null);
				}// if;

				resolve (response);

			}).catch ((except) => {
				if (except == false) return resolve (false);
				console.log (except);
				setTimeout (() => resolve (this.fetch (url, parameters, body)), 1000);
			});

		});
	}// fetch;


	/********/


	public fetch_data (url: string, body: any = null): Promise<any> {

		const parameters: RequestInit = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		return this.fetch (`${this.base_url}/${url}`, parameters, body);

	}// fetch_data;


	public save_data (url: string, body: any = null) {
		return this.fetch_data (url, body);
	}// save_data;
	

	public async send_data (url: string, body: FormData) {

		const parameters: RequestInit = {
			method: "post",
			headers: { "content-type": "multipart/form-data" },
		}// parameters;

		return this.fetch (url, parameters, body);

	}// send_data;


	constructor (base_url: string) {
		this.base_url = base_url;
	}// constructor;


}// APIClass;