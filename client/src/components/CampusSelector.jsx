import React from 'react';
import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

class CampusSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options : props.campus_selection,
            searchQuery: '',
            selected: 'ALL'
        }
        // console.log("Proppies", this.state.options)
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
            <Dropdown placeholder='Campus' search selection
            value={selected}
            text={searchQuery}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            options={options} />
        );
    }
}

export default CampusSelector;