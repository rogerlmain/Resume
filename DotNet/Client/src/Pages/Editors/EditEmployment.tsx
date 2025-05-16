import Database from "Classes/Data/Database";

import DateInput from "Controls/DateInput";
import SelectList from "Controls/SelectList";
import Optional from "Controls/Optional";
import CheckboxList from "Controls/CheckboxList";

import { DateFormat, StringList } from "Classes/Globals";

import { EmploymentData, EmploymentDetails, EmploymentType, TechnologyIndex, TechnologyDataList, TechnologySelectionIndex, TechnologySelection, TechnologyParameters, TechnologyData, VersionDataList, VersionData, TechnologySelectionList, VersionParameters } from "Models/APIModels";
import { IDValue, IDValueList, IndexedList } from "Models/BaseModels";
import { EmploymentModel, LocationDetails } from "Models/DataModels";

import { ChangeEvent, Component, createRef, RefObject } from "react";


class EmploymentIndex extends IndexedList<EmploymentModel> {}


class EditEmploymentState {

	public company_list: IDValueList = null;

	public employment: EmploymentIndex = null;
	public employment_id: string = null;

	public editing: boolean = false;
	public saving: boolean = false;

	public countries: IDValueList = null;
	public states: IDValueList = null;
	public cities: IDValueList = null;

	public categories: IDValueList = null;
	public category_id: string = null;

	public technologies: TechnologyIndex = null;
	public technology_id: string = null;

	public selected_technologies: TechnologySelectionIndex = null;

//	public technology_versions: VersionDataList = null;

}// EditEmploymentState;


export default class EditEmployment extends Component<Object, EditEmploymentState> {

	private technology_checkbox_list_reference: RefObject<CheckboxList> = createRef ();


	private get technology_checkbox_list (): CheckboxList { return this.technology_checkbox_list_reference.current }
	private get active_employment (): EmploymentModel { return this.state.employment?.[this.state.employment_id] ?? null }
	private get technology_list (): TechnologyDataList { return this.state.technologies?.[this.state.category_id] ?? null }
	private get technology_versions (): VersionDataList { return this.active_technology?.versions ?? null }


	private get active_technology (): TechnologyData { 
		return this.technology_list?.find ((technology: TechnologyData) => technology.id == this.state.technology_id) ?? null;
	}// active_technology;


	private get selected_technology_ids (): StringList { 
		return this.state.selected_technologies?.[this.state.category_id]?.map ((item: TechnologySelection) => item.technology_id) ?? null;
	}// selected_technology_ids;


	private get selected_versions (): StringList {
		return this.selected_technologies?.find ((item: TechnologySelection) => item.technology_id == this.state.technology_id)?.versions ?? null;
	}// selected_versions;


	private get selected_technologies (): TechnologySelectionList { return this.state.selected_technologies?.[this.state.category_id] ?? null }
	private set selected_technologies (value: TechnologySelectionList) { this.state.selected_technologies [this.state.category_id] = value }


	private get selected_technology (): TechnologySelection { 
		return this.selected_technologies?.find ((technology: TechnologySelection) => technology.technology_id == this.state.technology_id) ?? null;
	}// selected_technology;


	private get_date = (date_field: string) => this.active_employment?.[date_field]?.format (DateFormat.database) ?? String.Empty;


	private get_employment (event: ChangeEvent) {

		let employment_id: string = (event.currentTarget as HTMLSelectElement).value;

		this.setState ({ employment_id }, () => {

			if (isset (this.active_employment)) return;

			Database.get_employment (employment_id).then ((response: EmploymentType) => {

				let details: EmploymentDetails = (response as EmploymentDetails);
				let employment_data: EmploymentIndex = (isset (this.state.employment) ? this.state.employment : new EmploymentIndex ());

				employment_data [employment_id] = new EmploymentModel ().assign (details.employment).assign ({
					location: new LocationDetails ().assign (details.location),
					start_date: new Date (details.employment.start_date),
					end_date: new Date (details.employment.end_date)
				});

				this.setState ({
					employment: employment_data,
					states: details.states,
					cities: details.cities,
					selected_technologies: details.technologies,
					editing: true
				});

			});

		});

	}// get_employment;


	private load_technology_list (category_id: string) {

		if (isset (this.technology_list)) return;

		Database.get_technologies (category_id).then ((technology: TechnologyDataList) => {
			if (is_null (this.state.technologies)) this.state.technologies = new TechnologyIndex ();
			this.state.technologies [category_id] = new TechnologyDataList ().assign (technology);
			this.forceUpdate ();
		});

	}// load_technology_list;


