import Database from "Classes/Data/Database";
import Eyecandy from "Controls/Windows/Eyecandy";
import SelectList from "Controls/SelectList";

import { CategoryModelList, TechnologyModel, TechnologyModelList } from "Models/DataModels";

import { ChangeEvent, Component } from "react";


class EditTechnologiesState {
	public active_technology: TechnologyModel = null;
	public categories: CategoryModelList = null;
	public technologies: TechnologyModelList = null;
	public editing: boolean = false;
	public saving: boolean = false;
}// EditTechnologiesState;


export default class EditTechnologies extends Component<Object, EditTechnologiesState> {

	private save_technology () {
		this.setState ({ saving: true }, () => Database.save_technology (this.state.active_technology).then ((response: string) => {
			if (is_null (this.state.active_technology.id)) {
				this.state.active_technology.id = response;
				this.state.technologies.insert (this.state.active_technology, "name");
				this.state.saving = false;
				this.forceUpdate ();
			}// if;
		}));
	}// save_technology;


	/********/


	public state: EditTechnologiesState = new EditTechnologiesState ();


	public render () {
		return <div className="full-page column-centered column-block with-headspace">

			<div className="title">Technology Editor</div>

			<div className="three-column-grid">

				<label htmlFor="technology_list">Technology</label>
				<SelectList id="technology_list" items={this.state.technologies} disabled={is_null (this.state.technologies)}
					selected_item={this.state.active_technology?.id} text_field="name"
					onChange={(event: SelectEvent) => this.setState ({ active_technology: this.state.technologies.find ((item: TechnologyModel) => item.id == event.currentTarget.value ) }) }>
				</SelectList>

				<div className="slightly-spaced-out row-block">

					<button onClick={() => this.setState ({ editing: true })} className={isset (this.state.active_technology?.id) ? null : "hidden"}>Delete</button>

					<button onClick={() => this.setState ({ 
						active_technology: null,
						editing: true
					})}>New</button>

				</div>

			</div>

			<div id="edit_form" className={`${this.state.editing ? String.Empty : "hidden"} slightly-spaced-out row-block with-lotsa-headspace`}>

				<input type="hidden" value={this.state.active_technology?.id} />

				<div className="row-block">
					<label htmlFor="category_list">Category</label>
					<SelectList id="category_list" items={this.state.categories} disabled={is_null (this.state.categories)}
						selected_item={this.state.active_technology?.category_id} text_field="name"
						onChange={(event: SelectEvent) => {
							if (is_null (this.state.active_technology)) this.state.active_technology = new TechnologyModel ();
							this.state.active_technology.category_id = (event.currentTarget as HTMLSelectElement).value;
							this.forceUpdate ();
						} }>
					</SelectList>
				</div>

				<input type="text" defaultValue={this.state.active_technology?.name} onChange={(event: ChangeEvent) => {
					if (is_null (this.state.active_technology)) this.state.active_technology = new TechnologyModel ();
					this.state.active_technology.name = (event.currentTarget as HTMLInputElement).value;
				}} />

				{this.state.saving ? <Eyecandy text="Saving..." /> : <button onClick={this.save_technology.bind (this)}>Save</button>}

			</div>

		</div>
	}// render;


	public constructor (props: Object) {

		super (props);

		Database.get_technologies ().then ((response: TechnologyModelList) => {

			this.state.technologies = null;

			response.forEach (response => {
				if (is_null (this.state.technologies)) this.state.technologies = new TechnologyModelList ();
				this.state.technologies.push (new TechnologyModel ().assign (response));
			});

			this.forceUpdate ();

		});

		Database.get_categories ().then ((response: CategoryModelList) => this.setState ({ categories: new CategoryModelList ().assign (response.sortby ("name"))}));

	}// constructor;

}// EditTechnologies;