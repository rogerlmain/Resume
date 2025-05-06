import Container from "Controls/Container";
import TypedArray from "Classes/Collections/TypedArray";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { Component, createRef, CSSProperties, RefObject } from "react";


type EventFunction = (event: Event) => void;


const default_speed: number = 0.5;
const default_dimensions: Dimensions = { width: 15, height: 15 }
const default_coordinates: Coordinates = { x: 50, y: 50 }


class PulseDotProps {
	public speed?: number;
	public coordinates?: Coordinates;
	public dimensions?: Dimensions;
	public onComplete?: Function;
}// PulseDotProps;


export class PulseDotArray extends TypedArray { public constructor () { super (PulseDot) } }


export default class PulseDot extends Component<PulseDotProps> {

	private outer_dot_reference: RefObject<HTMLDivElement> = createRef ();
	private inner_dot_reference: RefObject<HTMLDivElement> = createRef ();


	private get outer_dot (): HTMLDivElement { return this.outer_dot_reference.current }
	private get inner_dot (): HTMLDivElement { return this.inner_dot_reference.current }


	private transition (speed: number): string { return `opacity ${speed}s, width ${speed}s, height ${speed}s, left ${speed}s, top ${speed}s` }


	private get outer_dot_style (): CSSProperties {
		return {
			position: "absolute",
			width: 0,
			height: 0,
			left: this.props.coordinates.x,
			top: this.props.coordinates.y,
			background: "radial-gradient(black, white)",
			opacity: 0,
			borderRadius: "100%",
			transition: this.transition (this.props.speed / 4),
			transitionTimingFunction: "linear"
		}// style;
	}// outer_dot_style;


	private get inner_dot_style (): CSSProperties {
		return this.outer_dot_style.assign ({
			width: 0,
			height: 0,
			left: this.props.coordinates.x,
			top: this.props.coordinates.y,
			transition: this.transition (this.props.speed / 2),
			background: "black"
		});
	}// outer_dot_style;


	private outer_transition_end (event: Event) {

		if ((event as TransitionEvent).propertyName != "opacity") return;

		this.outer_dot.ontransitionend = null;
		this.outer_dot.style.transition = `opacity ${this.props.speed}s, ${this.transition (this.props.speed)}`;

		this.outer_dot.style.assign ({
			opacity: 0,
			left: `${this.props.coordinates.x}px`,
			top: `${this.props.coordinates.y}px`,
			width: "0",
			height: "0"
		});

		this.inner_dot.style.assign ({
			opacity: 1,
			left: `${this.props.coordinates.x - (this.props.dimensions.width / 4)}px`,
			top: `${this.props.coordinates.y - (this.props.dimensions.height / 4)}px`,
			width: `${this.props.dimensions.width / 2}px`,
			height: `${this.props.dimensions.width / 2}px`
		});

	}// outer_transition_end;


	private inner_transition_end (event: Event) {
		this.inner_dot.ontransitionend = null;
		if (isset (this.props.onComplete)) this.props.onComplete ();
	}// inner_transition_end;


	/********/


	public static defaultProps: PulseDotProps = {
		coordinates: new Coordinates ().assign (default_coordinates),
		dimensions: new Dimensions ().assign (default_dimensions),
		speed: default_speed,
		onComplete: null
	}// defaultProps;


	public componentDidMount () {

		this.outer_dot.ontransitionend = this.outer_transition_end.bind (this);
		this.inner_dot.ontransitionend = this.inner_transition_end.bind (this);

		setTimeout (() => this.outer_dot.style.assign ({
			opacity: "0.7",
			width: `${this.props.dimensions.width}px`,
			height: `${this.props.dimensions.height}px`,
			left: `${this.props.coordinates.x - (this.props.dimensions.width / 2)}px`,
			top: `${this.props.coordinates.y - (this.props.dimensions.height / 2)}px`
		}), 10);

	}// componentDidMount;


	public render () {
		return <Container>
			<div name="outer_dot" style={this.outer_dot_style} ref={this.outer_dot_reference} />
			<div name="inner_dot" style={this.inner_dot_style} ref={this.inner_dot_reference} />
		</Container>
	}// render;


}// PulseDot;