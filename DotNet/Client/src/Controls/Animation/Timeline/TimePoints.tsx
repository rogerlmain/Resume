import TypedArray from "Classes/Collections/TypedArray";

import PulseDot, { PulseDotArray } from "Controls/Animation/PulseDot";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { Component, CSSProperties, ReactElement, RefObject, createRef } from "react";


class DotElementList extends TypedArray { public constructor () { super (DotElement) } }


class DotElement {
	element: ReactElement = null;
	coordinates: Coordinates = null;
	reference: RefObject<HTMLDivElement> = null;
}// DotElement;


class TimePointProps {
	public dimensions?: Dimensions = null;
	public speed?: number = null;
}// TimePointProps;


class TimePointsState {
	public pulse_dots: PulseDotArray = null;
}// TimePointsState;


export default class TimePoints extends Component<TimePointProps, TimePointsState> {

	private get_style (coordinates: Coordinates): CSSProperties {

		let result: CSSProperties = {
			left: coordinates.XString,
			top: coordinates.YString,
			width: `${this.props.dimensions.width}px`,
			height: `${this.props.dimensions.height}px`
		}// result;

		return result;

	}// get_style;


	/********/


	public get width (): number { return this.props.dimensions.XValue }
	public get height (): number { return this.props.dimensions.YValue }


	public get last_dot (): DotElement { return this.state.pulse_dots?.[this.state.pulse_dots.length - 1] ?? null }


	public static defaultProps: TimePointProps = {
		dimensions: new Dimensions (15, 15),
		speed: 0.25
	}// defaultProps;


	public state: TimePointsState = new TimePointsState ();


	public add_pulse_dot (coordinates: Coordinates, onComplete: Function = null) {

		let dot_reference: RefObject<HTMLDivElement> = createRef ();

		let pulse_dot: DotElement = new DotElement ().assign ({
			reference: dot_reference,
			coordinates: new Coordinates ().assign (coordinates),
			element: <div className="absolute" style={this.get_style (coordinates)} ref={dot_reference}>
				<PulseDot speed={this.props.speed} dimensions={this.props.dimensions} onComplete={onComplete} />
			</div>
		});

		if (is_null (this.state.pulse_dots)) this.state.pulse_dots = new PulseDotArray ();

		this.state.pulse_dots.push (pulse_dot);
		this.forceUpdate ();

	}// add_pulse_dot;


	public render = () => this.state.pulse_dots?.map ((dot: DotElement) => dot.element);

}// TimePoints;