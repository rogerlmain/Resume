import Container from "Controls/Container";

import { StringList } from "Classes/Globals";

import { Component, createRef, RefObject } from "react";


class CheckboxListProps {
	public items: AnyArray;
	public id_field?: string;
	public text_field?: string | Function;
	public highlightable?: boolean;
	public onChange: (item: any, checked: boolean) => void;
	public onHighlight?: (id: string, highlighted: boolean) => void;
	public selected_items: StringList;
}// CheckboxListProps;


class CheckboxListState {
	public highlighted_item: string = null;
}// CheckboxListState;


export default class CheckboxList extends Component<CheckboxListProps, CheckboxListState> {

	public state: CheckboxListState = new CheckboxListState ();


	public static defaultProps: CheckboxListProps = {
		items: null,
		id_field: "id",
		text_field: "name",
		highlightable: false,
		onChange: null,
		onHighlight: null,
		selected_items: null
	}// defaultProps;


	public highlight_item (id: string, checked: boolean = null) {

		let onHighlight: Callback = () => { if (isset (this.props.onHighlight)) this.props.onHighlight (id, isset (this.state.highlighted_item)) }

		if (isset (checked)) return this.setState ({ highlighted_item: (checked ? id : null) }, onHighlight);
		this.toggleState ({ highlighted_item: id }, onHighlight);

	}// highlight_item;


	public render () {
		return <div className="full-width column-centered column-block">
			<div className="two-column-grid">
				{this.props.items.map ((item: any) => {

					let id: string = item [this.props.id_field];
					
					return <Container>

						<input type="checkbox" id={id} checked={this.props.selected_items?.contains (id)}
							onClick={(event: InputClickEvent) => {
								event.preventDefault ();
								if (isset (this.props.onChange)) this.props.onChange (item, event.currentTarget.checked);
								this.forceUpdate ();
							}}>
						</input>

						<label htmlFor={this.props.highlightable ? null : id} className="left-aligned"

							style={{ cursor: "pointer" }.assign ((this.state.highlighted_item == id) ? { border: "solid 1px var(--checkbox-highlight" } : null)}

							onClick={() => {

								let checkbox: HTMLInputElement = document.getElementById (id) as HTMLInputElement;

								if ((this.state.highlighted_item != id) && (!checkbox.checked)) this.props.onChange (item, true);
								this.highlight_item (id, (this.state.highlighted_item == id) ? null : true);

							}}>

							{(String.isString (this.props.text_field) ? item [this.props.text_field as string] : (this.props.text_field as Function) (item))}

						</label>

					</Container>

				})}
			</div>
		</div>
	}// render;

}// CheckboxList;