	private save_employment () {
		this.setState ({ saving: true }, () => {

			let employment_data = new EmploymentData ().assign ({
				employment: this.active_employment,
				technologies: this.selected_technology_ids
			});

			Database.save_employment (employment_data).then ((result: string) => {
				if (is_null (this.active_employment?.id)) {
					this.active_employment.id = result;
					this.state.saving = false;
				}// if;
			});

		});
	}// save_employment;


	private select_country (event: ChangeEvent) {

		let value: string = (event.currentTarget as HTMLSelectElement).value;

		this.active_employment.location.country_id = value;

		Database.get_states ((event.currentTarget as HTMLSelectElement).value).then ((response: IDValueList) => {
			this.setState ({ states: new IDValueList ().assign (response) });
		});

	}// select_country;


	private select_state (event: ChangeEvent) {

		let value: string = (event.currentTarget as HTMLSelectElement).value;

		this.active_employment.location.state_id = value;

		Database.get_cities ((event.currentTarget as HTMLSelectElement).value).then ((response: IDValueList) => {
			this.setState ({ cities: new IDValueList ().assign (response) });
		});

	}// select_state;


	private select_city (event: ChangeEvent) {
		let value = (event.currentTarget as HTMLSelectElement).value;
		this.active_employment.location.city_id = value;
	}// select_city;


	private set_date (event: ChangeEvent) {
		let target: HTMLInputElement = event.currentTarget as HTMLInputElement;
		this.active_employment [target.id] = new Date (target.value);
	}// set_date;


	//private show_versions (technology_id: string, highlighted: boolean) {
	//	this.setState ({ technology_id: (highlighted ? technology_id : null) }, () => {
	//		this.setState ({ technology_versions: this.active_technology?.versions ?? null });
	//	});
	//}// show_versions;


	private update_technology (item: IDValue, checked: boolean) {

		let parameters: TechnologyParameters = {
			employment_id: this.state.employment_id,
			technology_id: item.id,
			value: checked
		}// parameters;

		Database.set_technology (parameters).then (() => {

			this.technology_checkbox_list.highlight_item (item.id, checked);

			if (checked) {

				if (is_null (this.state.selected_technologies)) this.state.selected_technologies = new TechnologySelectionIndex ();
				if (is_null (this.selected_technologies)) this.selected_technologies = new TechnologySelectionList ();

				this.selected_technologies.push (new TechnologySelection ().assign ({
					technology_id: item.id,
					versions:  null
				}));

				return this.forceUpdate ();

			}// if;

			this.selected_technologies.remove (this.selected_technologies.find ((technology: TechnologySelection) => technology.technology_id == item.id));
			if (is_empty (this.selected_technologies)) delete this.state.selected_technologies [this.state.category_id];
			if (is_empty (this.state.selected_technologies)) this.state.selected_technologies = null;
			this.forceUpdate ();

		});

	}// update_technology;


	public update_version (item: IDValue, checked: boolean) {

		let parameters = new VersionParameters ().assign ({
			employment_id: this.state.employment_id,
			technology_id: this.state.technology_id,
			version_id: item.id,
			value: checked,
		});

		Database.set_version (parameters).then (() => {

			if (checked) {
				if (is_null (this.selected_technology.versions)) this.selected_technology.versions = new StringList ();
				if (this.selected_technology.versions.contains (item.id)) return;
				this.selected_technology.versions.push (item.id);
			} else {
				this.selected_technology?.versions?.remove (item.id);
				if (is_empty (this.selected_technology.versions)) this.selected_technology.versions = null;
			}// if;

			this.forceUpdate ();

		});

	}// update_version;


	/********/


	public state: EditEmploymentState = new EditEmploymentState ();


