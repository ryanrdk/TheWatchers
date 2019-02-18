import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

class TableSelected extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: [],
      selectAll: false,
      data: [],
      checked: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
      this
    );
  }

  updateStats(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
    var newCheck = [];

    for (var i = 0; i < data.length; ++i) {
      if (data[i].Selected === 'true') {
        newCheck[i] = 'checked';
      } else {
        newCheck[i] = '';
      }
    }

    this.setState({
      checked: newCheck
    });
  }

  handleChange = () => {
    var selectAll = !this.state.selectAll;
    this.setState({ selectAll: selectAll });
    var newCheck = [];
    this.state.data.forEach(function(e, index) {
      newCheck.push(selectAll);
    });

    this.setState({
      checked: newCheck
    });
  };

  handleSingleCheckboxChange = index => {
    var newCheck = this.state.checked;
    newCheck[index] = !this.state.checked[index];
    if (newCheck[index] === false) {
      this.setState({ selectAll: false });
    }

    this.setState({
      checked: newCheck
    });
  };

  componentDidMount() {
    const newData = require('../selected.json');

    var newCheck = [];
    var selectAll = this.state.selectAll;

    newData.forEach(function(e, index) {
      newCheck.push(selectAll);
    });

    for (var i = 0; i < newCheck.length; ++i) {
      if (newData[i]['Selected'] === 'true') {
        newCheck[i] = 'checked';
      } else if (newData[i]['Selected'] === 'false') {
        newCheck[i] = 'false';
      }
    }

    this.setState({
      data: newData,
      checked: newCheck,
      selectAll: selectAll
    });
  }
  render() {
    const cols = [
      {
        Header: 'Selected',
        Cell: row => (
          <input
            type='checkbox'
            //defaultChecked={this.state.checked[row.index]}
            checked={this.state.checked[row.index]}
            onChange={() => this.handleSingleCheckboxChange(row.index)}
          />
        ),
        sortable: false,
        filterable: false
      },
      {
        Header: 'Username',
        accessor: 'Username'
      },
      {
        Header: 'Gender',
        accessor: 'Gender'
      },
      {
        Header: 'Ethnicity',
        accessor: 'Ethnicity'
      },
      {
        Header: 'Campus',
        accessor: 'Campus'
      },
      {
        Header: 'Mark',
        accessor: 'Mark'
      },
      {
        Header: 'Cheating',
        accessor: 'Cheating'
      }
    ];

    return (
      <div>
        <div>
          <ReactTable
            columns={cols}
            data={this.state.filtered}
            filterable
            className={'-highlight'}
            showPagination={false}
            pageSize={this.state.filtered.length}
          />
          <div>
            <DownloadCSV ref={this.downloadCSVElement} />
          </div>
        </div>
      </div>
    );
  }
}

export default TableSelected;
