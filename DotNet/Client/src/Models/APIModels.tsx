import TypedArray from "Classes/Collections/TypedArray";

import { StringList } from "Classes/Globals";

import { IndexArray } from "Models/BaseModels";
import { Technology, TechnologyList } from "Models/ClientModels";
import { EmploymentModel, TechnologyModel } from "Models/DataModels";


export class TechnologyDetailsList extends TypedArray { public constructor () { super (TechnologyDetails) } }


export class TechnologyDetailsCatalog extends IndexArray<TechnologyList> {

	public static Parse (list: TechnologyDetailsList) {

		let result: TechnologyDetailsCatalog = null;

		list.forEach ((details: TechnologyDetails) => {

			if (is_null (result)) result = new TechnologyDetailsCatalog ();
			if (not_set (result [details.technology.category_id])) result [details.technology.category_id] = new TechnologyList ();

			result [details.technology.category_id].push (new Technology ().assign (details.technology).assign ({ included: details.included }));

		});

		return result;

	}// Parse;

}// TechnologyDetailsCatalog;


export class EmploymentAPIModel {
	public employment: EmploymentModel = null;
	public technologies: StringList = null;
}// EmploymentAPIModel;


export class TechnologyDetails {
	public technology: TechnologyModel = null;
	public included: boolean = null;
}// TechnologyDetails;


export class TechnologyAPIModel {
	public category_id: string = null;
	public employment_id: string = null;
}// TechnologyAPIModel;

