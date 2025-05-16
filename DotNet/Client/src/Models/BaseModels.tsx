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


export class ListModel implements IListModel {
	public key: string = null;
}// ListModel;


export class IDValue<IModel = string> {

	public id: string = null;
	public value: IModel = null;

	public static create = (values): IDValue => is_assigned (values) ? new IDValue ().assign (values) : null;

}// IDModel;


export class IndexedList<IModel = IDValueList> { [key: string]: IModel }


/**** Lists ****/


export class IDValueFieldList {
	public id_field?: string = null;
	public text_field?: string = null;
}// IDValueFieldList;


export class IDValueList extends TypedArray {

	public static assign (model: AnyArray, fields: IDValueFieldList) {

		let result: IDValueList = null;

		if (not_set (model)) return result;

		model.forEach ((item: any) => {

			if (is_null (result)) result = new IDValueList ();

			result.push (new IDValue ().assign ({
				id: item?.[fields?.id_field ?? "id"],
				value: item?.[fields?.text_field ?? "value"]
			}));

		});

		return result;

	}// assign;
	
	public static create = (values: AnyArray | Object = null): IDValueList => is_assigned (values) ? new IDValueList ().assign (values) : null;


	public constructor (values: AnyArray | Object = null) { super (IDValue, values) }
	
}// IDValueList



