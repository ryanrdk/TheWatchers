import React from "react";
import CampusSelector from "./CampusSelector";
import StatusSelector from "./StatusSelector";
import Header from "./Header";

class Demographics extends React.Component {
    constructor(props) {
        super(props);
    this.campusSelectorElement = React.createRef()
    this.state = {
      campus_selection: [
        { key: "ALL", value: "ALL", text: "All Capmuses" },
        { key: "CPT", value: "CPT", text: "Cape Town" },
        { key: "JHB", value: "JHB", text: "Johannesburg" }
      ],
      status_selection: [
        { key: "allstatus", value: "allstatus", text: "All statuses" },
        { key: "active", value: "active", text: "Active" },
        { key: "selected", value: "selected", text: "Selected" },
        { key: "no_show", value: "no_show", text: "No Show" },
        { key: "quit", value: "quit", text: "Quit" }
      ]
    };
  }

  componentDidMount() {
    var campusNode = document.getElementById("campus").lastChild;
    var statusNode = document.getElementById("status").lastChild;
    document.getElementById("curr-view").appendChild(campusNode);
    document.getElementById("curr-view").appendChild(statusNode);
    // const jay = require('../bootcampers.json');
    // this.setState({ users: jay });
    // console.log("demograph HERE", this.state);
    const GRAPHQL_API = 'http://localhost:4000/graphql';
    const query = `{
    getAllBootcampers {
        _id
        first_name
        last_name
        username
        email
        gender
        campus
        ethnicity
        active
    }
    }`
    fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
        query
    }),
    headers: {
        'content-type': 'application/json'
    }
    }).then(response => response.json())
    .then(result =>  { this.campusSelectorElement.current.updateStats(result.data.getAllBootcampers)
        console.log("arurhasdfsdf", result.data.getAllBootcampers)});
}
render() {
    return (
      <div>
        <Header />
        <div id='campus' style={{ clear: "both", float: "left" }}>
            <CampusSelector ref={this.campusSelectorElement} campus_selection={this.state.campus_selection} />
        </div>
        <div id='status' style={{ clear: "both", float: "left" }}>
          <StatusSelector status_selection={this.state.status_selection} />
        </div>
      </div>
    );
  }
}

export default Demographics;
