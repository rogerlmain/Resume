using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers {

    public class Main: Controller {

        [HttpGet]
        [Route ("GetStuff")]
        public IActionResult GetStuff () {
            return new JsonResult (new { data = "Peachy" });
        }// GetStuff;

    }// Main;

}// Server.Controllers;
