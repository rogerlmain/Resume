import ErrorWindow from "Controls/Windows/ErrorWindow";


const server_url = "https://localhost:7006";


export default abstract class APIClass {


	private static fetch = (url: RequestInfo, body: any = null): any => new Promise (resolve => {

		let parameters = {
			method: is_null (body) ? "get" : "post",
			headers: { "content-type": "application/json" }
		};

		if (not_null (body)) {
			if (body instanceof FormData) body = Object.fromEntries (body);
			parameters ["body"] = JSON.stringify (body);
		}// if;

		fetch (url, parameters).then (response => {
			try {
				if (response.ok) return response.json ();
				throw "Bad request";
			} catch (except: any) {
				return { error: except.message };
			}// try;
		}).then (response => {
			if (is_null (response)) return resolve (null);
			if (isset (response ["error"])) return popup_window.show (<ErrorWindow text={response ["error"]} />);
			resolve (response);
		}).catch (() => {
			setTimeout (() => resolve (this.fetch (url, body)), 1000);
		});

	});


	/********/


	public static fetch_data = (url: string, body: any = null): Promise<any> => this.fetch (`${server_url}/${url}`, body);


}// APIClass;