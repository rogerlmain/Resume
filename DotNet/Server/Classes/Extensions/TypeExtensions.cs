namespace Resume.Classes.Extensions {

	public static class TypeExtensions {

		public static Boolean BooleanType (this Type self) => (self == typeof (bool?)) || (self == typeof (bool));

	}// TypeExtensions;

}// RogerLMain.Classes.Extensions;