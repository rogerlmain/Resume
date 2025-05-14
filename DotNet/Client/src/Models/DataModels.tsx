import TypedArray from "Classes/Collections/TypedArray";

import { IDModel, IndexedList } from "Models/BaseModels";


export class EmploymentModelList extends TypedArray { public constructor () { super (EmploymentModel) } }


export class LocationDetails {
	public country_id: string = null;
	public state_id: string = null;
	public city_id: string = null;
}// LocationDetails;


export class EmploymentModel extends IDModel {
    public company: string = null;
	public position: string = null;
	public location: LocationDetails = null;
    public start_date: Date = null;
    public end_date: Date = null;
    public description: string = null;
}// EmploymentModel;
