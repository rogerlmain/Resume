import { Component, ReactNode } from "react";

class ReactNodeList extends Array<ReactNode> {}


type ReactNodeContainer = ReactNode | ReactNodeList


class OptionalProps {
	public condition: boolean;
	public children: ReactNodeContainer;
}// OptionalProps;

export default class Optional extends Component<OptionalProps> {

	public render = () => this.props.condition ? this.props.children : String.Empty;

}// Optional;