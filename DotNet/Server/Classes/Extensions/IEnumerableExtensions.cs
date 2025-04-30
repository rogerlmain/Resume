namespace Resume.Classes.Extensions {

	public static class IEnumerableExtensions {

		public static List<TModel>? ToListOrNull<TModel> (this IEnumerable<TModel> self) => self.Any () ? self.ToList () : null;

	}// IEnumerableExtensions;

}// RogerLMain.Classes.Extensions;