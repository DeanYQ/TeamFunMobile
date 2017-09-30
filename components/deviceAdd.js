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
    TextInput
} from 'react-native';

class DeviceAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            ipAddr: "",
            isBtnDisabled: true,
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Add Device",
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    validateIpAddress(ip){
        var regexp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        var valid = regexp.test(ip);
        
        if (!valid) {
            this.setState({isBtnDisabled: true});
            return false;
        }
        var target = this;

        return ip.split('.').every(function(num){
            if(num.length > 1 && num.charAt(0) === '0'){
                target.setState({isBtnDisabled: true});
                return false;
            } else if(parseInt(num , 10) > 255){
                target.setState({isBtnDisabled: true});
                return false;
            }
            target.setState({isBtnDisabled: false});
            return true;
        });
    }

    addDevice(){
        // TODO: send request to the server
        const { navigate } = this.props.navigation;
        navigate("Home");
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TextInput
                    style={styles.ipInput} 
                    placeholder="input the IP address"
                    onChangeText={(text)=> this.validateIpAddress(text)}>
                </TextInput>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled = {this.state.isBtnDisabled}
                        onPress = {this.addDevice.bind(this)}
                        title="Search"
                        style={{height: 100}}
                        color="#555555"/>
                </View>

            </View>
        )
    }
} 

var styles = StyleSheet.create({
    ipInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18
    },
    buttonContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    }
});
module.exports = DeviceAdd;