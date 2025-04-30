import { ChangeEventHandler, Component } from "react";


class DateInputProps {
	public id: string;
	public value: string;
	public onChange: ChangeEventHandler<HTMLInputElement>;
}// DateInputProps;


class DateInputState {
	public key: string = null;
}// DateInputState;


export default class DateInput extends Component<DateInputProps, DateInputState> {

	public state: DateInputState = new DateInputState ();


	public update_value = () => this.setState ({ key: crypto.randomUUID () });


	public render = () => <input key={this.state.key} type="date" id={this.props.id} defaultValue={this.props.value} onChange={this.props.onChange} />


	public constructor (props: DateInputProps) {
		super (props);
		this.state.key = crypto.randomUUID ();
	}// constructor;

}// DateInput;