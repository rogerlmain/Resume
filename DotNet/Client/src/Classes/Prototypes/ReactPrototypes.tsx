import { Component } from "react";


declare global {
	type Callback = () => void;
}// global;


declare module "react" {

	interface Component {
		toggleState (value: Object, callback: Callback): void;
	}// Component;

}// module;


Component.prototype.toggleState = function (value: Object, callback: Callback = null) {

	let togglables: Object = null;

	value.Keys.forEach ((key: string) => {
		if (is_null (togglables)) togglables = new Object ();
		togglables [key] = isset (this.state [key]) ? null : value [key];
	});

	this.setState (togglables, callback);

}// toggleState;


