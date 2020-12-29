import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragLayer } from "react-dnd";

const getItemStyles = (startOffset, currentOffset) => {
  if (!currentOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    position: "absolute",
    top: -35
  };
};

const collect = monitor => ({
  item: monitor.getItem(),
  currentOffset: monitor.getClientOffset(),
  startOffset: monitor.getInitialClientOffset()
});

class DragTicketPreview extends Component {
  render() {
    const { startOffset, currentOffset, item } = this.props;

    if (item == null) {
      return null;
    }

    return (
      <div className="Cell" style={getItemStyles(startOffset, currentOffset)}>
        PREVIEW
      </div>
    );
  }
}

DragTicketPreview.propTypes = {
  item: PropTypes.object,
  startOffset: PropTypes.object,
  currentOffset: PropTypes.object
};

DragTicketPreview.defaultProps = {
  item: null,
  currentOffset: null,
  startOffset: null
};

export default DragLayer(collect)(DragTicketPreview);
