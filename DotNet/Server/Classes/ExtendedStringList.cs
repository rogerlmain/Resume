namespace Resume.Classes {

	public class ExtendedStringList: StringList {

		public static StringList? Join (params StringList? []? items) {
			
			StringList? result = null;

			if (items is not null) foreach (StringList? item in items) {

				if (item is null) continue;

				if (result is null) {
					result = item;
					continue;
				}// if;

				result.AddRange (item);

			}// foreach;

			return result;

		}// Join;

	}// ExtendedStringList;

}// RogerLMain.Classes;