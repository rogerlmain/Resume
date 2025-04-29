import { default_speed, default_direction } from "Classes/Constants";
import { Dimensions } from "Models/Common";
import { Component, createRef, CSSProperties, RefObject } from "react";


class SweepPanelProps {
	public id: string;
	public direction: string;
	public visible: boolean;
	public className: string;
	public children: any;
}// SweepPanelProps;


class SweepPanelState {
	public top: number = 0;
	public left: number = 0;
	public visible: boolean = false;
	public handler: any = null;
	public dimensions: Dimensions = new Dimensions ();
	public duration: number = 0;
	public style: CSSProperties = null;
}// SweepPanelState;


export default class SweepPanel extends Component<SweepPanelProps, SweepPanelState> {


	private get offscreen () { return !this.onscreen }
	private set offscreen (value) { this.onscreen = !value }

	private get onscreen () { return this.state.visible }
	private set onscreen (value) { this.setState ({ visible: value }) }


	private is_direction = (value: any) => is_string (value) && (new Array ("up", "down", "left", "right").contains (value));


	private animate () {
		let attribute: string = new Array ("up", "down").contains (this.props.direction) ? "top" : "left";
		this.panel.current.style = {
			--end-
		};
		this.css ("animation", "");
	}// animate;


		//	this.animate ({ [new Array ("up", "down").contains (options.direction) ? "top" : "left"]: options.destination }, {
		//	complete: function () {
		//		this.load ();				
		//		if (isset (onenter)) onenter.call (this);
		//	}/* complete */,
		//	duration: options.speed
		//});
		

		
		
	private connectedCallback () {
		
		this.css ("position", "absolute");

		if (this.onscreen) {
			if (isset (this.state.top)) this.css ("top", this.state.top); 
			if (isset (this.state.left)) this.css ("left", this.state.left); 
		} else {
			this.css ("visibility", "hidden");
		}// if;
		
	}// connectedCallback;
	
	
	private css (style: string, value: any = null) { 
		if (is_null (value)) return this.state.style [style];
		this.state.style [style] = value;
		this.forceUpdate ();
	}// css;


	private get_direction (options) {
			
		let direction = coalesce ((this.is_direction (options) ? options : ((is_object (options) || is_array (options)) ? options ["direction"] : null)), this.props.direction, default_direction);
		let directions = direction.split (",");
			
		let result = {
			entry: (this.is_direction (directions [0]) ? directions [0] : default_direction),
			exit: (directions.length > 1) ? (this.is_direction (directions [1]) ? directions [1] : default_direction) : (this.is_direction (directions [0]) ? directions [0] : default_direction)
		};
			
		return result;
			
	}// get_direction;
		
		
	private get_handler (options, handler) {
			
		let tag_handler = this.state.handler;
			
		if (is_function (options)) return options;
		if ((is_object (options) || is_array (options)) && is_function (options [handler])) return options [handler];
		if (isset (tag_handler)) return new Function (tag_handler);
			
		return null;
			
	}// get_handler;
		

	private offset (direction, base_value) {
		var matrix = this.css ("transform").match (/matrix\((.+?)\)/);
		var values = isset (matrix) ? matrix [1].split (",") : null;
		return base_value - parseInt (isset (values) ? ((direction == "left") ? values [4] : values [5]) : 0);
	}// offset;


	private hide_control = () => this.css ("visibility", "hidden");
	private show_control = () => this.css ("visibility", "visible");
	
	
	/********/


	public state: SweepPanelState = new SweepPanelState ();
	public panel: RefObject<HTMLDivElement> = createRef ();
	

	public enter (options) {
		
		let onenter = this.get_handler (options, "onenter");
		
		if (this.onscreen) return; 
		
		if (not_set (options)) options = {}
		if (is_empty (options.destination, true)) options.destination = "50%";
		if (is_empty (options.speed)) options.speed = coalesce (this.state.duration, default_speed);

		options.direction = this.get_direction (options).entry;

		this.onscreen = true;

		switch (options.direction) {
			case "up": this.css ("top", this.offset ("top", window.innerHeight)); break;
			case "down": this.css ("top", (0 - this.offset ("top", this.state.dimensions.height))); break;
			case "left": this.css ("left", this.offset ("left", window.innerWidth)); break;
			default: this.css ("left", (0 - this.offset ("left", this.state.dimensions.width))); break;
		}// switch;

		this.show_control ();
		this.animate ();

	}// enter;
	

	public exit (options) {
		
		let destination = null;
		let onexit = this.get_handler (options, "onexit");
				
		if (is_empty (options) || is_function (options) || (this.is_direction (options))) options = {}
		if (is_empty (options.speed)) options.speed = coalesce (this.state.duration, default_speed);

		options.direction = this.get_direction (options).exit;
		
		switch (options.direction) {
			case "up": destination = (0 - this.offset ("top", this.state.dimensions.height)); break;
 			case "down": destination = this.offset ("top", window.innerHeight); break;
 			case "left": destination = (0 - this.offset ("left", this.state.dimensions.width)); break;
 			default: destination = this.offset ("left", window.innerWidth); break;
		}// switch;

		this.animate ({ [new Array ("up", "down").contains (options.direction) ? "top" : "left"]: destination }, {
			complete: function () {
				this.hide_control ();
				this.offscreen = true;
				if (onexit) onexit.call (this);
			}/* complete */,
			duration: options.speed
		});
		
	}// exit;
	
	
	/********/
	
	
	public render () {
		return <div ref={this.panel} style={this.state.style}>{this.props.children}</div>
	}// render;


}// SweepPanel;