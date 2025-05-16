using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Resume.Classes;
using Resume.Classes.Extensions;
using Resume.Models;


namespace Resume.Controllers.Technology {

	public class TechnologyControllers (DataContext context): Controller {

		private IQueryable<EmploymentTechnologiesModel> get_etech (Guid employment_id, Guid technology_id) {
			return (from etech in context.employment_technologies
				where (etech.employment_id == employment_id) &&
					(etech.technology_id == technology_id)
				select etech
			);
		}// get_etech;


		private void add_employment_technology (Guid employment_id, Guid technology_id) {
			context.employment_technologies.Save (new EmploymentTechnologiesModel () {
				employment_id = employment_id,
				technology_id = technology_id
			});
		}// add_employment_technology;


		private void remove_employment_technology (Guid employment_id, Guid technology_id) {

			IQueryable<EmploymentTechnologiesModel> employment_technology = get_etech (employment_id, technology_id);

			(from version in context.employment_tech_versions
				where (version.employment_technology_id == (from etech in employment_technology select etech.id).First ())
				select version
			).ExecuteDelete ();

			employment_technology.ExecuteDelete ();

		}// remove_employment_technology;


		private void add_employment_tech_version (Guid employment_id, Guid technology_id, Guid version_id) {
			context.employment_tech_versions.Save (new EmploymentTechVersionsModel () {
				employment_technology_id = (Guid) (from etech in context.employment_technologies
					where 
						(etech.employment_id == employment_id) && 
						(etech.technology_id == technology_id)
					select etech.id
				).First ()!,
				version_id = version_id
			});
		}// add_employment_tech_version;


		private void remove_employment_tech_version (Guid employment_id, Guid technology_id, Guid version_id) {

			Guid? etech_id = get_etech (employment_id, technology_id).First ().id;

			(from version in context.employment_tech_versions
				where 
					(version.employment_technology_id == etech_id) &&
					(version.version_id == version_id)
				select version
			).ExecuteDelete ();

		}// remove_employment_tech_version;


		/********/


		[HttpDelete]
		[Route ("DeleteTechnology")]
		public IActionResult DeleteTechnology ([FromBody] Guid technology_id) {

			(from tech_version in context.employment_tech_versions
				join version in context.versions on tech_version.version_id equals version.id
				where version.technology_id == technology_id
				select tech_version
			).ExecuteDelete ();

			(from version in context.versions
				where version.technology_id == technology_id
				select version
			).ExecuteDelete ();

			(from technology in context.technologies
				where technology.id == technology_id
				select technology
			).ExecuteDelete ();

			return new JsonResult (null);
		}// DeleteTechnology;


        [HttpPost]
        [Route ("GetTechnologies")]
		public IActionResult GetTechnologies ([FromBody] Guid category_id) {

			List<TechnologyData>? result = (from technology in context.technologies
				where technology.category_id == category_id
				select new TechnologyData () {
					id = technology.id,
					name = technology.name,
					versions = (from version in context.versions
						where version.technology_id == technology.id
						select version
					).OrderBy ((VersionModel version) => version.version).ToListOrNull ()
				}
			).ToListOrNull ()?.SortBy ("value");

			return new JsonResult (result);

		}// GetTechnologies;


		[HttpPost]
		[Route ("GetTechnologyPercentages")]
		public IActionResult GetTechnologyPercentages () {

			List<PercentageData>? result = null;

			//(from employment in context.employment
				//join tech_employment in context.employment_technologies on employment.id equals tech_employment.employment_id
				//join technology in context.technologies on tech_employment.technology_id equals technology.id
				//group 
				//select new PercentageData () {
				//	name = technology.name,
				//	percentage = 
				//}
			//)

			return new JsonResult (result);

		}// GetTechnologyPercentages;


		[HttpPut]
		[Route ("SaveTechnology")]
		public IActionResult SaveTechnology ([FromBody] TechnologyModel technology) {
			Guid? id = context.technologies.Save (technology);
			return new JsonResult (id);
		}// SaveTechnology;


		[HttpPut]
		[Route ("SaveTechnologyVersion")]
		public IActionResult SaveTechnologyVersion ([FromBody] VersionModel version) {
			Guid? id = context.versions.Save (version);
			return new JsonResult (id);
		}// SaveTechnologyVersion;


		[HttpPut]
		[Route ("SetReleaseDate")]
		public IActionResult SetReleaseDate ([FromBody] ReleaseDateParameters parameters) {

			context.versions.Save (new VersionModel () {
				id = parameters.version_id,
				release_date = parameters.release_date
			});

			return Responses.Success ();

		}// SetReleaseDate;


		[HttpPut]
		[Route ("SetTechnology")]
		public IActionResult SetTechnology ([FromBody] TechnologyParameters parameters) {

			switch (parameters.value) {
				case true: add_employment_technology (parameters.employment_id, parameters.technology_id); break;
				default: remove_employment_technology (parameters.employment_id, parameters.technology_id); break;
			}// switch;

			return Responses.Success ();

		}// SetTechnology;


		[HttpPut]
		[Route ("SetVersion")]
		public IActionResult SetVersion ([FromBody] VersionParameters parameters) {

			switch (parameters.value) {
				case true: add_employment_tech_version (parameters.employment_id, parameters.technology_id, parameters.version_id); break;
				default: remove_employment_tech_version (parameters.employment_id, parameters.technology_id, parameters.version_id); break;
			}

			return Responses.Success ();

		}// SetVersion;


	}// TechnologyControllers;

}// Resume.Controllers.Technology;