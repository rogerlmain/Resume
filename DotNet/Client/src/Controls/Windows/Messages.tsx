import ErrorWindow from "Controls/Windows/ErrorWindow";
import InformationWindow from "Controls/Windows/InformationWindow";

import { Component } from "react"


class MessageProps { text: string = null }


class PopupProps extends MessageProps { glyph: string = null }


export class Error extends Component<MessageProps> {
	public render = () => <ErrorWindow text={this.props.text} />
}// Error;


export class Message extends Component<MessageProps> {
	public render = () => <InformationWindow text={this.props.text} />
}// Message;
