using Microsoft.EntityFrameworkCore;


namespace RogerLMain.Classes {

	public class DataContext: DbContext {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		// public DbSet<SAMPLE_CLASS> sample_context { get; set; }


		public DataContext (DbContextOptions<DataContext> context) : base (context) {}


	}// DataContext;

}// RogerLMain.Classes;