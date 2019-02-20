import React from 'react';
import TableMailingList from './TableMailingList';
import Header from './Header';
import { GET_ALL_BOOTCAMPERS } from '../queries';

class ViewMailingList extends React.Component {
    constructor(props) {
        super(props);
        this.mailingListTableElement = React.createRef();
        this.downloadCSVElement = React.createRef();
        this.state = {
            data: [],
            filtered: []
        };
    }

    componentDidMount() {
        var mailingNode = document.getElementById('mail').lastChild;
        document.getElementById('curr-view').appendChild(mailingNode);
        console.log('Mail html:', mailingNode.innerHTML);
        GET_ALL_BOOTCAMPERS(this.mailingListTableElement)
        // console.log("compo", this.mailingListTableElement)
        // const jay = require('../dummyDemographics.json');
        // this.setState({ data: jay });
        // this.updateStats(jay);
    }

    render() {
        return (
            <div>
                <Header />
                <div id='mail' style={{ clear: 'both', float: 'left' }}>
                    <TableMailingList
                        ref={this.mailingListTableElement}
                        filtered={this.state.filtered}
                    />
                </div>
            </div>
        );
    }
}

export default ViewMailingList;
