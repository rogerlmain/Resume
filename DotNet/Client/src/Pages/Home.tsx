import CascadeFade from "Controls/Visual/CascadeFade";

import { Component, createRef, CSSProperties, RefObject } from "react";


export default class HomePage extends Component {

	private fade_panel_ref: RefObject<CascadeFade> = createRef ();


	private get image_style (): CSSProperties { 
		return {
			height: "150px", 
			width: "100%"
		}
	}// image_style;


	/********/


	public get fade_panel (): CascadeFade { return this.fade_panel_ref.current }


	public animate () {
		this.fade_panel.show ();
	}// animate;


	public render () {
		return <div className="full-page fully-centered column-block">
			<CascadeFade ref={this.fade_panel_ref} speed={0.35}>
				<div className="very-spaced-out row-block">
					<div className="spaced-out column-block">
						<img src="Images/Pictures/Home/beach.png" className="fadeable" style={this.image_style} />
						<img src="Images/Pictures/Home/harbour.png" className="fadeable" style={this.image_style} />
						<img src="Images/Pictures/Home/fire.png" className="fadeable" style={this.image_style} />
					</div>
					<div className="fadeable text-block">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et tortor nibh. Aliquam nec est consequat, vehicula nulla ut, vehicula sapien. Mauris aliquam enim lorem, vulputate tempus mi viverra at. Etiam sit amet neque lacinia, vulputate justo nec, eleifend diam. Suspendisse potenti. Fusce id facilisis erat. Duis vitae sagittis ligula. Suspendisse turpis lorem, maximus quis leo vitae, aliquet vulputate metus. Sed at tortor ut erat vehicula iaculis in at velit. Proin elementum magna nibh, et posuere odio sodales sed. In sit amet ultrices lacus, eget efficitur nibh. Morbi consequat, sapien id rhoncus sagittis, tellus arcu elementum dolor, non posuere erat ex vitae leo. Cras quis scelerisque erat. Suspendisse potenti. Sed quis vulputate odio.							
					</div>
				</div>
			</CascadeFade>

			<button onClick={() => this.fade_panel.show ()}>Doit</button>
		</div>
	}// render;

}// HomePage;