import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { DataTable } from "./DataTable";
import { Slider } from "./Slider";

function App() {
  const headers = [
    {
      key: 1,
      label: "First",
      property: "firstName",
      sortable: true,
      align: "left"
    },
    {
      key: 2,
      label: "Last",
      property: "lastName",
      sortable: true,
      align: "left"
    },
    {
      key: 3,
      label: "age",
      property: "age",
      sortable: true,
      align: "left"
    },
    {
      key: 4,
      label: "sex",
      property: "sex",
      sortable: true,
      align: "left"
    }
  ];

  const data = [
    { firstName: "Bob", lastName: "Smith", age: 47, sex: "M" },
    { firstName: "Carol", lastName: "Jones", age: 29, sex: "F" },
    { firstName: "Ted", lastName: "Green", age: 13, sex: "M" },
    { firstName: "Alice", lastName: "Brown", age: 41, sex: "F" }
  ];

  return (
    <div className="App">
      <Slider id="foo" onSlide={(delta, id) => console.log(delta, id)} />
      <DataTable headers={headers} data={data} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
