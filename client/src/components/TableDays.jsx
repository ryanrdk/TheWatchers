import React from 'react';
import ReactTable from 'react-table';

/**
 * This component is our table for displaying the student course work gradings.
 */

class TableDays extends React.Component {
    constructor(props) {
        super(props);
        this.reactTable = React.createRef();
        this.state = {
            data: [],
            filtered: []
        };
    }
    componentDidMount() {
    }

    updateStats(data) {
        this.setState({ data: data, filtered: data });
    }

    updateChange(data) {
        this.setState({ filtered: data });
    }

    onTableViewChange = async () => {
        await this.updateChange(this.state.data)
        const current = this.reactTable.current;
        if (current) {
            const page = current.state.page;
            const pageSize = current.state.pageSize;
            const allData = current.getResolvedState().sortedData;
            const startIdx = page * pageSize;
            const currentData = allData
                .slice(startIdx, startIdx + pageSize * current.state.pages)
                .map(item => item._original);
            this.updateChange(currentData);
        }
    };

    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true;
    };

    render() {
        const cols = [
            {
                Header: 'Username',
                accessor: 'Username'
            },
            {
                Header: 'Gender',
                accessor: 'bootcamper[0].gender'
            },
            {
                Header: 'Campus',
                accessor: 'Campus'
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

        return (
            <div>
                <div>
                    <ReactTable
                        ref={this.reactTable}
                        columns={cols}
                        data={this.state.filtered}
                        filterable
                        defaultFilterMethod={this.filterMethod}
                        onChange={this.onChange}
                        className={'-highlight'}
                        expanded={{
                            1: true,
                            4: true
                        }}
                        onFilteredChange={this.onTableViewChange}
                    />
                </div>
            </div>
        );
    }
}

export default TableDays;
