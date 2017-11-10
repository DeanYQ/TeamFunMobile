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

const tableData = [
    ['Alarm Twenty', 'NotAcked'],
    ['今天，国产大型客机C919计划从上海浦东机场到西安阎良机场转场飞行。这将是C919首次出“远门”，第一次远距离飞行，飞行里程超过1300公里，飞行时间约为3个小时。', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],
    ['Alarm Ten', 'NotAcked'],];

class AlarmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            //alarms: tableData
            alarms: props.navigation.state.params.configData
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },

    });

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
    row: {   backgroundColor: '#550000' },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
})

module.exports = AlarmList;