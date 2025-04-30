import { Component } from "react";


class EyecandyProps {
	command?: Function = null;
	small?: boolean = false;
	text: String = null;
}// EyecandyProps;


export default class Eyecandy extends Component<EyecandyProps> {


	public componentDidMount () {
		if (isset (this.props.command)) this.props.command ();
	}// componentDidMount;


	public render = () => <div className="row-block centered">
		<img src="Images/eyecandy.gif" className={`${this.props.small ? "small" : null} eyecandy`} />
		<div className="linear-text">{this.props.text}</div>
	</div>

}// Eyecandy;