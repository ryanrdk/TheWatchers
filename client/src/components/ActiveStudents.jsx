import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ActiveStudents extends React.Component {
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
    const cols = [
      {
        Header: 'ID',
        accessor: 'User_id'
      },
      {
        Header: 'Username',
        accessor: 'Username'
      },
      {
        Header: 'Campus',
        accessor: 'Campus'
      },
      {
        Header: 'Final Mark',
        accessor: 'Final_mark'
      },
      {
        Header: 'Mark 1',
        accessor: 'Mark1'
      },
      {
        Header: 'Comment 1',
        accessor: 'Comment3',
        sortable: false
      },
      {
        Header: 'Mark 2',
        accessor: 'Mark2'
      },
      {
        Header: 'Comment 2',
        accessor: 'Comment2',
        sortable: false
      },
      {
        Header: 'Mark 3',
        accessor: 'Mark3'
      },
      {
        Header: 'Comment 3',
        accessor: 'Comment3',
        sortable: false
      },
      {
        Header: 'Cheating',
        accessor: 'Cheating'
      }
    ];
    return (
      <ReactTable
        columns={cols}
        data={this.state.users}
        filterable
        className={'-highlight'}
        expanded={{
          1: true,
          4: true
        }}
      />
    );
  }
}

export default ActiveStudents;
