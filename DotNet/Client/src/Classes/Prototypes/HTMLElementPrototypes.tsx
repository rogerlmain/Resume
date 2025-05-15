import { StringList } from "Classes/Globals";


export {}


type TransitionEndEventType = (this: HTMLElement, event: any) => any;


declare global {

	interface HTMLElement {

		setClass (value: String, condition: Boolean): void;
		sibling (selector: string): HTMLElement;
		styleSelector (style: string, value: string): HTMLElement;

		transitionEvents: StringArray;
		hasTransitionsComplete: boolean;

		get tagType (): string;
		get totalWidth (): number;
		get totalHeight (): number;

	}// HTMLElement;


}// global;


/**** HTMLElement Prototype Functions ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


HTMLElement.prototype.sibling = function (selector: string) { return this.parentElement.querySelector (selector) }


HTMLElement.prototype.styleSelector = function (style: string, value: string): HTMLElement {

	for (let child of this.childNodes) {

		let next_child: HTMLElement = (child as HTMLElement);

		if (next_child.style [style].matches (value)) return next_child;
		return next_child.styleSelector (style, value);

	}// for;

	return null;

}// styleSelector;


let nativeEventListener: Function = HTMLElement.prototype.addEventListener;


HTMLElement.prototype.addEventListener = function (event: string, handler: TransitionEndEventType) {
	this.hasTransitionsComplete = (event == "transitionscomplete");
	nativeEventListener (event, handler);
}// addEventListener;


Object.defineProperties (HTMLElement.prototype, {
	tagType: {
		get: function (): string {
			if (this.tagName == "INPUT") return this.getAttribute ("type").toLowerCase ();
			return this.tagName.toLowerCase ();
		}// tagType;
	},

	totalWidth: {
		get: function (): number { 
			let style = window.getComputedStyle (this);
			return this.offsetWidth + parseInt (style.marginLeft) + parseInt (style.marginRight)
		}
	},

	totalHeight: {
		get: function (): number { 
			let style = window.getComputedStyle (this);
			return this.offsetWidth + parseInt (style.marginTop) + parseInt (style.marginBottom)
		}
	}

});


declare module "react" {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		commas?: string;
		decimalPlaces?: number;
		leadingZeros?: boolean;
		negativeNumbers?: string;
		name?: string;
	}// HTMLAttributes;

}// react;


