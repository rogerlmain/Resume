import FadePanel from "Controls/Visual/FadePanel";
import ImageContainer from "Controls/Visual/ImageContainer";
import PopupWindow from "Controls/Windows/PopupWindow";

import EditEmployment from "Pages/Editors/EditEmployment";
import EditTechnologies from "Pages/Editors/EditTechnologies";

import HistoryPage from "Pages/History";
import HomePage from "Pages/Home";

import { Component, createRef, ReactElement, RefObject } from "react";


const default_speed: number = 1;


enum Pages {
	Home,
	AtAGlance,
	History,
	EditEmployment,
	EditTechnologies
}// Pages;


declare global {
	var popup_window: PopupWindow;
}// global;


global.popup_window = null;


class MainPageState {
	public active_page: Pages = null;
}// MainPageState;


export default class MainPage extends Component<Object, MainPageState> {

	private popup_window: RefObject<PopupWindow> = createRef ();

	private fade_panel_ref: RefObject<FadePanel> = createRef ();
	private main_panel_ref: RefObject<FadePanel> = createRef ();

	private current_page_ref: RefObject<Component> = createRef ();

	private get fade_panel (): FadePanel { return this.fade_panel_ref.current }
	private get main_panel (): FadePanel { return this.main_panel_ref.current }

	private get current_page (): Component { return this.current_page_ref.current }


	private get active_page (): ReactElement {
		switch (this.state.active_page) {
			case Pages.AtAGlance: 
			case Pages.History: return <HistoryPage ref={this.current_page_ref as RefObject<HistoryPage>} />
			case Pages.EditEmployment: return <EditEmployment />
			case Pages.EditTechnologies: return <EditTechnologies />
			default: return <HomePage ref={this.current_page_ref as RefObject<HomePage>} />
		}// switch;
	}// active_page;


	private change_page = (page: Pages) => this.main_panel.hide (() => this.setState ({ active_page: page }));


	/********/


	public state: MainPageState = new MainPageState ();


	public render () {
		return <ImageContainer onLoad={() => this.fade_panel.show ()}>
			<FadePanel className="full-size" ref={this.fade_panel_ref} speed={default_speed} onShow={() => this.main_panel.show ()}>
				<div className="full-page column-block bordered">

					<PopupWindow id="popup_window" ref={this.popup_window} />

					<div className="full-width fully-spaced-out row-block with-some-padding">
						<div className="slightly-spaced-out row-block">
							<img src="Images/cartoon.mirrored.png" className="profile" />
							<div className="spaced-out column-block">
								<div>Roger L. "Rex" Main</div>
								<div>720 322 5154</div>
								<div>rex@rogerlmain.com</div>
							</div>
						</div>
						<div className="slightly-spaced-out column-block">
							<div className="link" onClick={() => this.change_page (Pages.Home)}>Home</div>
							<div>What I can do</div>
							<div className="link" onClick={() => this.change_page (Pages.History)}>What I have done</div>
							<div className="link" onClick={() => this.change_page (Pages.AtAGlance)}>At a glance</div>
							<div className="link" onClick={() => this.change_page (Pages.EditEmployment)}>Edit employment</div>
							<div className="link" onClick={() => this.change_page (Pages.EditTechnologies)}>Edit technologies</div>
						</div>
					</div>

					<div className="full-size fully-centered flex-block">
						<FadePanel className="full-page" ref={this.main_panel_ref} speed={default_speed} 
							onShow={() => { if (isset (this?.current_page?.["animate"])) this.current_page ["animate"] ()} }>
							{this.active_page}
						</FadePanel>
					</div>

				</div>
			</FadePanel>
		</ImageContainer>
	}// render;


	public constructor (props: Object) {
		super (props);
		this.state.active_page = Pages.History;
	}// constructor;

}// MainPage;
