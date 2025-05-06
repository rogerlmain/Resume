import Database from "Classes/Data/Database";
import Timeline from "Controls/Animation/Timeline";

import Container from "Controls/Container";

import { Coordinates } from "Controls/Animation/Coordinates";
import { EmploymentModelList, EmploymentType } from "Models/DataModels";

import { Component } from "react";


class HistoryPageState {
	public employment: EmploymentModelList = null;
}// HistoryPageState;


export default class HistoryPage extends Component<Object, HistoryPageState> {

	public state: HistoryPageState = new HistoryPageState ();


	public render () {
		return <Container>
			{/*<Optional condition={isset (this.state.employment)}>*/}
				<div className="column-centered full-size column-block outlined">

					<div className="Title">History</div>

					<Timeline data={this.state.employment} />

				</div>
{/*
			</Optional>

			<Optional condition={not_set (this.state.employment)}>
				<div className="fully-centered full-page column-block">
					<Eyecandy text="Loading..." />
				</div>
			</Optional>
*/}
		</Container>
	}// render;


	public constructor (props: Object) {
		super (props);
		Database.get_employment ().then ((employment: EmploymentType) => {
			this.setState ({ employment: new EmploymentModelList ().assign (employment)});
		});
	}// constructor;

}// HistoryPage;