using System.Reflection;


namespace Resume.Classes.Extensions {

	public static class PropertyInfoExtensions {

		public static Boolean BooleanType (this PropertyInfo self) => ((Type) self.PropertyType.GetTypeInfo ()).BooleanType ();

	}// PropertyInfoExtensions;

}// RogerLMain.Classes.Extensions;