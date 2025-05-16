import { ChangeEvent, ReactElement } from "react";


export {};


namespace arrays {

	export class AnyArray extends Array<any> {}
	export class ReactElementList extends Array<ReactElement> {}

}// arrays;

Object.assign (globalThis, arrays);


declare global {

	namespace globalThis {

		export import AnyArray = arrays.AnyArray;
		export import ReactElementList = arrays.ReactElementList;

	}// globalThis;


	type ReactElementContainer = ReactElement | ReactElementList;

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type NumberString = string | number
	type FieldValue = string | number | Date

	type StringObject = string | Object

	type StringArray = Array<string>
	type StringObjectArray = Array<StringObject>

	type ChildElement = ReactElement | Array<ReactElement>

	type InputChangeEvent = ChangeEvent<HTMLInputElement>

	type MutationRecordList = Array<MutationRecord>

}// global;


