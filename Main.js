import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
var Login = require('./components/Login/Login');
var AsyncStorage = require('react-native').AsyncStorage;
var AuthService = require('./AuthService');
var MainPage = require('./components/mainPage.js');
import SplashScreen from 'react-native-splash-screen'

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
        AsyncStorage.getItem('needLogin',(errs,result) => {
            if (!errs) {
                if (result !== null) {
                    if (result === 'false') {
                        AuthService.getAuthInfo((err, info) => {
                            this.setState({
                                checkingAuth: false,
                                authInfo: info,
                                isLoggedIn: info != null
                            });
                            SplashScreen.hide();
                        });
                    }else{
                        SplashScreen.hide();
                     }
                }else{
                    SplashScreen.hide();
                 }
             }
             else{
                SplashScreen.hide();
             }
        })
        
              

        // AuthService.getAuthInfo((err, info) => {
        //     this.setState({
        //         checkingAuth: false,
        //         authInfo: info,
        //         isLoggedIn: info != null
        //     });
        //     SplashScreen.hide();
        // });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <MainPage />
            )
        }
        else {
            return (
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