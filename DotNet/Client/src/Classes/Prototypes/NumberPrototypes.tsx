export {}


declare global {

	interface Number {
		padded (digits: number): string;
	}// Number;

}// global;


/**** Number Prototypes ****/


Number.prototype.padded = function (digits: number) { return this.toString ().padStart (digits, "0") }


