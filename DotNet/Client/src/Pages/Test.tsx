import DropdownEditbox from "Controls/DropdownEditbox";
import { IDValue, IDValueList } from "Models/BaseModels";
import { Component } from "react";
import Database from "../Classes/Data/Database";


class TestPageProps {}


class TestPageState {
	public output: string = null;
}// TestPageState;


export default class TestPage extends Component<TestPageProps, TestPageState> {

	public state: TestPageState = new TestPageState ();


	public render () {
		return <div className="full-page fully-centered spaced-out column-block">
			<div>{JSON.stringify (this.state.output)}</div>
		</div>
	}// render;


	public constructor (props: TestPageProps) {
		super (props);
		Database.run_test ().then (result => this.setState ({ output: result }));
	}// constructor;

}// TestPage;

