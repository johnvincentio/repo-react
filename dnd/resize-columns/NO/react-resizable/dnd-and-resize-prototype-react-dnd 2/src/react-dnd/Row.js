import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DragPreview from "./DragPreview";

const DRAG_TYPE = "drag";

const dropTarget = {
  drop(props, monitor) {
    console.log(
      "onDrop",
      monitor.getInitialClientOffset(),
      monitor.getInitialSourceClientOffset(),
      monitor.getClientOffset(),
      monitor.getDifferenceFromInitialOffset(),
      monitor.getSourceClientOffset(),
      monitor.getInitialClientOffset().x -
        monitor.getInitialSourceClientOffset().x
    );
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset().x;
    const left = Math.round(item.left + delta);

    item.setLeftOffsest(item.id, left);
  }
};

const collect = (connectDrop, monitor) => ({
  connectDropTarget: connectDrop.dropTarget(),
  highlighted: monitor.isOver()
});

const withDrop = TargetComponent => {
  const DropRow = ({ connectDropTarget, ...rest }) =>
    connectDropTarget(
      <div>
        <TargetComponent {...rest} />
        <DragPreview />
      </div>
    );

  return DropTarget(DRAG_TYPE, dropTarget, collect)(DropRow);
};

const Row = ({ children }) => {
  return <div className="Row">{children}</div>;
};

export default DragDropContext(HTML5Backend)(withDrop(Row));
