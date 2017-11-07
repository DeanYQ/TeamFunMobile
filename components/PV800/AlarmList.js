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

class AlarmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            // fault: props.navigation.state.params.fault
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },

    });

    render() {
        const tableHead = ['Alarm Message', 'Ack Status'];
        const tableData = [
            ['Alarm Twenty', 'NotAcked'],
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
            ['Alarm Ten', 'NotAcked'],
            ['Alarm Ten', 'NotAcked'],];

        return (
            <View style={{flex: 1}}>
                <Table>
                    <Row data={tableHead} style={styles.head} flexArr={[2, 1]} textStyle={styles.headtext} />
                </Table>
                <ScrollView showsVerticalScrollIndicator={true} >
                    <Table>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <Rows data={tableData} style={styles.row} flexArr={[2, 1]} textStyle={styles.rowtext} />
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
    row: { height: 30, backgroundColor: '#550000' },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'center' },
})

module.exports = AlarmList;