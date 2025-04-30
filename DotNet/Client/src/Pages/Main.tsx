import PopupWindow from "Controls/Windows/PopupWindow";

import HomePage from "Pages/Home";
import EditEmployment from "Pages/Editors/EditEmployment";
import EditTechnologies from "Pages/Editors/EditTechnologies";

import { Component, createRef, ReactElement, RefObject } from "react";


enum Pages {
	EditEmployment,
	EditTechnologies
}// Pages;


declare global {
	var popup_window: PopupWindow;
}// global;


global.popup_window = null;


class MainPageState {
	public active_page: ReactElement = <HomePage />
}// MainPageState;


export default class MainPage extends Component<Object, MainPageState> {

	private popup_window: RefObject<PopupWindow> = createRef ();


	private change_page (page: Pages) {
		switch (page) {
			case Pages.EditEmployment: this.setState ({ active_page: <EditEmployment /> }); break;
			case Pages.EditTechnologies: this.setState ({ active_page: <EditTechnologies /> }); break;
			default: this.setState ({ active_page: <HomePage /> }); break;
		}// switch;
	}// change_page;


	/********/


	public state: MainPageState = new MainPageState ();


	public render () {
		return <div className="full-page column-block bordered">

			<PopupWindow id="popup_window" ref={this.popup_window} />

			<div className="full-width fully-spaced-out row-block">
				<div className="spaced-out column-block">
					<div>Roger L. Main</div>
					<div>720 322 5154</div>
					<div>rex@rogerlmain.com</div>
				</div>
				<div className="spaced-out column-block">
					<div>What I can do</div>
					<div>What I have done</div>
					<div className="link" onClick={() => this.change_page (Pages.EditEmployment)}>Edit employment</div>
					<div className="link" onClick={() => this.change_page (Pages.EditTechnologies)}>Edit technologies</div>
				</div>
			</div>

			{this.state.active_page}

		</div>
	}// render;

}// MainPage;
