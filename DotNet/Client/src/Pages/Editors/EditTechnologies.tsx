import Database from "Classes/Data/Database";
import Container from "Controls/Container";
import ConfirmationWindow from "Controls/Windows/ConfirmationWindow";
import ErrorWindow from "Controls/Windows/ErrorWindow";
import InformationWindow from "Controls/Windows/InformationWindow";

import DropdownEditbox from "Controls/DropdownEditbox";
import Eyecandy from "Controls/Windows/Eyecandy";

import { TechnologyData, TechnologyDataList, TechnologyIndex, VersionData } from "Models/APIModels";
import { IDValue, IDValueList } from "Models/BaseModels";
import { Component } from "react";


class EditTechnologiesState {

	public categories: IDValueList = null;
	public technologies: TechnologyIndex = null;

	public editing: boolean = false;
	public saving: boolean = false;

	public saving_category: boolean = false;
	public saving_technology: boolean = false;
	public saving_version: boolean = false;

	public category: IDValue = null;
	public technology: TechnologyData = null;
	public version: IDValue = null;

}// EditTechnologiesState;


export default class EditTechnologies extends Component<Object, EditTechnologiesState> {

	private get technology_list (): TechnologyDataList { return this.state?.technologies?.[this.state.category?.id] ?? null }
	private get version_list (): IDValueList { return this.state.technology?.versions ?? null }


	private set technology_list (values: TechnologyDataList) { 
		if (is_null (this.state.technologies)) this.state.technologies = new TechnologyIndex ();
		this.state.technologies [this.state.category.id] = values;
		this.forceUpdate ();
	}// set_technology_list;


	private confirm_deletion (type: string, item: IDValue) {
		popup_window.show (<ConfirmationWindow onYes={() => this.delete_item (type, item)}>
			This will delete {item.value} and all dependencies.<br />
			Employment items will also have this value removed.<br />
			<br />
			Are you absolutely sure?
		</ConfirmationWindow>);
	}// delete_item;


	private delete_item (type: string, item: IDValue) {
		popup_window.show (<Eyecandy text={`Deleting ${item.value}`} />, () => {
			switch (type) {
				case "category": Database.delete_category (item.id).then ((success: boolean) => this.update_lists (type, item, success)); break;
				case "technology": Database.delete_technology (item.id).then ((success: boolean) => this.update_lists (type, item, success)); break;
				case "version": Database.delete_version (item.id).then ((success: boolean) => this.update_lists (type, item, success)); break;
			}// switch;
		});
	}// delete_item;


	private get_technologies (): Promise<void> {
		return new Promise<void> (resolve => {
 			if (is_null (this.technology_list)) {
				Database.get_technologies (this.state.category.id).then ((result: TechnologyDataList) => {
					this.technology_list = new TechnologyDataList ();
					if (isset (result)) this.technology_list.assign (result);
					this.forceUpdate (() => resolve ());
				});
			}// if;
		});
	}// get_technologies;


	private load_technology (value: IDValue) {
		let technology: TechnologyData = this.technology_list.find ((item: TechnologyData) => item.id == value.id);
		if (is_null (technology.versions)) technology.versions = new IDValueList ();
		this.setState ({ technology, version: null });
	}// load_technology;


	public save_category (item: IDValue): Promise<void> {
		return new Promise<void> (resolve => {
			Database.save_category (item).then ((id: string) => {

				if (is_null (item.id)) {
					item.id = id;
					this.state.categories.push (item);
				}// if;

				this.state.categories.sortby ("value");
				this.setState ({ category: item }, () => this.get_technologies ().then (() => resolve ()));

			});
		});
	}// save_category;


	public save_technology (item: IDValue) {
		Database.save_technology (new TechnologyData ().assign ({
			id: item.id,
			category_id: this.state.category.id,
			name: item.value
		})).then ((id: string) => {

			let data: TechnologyData = this.technology_list.find ((item: TechnologyData) => item.id == id) ?? null;

			new Promise<void> (resolve => {
				if (isset (data)) return resolve ();
				data = new TechnologyData ().assign (item);
				data.id = id;
				this.technology_list.push (data);
				this.setState ({ technology: data }, () => resolve ());
			}).then (() => {
				this.technology_list.sortby ("name");
			});

		});
	}// save_technology


	private save_version (item: IDValue) {
		Database.save_technology_version (new VersionData ().assign ({
			id: item.id,
			technology_id: this.state.technology.id,
			version: item.value
		})).then ((result: string) => {

			if (is_null (item.id)) {
				item.id = result;
				this.version_list.push (item);
			}// if;

			this.version_list.sortby ("value");
			this.forceUpdate ();

		});
	}// save_version;


	private update_lists (type: string, item: IDValue, success: boolean) {

		if (!success) return popup_window.show (<ErrorWindow text={`Cannot delete ${item.value}`} />);

		switch (type) {
			case "category": this.state.categories.remove (item); break;
			case "technology": this.state.technologies [this.state.category.id].remove (item); break;
			case "version": this.state.technology.versions.remove (item); break;
		}// switch;

		popup_window.show (<InformationWindow text={`${item.value} deleted.`} />);

	}// update_lists;


	/********/


	public state: EditTechnologiesState = new EditTechnologiesState ();


	public render () {
		return <div className="full-page column-centered column-block with-headspace">

			<div className="title">Technology Editor</div>

			<div className="three-column-grid">

				<Container>

					<label htmlFor="technology_list">Category</label>

					{this.state.saving_category ? <Eyecandy text="Saving..." /> : <DropdownEditbox id="category_list" 
						data={this.state.categories} selected_item={this.state.category?.id}
						disabled={is_null (this.state.categories)}

						onChange={(value: IDValue) => this.setState ({ 
							category: value,
							technology: null,
							version: null
						}, this.get_technologies.bind (this))}

						onEditComplete={(item: IDValue) => this.save_category (item)}>
					</DropdownEditbox>}

					<button disabled={is_null (this.state.category)} onClick={() => this.confirm_deletion ("category", this.state.category)}>Delete</button>

				</Container>

				<Container>

					<label htmlFor="technology_list">Technology</label>

					{this.state.saving_technology ? <Eyecandy text="Saving..." /> : <DropdownEditbox id="technology_list" 
						data={this.technology_list} selected_item={this.state.technology?.id}
						disabled={is_null (this.technology_list)}
						onChange={(value: IDValue) => this.load_technology (value)}
						onEditComplete={(item: IDValue) => this.save_technology (item)}>
					</DropdownEditbox>}

					<button disabled={is_null (this.state.technology)} onClick={() => this.confirm_deletion ("technology", new IDValue ().assign ({
						id: this.state.technology.id,
						value: this.state.technology.name
					}))}>Delete</button>

				</Container>

				<Container>

					<label htmlFor="technology_list">Version</label>

					{this.state.saving_version ? <Eyecandy text="Saving..." /> : <DropdownEditbox id="versions_list"
						data={this.version_list} selected_item={this.state.version?.id}
						disabled={is_null (this.version_list)}
						onChange={(value: IDValue) => this.setState ({ version: value })}
						onEditComplete={(item: IDValue) => this.save_version (item)}>
					</DropdownEditbox>}

					<button disabled={is_null (this.state.version)} onClick={() => this.confirm_deletion ("version", this.state.version)}>Delete</button>

				</Container>

			</div>

		</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		Database.get_categories ().then ((response: IDValueList) => this.setState ({ categories: new IDValueList ().assign (response)}));
	}// constructor;

}// EditTechnologies;