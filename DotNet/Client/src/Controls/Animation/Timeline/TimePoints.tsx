import PulseDot, { PulseDotArray } from "Controls/Animation/PulseDot";
import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { Component, ReactElement } from "react";


class TimePointsState {
	public pulse_dots: PulseDotArray = null;
	public coordinates: Coordinates = null;
}// TimePointsState;


export default class TimePoints extends Component<Object, TimePointsState> {

	public state: TimePointsState = new TimePointsState ();


	public add_pulse_dot (coordinates: Coordinates, onComplete: Function = null) {

		let pulse_dot: ReactElement = <PulseDot speed={0.5} dimensions={new Dimensions (15, 15)} coordinates={coordinates} onComplete={onComplete} />

		if (is_null (this.state.pulse_dots)) this.state.pulse_dots = new PulseDotArray ();

		this.state.pulse_dots.push (pulse_dot);
		this.forceUpdate ();

	}// add_pulse_dot;


	public render = () => this.state.pulse_dots;

}// TimePoints;