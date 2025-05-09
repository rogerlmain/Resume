import TypedArray from "Classes/Collections/TypedArray";

import AnimatedCanvas from "Controls/Animation/AnimatedCanvas";
import TimePoints from "Controls/Animation/Timeline/TimePoints";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { Component, createRef, CSSProperties, ReactElement, RefObject } from "react";


const dot_size: Dimensions = new Dimensions (22, 22);


class TimelineItemList extends TypedArray { public constructor () { super (TimelineItem) } }


class TimelineItem {

	public body_reference: RefObject<HTMLDivElement> = null;
	public title_reference: RefObject<HTMLDivElement> = null;
	public element: ReactElement = null;

	public get body (): HTMLDivElement { return this.body_reference.current }
	public get title (): HTMLDivElement { return this.title_reference.current }

}// TimelineItem;


class TimelineProps {
	public data: EmploymentModelList;
}// TimelineProps;


class TimelineState {
	public model: EmploymentModel = null;
	public items: TimelineItemList = null;
	public active_item: TimelineItem = null;
}// TimelineProps;


export default class Timeline extends Component<TimelineProps> {

	private canvas_reference: RefObject<AnimatedCanvas> = createRef ();
	private time_points_reference: RefObject<TimePoints> = createRef ();

	private main_block_reference: RefObject<HTMLDivElement> = createRef ();
	private text_block_reference: RefObject<HTMLDivElement> = createRef ();


	private get canvas (): AnimatedCanvas { return this.canvas_reference.current }
	private get time_points (): TimePoints { return this.time_points_reference.current }

	private get main_block (): HTMLDivElement { return this.main_block_reference.current }
	private get text_block (): HTMLDivElement { return this.text_block_reference.current }

	private get index (): number { return isset (this.state.model) ? this.props.data.indexOf (this.state.model) + 1 : 0 }


	private get item_style (): CSSProperties {
		return { 
			opacity: 0,
			transition: "opacity 0.25s", //2s",
			marginLeft: "0.5rem",
			wordWrap: "break-word",
			overflowWrap: "normal"
		}// style;
	}// item_style;


	private get time_point_style (): CSSProperties {
		return {
			width: `${this.time_points?.width ?? 0}px`,
			position: "relative"
		}// style;
	}// time_point_style;


	private add_time_point (element: HTMLDivElement, onComplete: Function) {

		let target: number = element.offsetTop + Math.round (element.clientHeight / 2);

		let dot_center: Coordinates = new Coordinates ().assign ({
			x: Math.floor (dot_size.XValue / 2),
			y: Math.floor (dot_size.YValue / 2)
		})

		let end: Coordinates = new Coordinates ().assign ({
			x: dot_center.XValue,
			y: target
		});

		let dot_position: number = target - dot_center.YValue;

		if (isset (this.time_points.last_dot)) {

			let start: Coordinates = new Coordinates ().assign ({
				x: dot_center.XValue,
				y: this.time_points.last_dot?.coordinates.YValue + dot_center.YValue
			});

			return this.canvas.draw_line (start, end, () => {
				this.time_points.add_pulse_dot (new Coordinates (0, dot_position), onComplete);
			});

		}// if;

		this.time_points.add_pulse_dot (new Coordinates (0, dot_position), onComplete);

	}// add_time_point;


	private add_item (model: EmploymentModel) {

		let item_body: RefObject<HTMLDivElement> = createRef ();
		let item_title: RefObject<HTMLDivElement> = createRef ();

		let timeline_item: TimelineItem = new TimelineItem ().assign ({
			body_reference: item_body,
			title_reference: item_title,
			element: <div ref={item_title} style={{ fontWeight: "bold" }}>{model.company}</div>
/*			
			<div className="somewhat-spaced-out full-size wrapped column-block" ref={item_body} style={this.item_style}>
				<div ref={item_title} style={{ fontSize: "16pt", border: "none" }}>{model.start_date as unknown as string}</div>
				<div style={{ fontWeight: "bold" }}>{model.company}</div>
				<div>{model.description}</div>
			</div>
*/
		});

		if (is_null (this.state.items)) this.state.items = new TimelineItemList ();

		this.state.items.push (timeline_item);
		this.state.active_item = timeline_item;
		this.show_item ();

	}// add_item;


	private show_item () {

		this.forceUpdate (() => {

			this.state.active_item.body.addEventListener ("transitionend", (event: TransitionEvent) => {
				if (event.target != this.state.active_item.body) return;
				this.next_item ();
			}, { once: true });

			this.add_time_point (this.state.active_item.title, () => setTimeout (() => { this.state.active_item.body.style.opacity = "1" }, 10));

		});

	}// show_item;


	private next_item () {

		let index = this.index;

		if (index > this.props.data.length - 1) return;
		this.state.model = this.props.data [index];
		this.add_item (this.state.model);

	}// next_item;


	/********/


	public static defaultProps: TimelineProps = { data: null }


	public state: TimelineState = new TimelineState ();


	public componentDidUpdate (props: TimelineProps) {
		if (props.data != this.props.data) this.next_item ();
	}// componentDidUpdate;


	public render () {
		return <div className="full-page column-centered flex-block bordered">

			<div className="relative full-height row-block" style={{ overflowY: "auto", maxWidth: "700px" }} ref={this.main_block_reference}>

				<div className="stacked" style={{ width: dot_size.width, height: "100%" }}>

					<AnimatedCanvas ref={this.canvas_reference} dimensions={new Dimensions (dot_size.XValue, this.main_block?.scrollHeight ?? 0)} />

					<div style={this.time_point_style}>
						<TimePoints ref={this.time_points_reference} dimensions={dot_size} speed={0.75} />
					</div>

				</div>

				<div className="very-spaced-out full-width column-block" style={{ height: "min-content" }} ref={this.text_block_reference}>
					{this.state.items?.map ((item: TimelineItem) => item.element)}
				</div>

			</div>
		</div>
	}// render;


}// Timeline;