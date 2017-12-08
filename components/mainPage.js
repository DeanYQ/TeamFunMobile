import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import { StackNavigator } from 'react-navigation'
import Setting from './Settings/Setting';
import DeviceDetailPage from './deviceDetailPage';
import DeviceTab from './deviceTab'
import DeviceAdd from './deviceAdd'
import ImageButton from './imageButton'
import GeneralPage from './CR30/GeneralPage';
import CL450LGeneralPage from './450L/GeneralPage';
import CL450LDiagnosePage from './450L/DiagnosePage';
import FaultPage from './CR30/FaultPage';
import PV800AlarmList from './PV800/AlarmList';
import PV800Trend from './PV800/Trend';
import GeneralPagePV800 from './PV800/GeneralPagePV800';
import DataLogPV800 from './PV800/DataLogPV800';
import CCWGeneralPage from './CCW/CCWGeneralPage'
import DiagnosticPage from './CCW/DiagnosticPage'
import SerialPortPage from './Common/SerialPortPage'
import ModbusPage from './Common/ModBus'
import UsbPage from './Common/UsbPage'
import Signalr from './Signalr/deviceSignalr';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Devices'
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Mobile Detector',
            headerStyle: { backgroundColor: '#960000', },
            headerTitleStyle: { color: '#fff', },
            headerRight: (
                <ImageButton
                    style={{ backgroundColor: 'transparent', marginRight: 10 }}
                    imageStyle={{ width: 25, height: 25 }}
                    imageSource={require('../img/searchAdd.png')}
                    onPress={() => {
                        params.deviceNavigate(params.target);
                    }}>
                </ImageButton>
            ),
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({ deviceNavigate: this.navigateDeviceAdd, target: this })
    }

    navigateDeviceAdd(target) {
        const { navigate } = target.props.navigation;
        navigate('DeviceAdd', { navigation: target.props.navigation });
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
                        renderIcon={() => <Image style={styles.icon} source={require("../img/deviceIcon.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon, { tintColor: 'green' }]} source={require("../img/deviceIcon.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Devices' })}>
                        <View style={styles.page0}>
                            <DeviceTab navigation={this.props.navigation}></DeviceTab>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Me'}
                        title="Me"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/user.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon, { tintColor: 'green' }]} source={require("../img/user.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Me' })}>
                        <View>
                            <Setting />
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}
const MainPage = StackNavigator(
    {
        Home: { screen: HomePage },
        Detail: { screen: DeviceDetailPage },
        CR30GeneralPage: { screen: GeneralPage },
        CR30FaultPage: { screen: FaultPage },
        CL450LGeneralPage: { screen: CL450LGeneralPage },
        CL450LDiagnosePage: { screen: CL450LDiagnosePage },
        DeviceAdd: { screen: DeviceAdd },
        PV800AlarmList: { screen: PV800AlarmList },
        PV800Trend: { screen: PV800Trend },
        DataLogPV800: { screen: DataLogPV800 },
        GeneralPagePV800: { screen: GeneralPagePV800 },
        CCWGeneralPage: { screen: CCWGeneralPage },
        DiagnosticPage: { screen: DiagnosticPage },
        SerialPortPage: { screen: SerialPortPage },
        ModbusPage: { screen: ModbusPage },
        UsbPage: { screen: UsbPage },
    },
    {
        mode: 'modal',
        headerMode: 'float',
        navigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    });

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

module.exports = MainPage