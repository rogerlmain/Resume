import "Classes/Types";
import "Classes/Globals";
import "Classes/Handlers";
import "Classes/NumericCurrency";
import "Classes/Prototypes";

import { createRoot } from "react-dom/client";

import MainPage from "Pages/Main";
import TestPage from "Pages/Test";


let testing: boolean = false;

if (testing) {
	createRoot (document.getElementById ("main")).render (<TestPage />);
} else {
	createRoot (document.getElementById ("main")).render (<MainPage />);
}// if;

