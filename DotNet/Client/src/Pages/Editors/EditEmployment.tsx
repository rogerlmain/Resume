import Database from "Classes/Data/Database";

import DateInput from "Controls/DateInput";
import SelectList from "Controls/SelectList";

import { DateFormat, StringList } from "Classes/Globals";

import { EmploymentData, EmploymentDetails, EmploymentType, TechnologyIndex, TechnologyDataList, TechnologyParameters } from "Models/APIModels";
import { IDValueList, IndexedList } from "Models/BaseModels";
import { EmploymentModel, LocationDetails } from "Models/DataModels";

import { ChangeEvent, Component, createRef, RefObject } from "react";


class EmploymentIndex extends IndexedList<EmploymentModel> {}


class EditEmploymentState {

	public company_list: IDValueList = null;

	public employment_id: string = null;
	public employment: EmploymentIndex = null;

	public editing: boolean = false;
	public saving: boolean = false;

	public countries: IDValueList = null;
	public states: IDValueList = null;
	public cities: IDValueList = null;

	public categories: IDValueList = null;
	public selected_category: string = null;

	public technologies: TechnologyIndex = null;

}// EditEmploymentState;


export default class EditEmployment extends Component<Object, EditEmploymentState> {

	private start_date: RefObject<DateInput> = createRef ();
	private end_date: RefObject<DateInput> = createRef ();


	private get active_employment (): EmploymentModel { return this.state.employment?.[this.state.employment_id] ?? null }
	private get technology_list (): TechnologyDataList { return this.state.technologies?.[this.state.selected_category] ?? null }
	//private get versions (): SelectionList { return this.state.active_technology?.versions }


	private get selected_technologies (): StringList {

		let result: StringList = null;

		//this.state.technologies.Keys.forEach ((key: string) => {
		//	let technology_list: TechnologyList = this.state.technologies [key];
		//	let selections: StringList = technology_list.filteredMap ((technology: Technology) => technology.included ? technology.id : null);
		//	if (is_null (selections)) return;
		//	if (is_null (result)) result = new StringList ();
		//	result.append (selections);
		//});

		return result;

	}// selected_technologies;


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
					states: details.states,
					cities: details.cities,
					employment: employment_data,
					editing: true
				});

			});

		});

	}// get_employment;


	private load_technology_list (category_id: string) {

		if (isset (this.selected_technologies)) return;

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
				technologies: this.selected_technologies
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
						<DateInput id="start_date" ref={this.start_date} onChange={this.set_date.bind (this)} value={this.get_date ("start_date")} />

						<label htmlFor="end_date">End date</label>
						<DateInput id="end_date" ref={this.end_date} onChange={this.set_date.bind (this)} value={this.get_date ("end_date")} />

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
								text_field="value" selected_item={this.state.selected_category}
								onChange={(event: SelectEvent) => {
									this.setState ({ selected_category: (event.currentTarget as HTMLSelectElement).value }, () => {
										this.load_technology_list (this.state.selected_category);
									});
								}}>
							</SelectList>
						</div>

						<div className="slightly-spaced-out row-block">
{/*
							{isset (this.state.technology_list) ? <CheckboxList items={this.state.technology_list}
								selected_items={this.state.technology_list?.filteredMap ((item: Technology) => item.included ? item.id : null)}
								onChange={(technology: Technology, checked: boolean) => technology.included = checked}>
							</CheckboxList> : <div className="full-width column-centered bold-text row-block">No technologies found</div>}

							<Optional condition={isset (this.versions)}>
								<CheckboxList items={this.versions}
									selected_items={this.versions?.filteredMap ((item: Selection) => item.included ? item.id : null )}
									onChange={(version: Selection, checked: boolean) => version.included = checked}>
								</CheckboxList>
							</Optional>
*/}
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