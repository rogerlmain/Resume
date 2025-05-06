using Microsoft.AspNetCore.Mvc;
using Resume.Models;
using Resume.Classes;
using Resume.Classes.Extensions;


namespace Server.Controllers {

    public class Main (DataContext context): Controller {

		private IDValueList? GetCountryList () {
			return (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "Country")
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();
		}// GetCountryList;


		private IDValueList? GetStateList (Guid country_id) {
			return (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "State") && (item.parent_id == country_id)
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();
		}// GetStateList;


		private IDValueList? GetCityList (Guid state_id) {
			return (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "City") && (item.parent_id == state_id)
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();
		}// GetCityList;


		private EmploymentModel? GetEmploymentModel (Guid employment_id) {
			return (from employment in context.employment
				where employment.id == employment_id
				select new EmploymentModel () {
					id = employment.id,
					company = employment.company,
					position = employment.position,
					location_id = employment.location_id,
					start_date = employment.start_date,
					end_date = employment.end_date,
					description = employment.description
				}
			).FirstOrDefault ();
		}// GetEmploymentModel;


		private LocationDetails? GetLocationDetails (Guid location_id) {
			return (from country in context.lookups
				join state in context.lookups on country.id equals state.parent_id
				join city in context.lookups on state.id equals city.parent_id
				where city.id == location_id
				select new LocationDetails () {
					country_id = (Guid) country.id!,
					state_id = (Guid) state.id!,
					city_id = (Guid) city.id!
				}
			).FirstOrDefault ();
		}// GetLocationDetails;


		private List<TechnologyDetails>? GetTechnologyDetails (Guid employment_id) {

			List<TechnologyDetails>? result = (from item in context.technologies
				join etech in context.employment_technologies on item.id equals etech.technology_id into joined_tech
				from employment_tech in joined_tech.DefaultIfEmpty ()
				where ((employment_tech.employment_id == employment_id) || (employment_tech == null))
				select new TechnologyDetails () {
					technology = item,
					included = (employment_tech != null)
				}
			).ToListOrNull ();

			return result;

		}// GetTechnologyDetails;


		/********/


		[HttpGet]
		[Route ("GetCategories")]
		public IActionResult GetCategories () {
			List<CategoryModel>? result = (from category in context.categories select category).ToListOrNull ();
			return new JsonResult (result);
		}// GetCategories;


		[HttpPost]
		[Route ("GetCities")]
		public IActionResult GetCities ([FromBody] Guid state_id) {
			IDValueList? result = GetCityList (state_id);
			return new JsonResult (result);
		}// GetCities;


		[HttpGet]
		[Route ("GetCompanies")]
		public IActionResult GetCompanies () {

			IDValueList? result = (from item in context.employment select new IDValue () {
				id = item.id,
				value = item.company
			}).ToListOrNull ();

			return new JsonResult (result);

		}// GetCompanies;


		[HttpGet]
		[Route ("GetCountries")]
		public IActionResult GetCountries () {
			IDValueList? result = GetCountryList ();
			return new JsonResult (result);
		}// GetCountries;


		[HttpGet]
		[Route ("GetEmployment")]
		public IActionResult GetEmployment () {
			List<EmploymentModel>? result = (from employment in context.employment select employment).ToList ().SortBy ("start_date");
			return new JsonResult (result);
		}// GetEmployment;


		[HttpPost]
		[Route ("GetEmployment")]
		public IActionResult GetEmployment ([FromBody] Guid employment_id) {

			EmploymentModel employment_model = GetEmploymentModel (employment_id) ?? throw new Exception ("Cannot find employment details.");
			LocationDetails location_details = GetLocationDetails ((Guid) employment_model.location_id!) ?? throw new Exception ("Cannot find location details.");
			List<TechnologyDetails> technology_list = GetTechnologyDetails (employment_id) ?? throw new Exception ("Cannot find technology details.");

			IDValueList country_list = GetCountryList () ?? throw new Exception ("No countries found.");
			IDValueList state_list = GetStateList (location_details.country_id) ?? throw new Exception ("No states found.");
			IDValueList city_list = GetCityList (location_details.state_id) ?? throw new Exception ("No cities found.");

			EmploymentDetails details = new () {
				employment = employment_model,
				countries = country_list,
				technologies = technology_list,
				states = state_list,
				cities = city_list,
				location = location_details
			};

			return new JsonResult (details);

		}// GetEmployment;


		[HttpPost]
		[Route ("GetStates")]
		public IActionResult GetStates ([FromBody] Guid country_id) {
			IDValueList? result = GetStateList (country_id);
			return new JsonResult (result);
		}// GetStates;


        [HttpGet]
        [Route ("GetTechnologies")]
        public IActionResult GetTechnologies () {
			List<TechnologyModel>? options = (from item in context.technologies select item).ToListOrNull ();
            return new JsonResult (options);
        }// GetTechnologies;


        [HttpPost]
        [Route ("GetTechnologies")]
        public IActionResult GetTechnologies ([FromBody] Guid employment_id) {
			List<TechnologyDetails>? details = GetTechnologyDetails (employment_id);
            return new JsonResult (details);
        }// GetTechnologies;


		[HttpPost]
		[Route ("SaveTechnology")]
		public IActionResult SaveTechnology ([FromBody] TechnologyModel technology) {
			Guid? id = context.technologies.Save<TechnologyModel> (technology);
			return new JsonResult (id);
		}// SaveTechnology;


		[HttpPost]
		[Route ("SaveEmployment")]
		public IActionResult SaveEmployment ([FromBody] EmploymentAPIModel model) {

			Guid id = context.employment.Save<EmploymentModel> (model.employment) ?? throw new Exception ("Error saving to employment - id is null.");

			if (model.technologies is not null) {

				context.employment_technologies.Delete (new { employment_id = id });

				List<EmploymentTechnologiesModel>? technology_list = (from tech in model.technologies 
					select new EmploymentTechnologiesModel () {
						employment_id = id,
						technology_id = tech
					}
				).ToListOrNull ();

				if (technology_list is not null) context.employment_technologies.SaveAll (technology_list);

			}// if;

			return new JsonResult (id);

		}// SaveEmployment;

    }// Main;

}// Server.Controllers;
