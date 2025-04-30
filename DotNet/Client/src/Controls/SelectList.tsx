import Eyecandy from "Controls/Windows/Eyecandy";

import { StringList } from "Classes/Globals";
import { IDValueList } from "Models/BaseModels";

import { Component, CSSProperties } from "react";


class SelectListProps {
	id: string;
	header?: string;
	items: IDValueList | StringList;

	selected_item?: any;
	text_field?: string;

	className?: string;
	style?: CSSProperties;

	disabled?: boolean;
	onChange?: ChangeFunction;

	isHidden?: (value: string) => boolean;
}// items;


class SelectListState {
	public value: any = null;
}// SelectListState;


export const SelectListDivider: string = ">>>><<<<";


export default class SelectList extends Component<SelectListProps, SelectListState> {

	private get value (): string {
		let id_list: StringList = this.props.items?.map ((item: any | string) => String.isString (item) ? item : item.id) as StringList;
		return (id_list?.contains (this.props.selected_item, false) ?? false) ? this.props.selected_item : String.Empty;
	}// value;


	private get width (): CSSProperties { 
		let response: CSSProperties = this.props.style ?? {};
		if (not_set (this.props.items)) response.minWidth = "5rem";
		response.flexGrow = 1;
		return response;
	}// width;


	/********/


	public static defaultProps: SelectListProps = {
		id: null,
		header: String.Empty,
		items: null,
		selected_item: null,
		text_field: "value",
		disabled: false,
		isHidden: null,
		onChange: null,
	}// defaultProps;


	public state: SelectListState = new SelectListState ();


	public render () {

		let select_list: SelectList = this;
		let key_index: number = 0;

		if (is_null (this.props.items) && !this.props.disabled) return <Eyecandy text="Loading..." />

		return <select name={this.props.id} className={this.props.className} style={this.width}
			
			value={this.value} disabled={this.props.disabled}

			onChange={(event: SelectEvent) => {
				if (isset (select_list.props.onChange)) select_list.props.onChange (event);
				this.setState ({ value: event.currentTarget.value})
			}}>

			<option key="header" value={this.props.header} disabled />

			{this.props.items?.map ((item: any) => {

				let key: string = String.isString (item) ? item.underscored : (item.hasOwnProperty ("id") ? item.id : JSON.stringify (item).underscored);
				let id: string = item.hasOwnProperty ("id") ? item.id : null;
				let value: string = item.hasOwnProperty (this.props.text_field) ? item [this.props.text_field] : JSON.stringify (item).underscored;

				if (value == SelectListDivider) return <hr key={`divider_${key_index++}`} />
				return <option key={key} value={id} hidden={isset (this.props.isHidden) ? this.props.isHidden (value) : false}>{value}</option>

			})}

		</select>

	}// render;

}// SelectList;