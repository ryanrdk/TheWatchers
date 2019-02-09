import React from 'react';
import DemoStatsTable from './DemoStatsTable';
import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

class CampusSelector extends React.Component {
    constructor(props) {
        super(props)
        this.demoStatsTableElement = React.createRef();
        this.state = {
            options : props.campus_selection,
            searchQuery: '',
            selected: 'ALL',
            demoData: [],
            filteredData: []
        }
    }
    componentDidMount() {
        const jay = require('../dummyDemographics.json');
        console.log(jay);
        this.setState({ demoData: jay, filteredData: jay });
        this.demoStatsTableElement.current.updateStats(jay);
    }
    onChange = (e, data) => {
        // console.log(data.value);
        // console.log('data', data);
        const filt = this.state.demoData.filter((elem) => { 
            //  console.log("arr", elem.ethnicity);
                if (data.value === 'ALL') {
                    return elem;
                }
                else if (data.value === 'CPT') {
                if (elem.campus === 'capetown') {
                    return elem;
                }
                }
                else if (data.value === 'JHB') {
                if (elem.campus === 'johannesburg') {
                    return elem;
                }
                }
                return null;
        });
        // console.log("filtering",filt);
        this.setState({ selected: data.value, searchQuery: '', filteredData: filt });
        this.demoStatsTableElement.current.updateStats(filt)
    }
    onSearchChange = (e, data) => {
        // console.log(data.searchQuery);
        this.setState({ searchQuery: data.searchQuery });
    }    
    render() {
        const { options, searchQuery, selected } = this.state;
        // console.log("here", this.state);
        return (
            <div>
                <div>
                    <Dropdown placeholder='Campus' search selection
                    value={selected}
                    text={searchQuery}
                    onChange={this.onChange}
                    onSearchChange={this.onSearchChange}
                    options={options} />
                </div>
                <div>
                    <DemoStatsTable ref={this.demoStatsTableElement} />
                </div>
            </div>
        );
    }
}

export default CampusSelector;