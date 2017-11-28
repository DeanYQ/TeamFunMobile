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
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import Signalr from './Signalr/deviceSignalr';
import Swipeable from 'react-native-swipeable';
import AuthService from '../AuthService';

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            rerender: false,
            currentlyOpenSwipeable: null,
            signalrConnecting: false,
            itemsource: this.props.itemsource,
            proxy: null,
            clientId: null
        };
    }

    componentDidMount() {
        this._signalrConnection();
        this._onRefresh();
    }

    _signalrConnection() {
        this.setState({ signalrConnecting: true });

        Signalr.connect(((callback, Id) => {
            this.setState({
                signalrConnecting: false,
                proxy: callback,
                clientId: Id
            }, () => console.log('get-data-from-server:' + this.state.proxy));
        }));
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
        if (this.state.proxy == null)
            return;
        if (this.state.refreshing)
            return;
        const { navigate } = this.props.navigation;
        navigate('Detail', { data: item, proxy: this.state.proxy });
    }

    deleteItem(item) {
        if (this.state.proxy == null)
            return;
        if (this.state.refreshing)
            return;
        Signalr.DeleteDevice(this.state.proxy,
            this.state.clientId,
            item.Catalog.trim(),
            item.IP.trim(), () => {
                console.log("device deleted");
                this.setState({ refreshing: true });
                this.props.onRefresh((response) => {
                    this.setState({
                        itemsource: null,
                        rerender: true
                    });

                    this.setState({
                        itemsource: response,
                        refreshing: false,
                        rerender: true
                    });
                    console.log(this.state.itemsource);
                });
            });
    }

    _renderItem = ({ item }) => {

        var catalog = item.Catalog;
        var imageSrc = "";

        if (catalog.indexOf("Micro") >= 0) {
            imageSrc = images["Micro820"];
        } else if (catalog.indexOf("440C") >= 0) {
            imageSrc = images["440C"];
        } else if (catalog.indexOf("450L") >= 0) {
            imageSrc = images["450L"];
        } else if (catalog.indexOf("2711R-T7T") >= 0) {
            imageSrc = images["2711R-T7T"];
        } else if (catalog.indexOf("2711R-T10T") >= 0) {
            imageSrc = images["2711R-T10T"];
        }

        if (imageSrc != "") {
            return (
                <Swipeable
                    rightButtons={[
                        <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'red' }]}
                            onPress={_ => this.deleteItem(item)}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                        </TouchableOpacity>,
                    ]}
                >
                    <TouchableOpacity onPress={_ => this.pressItem(item)}>
                        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                            <Image source={imageSrc} style={{ height: 50, width: 50, padding: 20, margin: 5 }}>
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
                </Swipeable>
            )
        }
    };

    render() {
        return (
            <View style={{ justifyContent: 'flex-start' }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing || this.state.signalrConnecting}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />}

                    data={this.state.itemsource}
                    extraData={this.state.rerender}
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

module.exports = DeviceList;