	public render () {
		return <div className="full-page column-centered column-block with-lotsa-headspace">

			<div className="title">Employment Editor</div>

			<div className="three-column-grid">

				<label htmlFor="company_list">Company</label>
				<SelectList id="company_list" items={this.state.company_list} selected_item={this.state.employment_id} 
					disabled={is_null (this.state.company_list)} onChange={this.get_employment.bind (this)}>
				</SelectList>

				<div className="slightly-spaced-out row-block">

					<button onClick={() => this.setState ({ editing: true })} className={isset (this.state.employment_id) ? null : "hidden"}>Delete</button>

					<button onClick={() => this.setState ({ 
						employment_id: null,
						states: null,
						cities: null,
						editing: true
					})}>New</button>

				</div>

			</div>

			<div className={`${this.state.editing ? String.Empty : "hidden"} column-block`}>

				<div className="spaced-out row-block with-lotsa-headspace">

					<div className="four-column-grid">

						<input type="hidden" value={this.state.employment_id} />

						<label htmlFor="company">Company</label>
						<input type="text" id="company" className="three-column-span" 
							defaultValue={this.active_employment?.company}
							onChange={(event: ChangeEvent) => this.active_employment.company = (event.currentTarget as HTMLInputElement).value}>
						</input>

						<label htmlFor="position">Position</label>
						<input type="text" id="position" className="three-column-span"
							defaultValue={this.active_employment?.position}
							onChange={(event: ChangeEvent) => this.active_employment.position = (event.currentTarget as HTMLInputElement).value}>
						</input>

						<label htmlFor="location">Location</label>
						<div className="slightly-spaced-out three-column-span row-block">

							<SelectList items={this.state.countries} selected_item={this.active_employment?.location?.country_id} 
								disabled={is_null (this.state.countries)} onChange={this.select_country.bind (this)}>
							</SelectList>

							<SelectList items={this.state.states} selected_item={this.active_employment?.location?.state_id} 
								disabled={is_null (this.state.states)} onChange={this.select_state.bind (this)}>
							</SelectList>

							<SelectList items={this.state.cities} selected_item={this.active_employment?.location?.city_id} 
								disabled={is_null (this.state.cities)} onChange={this.select_city.bind (this)}>
							</SelectList>

						</div>

						<label htmlFor="start_date">Start date</label>
						<DateInput id="start_date" onChange={this.set_date.bind (this)} value={this.get_date ("start_date")} />

						<label htmlFor="end_date">End date</label>
						<DateInput id="end_date" onChange={this.set_date.bind (this)} value={this.get_date ("end_date")} />

						<label htmlFor="description" className="full-width left-aligned four-column-span row-block with-headspace">Description</label>

						<textarea id="description" className="four-column-span" value={this.active_employment?.description ?? String.Empty}
							onChange={(event: ChangeEvent) => this.active_employment.description = (event.currentTarget as HTMLInputElement).value}>
						</textarea>

					</div>

					<div className="vertical-divider" />

					<div className="top-aligned spaced-out column-block">

						<label>Add technologies</label>
						<div className="flex-block">
							<SelectList items={this.state.categories} disabled={is_null (this.state.categories)} 
								text_field="value" selected_item={this.state.category_id}
								onChange={(event: SelectEvent) => {
									this.setState ({ category_id: (event.currentTarget as HTMLSelectElement).value }, () => {
										this.load_technology_list (this.state.category_id);
									});
								}}>
							</SelectList>
						</div>

						<div className="slightly-spaced-out row-block">

							{isset (this.technology_list) ? <CheckboxList items={this.technology_list} 

								ref={this.technology_checkbox_list_reference}
								selected_items={this.selected_technology_ids} highlightable={true}
								onChange={this.update_technology.bind (this)}

								onHighlight={(technology_id: string, highlighted: boolean) => {
									this.setState ({ technology_id: (highlighted ? technology_id : null) })
								}}>{/*this.show_versions.bind (this)}>*/}

							</CheckboxList> : <div className="full-width column-centered bold-text row-block">No technologies found</div>}

							<Optional condition={isset (this.technology_versions)}>
								<CheckboxList items={this.technology_versions} 
									text_field={(item: VersionData) => `${item.version}${isset (item.release_date) ? `(${item.release_date})` : String.Empty}`}
									selected_items={this.selected_versions} onChange={this.update_version.bind (this)}>
								</CheckboxList>
							</Optional>

						</div>

					</div>

				</div>

				<div className="full-width right-aligned row-block with-some-headspace">
					{/*{this.state.saving ? <Eyecandy text="Saving..." /> : */}<button onClick={this.save_employment.bind (this)}>Save</button>{/*}*/}
				</div>

			</div>

		</div>
	}// render;


	public constructor (props: Object) {

		super (props);

		Database.get_companies ().then ((response: IDValueList) => this.setState ({ company_list: new IDValueList ().assign (response) }));
		Database.get_countries ().then ((response: IDValueList) => this.setState ({ countries: new IDValueList ().assign (response) }));
		Database.get_categories ().then ((response: IDValueList) => this.setState ({ categories: new IDValueList ().assign (response) }));

	}// constructor;

}// EditEmployment;