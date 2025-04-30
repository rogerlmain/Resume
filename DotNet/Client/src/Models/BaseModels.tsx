import TypedArray from "Classes/Collections/TypedArray";


/**** Types ****/


export type BaseModelArray = Array<IBaseModel>
export type IListModelArray = Array<IListModel>

export type DateType = Date | string;


/**** Interfaces ****/


export interface IBaseModel { id?: string }
export interface IListModel { key: string }


/**** Classes ****/


export abstract class IDModel implements IBaseModel {
	public id?: string = null;
}// IDModel;


export abstract class BaseModel implements IBaseModel {
	public id?: string = null;
}// BaseModel;


export class ListModel implements IListModel {
	public key: string = null;
}// ListModel;


export class IDValue<IModel = string> {

	public id: string = null;
	public value: IModel = null;

	public static create = (values): IDValue => is_assigned (values) ? new IDValue ().assign (values) : null;

}// IDModel;


/**** Lists ****/


export class IDValueList extends TypedArray {
	
	public static create = (values: AnyArray | Object = null): IDValueList => is_assigned (values) ? new IDValueList ().assign (values) : null;


	public constructor (values: AnyArray | Object = null) { super (IDValue, values) }
	
}// IDValueList



