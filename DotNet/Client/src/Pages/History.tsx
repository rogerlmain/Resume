import PulseDot, { PulseDotArray } from "Controls/Animation/PulseDot";
import { Coordinates } from "Controls/Animation/Coordinates";

import { Component, createRef, RefObject } from "react";


class HistoryPageState {
	context: CanvasRenderingContext2D = null;
	coordinates: Coordinates = null;
	pulse_dots: PulseDotArray = null;
}// HistoryPageState;


export default class HistoryPage extends Component<Object, HistoryPageState> {

	private canvas_ref: RefObject<HTMLCanvasElement> = createRef ();


	private get canvas (): HTMLCanvasElement { return this.canvas_ref.current }


	/********/


	public state: HistoryPageState = new HistoryPageState ();


	private draw_line () {

		this.state.coordinates.x++;

		this.state.context.lineTo (this.state.coordinates.x, this.state.coordinates.y);
		this.state.context.stroke ();

		if (this.state.coordinates.x < 700) setTimeout (() => this.draw_line ());

	}// move_line;


	private add_pulse_dot () {
		if (is_null (this.state.pulse_dots)) this.state.pulse_dots = new PulseDotArray ();
		this.state.pulse_dots.push (<PulseDot onComplete={() => {/*alert ("pulse dot complete")*/}} />);
		this.forceUpdate ();
	}// pulsate;


	public animate () {

		this.add_pulse_dot ();

return;

		this.state.coordinates = new Coordinates (50, 50);

		this.state.context.strokeStyle = "#000000";
		this.state.context.lineWidth = 2;

		this.state.context.beginPath ();
		this.state.context.moveTo (this.state.coordinates.x, this.state.coordinates.y);

		this.draw_line ();

	}// animate;


	public componentDidMount () {
/*
		this.setState ({ context: this.canvas.getContext ("2d") }, () => {
			this.canvas.width = parseInt (window.getComputedStyle (this.canvas).width);
			this.canvas.height = parseInt (window.getComputedStyle (this.canvas).height);
		});
*/
	}// componentDidMount;


	public render () {
		return <div className="column-centered full-size column-block">

			<div className="Title">History</div>

<button onClick={this.animate.bind (this)}>Doit</button>
<button onClick={() => alert (window.devicePixelRatio)}>Showme</button>

			<div className="full-size outlined" style={{ position: "relative" }}>
{/*
				<canvas key="main_canvas" id="main_canvas" className="full-page" style={{ 
					border: "solid 1px blue",
					imageRendering: "pixelated"
				}} ref={this.canvas_ref} />
*/}
				{this.state.pulse_dots}

			</div>

		</div>
	}// render;

}// HistoryPage;