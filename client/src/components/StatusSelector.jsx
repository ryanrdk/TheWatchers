import React from 'react';
import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

class StatusSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options : props.status_selection,
            searchQuery: '',
            selected: 'allstatus'
        }
        // console.log("StatProppies", this.state)
    }
    onChange = (e, data) => {
        // console.log(data.value);
        // console.log('data', data);
        this.setState({ selected: data.value, searchQuery: '' });
    }

    onSearchChange = (e, data) => {
        // console.log(data.searchQuery);
        this.setState({ searchQuery: data.searchQuery });
    }    
    render() {
        const { options, searchQuery, selected } = this.state;
        return (
            <Dropdown placeholder='Status' search selection
            value={selected}
            text={searchQuery}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            options={options} />
        );
    }
}

export default StatusSelector;