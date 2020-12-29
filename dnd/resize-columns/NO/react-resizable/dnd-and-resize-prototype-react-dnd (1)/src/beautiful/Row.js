import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Row extends React.Component {
  constructor() {
    super();
    this.state = {
      mouseX: null,
      mouseY: null
    };
  }

  onDragStart = (...a) => console.log(a);
  onDragEnd = (...a) => console.log(a);

  handleMouseClickPosition = e => {
    console.log(e.screenX, e.screenY);
    this.setState({ mouseX: e.screenX, mouseY: e.screenY });
  };

  render() {
    const { children } = this.props;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="Row"
              ref={provided.innerRef}
              {...provided.droppableProps}
              onMouseClick={this.handleMouseClickPosition}
              onMouseUp={this.handleMouseClickPosition}
            >
              {children}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
export default Row;
