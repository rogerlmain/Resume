import { Fertile } from "Controls/Abstract/BaseProperties";
import { Component } from "react";


class ComponentProps extends Fertile { 
	public id?: string;
}// ComponentProps;


export default class Container extends Component<ComponentProps> { 

	public static defaultProps: ComponentProps = { id: null }
	
	public render = () => <>{this.props.children}</>
	
}// Container;