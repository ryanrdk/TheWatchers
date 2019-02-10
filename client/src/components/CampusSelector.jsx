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
        this.demoStatsTableElement.current.updateStats(filt);
        /* Graphql tryout
        const filt2 = []
        const GRAPHQL_API = 'http://localhost:4000/graphql';
        const query = `{
        getAllBootcampers {
            _id
            first_name
            username
            campus
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
        .then(result =>  {
             filt2.push(result.data.getAllBootcampers.forEach((elem) => {
                console.log(elem);
                return elem;
            }));
            // console.log("the res",filt2);
        // filt2.push(result)
        }, this.setState({ selected: data.value, searchQuery: '', filteredData: filt2[0] }),
        this.demoStatsTableElement.current.updateStats(filt2[0]),
        console.log("gingni",filt2)
        )*/
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