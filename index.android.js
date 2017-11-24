/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var Main = require('./Main');

export default class MobileApplication extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('MobileApplication', () => MobileApplication);
