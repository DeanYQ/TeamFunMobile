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

class AlarmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            alarms: props.navigation.state.params.configData.AlarmList
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
                    alarms: JSON.parse(data).AlarmList
                }, () => {
                    console.log('get-data-from-server:' + this.state.data)
                });
            });
    }

    componentWillUnmount(){
        Signalr.StopDiagnostic(this.props.navigation.state.params.proxy,
            this.props.navigation.state.params.data.Catalog.trim(),
            this.props.navigation.state.params.data.IP.trim(), () => {});
    }


    render() {
        const tableHead = ['Alarm Message', 'Ack Status'];
        

        return (
            <View style={{ flex: 1 }}>
                <Table>
                    <Row data={tableHead} style={styles.head} flexArr={[2, 1]} textStyle={styles.headtext} />
                </Table>
                <ScrollView showsVerticalScrollIndicator={true} >
                    <Table>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <Rows data={this.state.alarms} style={styles.row} flexArr={[2, 1]} textStyle={styles.rowtext} />
                        </TableWrapper>
                    </Table>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: {   backgroundColor: '#550000', minHeight:30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
})

module.exports = AlarmList;