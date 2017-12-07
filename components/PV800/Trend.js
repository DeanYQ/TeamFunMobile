/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Signalr from '../Signalr/deviceSignalr.js';
// import { LineChart, YAxis, BarChart, XAxis } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryAxis,
    VictoryBar,
    VictoryTooltip,
    VictoryLabel,
    VictoryZoomContainer
} from "victory-native";
import Svg from 'react-native-svg';
class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            TagValues: this.formatData(props.navigation.state.params.configData.TagList[0].Info),
            DateTimes: this.getDate(props.navigation.state.params.configData.TagList[0].Info),
            TagName: props.navigation.state.params.configData.TagList[0].Name
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.configData.TagList[0].Name.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },

    });

    formatData(arr) {
        var data = new Array();
        for (var i = 0; i < arr.length; i++) {
            var hour = arr[i]["Time"].substring(0, 2);
            var minute = arr[i]["Time"].substring(3, 5);
            var second = arr[i]["Time"].substring(6, 8);
            var year = arr[i]["Date"].substring(4, 8);
            var month = arr[i]["Date"].substring(0, 2);
            var day = arr[i]["Date"].substring(2, 4);
            var row = {
                // x: new Date(year,month,day,hour,minute,second),
                x: new Date(year, month, day, hour, minute, second),
                y: parseInt(arr[i]["Value"]),
                // labels: new Date(year, month, day, hour, minute, second),
            };
            data.push(row);
        }
        return data;
    }

    getDate(arr) {
        var data = [];
        data.push("");
        for (var i = 0; i < arr.length; i++) {
            data.push(arr[i]["Date"] + " " + arr[i]["Time"]);
        }
        return data;
    }

    findElements(arr, propName) {
        var values = [];
        for (var i = 0; i < arr.length; i++) {
            if (times > 0) {
                values.push(arr[i][propName]);
            }
            else {
                values.push(arr[i][propName]);
            }
        }
        return values;
    }

    componentDidMount() {
        // Signalr.StartDiagnostic(this.props.navigation.state.params.proxy,
        //     this.props.navigation.state.params.data.Catalog.trim(),
        //     this.props.navigation.state.params.data.IP.trim(), (data) => {
        //         this.setState({
        //             alarms: JSON.parse(data).AlarmList
        //         }, () => {
        //             console.log('get-data-from-server:' + this.state.data)
        //         });
        //     });
    }

    componentWillUnmount() {
        // Signalr.StopDiagnostic(this.props.navigation.state.params.proxy,
        //     this.props.navigation.state.params.data.Catalog.trim(),
        //     this.props.navigation.state.params.data.IP.trim(), () => { });
    }


    render() {
        // const contentInset = { top: 20, bottom: 20 }
        // var data = this.findElements(this.state.TagValues, "Value", 1);
        // var time = this.findElements(this.state.TagValues, "Time", 0);
        // var date = this.findElements(this.state.TagValues, "Date", 0);

        return (
            <View style={{ flex: 1 }}>
                <VictoryChart theme={VictoryTheme.material}
                    style={{ flex: 1 }}
                    scale={{ x: "time" }}
                >
                    {/* <VictoryBar
                        style={{
                            data: { fill: "#c43a31" },
                            parent: { border: "1px solid #ccc" },
                            labels: { fill: "black", fontWeight: 'bold' }
                        }}
                        animate={{
                            duration: 1500,
                            onLoad: { duration: 1500 }
                        }}
                        data={this.state.TagValues}
                        labelComponent={<VictoryLabel />}
                        labels={(d) => d.y}
                    /> */}
                    <VictoryLine
                        style={{
                            data: { border: "1px solid #ccc" },
                            // parent: { border: "1px solid #ccc" },
                            labels: { fill: "black", fontWeight: 'bold' }
                        }}
                        animate={{
                            duration: 1500,
                            onLoad: { duration: 1500 }
                        }}
                        data={this.state.TagValues}
                        labelComponent={<VictoryLabel />}
                        labels={(d) => d.y}
                    />
                </VictoryChart>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: { backgroundColor: '#550000', minHeight: 30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
})

module.exports = Trend;