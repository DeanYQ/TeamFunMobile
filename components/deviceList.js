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
  
class DeviceList extends Component {
    constructor(props) {
        super(props);
        var ds = this.props.itemsource;
        this.state = {
            ds: this.props.itemsource,
        };
    }

    _renderItem = ({item}) => (

            //<Text style={{color: 'black', backgroundColor:'#fff', alignSelf:'center'}}>
            //    {rowData}
            //</Text>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                <Image source={require('../img/item.png')} style={{ height: 36, width: 36 }}>
                </Image>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ backgroundColor: '#fff' }}>
                        {item.Catalog}
                    </Text>
                    <Text style={{ backgroundColor: '#fff' }}>
                        {item.DeviceType}
                    </Text>
                </View>
            </View>
        );

    render() {
        return (
            <View style={{ justifyContent: 'flex-start' }}>
                <FlatList
                    data={this.props.itemsource}
                    renderItem={this._renderItem}
                >
                </FlatList>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    header:{
        height: 80,
        backgroundColor: 'black'
    },
    searchBtn: {
        justifyContent: 'flex-end'
    },
    pageTitle: {
    }
});

module.exports = DeviceList;