import { EmploymentData, EmploymentType, TechnologyData, TechnologyDataList, TechnologyParameters, VersionData } from "Models/APIModels";
import { IDValue, IDValueList } from "Models/BaseModels";
import { PercentageDataList } from "Pages/Technologies";


export default class Database {

	public static get_categories = (): Promise<IDValueList> => api_handler.get_data ("GetCategories");
	public static get_cities = (state_id: string): Promise<IDValueList> => api_handler.get_data ("GetCities", state_id);
	public static get_companies = (): Promise<IDValueList> => api_handler.get_data ("GetCompanies");
	public static get_countries = (): Promise<IDValueList> => api_handler.get_data ("GetCountries");
	public static get_employment = (employment_id: string = null): Promise<EmploymentType> => api_handler.get_data ("GetEmployment", employment_id);
	public static get_states = (country_id: string): Promise<IDValueList> => api_handler.get_data ("GetStates", country_id);
	public static get_technologies = (category_id: string): Promise<TechnologyDataList> => api_handler.get_data ("GetTechnologies", category_id);
	public static get_technology_percentages = (): Promise<PercentageDataList> => api_handler.get_data ("GetTechnologyPercentages");

	public static save_category = (category: IDValue): Promise<string> => api_handler.set_data ("SaveCategory", category);
	public static save_employment = (employment: EmploymentData): Promise<string> => api_handler.set_data ("SaveEmployment", employment);
	public static save_technology = (technology: TechnologyData): Promise<string> => api_handler.set_data ("SaveTechnology", technology);
	public static save_technology_version = (version: VersionData): Promise<string> => api_handler.set_data ("SaveTechnologyVersion", version);

	public static set_technology = (parameters: TechnologyParameters) => api_handler.set_data ("SetTechnology", parameters);

	public static delete_category = (category_id: string): Promise<boolean> => api_handler.delete_data ("DeleteCategory", category_id);
	public static delete_technology = (technology_id: string): Promise<boolean> => api_handler.delete_data ("DeleteTechnology", technology_id);
	public static delete_version = (version_id: string): Promise<boolean> => api_handler.delete_data ("DeleteVersion", version_id);

	public static run_test = (input: any = null): Promise<any> => api_handler.get_data ("RunTest", input);

}// MigrationDatabase;