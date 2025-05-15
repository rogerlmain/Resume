using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Resume.Classes;
using Resume.Classes.Extensions;
using Resume.Models;


namespace Resume.Controllers {

	public class TechListItem {
		public required Guid category_id { get; set; }
		public required Guid technology_id { get; set; }
		public required String technology_name { get; set; }
		public required Boolean technology_included { get; set; }
		public Guid? version_id { get; set; } = null;
		public String? version_name { get; set; } = null;
		public required Boolean version_included { get; set; }
	}// TechListItem;


	public class TechVersionItem {
		public required Guid category_id { get; set; }
		public required Guid technology_id { get; set; }
		public Guid? version_id { get; set; }
	}// TechVersionItem;


	/********/


    public class Main (DataContext context): Controller {

		private IDValueList? get_state_list (Guid country_id) {
			return (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "State") && (item.parent_id == country_id)
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();
		}// get_state_list;


		private IDValueList? get_city_list (Guid state_id) {
			return (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "City") && (item.parent_id == state_id)
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();
		}// GetCityList;


		private EmploymentModel? get_employment_model (Guid employment_id) {
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
		}// get_employment_model;


		private LocationDetails? get_location_details (Guid location_id) {
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
		}// get_location_details;


		private List<TechVersionItem>? get_tech_versions (Guid employment_id) {
			return (from etech in context.employment_technologies
				where etech.employment_id == employment_id

				from tech in context.technologies.Where (item => item.id == etech.technology_id)
				from etv in context.employment_tech_versions.Where (item => item.employment_technology_id == etech.id).DefaultIfEmpty ()

				select new TechVersionItem () {
					category_id = (Guid) tech.category_id!,
					technology_id = etech.technology_id,
					version_id = etv.version_id
				}
			).ToListOrNull ();
		}// get_tech_versions;


		private TechnologySelectionIndex? get_employment_technologies (Guid employment_id) {

			List<TechVersionItem>? tech_versions = get_tech_versions (employment_id); 
			TechnologySelectionIndex? result = null;

			if (tech_versions is null) return null;

			foreach (Guid category_id in (from tech_version in tech_versions select tech_version.category_id).Distinct ()) {

				GuidList technology_ids = (from tech in tech_versions 
					where tech.category_id == category_id
					select tech.technology_id
				).Distinct ().ToList ();

				List<TechnologySelection>? selections = (from id in technology_ids select new TechnologySelection () {
					technology_id = id,
					versions = (from tech in tech_versions
						where 
							(tech.technology_id == id) &&
							(tech.version_id != null)
						select (Guid) tech.version_id!
					).ToListOrNull ()
				}).ToListOrNull ();

				if (selections is null) continue;

				result ??= new ();
				result.Add (category_id, selections);

			}// foreach;

			return result;

		}// get_employment_technologies;


		/********/


		[HttpDelete]
		[Route ("DeleteCategory")]
		public IActionResult DeleteCategory ([FromBody] Guid category_id) {
			
			(from technology in context.technologies
				where technology.category_id == category_id
				select technology
			).ExecuteUpdate (item => item.SetProperty (property => property.category_id, property => null));

			(from category in context.categories
				where category.id == category_id
				select category
			).ExecuteDelete ();

			return new JsonResult (null);

		}// DeleteCategory;


		[HttpDelete]
		[Route ("DeleteVersion")]
		public IActionResult DeleteVersion ([FromBody] Guid version_id) {

			(from tech_version in context.employment_tech_versions
				where tech_version.version_id == version_id
				select tech_version
			).ExecuteDelete ();

			(from version in context.versions
				where version.id == version_id
				select version
			).ExecuteDelete ();

			return new JsonResult (null);

		}// DeleteVersion;


		[HttpGet]
		[Route ("GetCategories")]
		public IActionResult GetCategories () {

			List<IDValue>? result = (from category in context.categories select new IDValue () {
				id = category.id,
				value = category.name
			}).OrderBy (item => item.value).ToListOrNull ();

			return new JsonResult (result);

		}// GetCategories;


		[HttpPost]
		[Route ("GetCities")]
		public IActionResult GetCities ([FromBody] Guid state_id) {
			IDValueList? result = get_city_list (state_id);
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

			IDValueList? result =  (from item in context.lookups
				join lookup_type in context.lookup_types on item.lookup_type_id equals lookup_type.id
				where (lookup_type.name == "Country")
				select new IDValue () {
					id = item.id,
					value = item.name
				}
			).ToListOrNull ();

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

			EmploymentModel employment_model = get_employment_model (employment_id) ?? throw new Exception ("Cannot find employment details.");
			LocationDetails location_details = get_location_details ((Guid) employment_model.location_id!) ?? throw new Exception ("Cannot find location details.");
			TechnologySelectionIndex? technology_list = get_employment_technologies (employment_id);

			IDValueList state_list = get_state_list (location_details.country_id) ?? throw new Exception ("No states found.");
			IDValueList city_list = get_city_list (location_details.state_id) ?? throw new Exception ("No cities found.");

			EmploymentDetails details = new () {
				employment = employment_model,
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
			IDValueList? result = get_state_list (country_id);
			return new JsonResult (result);
		}// GetStates;


		[HttpPut]
		[Route ("SaveCategory")]
		public IActionResult SaveCategory ([FromBody] IDValue category) {

			Guid? id = context.categories.Save (new CategoryModel () {
				id = category.id,
				name = category.value ?? String.Empty
			});

			return new JsonResult (id);

		}// SaveCategory;


		[HttpPut]
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


		[HttpGet]
		[Route ("RunTest")]
		public IActionResult RunTest () {
		
			var result = (from tech in context.technologies

				from ver in context.versions.Where (item => item.technology_id == tech.id).DefaultIfEmpty ()

				select new {
					tech.name,
					ver.version
				}

			).OrderBy (item => item.name).ToListOrNull ();

			return new JsonResult (result);

		}// RunTest;

    }// Main;

}// Resume.Controllers;
