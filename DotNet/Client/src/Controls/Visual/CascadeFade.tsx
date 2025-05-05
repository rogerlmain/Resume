import Container from "Controls/Container";
import FadePanel from "Controls/Visual/FadePanel";

import { Component, createRef, isValidElement, RefObject } from "react";


type ElementList = NodeListOf<HTMLElement>;


class CascadeFadeProps {
	public children: ReactElementContainer;
	public speed: number;
}// CascadeFadeProps;


class CascadeFadeState {
	public elements: ElementList = null;
	public showing: boolean = true;
}// CascadeFadeState;


export default class CascadeFade extends Component<CascadeFadeProps, CascadeFadeState> {

	private container_ref: RefObject<HTMLDivElement> = createRef ();


	private get container (): HTMLDivElement { return this.container_ref.current }
	

	private get next_element (): HTMLElement {

		let element: HTMLElement = null;

		for (element of this.state.elements) {
			if (parseFloat (element.style.opacity) == (this.state.showing ? 0 : 1)) return element;
		}// for;

		return null;

	}// next_element;


	private show_item () {
		let element = this.next_element;
		if (isset (element)) element.style.opacity = "1";
	}// show_item;


	private hide_item () {
		let element = this.next_element;
		if (isset (element)) element.style.opacity = "0";
	}// hide_item;


	/********/


	public static defaultProps: CascadeFadeProps = {
		children: null,
		speed: 1
	}// defaultProps;


	public state: CascadeFadeState = new CascadeFadeState ();


	public show = () => this.setState ({ showing: true }, () => this.show_item ());
	public hide = () => this.setState ({ showing: false }, () => this.hide_item ());


	public componentDidMount () {

		let fadeables: ElementList = this.container.querySelectorAll (".fadeable");

		fadeables.forEach ((item: HTMLElement) => {

			item.style.opacity = "0";
			item.style.transition = `opacity ${this.props.speed}s`;

			item.addEventListener ("transitionend", () => (this.state.showing) ? this.show_item () : this.hide_item ());

		});

		this.state.elements = fadeables;

	}// componentDidMount;


	public render = () => <div ref={this.container_ref}>{this.props.children}</div>

}// CascadeFade;