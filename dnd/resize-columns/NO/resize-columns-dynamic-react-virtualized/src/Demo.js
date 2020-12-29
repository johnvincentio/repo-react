import React from "react";
import { Column, Table } from "react-virtualized";
import Draggable from "react-draggable";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
const TOTAL_WIDTH = 800;

const SortableHeader = sortableElement(({ children, ...props }) =>
  React.cloneElement(children, props)
);

const SortableHeaderRowRenderer = sortableContainer(
  ({ className, columns, style }) => (
    <div className={className} role="row" style={style}>
      {React.Children.map(columns, (column, index) => (
        <SortableHeader index={index}>{column.label}</SortableHeader>
      ))}
    </div>
  )
);

export default class Demo extends React.Component {
  state = {
    widths: {
      name: 0.25,
      location: 0.25,
      description: 0.25,
      email: 0.25
    },
    columns: {
      name: {
        width: 0.25
      },
      location: {
        width: 0.25
      },
      description: {
        width: 0.25
      },
      email: {
        width: 0.25
      }
    },
    columnList: []
  };

  componentDidMount = () => {
    this.setState({ columnList: Object.keys(this.state.columns) });
  };

  render() {
    const { list } = this.props;
    const { columns } = this.state;

    return (
      <Table
        width={TOTAL_WIDTH}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
      >
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="name"
          label="Name"
          width={columns.name.width * TOTAL_WIDTH}
        />
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="location"
          label="Location"
          width={columns.location.width * TOTAL_WIDTH}
        />
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="description"
          label="Description"
          width={columns.description.width * TOTAL_WIDTH}
        />
        <Column
          dataKey="email"
          label="Email"
          width={columns.email.width * TOTAL_WIDTH}
        />
      </Table>
    );
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ columnList }) => ({
      columnList: arrayMove(columnList, oldIndex, newIndex)
    }));
  };

  headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
  }) => {
    return (
      <React.Fragment key={dataKey}>
        <SortableHeaderRowRenderer
          dataKey={dataKey}
          label={label}
          axis="x"
          lockAxis="x"
          onSortEnd={this.onSortEnd}
        />
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            this.resizeRow({
              dataKey,
              deltaX
            })
          }
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className="DragHandleIcon">⋮</span>
        </Draggable>
      </React.Fragment>
    );
  };

  resizeRow = ({ dataKey, deltaX }) =>
    this.setState(prevState => {
      const prevColumns = prevState.columns;
      const percentDelta = deltaX / TOTAL_WIDTH;

      // const nextDataKey = dataKey === "name" ? "location" : "description";

      const dataKeys = this.state.columnList;
      console.log(dataKeys);
      const nextDataKey =
        dataKeys[
          dataKeys.findIndex(element => {
            return dataKey === element;
          }) + 1
        ];

      console.log(nextDataKey);

      const column = prevColumns[dataKey];
      column.width = prevColumns[dataKey].width + percentDelta;

      const nextColumn = prevColumns[nextDataKey];
      nextColumn.width = prevColumns[nextDataKey].width - percentDelta;

      return {
        columns: {
          ...prevColumns,
          [dataKey]: column,
          [nextDataKey]: nextColumn
        }
      };
    });
}
