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
import { LineChart, YAxis, BarChart, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            TagValues: props.navigation.state.params.configData.TagList[0].Info,
            TagName: props.navigation.state.params.configData.TagList[0].Name
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.configData.TagList[0].Name.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },

    });

    findElements(arr, propName, times) {
        var values = [];
        for (var i = 0; i < arr.length; i++) {
            if (times > 0) {
                values.push(arr[i][propName] * times);
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
        const contentInset = { top: 20, bottom: 20 }
        var data = this.findElements(this.state.TagValues, "Value", 100);
        var time = this.findElements(this.state.TagValues, "Time", 0);
        var date = this.findElements(this.state.TagValues, "Date", 0);

        return (
            <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{this.state.TagName}</Text> */}
                <View style={{ flex: 10, height: 300, flexDirection: 'row' }}>
                    <YAxis
                        dataPoints={data}
                        contentInset={contentInset}
                        labelStyle={{ color: 'grey' }}
                        formatLabel={value => `${value / 100}`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 10 }}
                        dataPoints={data}
                        fillColor={'purple'}
                        // strokeColor={'rgb(134, 65, 244)'}
                        strokeColor={'blue'}
                        shadowColor={'rgba(134, 65, 244, 0.2)'}
                        contentInset={contentInset}
                        curve={shape.curveLinear}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <XAxis
                        style={{ flex: 1 }}
                        values={time}
                        formatLabel={(value, index) => value}
                        chartType={XAxis.Type.LINE}
                        labelStyle={{
                            flex: 1, color: 'grey',
                            fontSize: 8
                        }}
                    />
                    <XAxis
                        style={{ flex: 1, marginTop: -20 }}
                        values={date}
                        formatLabel={(value, index) => value}
                        chartType={XAxis.Type.LINE}
                        labelStyle={{
                            flex: 1, color: 'grey',
                            fontSize: 5,
                            textAlign: 'left'
                        }}
                    />
                </View>
            </View>
        )
    }
    // render() {
    //     const tableHead = ['Alarm Message', 'Ack Status'];


    //     return (
    //         <View style={{ flex: 1 }}>
    //             <Table>
    //                 <Row data={tableHead} style={styles.head} flexArr={[2, 1]} textStyle={styles.headtext} />
    //             </Table>
    //             <ScrollView showsVerticalScrollIndicator={true} >
    //                 <Table>
    //                     <TableWrapper style={{ flexDirection: 'row' }}>
    //                         <Rows data={this.state.alarms} style={styles.row} flexArr={[2, 1]} textStyle={styles.rowtext} />
    //                     </TableWrapper>
    //                 </Table>
    //             </ScrollView>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: { backgroundColor: '#550000', minHeight: 30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
})

module.exports = Trend;