import TimePoints from "Controls/Animation/Timeline/TimePoints";

import { PulseDotArray } from "Controls/Animation/PulseDot";

import { Coordinates } from "Controls/Animation/Coordinates";
import { EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { Component, createRef, RefObject } from "react";


const debugging: boolean = true;
const debug_width: number = 375;
const debug_height: number = 200;


const line_modifier: number = 25;
const vertical_height: number = 50;
const arc_radius: number = 25;
const curve_length: number = Math.PI * arc_radius / 2;
const bend_size: number = Math.round ((curve_length * 2) + vertical_height);

class TimelineProps {
//	public row_count?: number;
	public data: EmploymentModelList;
}// TimelineProps;


class TimelineState {
	context: CanvasRenderingContext2D = null;
	coordinates: Coordinates = null;
	pulse_dots: PulseDotArray = null;
	active_model: EmploymentModel = null;
	total_length: number = 0;
	completed_length: number = 0;
	arc_angle: number = 0;
	arc_center: Coordinates = null;
	row: number = 0;
}// TimelineState;


export default class Timeline extends Component<TimelineProps, TimelineState> {

	private canvas_ref: RefObject<HTMLCanvasElement> = createRef ();
	private time_points_reference: RefObject<TimePoints> = createRef ();


	private get canvas (): HTMLCanvasElement { return this.canvas_ref.current }
	private get time_points (): TimePoints { return this.time_points_reference.current }


	private get active_index (): number { return this.props.data.indexOf (this.state.active_model) }
	private get remaining_length (): number { return this.state.active_model.line_length - this.state.completed_length }


	private get space_remaining (): number { 
		switch (this.forwards) {
			case true: return this.canvas.width - (this.state.coordinates.x + bend_size);
			default: return this.state.coordinates.x - bend_size;
		}// switch;
	}// space_remaining;

	
	private get forwards (): boolean { return (this.state.row % 2 == 1) }


	private get destination (): Coordinates {

		let coordinates: Coordinates = this.state.coordinates;
		let line_length: number = this.state.active_model.line_length;

		let result = new Coordinates ().assign ({
			x: this.forwards ? coordinates.x + line_length : coordinates.x - line_length,
			y: this.state.coordinates.y
		});

		return result;

	}// destination;


	private get remaining_space (): number {

		let coordinates: Coordinates = this.state.coordinates;

		if (this.forwards) return Math.min (this.remaining_length, this.canvas.width - (coordinates.x + bend_size));
		return Math.min (this.remaining_length, coordinates.x - bend_size);

	}// remaining_space;


	private get next_model (): EmploymentModel { return this.props.data [this.props.data.indexOf (this.state.active_model) + 1] }


	private has_overage (destination: number): boolean {
		if (this.forwards) return (destination > (this.canvas.width - bend_size));
		return (destination < bend_size);
	}// has_overage;


	private get_date_percentages () {

		this.props.data.forEach ((item: EmploymentModel) => {

			let index = this.props.data.indexOf (item);

			let start_date = item.start_date as unknown as string;
			let end_date = (index == (this.props.data.length - 1) ? item.end_date : this.props.data [index + 1].start_date) as unknown as string;

			item.line_length = this.month_difference (start_date, end_date) * line_modifier;

		})

		return;

		//let date_range: number = this.month_difference (this.props.data [0].start_date, this.props.data [this.props.data.length - 1].end_date) / this.props.row_count;

		//for (let index = 0; index < this.props.data.length; index++) {

		//	let start_date = this.props.data [index].start_date as unknown as string;
		//	let end_date = (index == (this.props.data.length - 1) ? this.props.data [index].end_date : this.props.data [index + 1].start_date) as unknown as string;

		//	this.props.data [index].date_percentage = round (this.month_difference (start_date, end_date) / date_range, 4);

		//}// for;

	}// get_date_percentages;


	private month_difference = (start_date: string, end_date: string): number => this.month_value (end_date) - this.month_value (start_date);


	private month_value (date: string): number {

		let parts = date.split ("-");
		let result: number = ((parseInt (parts [0]) - 1) * 12) + parseInt (parts [1]);

		return result;

	}// month_value;


	/********/


	public static defaultProps: TimelineProps = {
//		row_count: 4,
		data: null
	}// defaultProps;


	public state: TimelineState = new TimelineState ();


	public add_time_point () {
		this.time_points.add_pulse_dot (this.state.coordinates, () => {
			if (this.props.data.indexOf (this.state.active_model) == this.props.data.length - 1) return;
			this.state.completed_length = 0;
			this.draw_line (this.destination)
		});
	}// add_time_point;


	public animate () {

		if (is_null (this.state.context)) return setTimeout (this.animate.bind (this));

		this.state.coordinates = new Coordinates (0, 0);
		this.state.total_length = (this.canvas.width) - (arc_radius * 2);// window.innerWidth;

		this.state.context.strokeStyle = "#000000";
		this.state.context.lineWidth = 2;

		this.state.context.beginPath ();
		this.state.context.moveTo (this.state.coordinates.x, this.state.coordinates.y);

		this.state.coordinates = new Coordinates (0, 0);
		this.state.active_model = this.props.data [0];

		this.state.row = 1;

		this.add_time_point ();

	}// animate;


	private radians = (degrees: number) => round (degrees * (Math.PI / 180), 2);


	private animate_curve (final_angle: number, onComplete: Function = null) {

		let next_angle: number = this.forwards ? this.state.arc_angle + 1 : this.state.arc_angle - 1;

		this.state.context.beginPath ();

		this.state.context.arc (
			this.state.arc_center.x, 
			this.state.arc_center.y, 
			arc_radius, 
			this.radians (this.state.arc_angle), 
			this.radians (next_angle),
			!this.forwards
		);

		this.state.context.stroke ();
		this.state.arc_angle = next_angle;

		if (next_angle != final_angle) return setTimeout (() => this.animate_curve (final_angle, onComplete));
		if (isset (onComplete)) onComplete ();

	}// animate_curve;


	private draw_curve (final_angle: number, onComplete: Function) {

		let coordinates: Coordinates = this.state.coordinates;

		this.animate_curve (final_angle, () => {

			switch (this.forwards) {
				case true: coordinates.x = final_angle == 360 ? coordinates.x + arc_radius : coordinates.x - arc_radius; break;
				default: coordinates.x = final_angle == 90 ? coordinates.x + arc_radius : coordinates.x - arc_radius; break;
			}// switch;

			coordinates.y = coordinates.y + arc_radius;
			if (isset (onComplete)) onComplete ();

		});

	}// draw_curve;


	private animate_line (destination: Coordinates, onComplete: Function = null) {

		let coordinates: Coordinates = this.state.coordinates;

		let incompletex: boolean = (destination.x - coordinates.x) != 0;
		let incompletey: boolean = (destination.y - coordinates.y) != 0;

		if (incompletex) coordinates.x = (destination.x < coordinates.x) ? coordinates.x - 1 : coordinates.x + 1;
		if (incompletey) coordinates.y = (destination.y < coordinates.y) ? coordinates.y - 1 : coordinates.y + 1;

		this.state.context.lineTo (coordinates.x, coordinates.y);
		this.state.context.stroke ();
		this.state.completed_length++;

		if (incompletex || incompletey) return setTimeout (() => this.animate_line (destination, onComplete));
		if (this.props.data.indexOf (this.state.active_model) == this.props.data.length - 1) return;

		if (onComplete) return onComplete ();

	}// animate_line;


	private draw_bend () {

		let coordinates: Coordinates = this.state.coordinates;

		this.state.arc_angle = 270;
		this.state.arc_center = new Coordinates (coordinates.x, coordinates.y + arc_radius);

		this.draw_curve (this.forwards ? 360 : 180, () => {
			this.animate_line (new Coordinates (coordinates.x, coordinates.y + vertical_height), () => {

				this.state.arc_angle = this.forwards ? 0 : 180;
				this.state.arc_center = new Coordinates (coordinates.x - (this.forwards ? arc_radius : (0 - arc_radius)), coordinates.y);

				this.draw_curve (90, () => {

					this.state.context.beginPath ();
					this.state.row++;
					this.state.completed_length += bend_size;

					let remaining_length: number = Math.min (this.remaining_length, this.remaining_space);

					this.draw_line (new Coordinates (coordinates.x + (this.forwards ? remaining_length : (0 - remaining_length)), coordinates.y), () => {
						this.state.active_model = this.next_model;
						this.add_time_point ();
					});

				});
			});
		});

	}// draw_bend;


	public draw_line (destination: Coordinates, onComplete: Function = null) {

		let coordinates: Coordinates = this.state.coordinates;
		let line_length: number = this.remaining_space;

		if (this.has_overage (destination.x)) {

			let new_destination: Coordinates = new Coordinates ().assign ({
				x: coordinates.x + (this.forwards ? line_length : (0 - line_length)),
				y: destination.y
			});

			return this.animate_line (new_destination, () => this.draw_bend ());

		}// if;

		this.animate_line (destination, () => {
			this.state.active_model = this.next_model;
			this.add_time_point ();
		});

	}// draw_line;


	public componentDidUpdate (props: TimelineProps) {
		if (props.data != this.props.data) {
			this.get_date_percentages ();
			this.animate ();
		}// if;

	}// componentDidUpdate;


	public componentDidMount () {
		this.setState ({ context: this.canvas.getContext ("2d") }, () => {
			this.canvas.width = parseInt (window.getComputedStyle (this.canvas).width);
			this.canvas.height = parseInt (window.getComputedStyle (this.canvas).height);
		});
	}// componentDidMount;


	public render () {
/*column-centered */
		return <div className="full-page relative column-block">
{/* */}{/*className="full-size"*/}
			<canvas id="main_canvas"  style={{ 
				border: "solid 1px blue",
				imageRendering: "pixelated",
width: "100%",
height: "100%"
			}} ref={this.canvas_ref} />

			<TimePoints ref={this.time_points_reference} />

		</div>
	}// render;


}// Timeline;