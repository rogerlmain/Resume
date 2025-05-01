import Optional from "Controls/Optional";

import { StringList } from "Classes/Globals";
import { Container } from "Controls/Container";
import { TechnologyModel, TechnologyModelList } from "Models/DataModels";

import { Component } from "react";


class CheckboxListProps {
	public items: TechnologyModelList;
}// CheckboxListProps;


class CheckboxListState {
	public selected_items: StringList = null;
}// CheckboxListState;


export default class CheckboxList extends Component<CheckboxListProps, CheckboxListState> {

	private toggle_selection (event: ClickEvent) {

		if (event.currentTarget.checked) {
			if (is_null (this.state.selected_items)) this.state.selected_items = new StringList ();
			if (this.state.selected_items.contains (event.currentTarget.id)) return;
			this.state.selected_items.push (event.currentTarget.id);
			return this.forceUpdate ();
		}// if;

		if (is_null (this.state.selected_items) || !this.state.selected_items.contains (event.currentTarget.id)) return;
		this.state.selected_items.remove (event.currentTarget.id);

	}// toggle_selection;


	/********/


	public state: CheckboxListState = new CheckboxListState ();


	public static defaultProps: CheckboxListProps = {
		items: null
	}// defaultProps;


	public render () {
		return <div className="full-width column-centered column-block">
			<div className="two-column-grid">
				{this.props.items.map ((item: TechnologyModel) => <Container>
					<input type="checkbox" id={item.id} onClick={this.toggle_selection.bind (this)} />
					<label htmlFor={item.id} className="left-aligned">{item.name}</label>
				</Container>)}
			</div>
		</div>
	}// render;

}// CheckboxList;