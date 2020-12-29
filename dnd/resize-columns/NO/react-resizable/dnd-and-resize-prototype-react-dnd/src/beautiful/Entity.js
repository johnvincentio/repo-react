import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: "140px",
  left: "150px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const Entity = ({ width, name, left }) => (
  <Draggable key={name} draggableId={name} index={name}>
    {(provided, snapshot) => (
      <div
        className="Entity"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {name}
      </div>
    )}
  </Draggable>
);

Entity.propTypes = {
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Entity;
