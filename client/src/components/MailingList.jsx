import React from 'react';
import ReactTable from 'react-table';
import DownloadCSV from './DownloadCSV';
import { Link } from 'react-router-dom';

class MailingList extends React.Component {
    constructor(props) {
        super(props);
    this.reactTable = React.createRef();
    this.downloadCSVElement = React.createRef()
    this.state = {
        data: [],
        filtered: []
    };
}

componentDidMount() {
    const jay = require('../dummyDemographics.json');
    this.setState({data: jay})
    this.updateStats(jay)
}
updateStats(data) {
    this.setState({ filtered: data})
    this.downloadCSVElement.current.updateStats(data)
}
onTableViewChange = () =>
{
  const current = this.reactTable.current;
  if (current)
  {
    console.log('curru',current.state)
    const page = current.state.page;
    const pageSize = current.state.pageSize;
    const allData = current.getResolvedState().sortedData;
    const startIdx = page * pageSize;
    const currentData = allData.slice(startIdx, startIdx + (pageSize*current.state.pages)).map((item) => item._original);
    console.log("datahere",currentData);
    this.updateStats(currentData)
  }
  
}
filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
  }
render() {
    const cols = [
    {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Username',
        accessor: 'username'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Campus',
        accessor: 'campus'
    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Ethnicity',
        accessor: 'ethnicity'
    },
    {
        Header: 'Active',
        accessor: 'active'
    }
    ];
    return (
        // console.log("YAYYY HERE", this.state),
        <div>
            <div className='ui vertical inverted left visible sidebar menu'>
                <Link to='/demographs' className='item'>
                <i className='home icon' />
                Home
                </Link>
                <Link to='/watcher' className='item'>
                <i className='block layout icon' />
                Active Students
                </Link>
                <Link to='/watcher' className='item'>
                <i className='block layout icon' />
                Mailing List
                </Link>
            </div>
            <div className='pusher'>
            <ReactTable
                ref={this.reactTable}
                columns={cols}
                data={this.state.data}
                filterable
                defaultFilterMethod={this.filterMethod}
                onChange={this.onChange}
                className={'-highlight'}
                expanded={{
                1: true,
                4: true
                }}
                // onPageChange={this.onTableViewChange}
                // onPageSizeChange={this.onTableViewChange}
                // onSortedChange={this.onTableViewChange}
                // onExpandedChange={this.onTableViewChange} 
                onFilteredChange={this.onTableViewChange}
                // onResizedChange={this.onTableViewChange}
            />
            <DownloadCSV ref={this.downloadCSVElement} />
            </div>
        </div>
    );
}
}

export default MailingList;
