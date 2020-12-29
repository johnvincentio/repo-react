import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import ReResizable from "re-resizable";
import { Resizable } from "react-resizable";

const DRAG_TYPE = "drag";

const dragSource = {
  beginDrag(
    { id, left, setLeftOffsest, onDragStart, ...rest },
    monitor,
    component
  ) {
    onDragStart();
    return {
      id,
      left,
      setLeftOffsest
    };
  }
};

const collect = (connectDrag, monitor) => {
  return {
    connectDragSource: connectDrag.dragSource(),
    connectDragPreview: connectDrag.dragPreview()
  };
};

const withDrag = TargetComponent => {
  class DragTicket extends Component {
    componentDidMount() {
      this.props.connectDragPreview(getEmptyImage());
    }

    render() {
      const { connectDragSource, connectDragPreview, ...rest } = this.props;

      return (
        connectDragSource &&
        connectDragPreview &&
        connectDragPreview(
          <div>
            <TargetComponent
              dragHandle={connectDragSource(<i className="mdi mdi-drag">d</i>)}
              {...rest}
            />
          </div>
        )
      );
    }
  }

  DragTicket.propTypes = {
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired
  };

  return DragSource(DRAG_TYPE, dragSource, collect)(DragTicket);
};

const ReResizableEntity = ({ id, width, name, left, dragHandle }) => (
  <ReResizable
    className="Entity"
    style={{ id, width, left, position: "abosolute" }}
    defaultSize={{
      width: 200,
      height: 70
    }}
    onResize={e => console.log("reresize", e, e.screenX)}
  >
    <div className="Enitity__drag-handle">{dragHandle}</div>
    <div className="Enitity__content">{name}</div>
    <div className="Enitity__drag-handle">{dragHandle}</div>
  </ReResizable>
);

const ResizableEntity = ({ id, width, name, left, onResize, dragHandle }) => (
  <div className="Entity" style={{ left, position: "abosolute" }}>
    <Resizable
      width={width}
      onResize={(e, { size }) => {
        console.log("resize", size);
        return onResize(id, size.width);
      }}
      style={{ width }}
      axis="x"
    >
      <div>
        <div>r</div>
        <div className="Enitity__drag-handle">{dragHandle}</div>
        <div className="Enitity__content">{name}</div>
        <div className="Enitity__drag-handle">{dragHandle}</div>
      </div>
    </Resizable>
  </div>
);

export default withDrag(ResizableEntity);

export const ReResizeEntity = withDrag(ReResizableEntity);
