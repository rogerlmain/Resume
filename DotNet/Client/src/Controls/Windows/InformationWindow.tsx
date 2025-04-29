import { Component } from "react"


class InformationWindowProps { text: string = null }


export default class InformationWindow extends Component<InformationWindowProps> {

	public render = () => <div className="column-block">
		<div className="text-block row-block">
			<img src="Images/information.svg" className="eyecandy" />
			{this.props.text}
		</div>
		<div className="button-bar with-some-headspace">{popup_window.close_button}</div>
	</div>

}// InformationWindow;