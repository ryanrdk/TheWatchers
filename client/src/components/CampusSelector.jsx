import React from 'react';
import DemoStatsTable from './DemoStatsTable';
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

/**
 * CampusSelector SELECTOR ~~~ Select either JHB or CPT or both
 * State -> options, selected, demoData, filteredData, demoCount
 * Ref -> demoStatsTableElement
 * Child Components -> DemoStatsTable ~~ Displays demographics data on a table
 *                          - DownloadCSV ~~ Download the data
 */
class CampusSelector extends React.Component {
    constructor(props) {
        super(props)
        this.demoStatsTableElement = React.createRef();
        this.state = {
            options: props.campus_selection,
            searchQuery: '',
            selected: 'ALL',
            demoData: [],
            filteredData: [],
            demoCount: props.demoCount

        }
        // console.log("mountererererpppppp", props)
    }
    componentDidMount() {
        // const jay = require('../dummyDemographics.json');
        // console.log(jay);
        // this.setState({ demoData: jay, filteredData: jay });
        // this.demoStatsTableElement.current.updateStats(jay);
        // this.setState
        // console.log("mounterererer", this.state.demoCount)
    }
    updateStats(data) {
        this.setState({ demoData: data, filtered: data })
        this.demoStatsTableElement.current.updateStats([data.capetown.male, data.capetown.female, data.johannesburg.male, data.johannesburg.female])
    }
    /**
     * updateDemoCount updates the demographic stats per campus and gender
     * @param {*} campus -> Required! String. Specify between "capetown" and "johannesburg"
     * @param {*} gender -> Required! String. Specify between "male" and "female"
     * @param {*} wht -> Required! Int. Value for race "white"
     * @param {*} blk -> Required! Int. Value for race "black"
     * @param {*} col -> Required! Int. Value for race "coloured"
     * @param {*} ind -> Required! Int. Value for race "indian"
     * @param {*} chi -> Required! Int. Value for race "chinese"
     */
    updateDemoCount(campus, gender, wht, blk, col, ind, chi) {
        // console.log("updaterrrr", this.state.demoCount)
        // console.log("upelem", this.demoStatsTableElement.current.state)
        if (campus === 'capetown') {
            if (gender === 'male') {
                this.setState({
                    demoCount:
                    {
                        ...this.state.demoCount,
                        capetown: {
                            ...this.state.demoCount.capetown,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "CPT Male" }
                        }
                    }
                })

                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        capetown: {
                            ...this.demoStatsTableElement.current.state.demoCount.capetown,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "CPT Male" }
                        }
                    }
                })

            }
            if (gender === 'female') {
                this.setState({
                    demoCount:
                    {
                        ...this.state.demoCount,
                        capetown: {
                            ...this.state.demoCount.capetown,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "CPT Female" }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        capetown: {
                            ...this.demoStatsTableElement.current.state.demoCount.capetown,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "CPT Female" }
                        }
                    }
                })
            }
        }
        if (campus === 'johannesburg') {
            if (gender === 'male') {
                this.setState({
                    demoCount:
                    {
                        ...this.state.demoCount,
                        johannesburg: {
                            ...this.state.demoCount.johannesburg,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "JHB Male" }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        johannesburg: {
                            ...this.demoStatsTableElement.current.state.demoCount.johannesburg,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "JHB Male" }
                        }
                    }
                })
            }
            if (gender === 'female') {
                this.setState({
                    demoCount:
                    {
                        ...this.state.demoCount,
                        johannesburg: {
                            ...this.state.demoCount.johannesburg,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "JHB Female" }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        johannesburg: {
                            ...this.demoStatsTableElement.current.state.demoCount.johannesburg,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi, dem: "JHB Female" }
                        }
                    }
                })
            }
        }
        // console.log("uptupt", this.state.demoCount, this.demoStatsTableElement.current)
    }
    onChange = (e, data) => {
        // console.log('data', data, this.state.demoCount, this.state.demoData);
        var filt = []
        var filtTab = []
        if (data.value === 'ALL') {
            filt = [data.democount.capetown.male, data.democount.capetown.female, data.democount.johannesburg.male, data.democount.johannesburg.female]
        }
        if (data.value === 'CPT') {
            filt = [data.democount.capetown.male, data.democount.capetown.female]
        }
        if (data.value === 'JHB') {
            filt = [data.democount.johannesburg.male, data.democount.johannesburg.female]
        }
        console.log("filtering", filt, this.state.demoCount);
        this.setState({ selected: data.value, searchQuery: '', filteredData: filt });
        this.demoStatsTableElement.current.updateStats(filt);
    }
    onSearchChange = (e, data) => {
        this.setState({ searchQuery: data.searchQuery });
    }
    render() {
        const { options, searchQuery, selected, demoCount } = this.state;
        return (
            <div>
                <div>
                    <Dropdown placeholder='Campus' search selection
                        value={selected}
                        text={searchQuery}
                        onChange={this.onChange}
                        onSearchChange={this.onSearchChange}
                        options={options}
                        democount={demoCount} />
                </div>
                <div>
                    <DemoStatsTable ref={this.demoStatsTableElement} demoCount={this.state.demoCount} />
                </div>
            </div>
        );
    }
}

export default CampusSelector;
