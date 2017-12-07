import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    Alert,
    FlatList,
    ScrollView
} from 'react-native';
import Signalr from '../Signalr/deviceSignalr.js';

import 'react';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    // Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import {
    VictoryChart,
    VictoryCandlestick,
    VictoryTheme,
    VictoryAxis,
    VictoryBar,
    VictoryTooltip,
    VictoryLabel,
    VictoryZoomContainer
} from "victory-native";

class DiagnosePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            First: 0,
            Last: 0,
            Total: 100,
            diagnoseData: null,
            table: this.initData()
        };
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    componentDidMount() {
        Signalr.StartDiagnostic(this.props.navigation.state.params.proxy,
            this.props.navigation.state.params.data.Catalog.trim(),
            this.props.navigation.state.params.data.IP.trim(), (data) => {
                this.setState({
                    First: JSON.parse(data).First,
                    Last: JSON.parse(data).Last,
                    Total: JSON.parse(data).Total,
                    diagnoseData: JSON.parse(data)
                }, () => {
                    this.generateData();
                    console.log('get-data-from-server:' + this.state.diagnoseData)
                });
            });
    }

    initData() {
        var data = new Array();
        for (var i = 0; i < 10; i++) {
            var row = {
                x: new Date(),
                open: 0,
                close: 0,
                high: 100,
                low: 0
            };
            data.push(row);
        }
        return data;
    }

    generateData() {
        var row = {
            x: new Date(),
            open: this.state.First,
            close: this.state.Last,
            high: this.state.Total,
            low: 0
        };

        var data = this.state.table;
        if (data.length > 9) {
            data.splice(0, 1);
        }
        data.push(row);
        this.setState({
            table: data
        });
    }

    componentWillUnmount() {
        Signalr.StopDiagnostic(this.props.navigation.state.params.proxy,
            this.props.navigation.state.params.data.Catalog.trim(),
            this.props.navigation.state.params.data.IP.trim(), () => { });
    }

    render() {
        const tableHead = ['Name', 'Value'];
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: 'black', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderRightWidth: 1, borderBottomWidth: 1 }}>Total lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderBottomWidth: 1 }}>{this.state.Total}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderRightWidth: 1, borderBottomWidth: 1 }}>First interrupted lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderBottomWidth: 1 }}>{this.state.First}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderRightWidth: 1, borderBottomWidth: 1 }}>Last interrupted lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderBottomWidth: 1 }}>{this.state.Last}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Svg style={{ flex: 1 }} height="80" width="400">
                            <Rect
                                x="30"
                                y="10"
                                width="300"
                                height="70"
                                stroke="red"
                                strokeWidth="2"
                                fill="green"
                            />
                            <Rect
                                x={30 + this.state.First * (300 / this.state.Total)}
                                y="12"
                                width={(this.state.Last - this.state.First) * (300 / this.state.Total)}
                                height="66"
                                stroke="black"
                                strokeWidth="2"
                                fill="black"
                            />
                        </Svg>
                    </View>
                    {/* <View style={{
                        flex: 2,
                        marginLeft: 20,
                        marginRight: 20, borderColor: 'black', borderWidth: 2
                    }}>
                        {/* <View style={{ flex: 1, flexDirection: 'row', borderColor: 'black', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>Total lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>{this.state.Total}</Text>
                        </View> */}
                    {/* <View style={{ flex: 1, flexDirection: 'row', borderColor: 'black', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>First interrupted lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>{this.state.First}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, flex: 2, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>Last interrupted lens</Text>
                            <Text style={{ fontSize: 20, flex: 1, paddingLeft: 10, borderColor: 'black', borderWidth: 1 }}>{this.state.Last}</Text>
                        </View> 
                    </View> */}
                </View>
                <View style={{ flex: 2 }}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={{ x: 0 }}
                        scale={{ x: "time" }}>
                        <VictoryCandlestick
                            domainPadding={{ x: 10 }}
                            data={this.state.table}
                            candleColors={{ positive: "#c43a31", negative: "#c43a31" }}
                        />
                    </VictoryChart>
                </View>
            </View >
        );
    }
}


var styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'black'
    },
    textStyle: {
        width: 170,
        height: 40,
        paddingTop: 10,

    },
    input: {
        height: 40,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#b8b894',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex: 2,
        backgroundColor: 'white'

    },
    descriptionInput: {
        height: 80,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#b8b894',
        borderRadius: 5,
        backgroundColor: 'white',
        flex: 2
    },
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: { backgroundColor: '#550000', minHeight: 30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },

});

module.exports = DiagnosePage;