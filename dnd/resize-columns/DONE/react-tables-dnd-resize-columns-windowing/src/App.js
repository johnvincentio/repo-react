import React from "react";
import styled from "styled-components";
import {
  useTable,
  useBlockLayout,
  useColumnOrder,
  useResizeColumns
} from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FixedSizeList } from "react-window";

import makeData from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  * {
    box-sizing: border-box;
  }

  .table {
    max-width: 800px;
  }

  .header {
    font-weight: bold;
  }

  .row {
    border-bottom: 1px solid #000;
    height: 32px;

    &.body {
      :last-child {
        border: 0;
      }
    }
  }

  .cell {
    height: 100%;
    line-height: 31px;
    border-right: 1px solid #000;
    position: relative;
    /* padding-left: 5px; */

    :last-child {
      border: 0;
    }

    .resizer {
      display: inline-block;
      background: blue;
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${"" /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: red;
      }
    }
  }
`;

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
  ...draggableStyle,
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightGrey" : "grey",

  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" })

  // styles we need to apply on draggables
});

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 500
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    setColumnOrder,
    totalColumnsWidth,
    state
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useColumnOrder,
    useBlockLayout,
    useResizeColumns
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style
          })}
          className="row body"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="cell">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  const currentColOrder = React.useRef();

  // Render the UI for your table
  return (
    <>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map(headerGroup => (
            <DragDropContext
              onDragStart={() => {
                currentColOrder.current = allColumns.map(o => o.id);
              }}
              onDragUpdate={(dragUpdateObj, b) => {
                // console.log("onDragUpdate", dragUpdateObj, b);

                const colOrder = [...currentColOrder.current];
                const sIndex = dragUpdateObj.source.index;
                const dIndex =
                  dragUpdateObj.destination && dragUpdateObj.destination.index;

                if (typeof sIndex === "number" && typeof dIndex === "number") {
                  colOrder.splice(sIndex, 1);
                  colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                  setColumnOrder(colOrder);

                  // console.log(
                  //   "onDragUpdate",
                  //   dragUpdateObj.destination.index,
                  //   dragUpdateObj.source.index
                  // );
                  // console.log(temp);
                }
              }}
            >
              <Droppable droppableId="droppable" direction="horizontal">
                {(droppableProvided, snapshot) => (
                  <div
                    {...headerGroup.getHeaderGroupProps()}
                    ref={droppableProvided.innerRef}
                    className="row header-group"
                  >
                    {headerGroup.headers.map((column, index) => (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={index}
                        isDragDisabled={!column.accessor}
                      >
                        {(provided, snapshot) => {
                          // console.log(column.getHeaderProps());

                          // const {
                          //   style,
                          //   ...extraProps
                          // } = column.getHeaderProps();

                          // console.log(style, extraProps);

                          return (
                            <div
                              {...column.getHeaderProps()}
                              className="cell header"
                            >
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                // {...extraProps}
                                ref={provided.innerRef}
                                style={{
                                  ...getItemStyle(
                                    snapshot,
                                    provided.draggableProps.style
                                  )
                                  // ...style
                                }}
                              >
                                {column.render("Header")}
                              </div>
                              <div
                                {...column.getResizerProps()}
                                className={`resizer ${
                                  column.isResizing ? "isResizing" : ""
                                }`}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {/* {droppableProvided.placeholder} */}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ))}
        </div>

        <div className="rows" {...getTableBodyProps()}>
          <FixedSizeList
            height={600}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth}
          >
            {RenderRow}
          </FixedSizeList>

          {/* {rows.map(
            (row, i) =>
              prepareRow(row) || (
                <div {...row.getRowProps()} className="row body">
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="cell">
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              )
          )} */}
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            width: 50
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 60
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(10000), []);
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default App;
