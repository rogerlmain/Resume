namespace RogerLMain.Classes {

	public class AbortException: Exception {
		public AbortException (): base ("aborted") {}
	}// AbortException;


	public static class Globals {

		public static char comma = ',';
		public static char space = ' ';

		public static string no_data = "No data available";


		public static Boolean is_null (object? value) => value == null;
		public static Boolean not_null (object? value) => !is_null (value);
		public static Boolean isset (object? value) => !not_set (value);
		public static Boolean not_set (object? value) => is_null (value) || ((value is string) && (value.ToString () == String.Empty)) || ((value is Array) && ((value as Array)!.Length == 0));

		public static ConfigurationRoot AppSettings () => (ConfigurationRoot) new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory()).AddJsonFile ("appsettings.json", true, true).Build ();

	}// Globals;

}// RogerLMain.Classes;
