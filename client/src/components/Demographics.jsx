import React from 'react';
// import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Demographics extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
    users: []
    };
}

componentDidMount() {
    const jay = require('../bootcampers.json');
    this.setState({ users: jay });
}
render() {
    return (
        <div>This is the demographics page</div>
    );
}
}

export default Demographics;
