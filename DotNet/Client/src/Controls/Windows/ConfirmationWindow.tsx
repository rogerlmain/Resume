import { Component } from "react";


type Callback = () => void;


class ConfirmationWindowProps { 
	public children?: any;
	public onYes?: Callback;
	public onNo?: Callback;
}// ConfirmationWindowProps;


export default class ConfirmationWindow extends Component<ConfirmationWindowProps> {

	public static defaultProps: ConfirmationWindowProps = {
		children: null,
		onYes: null,
		onNo: null
	}// defaultProps;


	public render () { 
		return <div className="column-block">
			<div className="slightly-spaced-out row-centered row-block">
				<img src="Images/Glyphs/question.png" className="eyecandy" style={{ width: "32px", height: "auto" }} />
				<div style={{ whiteSpace: "pre-line" }}>{this.props.children}</div>
			</div>
			<div className="button-bar">
				<button onClick={() => popup_window.hide (this.props.onYes)}>Yes</button>
				<button onClick={() => popup_window.hide (this.props.onNo)}>No</button>
			</div>
		</div>
	}// render;


	public constructor (props: ConfirmationWindowProps) {
		super (props);
	}// constructor;

}// MessageWindow;