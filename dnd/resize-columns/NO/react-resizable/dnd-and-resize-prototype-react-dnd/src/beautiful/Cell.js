import React from "react";

const Row = ({ children, isDraggingOver }) => (
  <div className={`Cell ${isDraggingOver ? "Cell_is-dragging-over" : ""}`}>
    {children}
  </div>
);

export default Row;
