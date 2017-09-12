import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import DeviceTab  from '../deviceTab'

const onButtonPress = () => {
   //Alert.alert('Button has been pressed!');

   //let response = await fetch('http://192.168.1.105:8088/api/getuser?name=dean');
   fetch('http://192.168.1.105:8088/api/getuser?name=dean')
    .then((response)=>{
        if(response.ok){
            return response.text();
        }
    })
    .then((responseText)=>{
        Alert.alert(responseText);
    })
    .done();
};
 
class MainPage extends Component {
     constructor(props) {
         super(props);
         this.state = {
             selectedTab: 'Devices'
         }
     }
 
     render() {
         return (
             <View style={styles.container}>
                 <TabNavigator>
                     <TabNavigator.Item
                         selected={this.state.selectedTab === 'Devices'}
                         title="Devices"
                         titleStyle={styles.tabText}
                         selectedTitleStyle={styles.selectedTabText}
                         renderIcon={() => <Image style={styles.icon} source={require("../../img/deviceIcon.png")} />}
                         renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'green'}]} source={require("../../img/deviceIcon.png")} />}
                         onPress={() => this.setState({ selectedTab: 'Devices' })}>
                         <View style={styles.page0}>
                            <DeviceTab></DeviceTab>
                         </View>
                     </TabNavigator.Item>
                     <TabNavigator.Item
                         selected={this.state.selectedTab === 'Me'}
                         title="Me"
                         titleStyle={styles.tabText}
                         selectedTitleStyle={styles.selectedTabText}
                         renderIcon={() => <Image style={styles.icon} source={require("../../img/user.png")} />}
                         renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'green'}]} source={require("../../img/user.png")} />}
                         onPress={() => this.setState({ selectedTab: 'Me' })}>
                         <View style={styles.page0}>
                             <Text style={{fontSize:18,padding:15,color: 'blue'}}>This is user Page</Text>
                         </View>
                     </TabNavigator.Item>
                 </TabNavigator>
             </View>
         );
     }
 }
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: 'green'
    },
    icon: {
        width: 22,
        height: 22
    },
    page0: {
        flex: 1,
        backgroundColor: 'white'
    },
    page1: {
        flex: 1,
        backgroundColor: 'blue'
    }
});

//AppRegistry.registerComponent('Login', () => Login);
module.exports = MainPage