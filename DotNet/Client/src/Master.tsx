import "Classes/Types";
import "Classes/Globals";
import "Classes/Handlers";
import "Classes/NumericCurrency";
import "Classes/Prototypes/Prototypes";

import { createRoot } from "react-dom/client";

import MainPage from "Pages/Main";
import TestPage from "Pages/Test";
import HistoryPage from "Pages/History";


let testing: boolean = true;

if (testing) {
	createRoot (document.getElementById ("main")).render (<HistoryPage />);
} else {
	createRoot (document.getElementById ("main")).render (<MainPage />);
}// if;

