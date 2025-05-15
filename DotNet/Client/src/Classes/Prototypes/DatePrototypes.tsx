import { DateFormat } from "Classes/Globals";

export {}


declare global {
	interface DateConstructor {
		format (date_value: string | Date, format?: DateFormat): string;
		isDate (candidate: any): boolean;
		month_name (month: number): string;
		weekday_name (day: number): string;
	}// DateConstructor;


	interface Date {
		appended_day (): string;
		format (template: string): string;
	}// Date;

}// global;


/**** DateConstructor Prototypes ****/


Date.format = function (date_value: string | Date, format: DateFormat = DateFormat.readable): string {

	if (is_null (date_value)) return null;

	let date: Date = (date_value instanceof Date) ? date_value : new Date (date_value);

	if (format == DateFormat.readable) return `${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}-${date.getFullYear ()}`;
	if (format == DateFormat.database) return `${date.getFullYear ()}-${(date.getMonth () + 1).toString ().padStart (2, "0")}-${date.getDate ().toString ().padStart (2, "0")}`;

	return date.toDateString ();

}// Date.format;


Date.isDate = function (candidate: any): boolean { return candidate instanceof Date }
Date.month_name = (month: number) => { return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1] }
Date.weekday_name = (day: number) => { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day - 1] }


/**** Date Prototypes ****/


Date.prototype.appended_day = function () {

	let day = this.getDate ();

	switch (day) {
		case 1: return `${day}st`;
		case 2: return `${day}nd`;
		case 3: return `${day}rd`;
		default: return `${day}th`;
	}// switch;
	
}// appended_day;


Date.prototype.format = function (template: string | DateFormat = DateFormat.readable) {

	let hours = this.getHours ();
	let month = this.getMonth ();

	let format: string = (String.isString (template) ? (template as string) : (template == DateFormat.readable ? "M-d-yyyy" : "yyyy-MM-dd"));
	let result = (format.replace ? format : String.Empty);

	result = result.
		replace ("yyyy", this.getFullYear ().padded (4)).
		replace ("MMMM", Date.month_name (month + 1)).
		replace ("MM", (month + 1).padded (2)).
		replace ("dd", this.getDate ().padded (2)).
		replace ("HH", hours.padded (2)).
		replace ("mm", this.getMinutes ().padded (2)).
		replace ("ss", this.getSeconds ().padded (2)).
		replace ("M", (month + 1).toString ()).
		replace ("ad", this.appended_day ()).
		replace ("d", this.getDate ().toString ()).
		replace ("H", ((hours % 12) || 12).toString ()).
		replace ("ap", (hours < 12) ? "am" : "pm").
		replace ("w", Date.weekday_name [this.getDay ()]);

	return result;

}// format;




