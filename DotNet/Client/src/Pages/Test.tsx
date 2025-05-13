import DropdownEditbox from "Controls/DropdownEditbox";
import { IDValue, IDValueList } from "Models/BaseModels";
import { Component } from "react";


export default class TestPage extends Component {

	private get test_data (): IDValueList {
		let result: IDValueList = new IDValueList ();
		result.push (new IDValue ().assign ({ id: "08dd8f23-4b0f-4eab-8a26-a6571f9a0963", value: "first option" }));
		result.push (new IDValue ().assign ({ id: "08dd8f22-f51a-43d5-81b3-204297b911cb", value: "second option" }));
		result.push (new IDValue ().assign ({ id: "86555e2e-ba10-40c6-9720-2ba0e303dadb", value: "third option" }));
		return result;
	}// test_data;


	public render () {
		return <div className="full-page fully-centered spaced-out column-block">
			<DropdownEditbox data={this.test_data} />
		</div>
	}// render;

}// TestPage;

