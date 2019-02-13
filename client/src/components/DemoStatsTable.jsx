import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

class DemoStatsTable extends React.Component {
    constructor(props) {
        super(props);
        this.downloadCSVElement = React.createRef();
        this.state = {
            filtered: [],
            demoCount: props.demoCount
        };
        // console.log("inherit", this)
    }

    componentDidMount() {
        // const jay = require('../dummyDemographics.json');
        // console.log(jay);
        // this.setState({ demoData: jay, filtered:jay });
        this.setState({ filtered: this.state.demoCount })
        const tabData = [this.state.demoCount.capetown.male, this.state.demoCount.capetown.female,
        this.state.demoCount.johannesburg.male, this.state.demoCount.johannesburg.female]
        console.log("upTabData", tabData)
        if (tabData) { this.downloadCSVElement.current.updateStats({ data: tabData }) }

    }
    updateStats(data) {
        this.setState({ filtered: data })
        this.downloadCSVElement.current.updateStats(data)
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
        console.log("DemStats", this.state)
        //this.state.filtered = filt;
        console.log("Total", this.state.filtered)
        console.log("upTabherereerer", this.state.demoCount.capetown)
        const tabData = [this.state.demoCount.capetown.male, this.state.demoCount.capetown.female,
        this.state.demoCount.johannesburg.male, this.state.demoCount.johannesburg.female]
        // console.log("upTabData", tabData)
        // if (tabData) { this.downloadCSVElement.current.updateStats({ data: tabData }) }
        return (
            <div>
                <div>
                    <ReactTable
                        columns={cols}
                        data={tabData}
                        className={'-highlight'}
                        expanded={{
                            1: true,
                            4: true
                        }}
                    />
                </div>
                <div>
                    <DownloadCSV ref={this.downloadCSVElement} />
                </div>
            </div>
        );
    }
}

export default DemoStatsTable;
