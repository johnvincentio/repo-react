import React, { Component } from "react";
import { fromJS } from "immutable";
import Row from "./Row";
import Cell from "../beautiful/Cell";
import Entity, { ReResizeEntity } from "./Entity";

class ReactDnD extends Component {
  constructor() {
    super();
    this.state = {
      enities: fromJS([
        {
          id: 1,
          name: "Entity 1",
          width: 140,
          left: 150
        }
      ]),
      isDragging: false
    };
  }

  setLeftOffsest = (id, left) =>
    this.setState(prevState => {
      const index = prevState.enities.findIndex(
        entity => entity.get("id") === id
      );

      return {
        enities: prevState.enities.setIn([index, "left"], left),
        isDragging: false
      };
    });

  handleDragStart = () => this.setState({ isDragging: true });
  handleResize = (id, width) =>
    this.setState(prevState => {
      const index = prevState.enities.findIndex(
        entity => entity.get("id") === id
      );

      return {
        enities: prevState.enities.setIn([index, "width"], width),
        isDragging: false
      };
    });

  render() {
    return (
      <div>
        <Row>
          {[...new Array(6).keys()].map(key => (
            <Cell key={key} isDraggingOver={this.state.isDragging} />
          ))}
          {this.state.enities.map(entity => (
            <Entity
              {...entity.toJS()}
              key={entity.get("id")}
              setLeftOffsest={this.setLeftOffsest}
              onDragStart={this.handleDragStart}
              onResize={this.handleResize}
            />
          ))}
        </Row>
        <Row>
          {[...new Array(6).keys()].map(key => (
            <Cell key={key} isDraggingOver={this.state.isDragging} />
          ))}
          {this.state.enities.map(entity => (
            <ReResizeEntity
              {...entity.toJS()}
              key={entity.get("id")}
              setLeftOffsest={this.setLeftOffsest}
              onDragStart={this.handleDragStart}
              onResize={this.handleResize}
            />
          ))}
        </Row>
      </div>
    );
  }
}

export default ReactDnD;
