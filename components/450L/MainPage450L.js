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
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import images from '../images';
import GeneralPage from './GeneralPage';
import { StackNavigator, } from 'react-navigation';
import Signalr from '../Signalr/deviceSignalr.js';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MainPage450L extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showProgress: false,
            itemsource: ["General", "Diagnose"],
            configData: ""
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });


    componentDidMount() {
        this.setState({ showProgress: true });
        var proxy = this.props.navigation.state.params.proxy;

        Signalr.Upload(this.props.navigation.state.params.proxy,
            this.props.navigation.state.params.data.Catalog.trim(),
            this.props.navigation.state.params.data.IP.trim(), (data) => {
                this.setState({
                    configData: JSON.parse(data),
                    showProgress: false
                }, () => {
                    console.log('get-data-from-server:' + this.state.configData)
                });
            });
    }

    componentWillUnmount() {
        Signalr.DisconnectDevice(this.props.navigation.state.params.proxy,
            this.props.navigation.state.params.data.Catalog.trim(),
            this.props.navigation.state.params.data.IP.trim(), () => { });
    }

    fetchData() {
        return this.props.onRefresh();
    }

    pressItem(item) {
        if (this.state.refreshing)
            return;
        if (this.state.showProgress)
            return;
        const { navigate } = this.props.navigation;
        if ("General" == item)
            navigate('CL450LGeneralPage', { data: this.props.navigation.state.params.data, configData: this.state.configData });
        else if ("Diagnose" == item)
            navigate('CL450LDiagnosePage', {
                data: this.props.navigation.state.params.data,
                configData: this.state.configData,
                proxy: this.props.navigation.state.params.proxy
            });
    }

    _renderItem = ({ item }) => (
        <TouchableHighlight onPress={_ => this.pressItem(item)}
            disabled={this.state.showProgress}>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>
                        {item}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}>
                </ActivityIndicator>
                <View style={{ flex: 10, flexDirection: 'row', margin: 10 }}>
                    <AnimatedFlatList
                        style={{ borderColor: '#D7D7D7', borderTopWidth: 1 }}
                        data={this.state.itemsource}
                        renderItem={this._renderItem}
                        refreshing={false}
                    />
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
    loader: {
        marginTop: -6,
        flex: 1
    },
});

module.exports = MainPage450L;