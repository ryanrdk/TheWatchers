import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Header from "./Header";

class ActiveStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: []
    };
  }

  componentDidMount() {
    var activeNode = document.getElementById("active").lastChild;
    document.getElementById("curr-view").appendChild(activeNode);

    const jay = require("../bootcampers.json");
    this.setState({ userData: jay });
  }
  render() {
    const cols = [
      {
        Header: "ID",
        accessor: "User_id"
      },
      {
        Header: "Username",
        accessor: "Username"
      },
      {
        Header: "Campus",
        accessor: "Campus"
      },
      {
        Header: "Final Mark",
        accessor: "Final_mark"
      },
      {
        Header: "Mark 1",
        accessor: "Mark1"
      },
      {
        Header: "Comment 1",
        accessor: "Comment3",
        sortable: false
      },
      {
        Header: "Mark 2",
        accessor: "Mark2"
      },
      {
        Header: "Comment 2",
        accessor: "Comment2",
        sortable: false
      },
      {
        Header: "Mark 3",
        accessor: "Mark3"
      },
      {
        Header: "Comment 3",
        accessor: "Comment3",
        sortable: false
      },
      {
        Header: "Cheating",
        accessor: "Cheating"
      }
    ];

    return (
      <div>
        <Header />
        <div id='active' style={{ clear: "both", float: "left" }}>
          <ReactTable
            columns={cols}
            data={this.state.userData}
            filterable
            className={"-highlight"}
            expanded={{
              1: true,
              4: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default ActiveStudents;
