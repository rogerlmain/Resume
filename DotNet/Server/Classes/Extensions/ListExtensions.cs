using System.Linq;

namespace Resume.Classes.Extensions {

	public static class ListExtensions {
		
		public static List<TModel>? SortBy<TModel> (this List<TModel> self, String fieldname, Boolean descending = false) {
			switch (descending) {
				case true: return self.OrderByDescending ((TModel item) => item?.GetValue (fieldname)).ToListOrNull ();
				default: return self.OrderBy ((TModel item) => item?.GetValue (fieldname)).ToListOrNull ();
			}// switch;
		}// SortBy;

	}// ListExtensions;

}// Resume.Classes.Extensions;