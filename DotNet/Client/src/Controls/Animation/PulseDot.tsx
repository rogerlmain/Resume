import TypedArray from "Classes/Collections/TypedArray";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { Component, createRef, CSSProperties, RefObject } from "react";
import Container from "../Container";


export class PulseDotArray extends TypedArray { public constructor () { super (PulseDot) } }


class PulseDotProps {
	public coordinates?: Coordinates;
	public dimensions?: Dimensions;
	public speed?: number;
	public onComplete?: Function;
}// PulseDotProps;


class PulseDotState {

	public outer_dot_coordinates: Coordinates = null;
	public outer_dot_dimensions: Dimensions = null;

	public inner_dot_coordinates: Coordinates = null;
	public inner_dot_dimensions: Dimensions = null;

	public opacity: number = 0;

}// PulseDotState;


const default_dimensions: Dimensions = { width: 15, height: 15 }
const default_coordinates: Coordinates = { x: 50, y: 50 }


const dot_ratio: number = 0.5;
const default_speed: number = 0.5;


export default class PulseDot extends Component<PulseDotProps, PulseDotState> {

	private outer_dot_reference: RefObject<HTMLDivElement> = createRef ();
	private inner_dot_reference: RefObject<HTMLDivElement> = createRef ();


	private get outer_dot (): HTMLDivElement { return this.outer_dot_reference.current }
	private get inner_dot (): HTMLDivElement { return this.inner_dot_reference.current }


	private transition (speed: number): string { return `width ${speed}s, height ${speed}s, left ${speed}s, top ${speed}s` }


	private get outer_dot_style (): CSSProperties {
		return {
			position: "absolute",
			width: `${this.state.outer_dot_dimensions.width}px`,
			height: `${this.state.outer_dot_dimensions.height}px`,
			left: this.state.outer_dot_coordinates.x,
			top: this.state.outer_dot_coordinates.y,
			backgroundColor: "black",
			opacity: this.state.opacity,
			borderRadius: "100%",
			transition: `opacity ${this.props.speed}s, ${this.transition (this.props.speed / 2)}`
		}// style;
	}// outer_dot_style;


	private get inner_dot_style (): CSSProperties {
		return this.outer_dot_style.assign ({ 
			width: `${this.state.inner_dot_dimensions.width}px`,
			height: `${this.state.inner_dot_dimensions.height}px`,
			left: this.state.inner_dot_coordinates.x,
			top: this.state.inner_dot_coordinates.y,
			transition: this.transition (this.props.speed * dot_ratio),
			opacity: 1
		});
	}// outer_dot_style;


	private get inner_dot_dimensions (): Dimensions { 
		return new Dimensions (
			Math.round (this.props.dimensions.width * dot_ratio), 
			Math.round (this.props.dimensions.height * dot_ratio)
		);
	}// inner_dot_dimensions;


	private coordinates (dimensions: Dimensions = null): Coordinates { 
		return new Coordinates (
			Math.round (this.props.coordinates.x - ((dimensions?.width ?? this.props.dimensions?.width) / 2)),
			Math.round (this.props.coordinates.y - ((dimensions?.height ?? this.props.dimensions?.height) / 2))
		);
	}// coordinates;


	private outer_transition_end (event: Event) {

		event.preventDefault ();
		event.stopPropagation ();

		this.outer_dot.removeEventListener ("transitionscomplete", this.outer_transition_end);
		this.outer_dot.hasTransitionsComplete = false;

		setTimeout (() => {

			this.outer_dot.style.transition = `opacity ${this.props.speed * 2}s, ${this.transition (this.props.speed)}`;

			this.setState ({

				opacity: 0,

				outer_dot_dimensions: new Dimensions (0, 0),
				outer_dot_coordinates: this.coordinates (new Dimensions (0, 0)),

				inner_dot_dimensions: this.inner_dot_dimensions,
				inner_dot_coordinates: this.coordinates (this.inner_dot_dimensions)

			});

		});
	}// outer_transition_end;


	private inner_transition_end (event: Event) {
		event.stopPropagation ();
		this.inner_dot.removeEventListener ("transitionscomplete", this.inner_transition_end);
		this.inner_dot.hasTransitionsComplete = false;
		if (isset (this.props.onComplete)) this.props.onComplete ();
	}// inner_transition_end;


	/********/


	public static defaultProps: PulseDotProps = {
		coordinates: new Coordinates (default_coordinates.x, default_coordinates.y),
		dimensions: new Dimensions (default_dimensions.width, default_dimensions.height),
		speed: default_speed,
		onComplete: null
	}// defaultProps;


	public state: PulseDotState = new PulseDotState ();


	public componentDidMount () {

		this.outer_dot.addEventListener ("transitionscomplete", this.outer_transition_end.bind (this));
		this.inner_dot.addEventListener ("transitionscomplete", this.inner_transition_end.bind (this));

		setTimeout (() => this.setState ({ 
			opacity: 0.5,
			outer_dot_dimensions: this.props.dimensions,
			outer_dot_coordinates: this.coordinates ()
		}));

	}// componentDidMount;


	public render = () => <Container>
		<div name="outer_dot" style={this.outer_dot_style} ref={this.outer_dot_reference} />
		<div name="inner_dot" style={this.inner_dot_style} ref={this.inner_dot_reference} />
	</Container>


	public constructor (props: PulseDotProps) {

		super (props);

		this.state.outer_dot_dimensions = this.state.inner_dot_dimensions = new Dimensions (0, 0);
		this.state.outer_dot_coordinates = this.state.inner_dot_coordinates = this.coordinates (this.state.outer_dot_dimensions);

	}// constructor;


}// PulseDot;