import PulseDot, { PulseDotArray } from "Controls/Animation/PulseDot";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { Component, createRef, ReactElement, RefObject } from "react";


const margin: number = 50;


class TimelineProps {
	public row_count?: number;
	public data: EmploymentModelList;
}// TimelineProps;


class TimelineState {
	context: CanvasRenderingContext2D = null;
	coordinates: Coordinates = null;
	pulse_dots: PulseDotArray = null;
	active_model: EmploymentModel = null;
	total_length: number = 0;
	current_location: Coordinates = null;
}// TimelineState;


export default class Timeline extends Component<TimelineProps, TimelineState> {

	private canvas_ref: RefObject<HTMLCanvasElement> = createRef ();


	private get canvas (): HTMLCanvasElement { return this.canvas_ref.current }


	private month_difference = (start_date: string, end_date: string): number => this.month_value (end_date) - this.month_value (start_date);


	private month_value (date: string): number {

		let parts = date.split ("-");
		let result: number = ((parseInt (parts [0]) - 1) * 12) + parseInt (parts [1]);

		return result;

	}// month_value;


	private get_date_percentages () {

		let date_range: number = this.month_difference (this.props.data [this.props.data.length - 1].end_date, this.props.data [0].start_date) / this.props.row_count;

		this.props.data.forEach ((model: EmploymentModel) => {

			let start_date = model.start_date as unknown as string;
			let end_date = model.end_date as unknown as string;

			model.date_percentage = round (this.month_difference (end_date, start_date) / date_range, 2);

		});

	}// get_date_percentages;


	/********/


	public static defaultProps: TimelineProps = {
		row_count: 4,
		data: null
	}// defaultProps;


	public state: TimelineState = new TimelineState ();


	private add_pulse_dot () {

		let coordinates: Coordinates = new Coordinates (this.state.current_location.x, this.state.current_location.y);
		let next_location: Coordinates = new Coordinates (coordinates.x + Math.round ((this.state.total_length * this.state.active_model.date_percentage)), this.state.current_location.y);

		let pulse_dot: ReactElement = <PulseDot speed={0.5} dimensions={new Dimensions (15, 15)} coordinates={coordinates} onComplete={() => this.draw_line (next_location)} />

		if (is_null (this.state.pulse_dots)) this.state.pulse_dots = new PulseDotArray ();

		this.state.pulse_dots.push (pulse_dot);
		this.forceUpdate ();

	}// pulsate;


	public animate () {

		//if (is_null (this.state.context)) return setTimeout (this.animate.bind (this));

		//this.state.coordinates = new Coordinates (50, 50);
		//this.state.total_length = this.canvas.width - (margin * 2);

		//this.state.context.strokeStyle = "#000000";
		//this.state.context.lineWidth = 2;

		//this.state.context.beginPath ();
		//this.state.context.moveTo (this.state.coordinates.x, this.state.coordinates.y);

		this.state.current_location = new Coordinates (margin, margin);
		this.state.active_model = this.props.data [0];

		this.add_pulse_dot ();

	}// animate;


	private draw_line (destination: Coordinates) {

		//this.state.coordinates.x++;

		//this.state.context.lineTo (this.state.coordinates.x, this.state.coordinates.y);
		//this.state.context.stroke ();

		//if (this.state.coordinates.x < destination.x) return setTimeout (() => this.draw_line (destination));
		//if (this.state.coordinates.x >= margin + this.state.total_length) return;
		//if (this.props.data.indexOf (this.state.active_model) == this.props.data.length - 1) return;

		//this.state.active_model = this.props.data [this.props.data.indexOf (this.state.active_model) + 1];
		//this.state.current_location = new Coordinates ().assign (this.state.coordinates);

		this.add_pulse_dot ();

	}// move_line;


	public componentDidUpdate (props: TimelineProps) {
		if (props.data != this.props.data) {
			this.get_date_percentages ();
			this.animate ();
		}// if;

	}// componentDidUpdate;


	public componentDidMount () {
	//	this.setState ({ context: this.canvas.getContext ("2d") }, () => {
	//		this.canvas.width = parseInt (window.getComputedStyle (this.canvas).width);
	//		this.canvas.height = parseInt (window.getComputedStyle (this.canvas).height);
	//	});
	}// componentDidMount;


	public render () {
		return <div className="full-page column-centered relative column-block">
{/*
			<canvas key="main_canvas" id="main_canvas" className="full-page" style={{ 
				border: "solid 1px blue",
				imageRendering: "pixelated"
			}} ref={this.canvas_ref} />
*/}
			{this.state.pulse_dots}

		</div>
	}// render;


}// Timeline;