import { Component, createRef, RefObject } from "react";


export default class TestPage extends Component {

	private canvas_reference: RefObject<HTMLCanvasElement> = createRef ();
	private canvas_context: CanvasRenderingContext2D = null;

	private get canvas (): HTMLCanvasElement { return this.canvas_reference.current }


	private draw_line () {

		this.canvas_context.strokeStyle = "#000000";
		this.canvas_context.lineWidth = 2;

		this.canvas_context.beginPath ();
		this.canvas_context.moveTo (0, 0);

		this.canvas_context.lineTo (this.canvas.width, this.canvas.height);
		this.canvas_context.stroke ();

	}// draw_line;


	private resize_canvas () {

		let image_data: ImageData = this.canvas_context.getImageData (0, 0, 300, 300);

		this.canvas.style.width = "400px";
		this.canvas.style.height = "400px";

		this.canvas.width = 400;
		this.canvas.height = 400;

		this.canvas_context.putImageData (image_data, 0, 0);

	}// resize_canvas;


	public componentDidMount () {
		this.canvas_context = this.canvas.getContext ("2d");
	}


	public render () {
		return <div className="full-page fully-centered spaced-out column-block">
			<canvas width="300" height="300" ref={this.canvas_reference} style={{
				width: "300px",
				height: "300px",
				border: "solid 1px red"
			}} />

			<div className="column-centered slightly-spaced-out row-block">
				<button onClick={() => this.draw_line ()}>Draw Line</button>
				<button onClick={() => this.resize_canvas ()}>Resize Canvas</button>
			</div>
		</div>
	}// render;

}// TestPage;