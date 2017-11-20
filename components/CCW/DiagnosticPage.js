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
    ['Mac Address', 'F4-54-33-9E-EE-53'],
    ['Duplex Mode', 'Duplex'],
    ['Port State', 'Enabled'],
    ['POrt Speed', '100Mbps'],
 ];

class DiagnosticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            alarms: tableData
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },

    });

    render() {
        return (
            <View style={{ flex: 1 }}>
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

module.exports = DiagnosticPage;