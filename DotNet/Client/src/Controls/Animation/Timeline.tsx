import TimePoints from "Controls/Animation/Timeline/TimePoints";

import { PulseDotArray } from "Controls/Animation/PulseDot";

import { Coordinates } from "Controls/Animation/Coordinates";
import { EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { Component, createRef, RefObject } from "react";


const vertical_height: number = 50;
const arc_radius: number = 25;
const curve_length: number = Math.PI * arc_radius / 2;


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
	private time_points_reference: RefObject<TimePoints> = createRef ();


	private get canvas (): HTMLCanvasElement { return this.canvas_ref.current }
	private get time_points (): TimePoints { return this.time_points_reference.current }


	private get destination (): Coordinates {
		return new Coordinates ().assign ({
			x: this.state.current_location.x + Math.round ((this.state.total_length * this.state.active_model.date_percentage)), 
			y: this.state.current_location.y
		});
	}// destination;


	private get_date_percentages () {

		let date_range: number = this.month_difference (this.props.data [0].start_date, this.props.data [this.props.data.length - 1].end_date) / this.props.row_count;

		for (let index = 0; index < this.props.data.length; index++) {

			let start_date = this.props.data [index].start_date as unknown as string;
			let end_date = (index == (this.props.data.length - 1) ? this.props.data [index].end_date : this.props.data [index + 1].start_date) as unknown as string;

			this.props.data [index].date_percentage = round (this.month_difference (start_date, end_date) / date_range, 2);

		}// for;

	}// get_date_percentages;


	private month_difference = (start_date: string, end_date: string): number => this.month_value (end_date) - this.month_value (start_date);


	private month_value (date: string): number {

		let parts = date.split ("-");
		let result: number = ((parseInt (parts [0]) - 1) * 12) + parseInt (parts [1]);

		return result;

	}// month_value;


	/********/


	public static defaultProps: TimelineProps = {
		row_count: 4,
		data: null
	}// defaultProps;


	public state: TimelineState = new TimelineState ();


	public add_time_point () {
		let destination: Coordinates = this.destination;
	//	let callback: Function = (destination.x > this.state.total_length - (margin * 2)) ? () => this.draw_curve () : () => this.draw_line (this.destination);
	//	this.time_points.add_pulse_dot (this.state.current_location, () => callback ());
		let callback: Function = (this.state.active_model == this.props.data [2]) ? () => this.draw_curve () : () => this.draw_line (this.destination);
		this.time_points.add_pulse_dot (this.state.current_location, () => callback ());
	}// add_time_point;


	public animate () {

		if (is_null (this.state.context)) return setTimeout (this.animate.bind (this));

		this.state.coordinates = new Coordinates (0, 0);
		this.state.total_length = /*this.canvas.width*/ window.innerWidth;

		this.state.context.strokeStyle = "#000000";
		this.state.context.lineWidth = 2;

		this.state.context.beginPath ();
		this.state.context.moveTo (this.state.coordinates.x, this.state.coordinates.y);

		this.state.current_location = new Coordinates (0, 0);
		this.state.active_model = this.props.data [0];

		this.add_time_point ();

	}// animate;


	private radians = (degrees: number) => round (degrees * (Math.PI / 180), 2);


	private draw_curve () {

		let arc_angle: number = round (270 * (Math.PI / 180), 2);

let line_length: number = this.destination.x - this.state.coordinates.x;
let available_space = this.canvas.width - this.state.coordinates.x;
alert (curve_length + "\n" + line_length + "\n" + (curve_length + line_length) + "\n" + available_space + "\n" + (available_space - (curve_length - line_length)));

		let arc_center: Coordinates = new Coordinates ().assign ({
			x: this.state.coordinates.x,
			y: this.state.coordinates.y + arc_radius
		});

		this.state.context.beginPath ();
		this.state.context.arc (arc_center.x, arc_center.y, arc_radius, this.radians (270), this.radians (0));
		this.state.context.stroke ();

	}// draw_curve;


	private draw_line (destination: Coordinates) {

		this.state.coordinates.x++;

		this.state.context.lineTo (this.state.coordinates.x, this.state.coordinates.y);
		this.state.context.stroke ();


if (this.state.coordinates.x == (this.canvas.width - arc_radius)) {

	return this.draw_curve ();//alert ("it's time");
}

		if (this.state.coordinates.x < destination.x) return setTimeout (() => this.draw_line (destination));
		if (this.props.data.indexOf (this.state.active_model) == this.props.data.length - 1) return;

		this.state.active_model = this.props.data [this.props.data.indexOf (this.state.active_model) + 1];
		this.state.current_location = new Coordinates ().assign (this.state.coordinates);

		this.add_time_point ();

	}// draw_line;


	public componentDidUpdate (props: TimelineProps) {
		if (props.data != this.props.data) {
			this.get_date_percentages ();
			this.animate ();
		}// if;

	}// componentDidUpdate;


	public componentDidMount () {
		this.setState ({ context: this.canvas.getContext ("2d") }, () => {
			this.canvas.width = 375;//parseInt (window.getComputedStyle (this.canvas).width);
			this.canvas.height = 200;//parseInt (window.getComputedStyle (this.canvas).height);
		});
	}// componentDidMount;


	public render () {
/*column-centered */
		return <div className="full-page relative column-block">
{/*className="full-size" */}
			<canvas id="main_canvas" style={{ 
				border: "solid 1px blue",
				imageRendering: "pixelated",
width: "375px",
height: "200px"
			}} ref={this.canvas_ref} />

			<TimePoints ref={this.time_points_reference} />

		</div>
	}// render;


}// Timeline;