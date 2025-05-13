import { Component, MouseEvent, ReactElement } from "react";


class PopupWindowProps {
	id: string;
	children?: String | ReactElement;
}// PopupWindowProps;


class PopupWindowState {
	contents: String | ReactElement = null;
	visible: boolean = false;
}// PopupWindowState;


export default class PopupWindow extends Component<PopupWindowProps> {

	public state: PopupWindowState = new PopupWindowState ();

	public close_button: ReactElement = <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault ();
		this.hide ();
	}}>Close</button>;


	public constructor (props: PopupWindowProps) {
		super (props);
		if (isset (this.props.children)) this.state.contents = this.props.children;
	}// constructor;


	public show = (contents: String | ReactElement = this.state.contents, onShow: Function = null) => {
		this.setState ({ contents }, () => this.setState ({ visible: true }, onShow?.bind (this) ?? null));
	}// show;


	public hide = (onHide: Function = null) => this.setState ({ visible: false }, () => this.setState ({contents: null}, onHide?.bind (this) ?? null));


	public open = this.show;
	public close = this.hide;


	public render () {
		return <div className="full-screen" style={{ display: (this.state.visible ? "flex" : "none") }}>
			<div className="blackout"></div>
			<div className="popup-window">{this.state.contents}</div>
		</div>
	}// render;

}// PopupWindow;