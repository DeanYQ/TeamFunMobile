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
    TouchableOpacity,
    Switch
} from 'react-native';
var AsyncStorage = require('react-native').AsyncStorage;

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needLogin: false
        };
    }

    componentDidMount() {
        this.setState({ needLogin: false });
        AsyncStorage.getItem('needLogin', (errs, result) => {
            if (!errs) {
                if (result !== null) {
                    if (result === 'true') {
                        this.setState({ needLogin: true });
                    }
                }
            }
        });
    }
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
    _alwaysNeedLogin(value) {
        this.setState({ needLogin: value });
        AsyncStorage.setItem('needLogin', value.toString(), (err, result) => {
            console.log(result);
        });
    }

    render() {
        return (
            <View>
                <Text>Signalr.isConnected: {global.Signalr != null && global.Signalr.isConnected() ? "Connected" : "Disconnected"}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, flexDirection: 'column' }}>Always need login</Text>
                    <Switch
                        style={{ flex: 1, flexDirection: 'column' }}
                        buttonContent={this.state.needLogin ? "YES" : "NO"}
                        value={this.state.needLogin}
                        onValueChange={(value) => this._alwaysNeedLogin(value)} />
                </View>
                {/* <TouchableOpacity onPress={_ => this.disconnect()}>
                    <Text>"Disconnect"</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_ => this.connect()}>
                    <Text>"Connect"</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}


module.exports = Setting;