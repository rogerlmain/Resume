using System.Reflection;


namespace Resume.Classes.Extensions {

	public static class ObjectExtensions {

		public static TModel? Append<TModel> (this Object self, object model) {

			TModel? result = (TModel) Activator.CreateInstance (typeof (TModel))!;

			StringList? model_keys = model?.GetKeys ();
			StringList? result_keys = result?.GetKeys ();

			if ((model_keys is null) || (result_keys is null)) return default;

			StringList? columns = (StringList?) result_keys.Intersect (model_keys).ToListOrNull ();
			if ((columns is null) || (columns.Count == 0)) return default;

			result.Assign (self);
			result.Assign (model!);

			return result;

		}// Append;


		public static TModel Assign<TModel> (this TModel self, object model, bool copy_nulls = false) {

			StringList? keys = ExtendedStringList.Join (self?.GetKeys (), model.GetKeys ());

			if (is_null (keys)) throw new Exception ("Cannot copy fields. Nothing to copy.");

			foreach (string key in keys!) {
				if (is_null (model.GetValue (key)) && !copy_nulls) continue;
				self!.SetValue (key, model.GetValue (key));
			}// foreach;

			return self;

		}// Assign;


		public static StringList? GetKeys (this object source) {

			StringList? result = null;

			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}// foreach;

			return result;

		}// GetKeys;


		public static object? GetValue (this object self, string field) => self.GetType ().GetProperty (field)?.GetValue (self);


		public static TModel SetValue<TModel> (this TModel self, string field_name, dynamic? value) {

			PropertyInfo? property = self!.GetType ().GetProperty (field_name);

			if (property is null) return self;

			if (value is null) {
				property.SetValue (self, null);
				return self;
			}// if;

			if (property.BooleanType ()) {
				property.SetValue (self, ((Type) value.GetType ()).BooleanType () ? value : value == 1);
				return self;
			}// if;

			if (value is decimal && value % 1 == 0) {
				property.SetValue (self, Convert.ToInt32 (value));
				return self;
			}// if;

			self.GetType ().GetProperty (field_name)?.SetValue (self, value);
			return self;

		}// SetValue;

	}// ObjectExtensions;

}// RogerLMain.Classes.Extensions;