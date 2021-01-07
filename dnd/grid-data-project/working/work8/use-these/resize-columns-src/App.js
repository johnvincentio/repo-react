import React, { useRef, useState, useEffect, useCallback } from "react";
import { forEach, isFunction } from "lodash";
import "./styles.css";

const Splitter = ({ column, columnIdx, onResize }) => {
  const columnResizing = useRef(null);
  const splitStyle = {
    position: "absolute",
    right: "0px",
    top: "0px",
    width: "5px",
    height: "100%",
    borderBottom: "1px solid black",
    backgroundColor: "#FFF",
    ...(onResize && { cursor: "col-resize" })
  };
  const lineStyle = {
    position: "absolute",
    top: "0px",
    left: "2px",
    width: "1px",
    height: "100%",
    backgroundColor: "black"
  };

  const onResizeMove = useCallback(
    e => {
      const { left, width } = columnResizing.current;
      const diff = e.clientX - left;
      const newWidth = `${width + diff}px`;
      column.style.width = newWidth;
      column.style.minWidth = newWidth;
      column.style.maxWidth = newWidth;
      onResize({ column, columnIdx });
    },
    [column, columnIdx, onResize]
  );

  const onResizeStop = useCallback(() => {
    document.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", onResizeStop);
    document.documentElement.style.cursor = null;
    columnResizing.current = null;
  }, [onResizeMove]);

  const onResizeStart = useCallback(
    e => {
      const left = e.clientX;
      const width = column.ref.current.offsetWidth;
      columnResizing.current = { left, width };
      if (!column.style) {
        column.style = {};
      }
      document.addEventListener("mousemove", onResizeMove);
      document.addEventListener("mouseup", onResizeStop);
      console.log(document.body.style.cursor);
      document.documentElement.style.cursor = "col-resize";
    },
    [onResizeMove, onResizeStop, column]
  );
  if (onResize) {
    return (
      <div style={splitStyle} onMouseDown={onResizeStart}>
        <div style={lineStyle} />
      </div>
    );
  } else {
    return (
      <div style={splitStyle}>
        <div style={lineStyle} />
      </div>
    );
  }
};

const Table = ({ columns, data }) => {
  const [columnFixed, setColumnFixed] = useState(false);
  const [columnResize, setColumnResize] = useState(false);
  const onColumnResize = () => {
    setColumnFixed(true);
    setColumnResize({});
  };
  const tableStyle = {
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    width: "100%"
  };

  //set fixed width columns
  if (columnFixed) {
    forEach(columns, (column, columnIdx) => {
      if (!column.style) {
        column.style = {};
      }
      //Set fixed dimension on all columns except last column
      if (columnIdx + 1 < columns.length) {
        if (!column.style.minWidth) {
          const { offsetWidth } = column.ref.current;
          column.style.width = `${offsetWidth}px`;
          column.style.minWidth = `${offsetWidth}px`;
          column.style.maxWidth = `${offsetWidth}px`;
        }
      }
      //Set last column width to auto (stretch)
      else {
        column.style.width = "auto";
        column.style.maxWidth = "auto";
      }
    });
  }
  return (
    <table cellPadding="0" cellSpacing="0" style={tableStyle}>
      <THead columns={columns} onColumnResize={onColumnResize} />
      <tbody>
        {data.map((item, rowIdx) => (
          <TBodyRow
            columns={columns}
            data={item}
            rowIdx={rowIdx}
            key={rowIdx}
          />
        ))}
      </tbody>
    </table>
  );
};

const THead = ({ columns, onColumnResize }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, columnIdx) => (
          <React.Fragment key={columnIdx}>
            <THeadCell
              column={column}
              columnIdx={columnIdx}
              totalColumns={columns.length}
              onResize={onColumnResize}
            />
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
};

const THeadCell = ({ column, columnIdx, totalColumns, onResize }) => {
  column.ref = useRef();
  const cellStyle = {
    borderBottom: "1px solid black",
    overflow: "hidden",
    position: "relative"
  };
  const style = { ...cellStyle, ...column.style };
  return (
    <th ref={column.ref} style={style}>
      <div style={{ padding: "10px" }}>{column.header}</div>
      {columnIdx < totalColumns - 1 && (
        <Splitter column={column} onResize={onResize} />
      )}
    </th>
  );
};

const TBodyRow = ({ columns, data, rowIdx }) => {
  return (
    <tr>
      {columns.map((column, columnIdx) => (
        <React.Fragment key={columnIdx}>
          <TBodyCell
            column={column}
            columnIdx={columnIdx}
            totalColumns={columns.length}
            data={data}
          />
        </React.Fragment>
      ))}
    </tr>
  );
};

const TBodyCell = ({ column, columnIdx, totalColumns, data }) => {
  const cellStyle = {
    borderBottom: "1px solid black",
    position: "relative",
    overflow: "hidden"
  };
  let content;
  if (isFunction(column.accessor)) {
    content = column.accessor(data);
  } else {
    content = data[column.accessor];
  }
  const style = { ...cellStyle, ...column.style };
  return (
    <td style={style}>
      <div style={{ padding: "10px" }}>{content}</div>

      {columnIdx < totalColumns - 1 && <Splitter />}
    </td>
  );
};

export default function App() {
  const columns = [
    {
      id: 1,
      header: "a",
      accessor: "a",
      style: { width: "300px" }
    },
    {
      id: 2,
      header: "b",
      accessor: "b"
    },
    {
      id: 2,
      header: "c",
      accessor: "c"
    },
    {
      id: 2,
      header: "d",
      accessor: "d"
    },
    {
      id: 1,
      header: "e",
      accessor: "e"
    }
  ];

  const data = [
    {
      a: "aaaaaaaaaaaaaaaaa",
      b: "b",
      c: "c",
      d: "d",
      e: "e"
    }
  ];

  return (
    <div className="App" style={{ padding: "10px" }}>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
