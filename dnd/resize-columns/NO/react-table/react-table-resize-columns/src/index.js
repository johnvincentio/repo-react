import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import { IconButton, Checkbox } from "@material-ui/core";
import { Folder, ArrowForward } from "@material-ui/icons";
import FileIcon, { defaultStyles } from "react-file-icon";
import mime from "mime-to-extensions";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  var units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + " " + units[u];
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  data = [
    {
      // id: "aaa",
      name: "server.pem",
      type: "application/x-pem-file",
      size: 45444,
      created: new Date().toUTCString()
    },
    {
      // id: "bbb",
      name: "passwords.txt",
      type: "text/plain",
      size: 2000,
      created: new Date().toUTCString()
    },
    {
      // id: "ccc",
      folder: true,
      name: "pictures",
      created: new Date().toUTCString()
    },
    {
      // id: "ddd",
      name: "Gavin.doc",
      type: "application/msword",
      created: new Date().toUTCString(),
      size: 3450908
    },
    {
      // id: "eee",
      name: "Hobart.docx",
      type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      created: new Date().toUTCString(),
      size: 45123321
    }
  ];

  columns = [
    {
      // id: 1,
      Header: rowInfo => <Checkbox onClick={this.selectAll} />,
      Cell: props =>
        props.original.folder ? (
          <IconButton tooltip="Enter Folder" id={props.original.id}>
            <ArrowForward />
          </IconButton>
        ) : (
          <Checkbox
            key={props.index}
            onChange={this.handleCheckboxChange}
            id={props.original.id}
          />
        ),
      maxWidth: 60,
      width: 60,
      minWidth: 60
    },
    {
      // id: 2,
      Header: "",
      Cell: props =>
        props.original.folder ? (
          <IconButton tooltip="Enter Folder" id={props.original.id}>
            <Folder />
          </IconButton>
        ) : (
          <FileIcon
            size={20}
            extension={"" + mime.extension(props.row.type)}
            {...defaultStyles[mime.extension(props.row.type)]}
            id={props.original.id}
          />
        ),
      maxWidth: 60,
      width: 60,
      minWidth: 60
    },
    {
      // id: 3,
      Header: "Name",
      accessor: "name",
      filterable: true,
      maxWidth: 60,
      width: 60,
      minWidth: 60
    },
    {
      // id: 4, // Required because using custom accessor
      Header: "Size",
      accessor: "size",
      Cell: props => (
        <span className="number" id={props.original.id}>
          {props.value ? humanFileSize(props.value) : ""}
        </span>
      ), // Custom cell components!
      filterable: true,
      maxWidth: 60,
      width: 60,
      minWidth: 60
    },
    {
      // id: 5,
      Header: "MimeType",
      accessor: "type",
      Cell: props =>
        props.original.folder ? (
          <span id={props.original.id}>folder</span>
        ) : (
          props.original.type
        ),
      filterable: true,
      maxWidth: 60,
      width: 60,
      minWidth: 60
    },
    {
      // id: 6,
      Header: "Created",
      accessor: "created",
      filterable: true,
      maxWidth: 60,
      width: 60,
      minWidth: 60
    }
  ];

  render() {
    return (
      <div>
        <ReactTable
          data={this.data}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
