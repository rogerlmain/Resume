using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Resume.Classes;
using Resume.Classes.Extensions;
using Resume.Models;


namespace Resume.Controllers.Technology {

	public class TechnologyControllers (DataContext context): Controller {

		private void add_employment_technology (Guid employment_id, Guid technology_id) {
			context.employment_technologies.Save (new EmploymentTechnologiesModel () {
				employment_id = employment_id,
				technology_id = technology_id
			});
		}// add_employment_technology;


		private void remove_employment_technology (Guid employment_id, Guid technology_id) {

			IQueryable<EmploymentTechnologiesModel> employment_technology = (from etech in context.employment_technologies
				where (etech.employment_id == employment_id) &&
					(etech.technology_id == technology_id)
				select etech
			);

			(from version in context.employment_tech_versions
				where (version.employment_technology_id == (from etech in employment_technology select etech.id).First ())
				select version
			).ExecuteDelete ();

			employment_technology.ExecuteDelete ();

		}// remove_employment_technology;


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
						select new VersionData () {
							id = version.id,
							version = version.version
						}
					).ToListOrNull ()
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
		[Route ("SetTechnology")]
		public IActionResult SetTechnology ([FromBody] TechnologyParameters parameters) {

			switch (parameters.value) {
				case true: add_employment_technology (parameters.employment_id, parameters.technology_id); break;
				case false: remove_employment_technology (parameters.employment_id, parameters.technology_id); break;
			}// switch;

			return Responses.Success ();

		}// SetTechnology;


	}// TechnologyControllers;

}// Resume.Controllers.Technology;