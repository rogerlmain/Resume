export {}


declare global {

	interface HTMLDivElement {
		form_data ();
	}// HTMLDivElement;

}// global;


/**** HTMLDivElement Prototype Functions ****/


HTMLDivElement.prototype.form_data = function (): FormData {

	let elements = this.querySelectorAll ("select");
	let result: FormData = new FormData ();

	elements.forEach (element => {
		result.append (element.id, element.value);
	});

	return result;

}// form_data;


