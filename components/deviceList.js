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
import Signalr from './Signalr/deviceSignalr';
import Swipeable from 'react-native-swipeable';
import AuthService from '../AuthService';

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            signalrConnecting: false,
            itemsource: this.props.itemsource,
            proxy: null
        };
    }

    componentDidMount() {
        this._signalrConnection();
        this._onRefresh();
    }

    _signalrConnection() {
        this.setState({ signalrConnecting: true });

        Signalr.connect(((callback) => {
            this.setState({
                signalrConnecting: false,
                proxy: callback
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
            console.log(item.Id);    
         // TODO: send request to the server
         const { navigate } = this.props.navigation;
         var url = "http://mobileservices20170819084039.azurewebsites.net/api/Devicelist";
         var params = {
             Catalog: item.Catalog,
             DeviceType: item.DeviceType,
             ProductType: item.ProductType,
             Rev: item.Rev,
             IP: item.IP
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
                 method: "Delete",
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Authorization': 'Bearer ' + token
                 },
                 body: data
             })
             .then((response) => {
                console.log(response);
                this._onRefresh();
            })
             .done();
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
                    // leftContent={(
                    //     <View style={[styles.leftSwipeItem, { backgroundColor: 'lightskyblue' }]}>
                    //         <Text>Pull action</Text>
                    //     </View>
                    // )}
                    rightButtons={[
                        <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'red' }]}
                        onPress={_ => this.deleteItem(item)}>
                            <Text style={{color: 'white',fontWeight: 'bold'}}>Delete</Text>
                        </TouchableOpacity>,
                        // <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'orchid' }]}>
                        //     <Text>2</Text>
                        // </TouchableOpacity>
                    ]}
                    // onRightButtonsOpenRelease={onOpen}
                    // onRightButtonsCloseRelease={onClose}
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
                    {/* <View style={[styles.listItem, {backgroundColor: 'salmon'}]}>
                  <Text>Example 1</Text>
                </View> */}
                </Swipeable>


                // <TouchableOpacity onPress={_ => this.pressItem(item)}>
                //     <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                //         <Image source={imageSrc} style={{ height: 50, width: 50, padding: 20, margin: 5 }}>
                //         </Image>
                //         <View style={{ paddingLeft: 20 }}>
                //             <Text style={{ fontSize: 20 }}>
                //                 {item.Catalog}
                //             </Text>
                //             <Text style={{ fontSize: 15 }}>
                //                 IP Address: {item.IP}
                //             </Text>
                //             <Text style={{ fontSize: 15 }}>
                //                 Rev: {item.Rev}
                //             </Text>
                //         </View>
                //     </View>
                // </TouchableOpacity>
            )
        }
    };

    render() {
        return (
            <View style={{ justifyContent: 'flex-start' }}>
                <AnimatedFlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing || this.state.signalrConnecting}
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