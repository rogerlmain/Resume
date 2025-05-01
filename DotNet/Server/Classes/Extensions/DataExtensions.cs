using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Resume.Models;
using System;
using System.Linq.Expressions;

using fex = System.Linq.Expressions.Expression<System.Func<dynamic, bool>>;


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


		public static void SaveAll<TModel> (this DbSet<TModel> dataset, List<TModel> parameters) where TModel: IDModel {
			dataset.AddRange (parameters);
			dataset.GetContext ()?.SaveChanges ();
		}// SaveAll;


		public static Expression<Func<TModel, bool>>? ConditionalExpression<TModel> (Object parameters) {

			ParameterExpression parameter = Expression.Parameter (typeof (TModel), "p");
			Expression? body = null;
			StringList? keys = parameters.GetKeys ();

			if (keys is null) return null;

			foreach (String key in keys) {

				Object? value = parameters.GetValue (key);

				if (value is null) continue;

				MemberExpression member = Expression.Property (parameter, key);
				ConstantExpression constant = Expression.Constant (value);
				BinaryExpression expression = Expression.Equal (member, constant);

				body = (body is null) ? expression : Expression.AndAlso (body, expression);

			}// foreach;

			return (body is null) ? null : Expression.Lambda<Func<TModel, bool>> (body, parameter);

		}// ConditionalExpression;


		public static void Delete<TModel> (this DbSet<TModel> dataset, Object parameters) where TModel: class {

			var expression = ConditionalExpression<TModel> (parameters);

			if (expression is null) return;

			dataset.RemoveRange (dataset.Where (expression));
			dataset.GetContext ()?.SaveChanges ();

		}// Delete;


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