import React from 'react';
import DemoStatsTable from './DemoStatsTable';
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

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
        console.log("mountererererpppppp", props)
    }
    componentDidMount() {
        // const jay = require('../dummyDemographics.json');
        // console.log(jay);
        // this.setState({ demoData: jay, filteredData: jay });
        // this.demoStatsTableElement.current.updateStats(jay);
        console.log("mounterererer", this.state.demoCount)
    }
    updateStats(data) {
        this.setState({ demoData: data, filtered: data })
        this.demoStatsTableElement.current.updateStats(data)
    }
    updateDemoCount(campus, gender, wht, blk, col, ind, chi) {
        console.log("updaterrrr", this.state.demoCount)
        console.log("upelem", this.demoStatsTableElement.current.state)
        if (campus === 'capetown') {
            if (gender === 'male') {
                const { toUpdate } = { ...this.state.demoCount.capetown.male }
                console.log("updatub", toUpdate)
                this.setState({
                    demoCount:
                    {
                        ...this.state.demoCount,
                        capetown: {
                            ...this.state.demoCount.capetown,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
                        }
                    }
                })

                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        capetown: {
                            ...this.demoStatsTableElement.current.state.demoCount.capetown,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
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
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        capetown: {
                            ...this.demoStatsTableElement.current.state.demoCount.capetown,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
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
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        johannesburg: {
                            ...this.demoStatsTableElement.current.state.demoCount.johannesburg,
                            male: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
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
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
                        }
                    }
                })
                this.demoStatsTableElement.current.setState({
                    demoCount:
                    {
                        ...this.demoStatsTableElement.current.state.demoCount,
                        johannesburg: {
                            ...this.demoStatsTableElement.current.state.demoCount.johannesburg,
                            female: { white: wht, black: blk, coloured: col, indian: ind, chinese: chi }
                        }
                    }
                })
            }
        }
        console.log("uptupt", this.state.demoCount, this.demoStatsTableElement.current.state)
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
                    <DemoStatsTable ref={this.demoStatsTableElement} demoCount={this.state.demoCount} />
                </div>
            </div>
        );
    }
}

export default CampusSelector;
