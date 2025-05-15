using Microsoft.AspNetCore.Mvc;


namespace Resume.Classes {

	public static class Responses {

		public static JsonResult Error (Exception except) => new (new { error = except.Message });

		public static JsonResult Message (string message) => new (new { message });

		public static JsonResult Success () => new (new { success = true });

	}// Responses;

}// Resume.Classes;