import React from "react";
import Row from "./Row";
import Cell from "./Cell";
import Entity from "./Entity";

const ReactDnD = () => (
  <Row>
    {[...new Array(6).keys()].map(key => <Cell key={key} />)}
    <Entity name="Entity 1" width={140} left={150} />
  </Row>
);

export default ReactDnD;
