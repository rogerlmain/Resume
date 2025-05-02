import TypedArray from "Classes/Collections/TypedArray";

import { TechnologyModel } from "Models/DataModels";


export class TechnologyList extends TypedArray { public constructor () { super (Technology) } }


export class Technology extends TechnologyModel {
	public name: string = null;
	public included: boolean = null;
}// Technology;