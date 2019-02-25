import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';
import { Loader } from 'semantic-ui-react';
import { GET_BOOTCAMPER_DAYS } from '../queries';

class TableSelected extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: [],
      filteredSub: [],
      selectAll: false,
      data: [],
      checked: [],
      expanded: {},
      prevRow: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
      this
    );
  }

  updateStats(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
    let newCheck = [];

    for (let i = 0; i < data.length; ++i) {
      if (data[i].active === 'selected') {
        newCheck[i] = 'checked';
      } else {
        newCheck[i] = '';
      }
    }

    this.setState({
      checked: newCheck
    });
  }

  expand_row(row) {
    let prevR = this.state.prevRow;
    let expanded = {};// = { ...this.state.expanded };
    if (prevR) {
      if (row.original._id === prevR.original._id) {
        expanded = { ...this.state.expanded };
      }
      else expanded = {}
    }
    if (expanded[row.index]) {
      expanded[row.index] = !expanded[row.index];
      this.setState({ prevRow: null })
    } else {
      expanded[row.index] = true;
      this.setState({ prevRow: row })
    }
    this.setState({
      expanded: expanded
    });
  }

  updateStats2(data) {
    this.setState({
      filteredSub: data
    });
    // this.downloadCSVElement.current.updateStats(data);
    // console.log("compo", this.state.filteredSub)
  }

  handleChange = () => {
    let selectAll = !this.state.selectAll;
    this.setState({ selectAll: selectAll });
    let newCheck = [];
    this.state.data.forEach(function (e, index) {
      newCheck.push(selectAll);
    });

    this.setState({
      checked: newCheck
    });
  };

  handleSingleCheckboxChange = index => {
    let newCheck = this.state.checked;
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
    let newCheck = [];
    let selectAll = this.state.selectAll;

    for (let i = 0; i < newCheck.length; ++i) {
      if (newData[i]['active'] === 'selected') {
        newCheck[i] = 'checked';
      } else if (newData[i]['active'] !== 'selected') {
        newCheck[i] = '';
      }
    }

    this.setState({
      data: newData, //maybe not necessary
      checked: newCheck,
      selectAll: selectAll
    });
  }

  render() {
    const cols = [
      {
        expander: true,
        Header: () => <strong>More</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) => {
          if (rest.original.subTableData) {
            return (
              <div>
                {isExpanded
                  ? <div>Nope</div>
                  : <div>Yep</div>
                }
              </div>
            )
          } else {
            return null
          }
        },
      },
      {
        Header: 'Selected',
        Cell: row => (
          <input
            type='checkbox'
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
    const colsSub = [
      {
        Header: 'Username',
        accessor: 'Username'
      },
      {
        Header: 'Campus',
        accessor: 'Campus'
      },
      {
        Header: 'Day',
        accessor: 'Day'
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
        accessor: 'Comment1'
      },
      {
        Header: 'Mark 2',
        accessor: 'Mark2'
      },
      {
        Header: 'Comment 2',
        accessor: 'Comment2'
      },
      {
        Header: 'Mark 3',
        accessor: 'Mark3'
      },
      {
        Header: 'Comment 3',
        accessor: 'Comment3'
      },
      {
        Header: 'Cheating',
        accessor: 'Cheating'
      }
    ];

    // SubComponent={row => {
    //   return (
    //     <div style={{ padding: "20px" }}>
    //       <em>
    //         You can put any component you want here, even another React
    //         Table!
    //       </em>
    //       <br />
    //       <br />
    //       <ReactTable
    //         data={data}
    //         columns={columns}
    //         defaultPageSize={3}
    //         showPagination={false}
    //         SubComponent={row => {
    //           return (
    //             <div style={{ padding: "20px" }}>
    //               Another Sub Component!
    //             </div>
    //           );
    //         }}
    //       />
    //     </div>
    //   );
    // }

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
            noDataText={
              <div>
                <br />
                <br />
                <Loader active inline='centered' />
              </div>
            }
            expanded={this.state.expanded}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  if (column.Expander) {
                    GET_BOOTCAMPER_DAYS(this, rowInfo.original.username)
                    this.expand_row(rowInfo);
                    handleOriginal()
                  }
                }
              };
            }}
            SubComponent={row => {
              return (
                <div style={{ padding: "20px" }}>
                  <ReactTable columns={colsSub} data={this.state.filteredSub} />
                </div>
              )
            }}
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
