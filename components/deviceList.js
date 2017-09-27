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

import ImageButton from './imageButton';
import images from './images';
import { StackNavigator, } from 'react-navigation';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            itemsource: this.props.itemsource
        };
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh() {
        this.setState({ refreshing: true });

        this.props.onRefresh((response) => {
            this.setState({
                itemsource: response,
                refreshing: false
            });
            console.log(this.state.itemsource);
        });
    }

    fetchData() {
        return this.props.onRefresh();
    }

    pressItem(item) {
        if (this.state.refreshing)
            return;
        const { navigate } = this.props.navigation;
        navigate('Detail')
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={_ => this.pressItem(item)}>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                <Image source={images[item.Catalog.trim()]} style={{ height: 50, width: 50, padding: 20, margin: 5 }}>
                </Image>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>
                        {item.Catalog}
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                        IP Address: {item.IP}
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                        Rev: {item.Rev}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ justifyContent: 'flex-start' }}>
                <AnimatedFlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />}

                    data={this.state.itemsource}
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