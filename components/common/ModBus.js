import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const modbusData = [
    ['Varialble1', 'BOOL', '000001'],
    ['Varialble2', 'BOOL', '000002'],
    ['Varialble3', 'BOOL', '000003'],
    ['Varialble4', 'BOOL', '000004'],
    ['Varialble5', 'BOOL', '000005'],
 ];

class ModBusPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.data,
            modbusData: modbusData
        };
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    render() {
        const tableHead = ['Name', 'Data Type', "Address"];

        return (
            <View style={{ flex: 1 }}>
                <Table>
                    <Row data={tableHead} style={styles.head} flexArr={[2, 1]} textStyle={styles.headtext} />
                </Table>
                <ScrollView showsVerticalScrollIndicator={true} >
                    <Table>
                        <TableWrapper style={{ flexDirection: 'row' }}>
                            <Rows data={this.state.modbusData} style={styles.row} flexArr={[2, 1]} textStyle={styles.rowtext} />
                        </TableWrapper>
                    </Table>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: {   backgroundColor: '#550000', minHeight:30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
});

module.exports = ModBusPage;