import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
var Login = require('./components/Login/Login');
// var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');
var MainPage = require('./components/android/mainPage.js');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            authInfo: null
        };
    }
    getInitialState() {
        return {
            isLoggedIn: false,
            checkingAuth: true
        }
    }
    componentDidMount() {
        AuthService.getAuthInfo((err, info) => {
            this.setState({
                checkingAuth: false,
                authInfo: info,
                isLoggedIn: info != null
            })
        });
    }
    
    render() {
        if (this.state.isLoggedIn) {
            return (
                <MainPage />
            )
        }
        else {
            return (
                // <View>
                <Login onLogin={this.onLogin.bind(this)} />
            );
        }

    }
    onLogin() {
        console.log('successfully logged in, can show different view')
        this.setState({ isLoggedIn: true });
    }
    getInitialState() {
        return {
            isLoggedIn: false
        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Main