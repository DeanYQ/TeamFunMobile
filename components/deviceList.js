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
    FlatList
} from 'react-native';

import ImageButton from './imageButton'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        fetchData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchData() { }
    _renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
            <Image source={require('../img/item.png')} style={{ height: 50, width: 50, padding: 20 }}>
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
                <AnimatedFlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}

                    data={this.props.itemsource}
                    renderItem={this._renderItem}
                    refreshing={false}
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
    }
});

module.exports = DeviceList;