
import { Component, createRef, RefObject } from "react";


class ImageContainerProps {
	public children: ReactElementContainer;
	public onLoad?: Function;
}// ImageContainerProps;


class ImageContainerState {
	public images_loaded: boolean = false;
}// ImageContainerState;


export default class ImageContainer extends Component<ImageContainerProps, ImageContainerState> {

	private container_ref: RefObject<HTMLDivElement> = createRef ();


	private get waiting_for_images (): boolean {

		var image_list = this.container_ref.current.querySelectorAll ("img");

		for (let image of image_list) {
			if (!image.complete) return true;
		}// for;

		return false;

	}// waiting_for_images;


	private wait_for_images () {
		if (this.waiting_for_images) return setTimeout (this.wait_for_images.bind (this));
		this.setState ({ images_loaded: true }, this.props.onLoad?.bind (this));
	}// wait_for_images;


	/********/


	public state: ImageContainerState = new ImageContainerState ();


	public componentDidMount = () => this.wait_for_images ();


	public render = () => <div style={{ display: this.state.images_loaded ? "contents" : "none" }} ref={this.container_ref}>
		{this.props.children}
	</div>


}// ImageContainer;