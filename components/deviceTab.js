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
    //Alert.alert('Button has been pressed!')
    //React.findDOMNode(this.refs.Te).focus();
    //Alert.alert(document.activeElement.tagName);
};
  var token = null;
  


class DeviceTab extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            message: 't',
            ds:[]
        }
    }

    onAddBtnPress() {
        Alert.alert(this.state.message);
    }

   
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
                .then((response) => {

                    var newData = JSON.parse(response._bodyInit);
                    return callback(newData);

                })
                .done();
        });
    }

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
    searchBtn: {
        justifyContent: 'flex-end'
    },
    pageTitle: {
    }
});

module.exports = DeviceTab;