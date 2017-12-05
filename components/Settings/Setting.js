import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Animated,
    Alert,
    RefreshControl,
    FlatList,
    TouchableOpacity
} from 'react-native';

class Setting extends Component {
    connect() {
        if (global.Signalr != null &&
            global.Signalr.connection != null &&
            !global.Signalr.isConnected()) {
            global.Signalr.connect(() => { });
        }
    }

    disconnect() {
        if (global.Signalr != null && 
            global.Signalr.connection != null &&
            global.Signalr.isConnected()) {
            global.Signalr.disconnect();
        }
    }
    render() {
        return (
            <View>
                <Text>Signalr.isConnected: {global.Signalr != null && global.Signalr.isConnected() ? "Connected" : "Disconnected"}</Text>
                <TouchableOpacity onPress={_ => this.disconnect()}>
                    <Text>"Disconnect"</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_ => this.connect()}>
                    <Text>"Connect"</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


module.exports = Setting;