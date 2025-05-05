import Container from "Controls/Container";

import { StringList } from "Classes/Globals";

import { Component } from "react";


type CheckboxChangeEvent = (item: any, checked: boolean) => void;


class CheckboxListProps {
	public items: AnyArray;
	public id_field?: string;
	public text_field?: string;
	public onChange: CheckboxChangeEvent;
	public selected_items: StringList;
}// CheckboxListProps;


class CheckboxListState {
	public selected_items: StringList = null;
}// CheckboxListState;


export default class CheckboxList extends Component<CheckboxListProps, CheckboxListState> {

	private toggle_selection (target: HTMLInputElement) {

		if (target.checked) {
			if (is_null (this.state.selected_items)) this.state.selected_items = new StringList ();
			if (this.state.selected_items.contains (target.id)) return;
			this.state.selected_items.push (target.id);
			return this.forceUpdate ();
		}// if;

		if (is_null (this.state.selected_items) || !this.state.selected_items.contains (target.id)) return;
		this.state.selected_items.remove (target.id);

	}// toggle_selection;


	/********/


	public state: CheckboxListState = new CheckboxListState ();


	public static defaultProps: CheckboxListProps = {
		items: null,
		id_field: "id",
		text_field: "name",
		onChange: null,
		selected_items: null
	}// defaultProps;


	public render () {
		return <div className="full-width column-centered column-block">
			<div className="two-column-grid">
				{this.props.items.map ((item: any) => {

					let id: string = item [this.props.id_field];
					
					return <Container>

						<input type="checkbox" id={id} checked={this.state.selected_items?.contains (id)}
							onClick={(event: ClickEvent) => {
								this.toggle_selection (event.currentTarget);
								if (isset (this.props.onChange)) this.props.onChange (item, event.currentTarget.checked);
								this.forceUpdate ();
							}}>
						</input>

						<label htmlFor={id} className="left-aligned">{item [this.props.text_field]}</label>

					</Container>

				})}
			</div>
		</div>
	}// render;


	public constructor (props: CheckboxListProps) {
		super (props);
		this.state.selected_items = props.selected_items;
	}// constructor;

}// CheckboxList;