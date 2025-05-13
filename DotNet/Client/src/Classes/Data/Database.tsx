import { EmploymentAPIModel, TechnologyAPIModel } from "Models/APIModels";
import { IDValue, IDValueList } from "Models/BaseModels";
import { EmploymentType, TechnologyModel, TechnologyModelList, VersionModel } from "Models/DataModels";

import { TechnologyDataList } from "Pages/Editors/EditTechnologies";
import { PercentageDataList } from "Pages/Technologies";

export default class Database {

	public static get_categories = (): Promise<IDValueList> => api_handler.get_data ("GetCategories");
	public static get_cities = (state_id: string): Promise<IDValueList> => api_handler.get_data ("GetCities", state_id);
	public static get_companies = (): Promise<IDValueList> => api_handler.get_data ("GetCompanies");
	public static get_countries = (): Promise<IDValueList> => api_handler.get_data ("GetCountries");
	public static get_employment = (employment_id: string = null): Promise<EmploymentType> => api_handler.get_data ("GetEmployment", employment_id);
	public static get_states = (country_id: string): Promise<IDValueList> => api_handler.get_data ("GetStates", country_id);
	public static get_technologies = (parameters: TechnologyAPIModel = null): Promise<TechnologyModelList> => api_handler.get_data ("GetTechnologies", parameters);
	public static get_technologies_by_category = (category_id: string): Promise<TechnologyDataList> => api_handler.get_data ("GetTechnologiesByCategory", category_id);
	public static get_technology_percentages = (): Promise<PercentageDataList> => api_handler.get_data ("GetTechnologyPercentages");
	public static get_versions = (technology_id: string): Promise<IDValueList> => api_handler.get_data ("GetVersions", technology_id);

	public static save_category = (category: IDValue): Promise<string> => api_handler.set_data ("SaveCategory", category);
	public static save_employment = (employment: EmploymentAPIModel): Promise<string> => api_handler.set_data ("SaveEmployment", employment);
	public static save_technology = (technology: TechnologyModel): Promise<string> => api_handler.set_data ("SaveTechnology", technology);
	public static save_version = (version: VersionModel): Promise<string> => api_handler.set_data ("SaveVersion", version);

	public static delete_category = (category_id: string): Promise<boolean> => api_handler.delete_data ("DeleteCategory", category_id);
	public static delete_technology = (technology_id: string): Promise<boolean> => api_handler.delete_data ("DeleteTechnology", technology_id);
	public static delete_version = (version_id: string): Promise<boolean> => api_handler.delete_data ("DeleteVersion", version_id);

}// MigrationDatabase;