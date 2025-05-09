import TypedArray from "Classes/Collections/TypedArray";

import { TechnologyDetailsList } from "Models/APIModels";
import { BaseModel, IDValueList } from "Models/BaseModels";


export class CategoryModelList extends TypedArray { public constructor () { super (CategoryModel) } }
export class EmploymentModelList extends TypedArray { public constructor () { super (EmploymentModel) } }
export class TechnologyModelList extends TypedArray { public constructor () { super (TechnologyModel) } }


export type EmploymentType = EmploymentDetails | EmploymentModelList;


export class CategoryModel extends BaseModel {
	public name: string = null;
}// CategoryModel;


export class EmploymentDetails {
	public employment: EmploymentModel = null;
	public countries: IDValueList = null;
	public states: IDValueList = null;
	public cities: IDValueList = null;
	public location: LocationDetails = null;
	public technologies: TechnologyDetailsList = null;
}// EmploymentDetails;


export class LocationDetails {
	public country_id: string = null;
	public state_id: string = null;
	public city_id: string = null;
}// LocationDetails;


export class EmploymentModel extends BaseModel {
    public company: string = null;
	public position: string = null;
	public location_id: string = null;
    public start_date: Date = null;
    public end_date: Date = null;
    public description: string = null;
	public line_length: number = null;
}// EmploymentModel;


export class TechnologyModel extends BaseModel {
	public category_id: string = null;
	public name: string = null;
}// TechnologyModel;