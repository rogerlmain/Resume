import Database from "Classes/Data/Database";
import TypedArray from "Classes/Collections/TypedArray";

import { Component } from "react";


class PercentageData {
	public name: string = null;
	public percentage: number = null;
}// PercentageData;


class TechnologiesState {
	public data: PercentageDataList = null;
}// TechnologiesState;


export class PercentageDataList extends TypedArray { public constructor () { super (PercentageData) } }


export default class Technologies extends Component<Object, TechnologiesState> {

	public state: TechnologiesState = new TechnologiesState ();


	public render () {
		return <div>Technologies go here</div>
	}// render;


	public constructor (props: Object) {
		super (props);
		Database.get_technology_percentages ().then ((result: PercentageDataList) => {
			this.setState ({data: new PercentageDataList ().assign (result)});
		});
	}// constructor;

}// Technologies;