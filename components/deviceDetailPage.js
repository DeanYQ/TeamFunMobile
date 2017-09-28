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
import images from './images';

class DeviceDetailPage extends React.Component {
    constructor(props) {
        super(props);
        // this.state= {
        //     item: this.props.navigation.state.params.data
        // };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

    render() {
        const item = this.props.navigation.state.params.data;
        return (
            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', }}>
                    <View style={{
                        backgroundColor: 'grey', width: 100, height: 100, borderRadius: 100,
                    }}>
                        <Image source={images[item.Catalog.trim()]}
                            style={{ width: 96, height: 96, borderRadius: 100, margin: 2 }} />
                    </View>
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

});

module.exports = DeviceDetailPage;