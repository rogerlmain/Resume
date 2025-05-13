import { IDValue, IDValueList } from "Models/BaseModels";
import { ChangeEvent, Component, KeyboardEvent, ReactElement, RefObject, createRef } from "react";


class DropdownEditboxProps {
	public id?: string;
	public data?: IDValueList;
	public selected_item?: string;
	public disabled?: boolean;
	public autoEdit?: boolean;
	public onChange?: (value: IDValue) => void;
	public onEditComplete?: (value: IDValue) => void | Promise<void>;
}// DropdownEditboxProps;


class DropdownEditboxState {
	public editing: boolean = false;
	public value: IDValue = null;
}// DropdownEditboxState;


export default class DropdownEditbox extends Component<DropdownEditboxProps, DropdownEditboxState> {

	private text_input_reference: RefObject<HTMLInputElement> = createRef ();
	private select_list_reference: RefObject<HTMLSelectElement> = createRef ();

	private get text_input (): HTMLInputElement { return this.text_input_reference.current }
	private get select_list (): HTMLSelectElement { return this.select_list_reference.current }


	private get select_options (): ReactElementList {

		let result: ReactElementList = new Array<ReactElement> ();

		result.push (<option />);
		if (is_null (this.props.data)) return null;

		this.props.data.forEach ((item: IDValue) => {
			result.push (<option value={item.id}>{item.value}</option>);
		});

		return result;

	}// select_options;


	private change_selection (event: ChangeEvent<HTMLSelectElement>) {
		this.setState ({ value: this.props.data.find ((item: IDValue) => item.id == event.target.value) ?? null}, () => {
			if (is_null (this.state.value)) return this.edit_value ();
			if (isset (this.props.onChange)) this.props.onChange (this.state.value);
		});
	}// change_selection;


	private edit_value () {
		this.setState ({ editing: true }, () => {
			this.text_input.value = this.state.value?.value ?? String.Empty;
			this.text_input.focus ()
		});
	}// edit_value;


	private save_value () {
		if (this.state.editing) this.setState ({ editing: false }, async () => {

			if (is_empty (this.text_input.value)) return;
			if (not_set (this.state.value)) this.state.value = new IDValue ();

			this.state.value.value = this.text_input.value;

			if (isset (this.props.onEditComplete)) this.props.onEditComplete (this.state.value);
			this.select_list.focus ();

		});
	}// save_value;


	private select_value (event: KeyboardEvent<HTMLInputElement>) {
		if (event.key == "Escape") this.setState ({ editing: false }, () => this.text_input.value = String.Empty);
		if (["Enter", "Tab"].contains (event.key)) this.save_value ();
	}// select_value;


	/********/


	public static defaultProps: DropdownEditboxProps = {
		id: null,
		data: null,
		selected_item: null,
		disabled: false,
		autoEdit: true,
		onChange: null,
		onEditComplete: null,
	}// DropdownEditboxState;


	public state: DropdownEditboxState = new DropdownEditboxState ();


	public componentDidUpdate (props: DropdownEditboxProps) {
		if ((props?.data != this.props.data) && (this.props.autoEdit)) this.setState ({ editing: not_null (this.props.data) && is_empty (this.props.data) }, () => this.text_input.focus ());
		if ((props?.selected_item ?? null) != this.props.selected_item) this.state.value = this.props.data?.find ((item: IDValue) => item.id == this.props.selected_item) ?? null;
	}// constructor;


	public componentDidMount = () => this.componentDidUpdate (null);


	public render () {
		return <div id={this.props.id} className="stacked fill-width">

			<select style={{ visibility: (this.state.editing && !this.props.disabled ? "hidden" : null), backgroundColor: "#FEE" }} 
				ref={this.select_list_reference} disabled={this.props.disabled} onChange={this.change_selection.bind (this)}
				onDoubleClick={this.edit_value.bind (this)} value={this.state.value?.id ?? null}>
				{this.select_options}
			</select>

			<input type="text" style={{ visibility: (this.state.editing && !this.props.disabled ? null : "hidden"), backgroundColor: "#EFE" }} 
				ref={this.text_input_reference} onKeyDown={this.select_value.bind (this)}
				onDoubleClick={() => this.setState ({ editing: false })}
				onBlur={this.save_value.bind (this)}>
			</input>

		</div>
	}// render;

}// DropdownEditbox;