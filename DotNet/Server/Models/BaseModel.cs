global using IDValueList = System.Collections.Generic.List<Resume.Models.IDValue>;
using Microsoft.EntityFrameworkCore;


namespace Resume.Models {

	[PrimaryKey ("id")]
    public abstract class IDModel {
        public Guid? id { get; set; } = null;
    }// IDModel;


	public class IDValue: IDModel {
		public String? value { get; set; } = null;
	}// IDValue;

}// Resume.Models;