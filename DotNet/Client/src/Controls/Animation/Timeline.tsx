import TypedArray from "Classes/Collections/TypedArray";
import TimePoints from "Controls/Animation/Timeline/TimePoints";

import { Coordinates, Dimensions } from "Controls/Animation/Coordinates";
import { EmploymentModel, EmploymentModelList } from "Models/DataModels";

import { Component, createRef, CSSProperties, ReactElement, RefObject } from "react";


const dot_size: Dimensions = new Dimensions (14, 14);


type DivReference = RefObject<HTMLDivElement>


class TimelineItemList extends TypedArray { public constructor () { super (TimelineItem) } }


class TimelineItem {

	private element_reference: DivReference = null;

	public react_element: ReactElement = null;

	public get element (): HTMLDivElement { return this.element_reference.current }
	public set reference (value: DivReference) { this.element_reference = value }

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

	private time_points_reference: RefObject<TimePoints> = createRef ();


	private get time_points (): TimePoints { return this.time_points_reference.current }
	private get index (): number { return isset (this.state.model) ? this.props.data.indexOf (this.state.model) + 1 : 0 }


	private get time_point_style (): CSSProperties {
		return {
			width: `${this.time_points?.width ?? 0}px`,
			position: "relative"
		}// style;
	}// time_point_style;


	private add_time_point (element: HTMLDivElement) {

		let dot_center: Coordinates = new Coordinates ().assign ({
			x: Math.floor (dot_size.XValue / 2),
			y: Math.floor (dot_size.YValue / 2)
		});

		let coordinates: Coordinates = new Coordinates ().assign ({
			x: dot_center.XValue,
			y: element.offsetTop + Math.round (element.clientHeight / 2) - dot_center.YValue
		});

		this.time_points.add_pulse_dot (coordinates);

	}// add_time_point;


	private add_item (model: EmploymentModel) {

		let item_reference: DivReference = createRef ();

		let timeline_item: TimelineItem = new TimelineItem ().assign ({
			reference: item_reference,
			react_element: <div ref={item_reference} className="timeline-item" style={{ opacity: 0 }}>{model.company}</div>
		});

		if (is_null (this.state.items)) this.state.items = new TimelineItemList ();

		this.state.items.push (timeline_item);
		this.state.active_item = timeline_item;
		this.show_item ();

	}// add_item;


	private show_item () {

		this.forceUpdate (() => {

			this.state.active_item.element.addEventListener ("transitionend", (event: TransitionEvent) => {
				if (event.target != this.state.active_item.element) return;
				this.next_item ();
			}, { once: true });

			this.add_time_point (this.state.active_item.element);
			setTimeout (() => { this.state.active_item.element.style.opacity = "1" }, 10);

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
		return <div className="full-page column-centered flex-block outlined">

			<div className="relative full-height row-block" style={{ overflowY: "auto", maxWidth: "700px" }}>

				<div className="stacked" style={{ width: dot_size.width, height: "100%" }}>
					<div style={this.time_point_style}>
						<TimePoints ref={this.time_points_reference} dimensions={dot_size} speed={0.75} />
					</div>
				</div>

				<div className="full-width slightly-spaced-out column-block with-left-elbowroom" style={{ height: "min-content" }}>
					{this.state.items?.map ((item: TimelineItem) => item.react_element)}
				</div>

			</div>
		</div>
	}// render;


}// Timeline;