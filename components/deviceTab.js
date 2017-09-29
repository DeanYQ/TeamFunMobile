import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    FlatList,
    TouchableHighlight
} from 'react-native';

import ImageButton from './imageButton'
import DeviceList from './deviceList'
import { StackNavigator } from 'react-navigation';
import AuthService from '../AuthService';
import DeviceDetailPage from './deviceDetailPage';
const onButtonPress = () => {
};
var token = null;

class DeviceHomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 't',
            ds: []
        }
    }
    static navigationOptions = {
        title: 'Mobile Detector',
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
        headerRight: (
            <ImageButton
                style={{ backgroundColor: '#960000', marginRight: 10 }}
                imageStyle={{ width: 25, height: 25 }}
                imageSource={require('../img/searchAdd.png')}
                onPress={() => {
                    Alert.alert(this.state.message);
                }}>
            </ImageButton>
        ),
    };
    onAddBtnPress() {
        Alert.alert(this.state.message);
    }


    requestDevices(callback) {
        var url = "http://******yourapi***************/api/Devicelist";
        this.getDevices(url, (response) => {
            return callback(response);
        });
    }

    getDevices(url, callback) {
        console.log(url);
        AuthService.getAuthInfo((err, info) => {
            var token = info;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => {

                    var newData = JSON.parse(response._bodyInit);
                    return callback(newData);

                })
                .done();
        });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
                    <DeviceList itemsource={this.props.navigation.state.ds} onRefresh={this.requestDevices.bind(this)}
                        navigation={this.props.navigation} />
                </View>
            </View>
        );
    }
}

const DeviceTab = StackNavigator({
    Home: { screen: DeviceHomeScreen },
    Detail: { screen: DeviceDetailPage },

})

var styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'black'
    },
    searchBtn: {
        justifyContent: 'flex-end'
    },
    pageTitle: {
    }
});

module.exports = DeviceTab;