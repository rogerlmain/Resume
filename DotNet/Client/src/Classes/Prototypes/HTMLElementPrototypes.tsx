import { StringList } from "Classes/Globals";


export {}


type TransitionEndEventType = (this: HTMLElement, event: any) => any;


const transitions_complete_event = new CustomEvent ("transitionscomplete", { bubbles: true });


declare global {

	interface HTMLElement {

		setClass (value: String, condition: Boolean): void;
		styleSelector (style: string, value: string): HTMLElement;

		transitionEvents: StringArray;
		hasTransitionsComplete: boolean;

		get tagType (): string;
		get totalWidth (): number;
		get totalHeight (): number;

	}// HTMLElement;


}// global;


function get_transitions_list (element: HTMLElement): StringList {
	
	let result: StringList = null;
	let transitions: StringList = element.style.transition.split (String.Comma);

	transitions.forEach ((transition: string) => {
		let parts: StringList = transition.trim ().split (String.Space).filter ((item: string) => not_empty (item.trim ()));
		if (is_null (result)) result = new StringList ();
		result.push (parts [0]);
	});

	return result;

}// get_transitions_list;


/**** HTMLElement Prototype Functions ****/


HTMLElement.prototype.setClass = function (value: string, condition: Boolean) {
	if (condition) return this.classList.add (value);
	this.classList.remove (value);
}// setClass;


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


var previous_event: TransitionEvent = null;


window.addEventListener ("transitionend", (event: TransitionEvent) => {

	let element: HTMLElement = event.target as HTMLElement;

	if (!element.hasTransitionsComplete) return;

previous_event = event;

	let transitions = get_transitions_list (element);

	if (!element.transitionEvents?.contains (event.propertyName)) {
		if (not_set (element.transitionEvents)) element.transitionEvents = new StringList ();
		element.transitionEvents.push (event.propertyName);
	}// if;

	if (is_empty (transitions.filter ((item: string) => !element.transitionEvents.contains (item)))) element.dispatchEvent (transitions_complete_event);
	
});


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


