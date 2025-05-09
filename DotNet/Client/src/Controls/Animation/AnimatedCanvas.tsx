import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { Component, createRef, RefObject } from "react";


class AnimatedCanvasProps {
	public dimensions: Dimensions;
}// AnimatedCanvasProps;


class AnimatedCanvasState {
	public context: CanvasRenderingContext2D = null;
	public image_data: ImageData = null;
}// AnimatedCanvasState;


export default class AnimatedCanvas extends Component<AnimatedCanvasProps, AnimatedCanvasState> {

	private canvas_reference: RefObject<HTMLCanvasElement> = createRef ();


	private get canvas (): HTMLCanvasElement { return this.canvas_reference.current }


	private animate_line (start: Coordinates, end: Coordinates, onComplete: Function) {

		if ((start.XValue == end.XValue) && (start.YValue == end.YValue)) return onComplete ();

		let destination: Coordinates = new Coordinates ().assign ({
			x: (end.XValue == start.XValue) ? start.XValue : (end.XValue > start.XValue) ? start.XValue + 1 : start.XValue - 1,
			y: (end.YValue == start.YValue) ? start.YValue : (end.YValue > start.YValue) ? start.YValue + 1 : start.YValue - 1
		});
		
		this.state.context.lineTo (destination.XValue, destination.YValue);
		this.state.context.stroke ();

		setTimeout (() => this.animate_line (destination, end, onComplete));

	}// animate_line;


	private update_canvas (dimensions: Dimensions) {
		this.canvas.style.width = dimensions.XString;
		this.canvas.style.height = dimensions.YString;
		this.canvas.width = dimensions.XValue;//parseInt (window.getComputedStyle (this.canvas).width);
		this.canvas.height = dimensions.YValue;//parseInt (window.getComputedStyle (this.canvas).height);
	}// update_canvas;


	/********/


	public state: AnimatedCanvasState = new AnimatedCanvasState ();


	public static defaultProps: AnimatedCanvasProps = {
		dimensions: new Dimensions ("100%", "100%")
	}// defaultProps;


	public draw_line (start: Coordinates, end: Coordinates, onComplete: Function) {

		this.state.context.strokeStyle = "#000000";
		this.state.context.lineWidth = 2;

		this.state.context.beginPath ();
		this.state.context.moveTo (start.XValue, start.YValue);

		return this.animate_line (start, end, onComplete);

	}// draw_line;


	public shouldComponentUpdate (props: AnimatedCanvasProps) {

		if (not_set (this.state.context)) return false;

		if (!this.props.dimensions.matches (props.dimensions)) {
			if ((this.canvas.width > 0) && (this.canvas.height > 0)) this.state.image_data = this.state.context.getImageData (0, 0, this.canvas.width, this.canvas.height);
			this.update_canvas (props.dimensions);
		}// if;

		return true;

	}// componentDidUpdate;


	public componentDidUpdate (props: AnimatedCanvasProps, state: AnimatedCanvasState) {
		/*if (this.state.image_data != state.image_data)*/ 
		if (isset (this.state.image_data)) {
			this.state.context.putImageData (this.state.image_data, 0, 0);
			this.state.image_data = null;
		}// if;
	}// componentDidUpdate;


	public componentDidMount () {
		this.setState ({ context: this.canvas.getContext ("2d") }, () => this.update_canvas (this.props.dimensions));
	}// componentDidMount;


	public render = () => <canvas key="main_canvas" id="main_canvas" style={{ 
border: "solid 1px blue",
		imageRendering: "pixelated"/*,
		width: this.props.dimensions.XString,
		height: this.props.dimensions.YString*/
	}} ref={this.canvas_reference} />

}// AnimatedCanvas;