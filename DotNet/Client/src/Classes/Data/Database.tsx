import { IDValueList } from "Models/BaseModels";
import { CategoryModelList, EmploymentDetails, EmploymentModel, TechnologyModel, TechnologyModelList } from "Models/DataModels";

export default class Database {

	public static get_categories = (): Promise<CategoryModelList> => api_handler.get_data ("GetCategories");
	public static get_cities = (state_id: string): Promise<IDValueList> => api_handler.get_data ("GetCities", state_id);
	public static get_companies = (): Promise<IDValueList> => api_handler.get_data ("GetCompanies");
	public static get_countries = (): Promise<IDValueList> => api_handler.get_data ("GetCountries");
	public static get_employment = (employment_id: string): Promise<EmploymentDetails> => api_handler.get_data ("GetEmployment", employment_id);
	public static get_states = (country_id: string): Promise<IDValueList> => api_handler.get_data ("GetStates", country_id);
	public static get_technologies = (category_id: string = null): Promise<TechnologyModelList> => api_handler.get_data ("GetTechnologies", category_id);

	public static save_employment = (employment: EmploymentModel): Promise<string> => api_handler.set_data ("SaveEmployment", employment);
	public static save_technology = (technology: TechnologyModel): Promise<string> => api_handler.set_data ("SaveTechnology", technology);

}// MigrationDatabase;