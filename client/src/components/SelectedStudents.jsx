import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

class SelectedStudents extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      selectAll: false,
      data: [],
      filtered: [],
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
      } else if (data[i].selected === 'false') {
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
    const newData = this.state.filtered;
    var newCheck = [];
    var selectAll = this.state.selectAll;

    newData.forEach(function(e, index) {
      newCheck.push(selectAll);
    });
    for (var i = 0; i < newCheck.length; ++i) {
      if (newData[i].selected === 'true') {
        newCheck[i] = 'checked';
      } else if (newData[i].selected === 'false') {
        newCheck[i] = '';
      }
    }

    this.setState({
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
        accessor: 'username'
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
        Header: 'Campus',
        accessor: 'campus'
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

export default SelectedStudents;
