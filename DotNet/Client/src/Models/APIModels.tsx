import TypedArray from "Classes/Collections/TypedArray";

import { StringList } from "Classes/Globals";

import { IDModel, IDValueList, IndexedList } from "Models/BaseModels";
import { EmploymentModel, EmploymentModelList, LocationDetails } from "Models/DataModels";


export type EmploymentType = EmploymentDetails | EmploymentModelList;


export class TechnologyDataList extends TypedArray { public constructor () { super (TechnologyData) } }
export class VersionDataList extends TypedArray { public constructor () { super (VersionData) } }
export class TechnologySelectionList extends TypedArray { public constructor () { super (TechnologySelection) } }


export class TechnologyIndex extends IndexedList<TechnologyDataList> {}
export class TechnologySelectionIndex extends IndexedList<TechnologySelectionList> {}


export class EmploymentData {
	public employment: EmploymentModel = null;
	public technologies: StringList = null;
}// EmploymentData;


export class EmploymentDetails {
	public employment: EmploymentModel = null;
	public states: IDValueList = null;
	public cities: IDValueList = null;
	public location: LocationDetails = null;
	public technologies: TechnologySelectionIndex = null;
}// EmploymentDetails;


export class TechnologyData extends IDModel {
	public name: string = null;
	public versions: VersionDataList = null;
}// TechnologyData;


export class VersionData extends IDModel {
	public version: string = null;
}// VersionData;


export class TechnologySelection {
	public technology_id: string = null;
	public versions: StringList = null;
}// TechnologySelection;


export class TechnologyParameters {
	public employment_id: string = null;
	public technology_id: string = null;
	public value: boolean = false;
}// TechnologyParameters;