import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';
import 'normalize.css/normalize.css';
import { grey50, pinkA200, darkBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Search from 'material-ui/svg-icons/action/search';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries, DiscreteColorLegend, Hint } from 'react-vis';
import 'react-vis/dist/style.css';
import 'react-vis/dist/styles/plot.scss';

import { Data } from '../data';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey50,
        accent1Color: pinkA200,
        alternateTextColor: darkBlack,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        _.bindAll(this, 'toGraph', 'rememberValue', 'forgetValue');
        this.state = {
            currentData: [{ x: 0, y: 8 },
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: 9 },
                { x: 4, y: 1 },
                { x: 5, y: 7 },
                { x: 6, y: 6 },
                { x: 7, y: 3 },
                { x: 8, y: 2 },
                { x: 9, y: 0 }],
            currentLegend: ['Series 1'],
            value: null,
        };
    }

    rememberValue(value) {
        this.setState({ value });
    }

    forgetValue() {
        this.setState({
            value: null,
        });
    }
    toGraph() {
        let newData = [];
        let newLegend = [];
        newData = Data.filter(el => el.Index === 'S&P Large Cap (500)' && el['Fiscal Year'] === 2016 && el['Inventory Turnover'] >= 0 && el['Gross Margin Percent'] >= 0).map(d => ({ name: d['Company Name'], x: d['Inventory Turnover'], y: d['Gross Margin Percent'] * 100, color: d.Sector }));
        newLegend = _.uniq(newData.map(d => (d.color)));
        console.log('New Data:');
        console.log(newData);
        this.setState({ currentData: newData, currentLegend: newLegend });
    }

    render() {
        const { value } = this.state;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="Supply Chain Explorer"
                        iconElementLeft={<Search style={{ marginTop: '12px' }} />}
                    />
                    {(() => {
                        console.log(this.state.currentData);
                    })()}
                    <FlatButton label="Update" onClick={this.toGraph} />
                    <DiscreteColorLegend orientation="horizontal" items={this.state.currentLegend} width={700} colorType="category" />
                    <XYPlot
                        width={700}
                        height={700}
                        colorType="category"
                        yDomain={[0, 100]}
                        xDomain={[0, 100]}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <MarkSeries
                            onValueMouseOver={this.rememberValue}
                            onValueMouseOut={this.forgetValue}
                            data={this.state.currentData}
                        />

                        <XAxis title="Inventory Turnover (Percent)" />
                        <YAxis title="Gross Margin (Percent)" />
                        {value ?
                            <Hint value={value} /> :
                            null
                        }
                    </XYPlot>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;
injectTapEventPlugin();
