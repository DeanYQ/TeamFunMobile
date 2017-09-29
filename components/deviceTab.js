import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    FlatList
} from 'react-native';

import ImageButton from './imageButton'
import DeviceList from './deviceList'
//import DeviceFlatList from './deviceFlatList'
var AuthService = require('../AuthService');

const onButtonPress = () => {
};
  var token = null;
  

<<<<<<< HEAD
class DeviceHomeScreen extends React.Component {
=======

class DeviceTab extends Component {
>>>>>>> 8eebbbc71577484e9ca236b2394b68cef1f3163f
    constructor(props) {
        super(props);
       
        this.state = {
            message: 't',
            ds:[]
        }
    }
<<<<<<< HEAD
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
=======

>>>>>>> 8eebbbc71577484e9ca236b2394b68cef1f3163f
    onAddBtnPress() {
        Alert.alert(this.state.message);
    }

<<<<<<< HEAD

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
=======
   
    getDevices(url,callback) {
		console.log(url);
        AuthService.getAuthInfo((err, info) => {
            var token = info;
            fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
>>>>>>> 8eebbbc71577484e9ca236b2394b68cef1f3163f
                .then((response) => {

                    var newData = JSON.parse(response._bodyInit);
                    return callback(newData);

                })
                .done();
        });
    }

<<<<<<< HEAD

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
                    <DeviceList itemsource={this.props.navigation.state.ds} onRefresh={this.requestDevices.bind(this)}
                        navigation={this.props.navigation} />
=======
    requestDevices(callback) {
		    var url = "http://mobileservices20170819084039.azurewebsites.net/api/Devicelist";
        this.getDevices(url,(response) => {
            return callback(response);
        });
		
    }

    

    render() {
        return (
            <View>
                <View style={{ height: 60, backgroundColor: '#333333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, width: 200, backgroundColor: 'transparent', marginLeft: 5 }}>Mobile Detector</Text>
                    <ImageButton
                        style={{ backgroundColor: 'transparent', marginRight: -80 }}
                        onPress={this.onAddBtnPress.bind(this)}
                        imageStyle={{ width: 25, height: 25 }}
                        imageSource={require('../img/refresh.png')}>
                    </ImageButton>
                    <ImageButton
                        style={{ backgroundColor: 'transparent', marginRight: 10 }}
                        onPress={this.onAddBtnPress.bind(this)}
                        imageStyle={{ width: 25, height: 25 }}
                        imageSource={require('../img/searchAdd.png')}>
                    </ImageButton>
                </View>
                <View>
                    <DeviceList itemsource={this.state.ds} onRefresh={this.requestDevices.bind(this)} />
>>>>>>> 8eebbbc71577484e9ca236b2394b68cef1f3163f
                </View>
            </View>
        );
    }
}

<<<<<<< HEAD
const DeviceTab = StackNavigator({
    Home: { screen: DeviceHomeScreen },
    Detail: { screen: DeviceDetailPage },

})

=======
>>>>>>> 8eebbbc71577484e9ca236b2394b68cef1f3163f
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