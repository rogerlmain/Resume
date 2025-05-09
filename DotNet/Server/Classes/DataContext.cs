﻿using Microsoft.EntityFrameworkCore;
using Resume.Models;


namespace Resume.Classes {

	public class DataContext (DbContextOptions<DataContext> context): DbContext(context) {

		protected override void OnConfiguring (DbContextOptionsBuilder builder) => builder.LogTo (Console.WriteLine);


		/********/


		public DbSet<CategoryModel> categories { get; set; }
		public DbSet<EmploymentModel> employment { get; set; }
		public DbSet<EmploymentTechnologiesModel> employment_technologies { get; set; }
		public DbSet<LookupsModel> lookups { get; set; }
		public DbSet<LookupTypesModel> lookup_types { get; set; }
		public DbSet<TechnologyModel> technologies { get; set; }

	}// DataContext;

}// RogerLMain.Classes;