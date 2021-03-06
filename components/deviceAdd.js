import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    FlatList,
    TextInput,
    Picker,
    Modal,
    TouchableHighlight,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import AuthService from '../AuthService';

var items = ["Item 1", "Item 2"];

class DeviceAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddr: "",
            catalogId: "440C",
            modalVisible: false,
            isBtnDisabled: true,
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Add Device",
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });


    validateIpAddress(ip) {
        this.state.ipAddr = ip;
        var regexp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        var valid = regexp.test(ip);

        if (!valid) {
            this.setState({ isBtnDisabled: true });
            return false;
        }
        var target = this;

        return ip.split('.').every(function (num) {
            if (num.length > 1 && num.charAt(0) === '0') {
                target.setState({ isBtnDisabled: true });
                return false;
            } else if (parseInt(num, 10) > 255) {
                target.setState({ isBtnDisabled: true });
                return false;
            }
            target.setState({ isBtnDisabled: false });
            return true;
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    addDevice() {
        // TODO: send request to the server
        const { navigate } = this.props.navigation;
        this.setModalVisible(true);
        var url = "http://mobileservices20170819084039.azurewebsites.net/api/Devicelist";
        //var token = info;
        //fetch(url, {
        //    method: "POST",
        //    //headers: {
        //    //    'Authorization': 'Bearer ' + token
        //    //},
        //    body: JSON.stringify({
        //        Catalog: '440C',
        //        DeviceType: 2,
        //        ProductType: 3,
        //        Rev: 'sample string 4',
        //        IP: '192.168.100.100',
        //        Description: 'sample string 6'
        //    })
        //})
        //.then((response) => {
        //    navigate("Home");
        //})
        //.done();
        var params = {
            Catalog: this.state.catalogId,
            DeviceType: "999",
            ProductType: "999",
            Rev: '1.0',
            IP: this.state.ipAddr
        };
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        var data = formBody.join("&");
        console.log(data);
        AuthService.getAuthInfo((err, info) => {
            var token = info;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                },
                body: data
            })
                .then((response) => {
                    
                    Alert.alert("Add new device","Success",
                        [
                            { text: 'OK', onPress: () => {
                                this.setModalVisible(false);
                                const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Home' }),
                                ]
                                });
                                                            
                                this.props.navigation.dispatch(resetAction);
                                // this.props.navigation.dispatch(NavigationActions.back());
                                }
                             },
                        ],
                        { cancelable: false });
                })
                .done();
        });
    }

    render() {
        //let index = 0;
        //const data = [
        //    { key: index++, section: true, label: 'Catalog ID' },
        //    { key: index++, label: 'CR30' },
        //    { key: index++, label: 'Micro800' },
        //    { key: index++, label: 'Light Curtain' },
        //    { key: index++, label: 'PV800' },
        //];
        //return (
        //    <View style={{ flex: 1, justifyContent: 'space-around', padding: 50 }}>
        //import ModalPicker from 'react-native-modal-picker'

        //        <ModalPicker
        //            data={data}
        //            style={{height:100}}
        //            initValue="Select something yummy!"
        //            onChange={(option) => {  }} />
        //
        //        <TextInput
        //            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, height: 30 }}
        //            editable={false}
        //            placeholder="Select something yummy!"
        //            value={this.state.textInputValue} />
        //
        //    </View>
        //);

        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={styles.container}>
                        <View>
                            <ActivityIndicator color="gray" size="large" />
                        </View>
                    </View>
                </Modal>
                <Picker
                    style={{ margin: 10 }}
                    selectedValue={this.state.catalogId}
                    onValueChange={(catalog) => this.setState({ catalogId: catalog })}>
                    <Picker.Item label="CR30" value="440C" />
                    <Picker.Item label="Micro820" value="Micro820" />
                    <Picker.Item label='Light Curtain' value="450L" />
                    <Picker.Item label="2711R-T10T" value="2711R-T10T" />
                </Picker>
                <TextInput
                    style={styles.ipInput}
                    placeholder="input the IP address"
                    onChangeText={(text) => this.validateIpAddress(text)}>
                </TextInput>

                <View style={styles.buttonContainer}>
                    <Button
                        disabled={this.state.isBtnDisabled}
                        onPress={this.addDevice.bind(this)}
                        title="Add Device"
                        style={{ height: 100 }}
                        color="#555555" />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

var styles = StyleSheet.create({
    ipInput: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18
    },
    buttonContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    dropdown: {
        borderColor: '#b8b894',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 30,
        backgroundColor: 'white'
    },
    dropdownText: {
        fontSize: 18
    },
    dropdownItem: {
        width: 300,
    },
    dropdownItemText: {
        fontSize: 18
    },

    selectStyle: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        height: 100
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: 18,
        height: 100
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    keyboardAvoidingView: {
	flex: 1,
	backgroundColor:'white',
	justifyContent:'flex-start',
	paddingHorizontal: 20,
	paddingTop: 20,
  },
});
module.exports = DeviceAdd;