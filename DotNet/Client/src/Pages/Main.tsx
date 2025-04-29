import APIClass from "Classes/APIClass";
import PopupWindow from "Controls/Windows/PopupWindow";

import { Component, createRef, RefObject } from "react";


declare global {
	var popup_window: PopupWindow;
}// global;


globalThis.popup_window = null;


export default class MainPage extends Component {

	private popup_window: RefObject<PopupWindow> = createRef ();
	private output: string = null;

	public render () {
		return <div>
			<PopupWindow id="popup_window" ref={this.popup_window} />
			<div>Hello World! {this.output}</div>
		</div>
	}// render;


	constructor () {
		super (null);
		APIClass.fetch_data ("GetStuff").then (response => {
			this.output = response.data;
			this.forceUpdate ();
		});
	}// constructor;

}// MainPage;
