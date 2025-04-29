import { ChangeEvent, ReactElement } from "react";

export { };


declare global {

	type FormField = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
	type FormFieldList = NodeListOf<FormField>

	type FieldValue = string | number | Date

	type StringObject = string | Object

	type StringArray = Array<string>
	type StringObjectArray = Array<StringObject>

	type ChildElement = ReactElement | Array<ReactElement>

	type InputChangeEvent = ChangeEvent<HTMLInputElement>

	type MutationRecordList = Array<MutationRecord>

}// global;

