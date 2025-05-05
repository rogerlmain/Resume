import { Component, CSSProperties, RefObject, createRef } from "react";


class FadePanelProps {
	public children: ReactElementContainer;
	public speed: number;
	public className?: string;
	public onShow?: Function;
	public onHide?: Function;
}// FadePanelProps;


class FadePanelState {
	public opacity: number = 0;
	public visible: boolean = false;
	public onHide: Function;
}// FadePanelState;


export default class FadePanel extends Component<FadePanelProps, FadePanelState> {

	private reference: RefObject<HTMLDivElement> = createRef ();


	private get container (): HTMLDivElement { return this.reference.current }


	private get fade_style (): CSSProperties {
		return { 
			opacity: this.state.opacity,
			transition: `opacity ${this.props.speed}s`
		};
	}// CSSProperties;


	/********/


	public state: FadePanelState = new FadePanelState ();


	public get visible (): boolean { return this.state.visible }


	public static defaultProps: FadePanelProps = {
		children: null,
		className: null,
		speed: 5
	}// defaultProps;


	public show = () => setTimeout (() => this.setState ({ opacity: 1 }));


	private hide_panel = () => setTimeout (() => this.setState ({ opacity: 0 }));


	public hide (onHide: Function = null) { 
		if (isset (onHide)) return this.setState ({ onHide }, this.hide_panel.bind (this));
		this.hide_panel ();
	}// hide;


	public componentDidMount () {
		this.container.addEventListener ("transitionend", () => {
			this.setState ({ visible: this.state.opacity == 1 }, () => {

				if (this.state.opacity == 0) {
					if (isset (this.props.onHide)) this.props.onHide ();
					if (isset (this.state.onHide)) this.state.onHide ();
					return;
				}// if;

				if (isset (this.props.onShow)) this.props.onShow ();

			});
		});
	}// componentDidMount;


	public render () {
		return <div className={this.props.className} style={this.fade_style} ref={this.reference}>{this.props.children}</div>
	}// render;


}// FadePanel;