using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;

namespace Resume.Models {

	public class TechnologySelectionIndex: Dictionary<Guid, List<TechnologySelection>> {}


	public class EmploymentAPIModel {
		public required EmploymentModel employment { get; set; }
		public GuidList? technologies { get; set; }
	}// EmploymentAPIModel;


	public class EmploymentDetails {
		public required EmploymentModel employment { get; set; }
		public required IDValueList states { get; set; }
		public required IDValueList cities { get; set; }
		public required LocationDetails location { get; set; }
		public required TechnologySelectionIndex technologies { get; set; }
	}// EmploymentDetails;


	public class LocationDetails {
		public required Guid country_id { get; set; }
		public required Guid state_id { get; set; }
		public required Guid city_id { get; set; }
	}// LocationDetails;


	public class PercentageData {
		public required String name { get; set; }
		public required Decimal percentage { get; set; }
	}// PercentageData;


	public class TechnologySelection {
		public required Guid technology_id { get; set; }
		public GuidList? versions { get; set; } = null;
	}// TechnologySelection;


	public class TechnologyData: IDModel {
		public required String name { get; set; }
		public List<VersionData>? versions { get; set; } = null;
	}// TechnologyData;


	public class VersionData: IDModel {
		public required String version { get; set; }
	}// VersionData;

}// Resume.Models;