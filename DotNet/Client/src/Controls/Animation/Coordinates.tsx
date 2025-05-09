export class Coordinates {

	public x: NumberString = 0;
	public y: NumberString = 0;


	public get XString (): string { return typeof (this.x) == "number" ? `${this.x}px` : this.x as string }
	public get YString (): string { return typeof (this.y) == "number" ? `${this.y}px` : this.y as string }

	public get XValue (): number { return typeof (this.x) == "number" ? this.x : parseInt (this.x) }
	public get YValue (): number { return typeof (this.y) == "number" ? this.y : parseInt (this.y) }


	public constructor (x: NumberString = 0, y: NumberString = 0) {
		this.x = x;
		this.y = y;
	}// constructor;

}// Coordinates;


export class Dimensions {

	width: NumberString = 0;
	height: NumberString = 0;


	public get XString (): string { return typeof (this.width) == "number" ? `${this.width}px` : this.width as string }
	public get YString (): string { return typeof (this.height) == "number" ? `${this.height}px` : this.height as string }

	public get XValue (): number { return typeof (this.width) == "number" ? this.width : parseInt (this.width) }
	public get YValue (): number { return typeof (this.height) == "number" ? this.height : parseInt (this.height) }


	public constructor (x: NumberString = 0, y: NumberString = 0) {
		this.width = x;
		this.height = y;
	}// constructor;

}// Dimensions;