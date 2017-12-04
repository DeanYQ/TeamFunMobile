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

class UsbPage extends React.Component {

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
            <View style={{ flexDirection: 'column', backgroundColor: '#fff', paddingBottom: 300 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Status:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.Usb.Status}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Suspend State:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.Usb.SuspendState}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Bus Speed:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.Usb.BusSpeed}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>Mode:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.Usb.Mode}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={styles.labelStyle}>State:</Text>
                    <Text style={styles.textStyle}>
                        {this.props.navigation.state.params.configData.Usb.State}
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
        height: 30,
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

module.exports = UsbPage;