namespace Resume.Models {

	public class EmploymentAPIModel {
		public required EmploymentModel employment { get; set; }
		public GuidList? technologies { get; set; }
	}// EmploymentAPIModel;


	public class EmploymentDetails {
		public required EmploymentModel employment { get; set; }
		public required IDValueList countries { get; set; }
		public required IDValueList states { get; set; }
		public required IDValueList cities { get; set; }
		public required LocationDetails location { get; set; }
	}// EmploymentDetails;


	public class LocationDetails {
		public required Guid country_id { get; set; }
		public required Guid state_id { get; set; }
		public required Guid city_id { get; set; }
	}// LocationDetails;

}// Resume.Models;