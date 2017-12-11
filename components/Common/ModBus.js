import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Alert,
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
        const dt = this.props.navigation.state.params.data;
        let tableHead = [];
        let modbusData = []
        if (dt.Catalog.trim().indexOf("Micro") >= 0) {
            tableHead = ['Name', 'Data Type', "Address"];
            modbusData = [
                ['Varialble1', 'BOOL', '000001'],
                ['Varialble2', 'BOOL', '000002'],
                ['Varialble3', 'BOOL', '000003'],
                ['Varialble4', 'BOOL', '000004'],
                ['Varialble5', 'BOOL', '000005'],
                ['IO_X1_AO_00', 'BOOL', '000006'],
                ['IO_X1_AO_01', 'BOOL', '000007'],
                ['IO_X1_AO_02', 'BOOL', '000008'],
                ['IO_X1_AO_03', 'BOOL', '000009'],
                ['IO_P2_DI_00', 'BOOL', '000010'],
                ['IO_P2_DI_01', 'BOOL', '000011'],
                ['IO_P2_DI_02', 'BOOL', '000012'],
                ['IO_P2_DI_03', 'BOOL', '000013'],
            ];

            return (
                <View style={{ flex: 1 }}>
                    <Table>
                        <Row data={tableHead} style={styles.head} flexArr={[2,1]} textStyle={styles.headtext} />
                    </Table>
                    <ScrollView showsVerticalScrollIndicator={true} >
                        <Table>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                                <Rows data={modbusData} style={styles.row} flexArr={[2,1]} textStyle={styles.rowtext} />
                            </TableWrapper>
                        </Table>
                    </ScrollView>
                </View>
            );

        } else if (dt.Catalog.trim().indexOf("440C") >= 0) {
            tableHead = ['Address', 'Address Used', "Parameter"];
            modbusData = [
                ['000001', '000001-000006', 'I/O data fro plugin1'],
                ['000025', '000025-000040', 'Overall status'],
                ['000265', '000265-000272', 'I/O data for embedded terminals'],
                ['000273', '000273-000296', 'I/O data for plugin 2'],
                ['000297', '000297-000304', 'State for SMF'],
                ['000305', '000205-000328', 'State for LLA'],
                ['000329', '000329-000344', 'State for LLB'],
                ['000345', '000345-000360', 'State for SOF'],
                ['000361', '000361-000376', 'Ready-to-start of SOF'],
                ['000377', '000377-000392', 'Fault bit 0 of SMFs'],
                ['000393', '000393-000416', 'Fault bit 1 of SMFs'],
                ['000417', '000417-000440', 'Fault bit 2 of SMFs'],
                ['000441', '000441-000464', 'Fault bit 3 of SMFs'],
            ];

            return (
                <View style={{ flex: 1 }}>
                    <Table>
                        <Row data={tableHead} style={styles.head} flexArr={[1, 2, 2]} textStyle={styles.headtext} />
                    </Table>
                    <ScrollView showsVerticalScrollIndicator={true} >
                        <Table>
                            <TableWrapper style={{ flexDirection: 'row' }}>
                                <Rows data={modbusData} style={styles.row} flexArr={[1, 2, 2]} textStyle={styles.rowtext} />
                            </TableWrapper>
                        </Table>
                    </ScrollView>
                </View>
            );
        }

        return (
            <View>
            </View>
        )

    }
}

var styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#3c3c3c' },
    headtext: { marginLeft: 5, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    row: { backgroundColor: '#550000', minHeight: 30 },
    rowtext: { marginLeft: 5, color: '#fff', textAlign: 'left' },
});

module.exports = ModBusPage;