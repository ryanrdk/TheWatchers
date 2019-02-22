import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

/**
 * TableStats TABLE ~~~ Displays table of demographics
 * State -> filtered, demoCount
 * Ref -> downloadCSVElement
 * Child components -> DownloadCSV ~~ Download the data
 */
class TableStats extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      // thisFilt: [props.demoCount.capetown.male, props.demoCount.capetown.female, props.demoCount.johannesburg.male, props.demoCount.johannesburg.female],
      filtered: props.demoCount,
      demoCount: props.demoCount
    };
    // console.log("inherit", this.state.thisFilt)
  }

  componentDidMount() {
    // const jay = require('../dummyDemographics.json');
    // console.log(jay);
    // this.setState({ demoData: jay, filtered:jay });
    this.setState({ filtered: this.state.demoCount });
    const tabData = [
      this.state.demoCount.capetown.male,
      this.state.demoCount.capetown.female,
      this.state.demoCount.johannesburg.male,
      this.state.demoCount.johannesburg.female
    ];
    // console.log("upTabData", tabData)
    // if (tabData) { this.downloadCSVElement.current.updateStats({ data: tabData }) }
  }
  updateStats(data) {
    this.setState({ filtered: data });
    // console.log("filterTable", data)
    this.downloadCSVElement.current.updateStats(data);
  }
  render() {
    const cols = [
      {
        Header: 'Demographs',
        accessor: 'dem'
      },
      {
        Header: 'Black',
        accessor: 'black'
      },
      {
        Header: 'White',
        accessor: 'white'
      },
      {
        Header: 'Coloured',
        accessor: 'coloured'
      },
      {
        Header: 'Indian',
        accessor: 'indian'
      },
      {
        Header: 'Chinese',
        accessor: 'chinese'
      }
    ];
    // console.log("DemStats", this.state)
    //this.state.filtered = filt;
    // console.log("Total", this.state.thisFilt)
    // console.log("upTabherereerer", this.state.demoCount.capetown)
    const tabData = [
      this.state.demoCount.capetown.male,
      this.state.demoCount.capetown.female,
      this.state.demoCount.johannesburg.male,
      this.state.demoCount.johannesburg.female
    ];
    let oh = this.state.filtered;
    if (oh.constructor === Object) {
      // console.log("oh object")
      oh = [
        this.state.demoCount.capetown.male,
        this.state.demoCount.capetown.female,
        this.state.demoCount.johannesburg.male,
        this.state.demoCount.johannesburg.female
      ];
    }
    // if (oh.constructor === Array) { console.log("oh array") }
    // var { demoCount } = this.state.demoCount
    // this.downloadCSVElement.current.setState({ data: tabData })
    // if (tabData) { this.downloadCSVElement.current.updateStats({ data: tabData }) }
    return (
      <div>
        <div>
          <ReactTable
            columns={cols}
            data={oh}
            className={'-highlight'}
            expanded={{
              1: true,
              4: true
            }}
            showPagination={false}
            pageSize={this.state.filtered.length + 1}
          />
        </div>
        <div>
          <DownloadCSV ref={this.downloadCSVElement} />
        </div>
      </div>
    );
  }
}

export default TableStats;
