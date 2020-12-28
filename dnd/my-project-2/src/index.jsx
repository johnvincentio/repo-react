import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {DNDProvider} from './Components';

const jsx = (
	<DNDProvider>
		<App />
	</DNDProvider>
);

ReactDOM.render(jsx, document.getElementById("root"));
