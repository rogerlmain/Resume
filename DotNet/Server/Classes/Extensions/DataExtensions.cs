using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Resume.Models;


namespace Resume.Classes.Extensions {

	public static class DataExtensions {

		public static DbContext? GetContext<TModel> (this DbSet<TModel> dataset) where TModel : class {
			return ((dataset as IInfrastructure<IServiceProvider>).Instance.GetService (typeof (ICurrentDbContext)) as ICurrentDbContext)?.Context;
		}// GetContext;


		public static Guid? Save<TModel> (this DbSet<TModel> dataset, TModel parameters) where TModel : IDModel {

			bool new_record = not_set (parameters.GetValue ("id"));

			switch (new_record) {
				case true: dataset.Add (parameters); break;
				default: dataset.UpdateValues (parameters); break;
			}// if;

			dataset.GetContext ()?.SaveChanges ();
			return (Guid?) parameters.GetValue ("id")!;

		}// Save;


		private static void UpdateValues<TModel> (this DbSet<TModel> dataset, object values) where TModel: IDModel {

			var current = (from table in dataset
				where table.id.Equals (values.GetValue ("id"))
				select table
			).First ();

			current.Assign (values);
			dataset.Update (current);

		}// UpdateValues;

	}// DataExtensions;

}// RogerLMain.Classes.Extensions;