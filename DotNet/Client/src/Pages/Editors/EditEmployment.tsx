import Database from "Classes/Data/Database";

import CheckboxList from "Controls/CheckboxList";
import DateInput from "Controls/DateInput";
import Optional from "Controls/Optional";
import SelectList from "Controls/SelectList";

import { DateFormat, StringList } from "Classes/Globals";

import { EmploymentAPIModel, TechnologyDetailsCatalog } from "Models/APIModels";
import { IDValue, IDValueList } from "Models/BaseModels";
import { Technology, TechnologyList } from "Models/ClientModels";
import { CategoryModelList, EmploymentDetails, EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { ChangeEvent, Component, createRef, RefObject } from "react";


class EditEmploymentState {

	public active_employment: EmploymentModel = null;
	public employment: EmploymentModelList = null;

	public editing: boolean = false;
	public saving: boolean = false;

	public countries: IDValueList = null;
	public selected_country: IDValue = null;

	public states: IDValueList = null;
	public selected_state: IDValue = null;

	public cities: IDValueList = null;
	public selected_city: IDValue = null;

	public categories: CategoryModelList = null;
	public technologies: TechnologyDetailsCatalog = null;
	public active_technologies: TechnologyList = null;

}// EditEmploymentState;


export default class EditEmployment extends Component<Object, EditEmploymentState> {

	private start_date: RefObject<DateInput> = createRef ();
	private end_date: RefObject<DateInput> = createRef ();


	private get selected_technologies (): StringList {

		let result: StringList = null;

		this.state.technologies.Keys.forEach ((key: string) => {
			let technology_list: TechnologyList = this.state.technologies [key];
			let selections: StringList = technology_list.filteredMap ((technology: Technology) => technology.included ? technology.id : null);
			if (is_null (selections)) return;
			if (is_null (result)) result = new StringList ();
			result.append (selections);
		});

		return result;

	}// selected_technologies;


	private get_date = (date_field: string) => this.state.active_employment?.[date_field]?.format (DateFormat.database) ?? String.Empty;


	private update_date (event: ChangeEvent) {
		let target: HTMLInputElement = event.currentTarget as HTMLInputElement;
		this.set_employment_property (target.id, new Date (target.value));
	}// update_date;


	private get_employment (event: ChangeEvent) {

		let value: string = (event.currentTarget as HTMLSelectElement).value;

		Database.get_employment (value).then ((response: EmploymentDetails) => {

			this.state.assign ({
				countries: response.countries,
				states: response.states,
				cities: response.cities,
				technologies: TechnologyDetailsCatalog.Parse (response.technologies),
				active_employment: new EmploymentModel ().assign (response.employment),
				selected_country: response.countries.find ((country: IDValue) => country.id == response.location.country_id),
				selected_state: response.states.find ((state: IDValue) => state.id == response.location.state_id),
				selected_city: response.cities.find ((city: IDValue) => city.id == response.location.city_id),
				editing: true
			});

			this.state.active_employment.start_date = new Date (this.state.active_employment.start_date);
			this.state.active_employment.end_date = new Date (this.state.active_employment.end_date);

			this.start_date.current.update_value ();

			this.forceUpdate ();

		});

	}// get_employment;


	private load_technology_list (category_id: string) {
		let result: TechnologyList = this.state.technologies?.[category_id];
		if (isset (result)) return this.setState ({ active_technologies: result });
	}// load_technology_list;


	private save_employment () {
		this.setState ({ saving: true }, () => {

			let employment_data = new EmploymentAPIModel ().assign ({
				employment: this.state.active_employment,
				technologies: this.selected_technologies
			});

			Database.save_employment (employment_data).then ((result: string) => {
				if (is_null (this.state.active_employment?.id)) {
					this.state.employment.insert (this.state.active_employment, "company");
					this.state.saving = false;
					this.set_employment_property ("id", result);
				}// if;
			});

		});
	}// save_employment;


	private select_country (event: ChangeEvent) {

		let value: string = (event.currentTarget as HTMLSelectElement).value;
		this.setState ({ selected_country: this.state.countries.find ((country: IDValue) => country.id == value) });

		Database.get_states ((event.currentTarget as HTMLSelectElement).value).then ((response: IDValueList) => {
			this.setState ({ states: new IDValueList ().assign (response) });
		});

	}// select_country;


	private select_state (event: ChangeEvent) {

		let value: string = (event.currentTarget as HTMLSelectElement).value;
		this.setState ({ selected_state: this.state.states.find ((state: IDValue) => state.id == value) });

		Database.get_cities ((event.currentTarget as HTMLSelectElement).value).then ((response: IDValueList) => {
			this.setState ({ cities: new IDValueList ().assign (response) });
		});

	}// select_state;


	private select_city (event: ChangeEvent) {
		let value = (event.currentTarget as HTMLSelectElement).value;
		this.set_employment_property ("location_id", value);
		this.setState ({ selected_city: this.state.cities.find ((city: IDValue) => city.id == value) });
	}// select_city;


	private set_employment_property (property: string, value: any) {
		this.state.active_employment [property] = value;
		this.forceUpdate ();
	}// set_employment_property;


	/********/


	public state: EditEmploymentState = new EditEmploymentState ();


	public render () {
		return <div className="full-page column-centered column-block with-lotsa-headspace">

			<div className="title">Employment Editor</div>

			<div className="three-column-grid">

				<label htmlFor="company_list">Company</label>
				<SelectList id="company_list" items={this.state.employment} selected_item={this.state.active_employment?.id ?? this.state.active_employment?.company} 
					disabled={is_null (this.state.employment)} text_field="company" onChange={this.get_employment.bind (this)}>
				</SelectList>

				<div className="slightly-spaced-out row-block">

					<button onClick={() => this.setState ({ editing: true })} className={isset (this.state.active_employment?.id) ? null : "hidden"}>Delete</button>

					<button onClick={() => this.setState ({ 
						active_employment: null,
						states: null,
						cities: null,
						selected_country: null,
						selected_state: null,
						selected_city: null,
						editing: true
					})}>New</button>

				</div>

			</div>

			<div className={`${this.state.editing ? String.Empty : "hidden"} column-block`}>

				<div className="spaced-out row-block with-lotsa-headspace">

					<div className="four-column-grid">

						<input type="hidden" value={this.state.active_employment?.id} />

						<label htmlFor="company">Company</label>
						<input type="text" id="company" className="three-column-span" 
							defaultValue={this.state.active_employment?.company}
							onChange={(event: ChangeEvent) => this.set_employment_property ("company", (event.currentTarget as HTMLInputElement).value)}>
						</input>

						<label htmlFor="position">Position</label>
						<input type="text" id="position" className="three-column-span"
							defaultValue={this.state.active_employment?.position}
							onChange={(event: ChangeEvent) => this.set_employment_property ("position", (event.currentTarget as HTMLInputElement).value)}>
						</input>

						<label htmlFor="location">Location</label>
						<div className="slightly-spaced-out three-column-span row-block">

							<SelectList items={this.state.countries} selected_item={this.state.selected_country?.id} 
								disabled={is_null (this.state.countries)} onChange={this.select_country.bind (this)}>
							</SelectList>

							<SelectList items={this.state.states} selected_item={this.state.selected_state?.id} 
								disabled={is_null (this.state.states)} onChange={this.select_state.bind (this)}>
							</SelectList>

							<SelectList items={this.state.cities} selected_item={this.state.selected_city?.id} 
								disabled={is_null (this.state.cities)} onChange={this.select_city.bind (this)}>
							</SelectList>

						</div>

						<label htmlFor="start_date">Start date</label>
						<DateInput id="start_date" ref={this.start_date} onChange={this.update_date.bind (this)} value={this.get_date ("start_date")} />

						<label htmlFor="end_date">End date</label>
						<DateInput id="end_date" ref={this.end_date} onChange={this.update_date.bind (this)} value={this.get_date ("end_date")} />

						<label htmlFor="description" className="full-width left-aligned four-column-span row-block with-headspace">Description</label>

						<textarea id="description" className="four-column-span" value={this.state.active_employment?.description ?? String.Empty}
							onChange={(event: ChangeEvent) => this.set_employment_property ("description", (event.currentTarget as HTMLInputElement).value)}>
						</textarea>

					</div>

					<div className="vertical-divider" />

					<div className="top-aligned spaced-out column-block">

						<label>Add technologies</label>
						<div className="row-block">
							<SelectList items={this.state.categories} disabled={is_null (this.state.categories)} text_field="name"
								onChange={(event: SelectEvent) => this.load_technology_list ((event.currentTarget as HTMLSelectElement).value)}>
							</SelectList>
						</div>

						<Optional condition={isset (this.state.active_technologies)}>
							<CheckboxList items={this.state.active_technologies}
								selected_items={this.state.active_technologies?.filteredMap ((item: Technology) => item.included ? item.id : null)}
								onChange={(technology: Technology, checked: boolean) => technology.included = checked}>
							</CheckboxList>
						</Optional>
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

		Database.get_companies ().then ((response: IDValueList) => {

			this.state.employment = null;

			response.forEach (response => {

				if (is_null (this.state.employment)) this.state.employment = new EmploymentModelList ();

				this.state.employment.push (new EmploymentModel ().assign ({
					id: response.id,
					company: response.value
				}));

			});

			this.forceUpdate ();
		});

		Database.get_countries ().then ((response: IDValueList) => {
			if (is_null (this.state.countries)) this.state.countries = new IDValueList ();
			this.state.countries.assign (response);
			this.forceUpdate ();
		});

		Database.get_categories ().then ((response: CategoryModelList) => {
			this.setState ({ categories: new CategoryModelList ().assign (response.sortby ("name")) });
		});

	}// constructor;

}// EditEmployment;