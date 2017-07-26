import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { grey50, pinkA200, darkBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import 'react-vis/dist/styles/plot.scss';
import 'normalize.css/normalize.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey50,
        accent1Color: pinkA200,
        alternateTextColor: darkBlack,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="Title"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                    <XYPlot
                        width={300}
                        height={300}
                    >
                        <HorizontalGridLines />
                        <LineSeries
                            data={[
                                { x: 1, y: 10 },
                                { x: 2, y: 5 },
                                { x: 3, y: 15 },
                            ]}
                        />

                        <XAxis />
                        <YAxis />
                    </XYPlot>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
injectTapEventPlugin();
