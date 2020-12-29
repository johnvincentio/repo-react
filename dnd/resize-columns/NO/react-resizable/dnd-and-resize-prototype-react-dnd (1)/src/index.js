import React from "react";
import ReactDOM from "react-dom";
import ReactBeautifulDnD from "./beautiful/ReactBeautifulDnD";
import ReactDnD from "./react-dnd/ReactDnD";

import "./styles.css";

const App = () => (
  <div className="App">
    <h1>DnD and resize prototype</h1>
    <h2>react-beautiful-dnd</h2>
    <ReactBeautifulDnD />
    <h2>react-dnd</h2>
    <ReactDnD />
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
