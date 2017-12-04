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

import { StackNavigator, } from 'react-navigation';
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//import Signalr from './Signalr/deviceSignalr';
//import AuthService from '../AuthService';
import Signalr from '../Signalr/deviceSignalr.js';

class DataLogPV800 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsource:this.props.navigation.state.params.configData.TagList[0].Info
        
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.configData.TagList[0].Name.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    _renderItem = ({ item }) => {

        return (
            <TouchableOpacity >
                        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                            <View>
                             <Text style={{ height: 50, width: 100, margin: 5,fontSize:25 }} >
                                    {item.Value}
                                </Text>
                                </View>
                            <View style={{ paddingLeft: 20 }}>
                                <Text style={{ fontSize: 20 }}>
                                    Time:{item.Time}
                                </Text>
                                <Text style={{ fontSize: 15 }}>
                                    Data: {item.Date}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            )      
    };

    render() {
        return (
            <View style={{ justifyContent: 'flex-start' }}>
                <FlatList  
                    data={this.state.itemsource}
                    renderItem={this._renderItem}
                />
            </View >
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
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    }
});

module.exports = DataLogPV800;