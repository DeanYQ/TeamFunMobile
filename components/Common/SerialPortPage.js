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
    FlatList
} from 'react-native';

class SerialPortPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.data
        };
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    render() {
        return (
            <View style={{ flexDirection: 'column', backgroundColor: '#fff', height: '100%'}}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Driver:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.SerialPort.Driver}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Baud Rate:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.SerialPort.BaudRate}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Parity:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.SerialPort.Parity}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Station Address:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.SerialPort.StationAddress}
                    </Text>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'black'
    },
    labelStyle: {
        width: 170,
        height: 30 ,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 10
    },
    textStyle: {
        width: 170,
        fontSize: 18,
        height: 30,
        paddingTop: 5
    },
});

module.exports = SerialPortPage;