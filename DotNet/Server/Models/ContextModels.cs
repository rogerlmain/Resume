using System.ComponentModel.DataAnnotations;

namespace Resume.Models {

	public class CategoryModel: IDModel {
		public required String name { get; set; }
        
	}// CategoryModel;


	public class EmploymentModel: IDModel {
		public required String company { get; set; }
		public required String position { get; set; }
		public Guid? location_id { get; set; } = null;
		public required DateOnly start_date { get; set; }
		public required DateOnly end_date { get; set; }
		public required String description { get; set; }
	}// EmploymentModel;


	public class EmploymentTechnologiesModel: IDModel {

		public required Guid employment_id { get; set; }

		[Required]
		public Guid technology_id { get; set; }

	}// EmploymentTechnologiesModel;


	public class LookupsModel: IDModel {
		public required Guid lookup_type_id { get; set; }
		public Guid? parent_id { get; set; } = null;
		public required String name  { get; set; }
	}// LookupsModel;


	public class LookupTypesModel: IDModel {
		public required String name { get; set; }
	}// LookupTypesModel;


	public class TechnologyModel: IDModel {
		public required Guid category_id { get; set; }
		public required String name { get; set; }
        
	}// TechnologyModel;

}// Resume.Models;