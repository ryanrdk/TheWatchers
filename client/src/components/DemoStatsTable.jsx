import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DemoStatsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: props.filter.options,
            searchQuery: props.filter.searchQuery,
            selected: props.filter.selected,
            demoData: []
        };
    }

    componentDidMount() {
        const jay = require('../dummyDemographics.json');
        console.log(jay);
        this.setState({ demoData: jay });
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
        console.log(this.state)
        const filt = this.state.demoData.filter((elem) => {
            //  console.log("arr", elem.ethnicity);
             if (this.state.selected === 'ALL') {
                 return elem;
             }
             else if (this.state.selected === 'CPT') {
                if (elem.campus === 'capetown') {
                    return elem;
                }
             }
             else if (this.state.selected === 'JHB') {
                if (elem.campus === 'johannesburg') {
                    return elem;
                }
             }
             return null;
        });
        console.log("Total", filt)
        return (
        <ReactTable
            columns={cols}
            data={filt}
            className={'-highlight'}
            expanded={{
            1: true,
            4: true
            }}
        />
        );
    }
}

export default DemoStatsTable;
