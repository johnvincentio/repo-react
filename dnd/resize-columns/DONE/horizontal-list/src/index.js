import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import ReactDraggable from "react-draggable";
import { MoreVert } from "@material-ui/icons";
// fake data generator
const getItems = () => [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
    width: 500
  },
  {
    id: "Calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
    width: 200
  },
  {
    id: "Fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
    width: 200
  },
  {
    id: "Carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
    width: 200
  },
  {
    id: "Protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
    width: 200
  }
];
// Array.from({ length: count }, (v, k) => k).map(k => ({
//   id: `item-${k}`,
//   content: `item ${k}`
// }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  displey: "inline-block",

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  overflow: "auto"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(6)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  handleWidthChange = (columnId, width) => {
    console.log("columnId, width", columnId, width);
    this.setState(state => {
      const currentColumns = state.items;
      const currentColumnIndex = currentColumns.findIndex(column => {
        console.log("column.id, columnId", column.id, columnId);
        return column.id === columnId;
      });
      console.log("currentColumnIndex", currentColumnIndex);
      const columnToChange = currentColumns[currentColumnIndex];
      console.log(columnToChange);
      const changedColumn = { ...columnToChange, width };
      console.log(changedColumn);
      currentColumns.splice(currentColumnIndex, 1, changedColumn);
      // Return the unchanged columns concatenated with the new column
      const newState = {
        columnData: currentColumns
      };
      console.log(newState);
      return newState;
    });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table>
          <TableHead>
            <TableRow>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.items.map((item, index) => (
                      <TableCell
                        style={{
                          overflow: "none",
                          width: item.width + 25,
                          paddingLeft: 0,
                          paddingRight: 0
                        }}
                      >
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, {
                                ...provided.draggableProps.style,
                                display: "inline-block"
                              })}
                            >
                              <div
                                style={{
                                  width: item.width - 55,
                                  display: "inline-block"
                                }}
                              >
                                {item.id}
                              </div>
                              {!snapshot.isDragging && (
                                <ReactDraggable
                                  axis="x"
                                  defaultClassName="ReactDragHandle"
                                  defaultClassNameDragging="ReactDragHandleActive"
                                  onStop={(event, data) => {
                                    console.log(event, data);
                                    const newWidth = item.width + data.x;
                                    return this.handleWidthChange(
                                      item.id,
                                      newWidth
                                    );
                                  }}
                                  position={{
                                    x: 0,
                                    y: 0
                                  }}
                                  zIndex={999}
                                >
                                  <button
                                    style={{
                                      borderStyle: "none",
                                      display: "inline-block"
                                    }}
                                  >
                                    <MoreVert style={{ height: "15px" }} />
                                  </button>
                                </ReactDraggable>
                              )}
                            </div>
                          )}
                        </Draggable>
                      </TableCell>
                    ))}
                    {/* provided.placeholder */}
                  </div>
                )}
              </Droppable>
            </TableRow>
          </TableHead>
        </Table>
      </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
