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

import images from '../images';
import GeneralPage from './GeneralPage';
import { StackNavigator, } from 'react-navigation';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MainPageCR30 extends React.Component {
    constructor(props) {
        super(props);
        // this.state= {
        //     item: this.props.navigation.state.params.data
        // };

        this.state = {
            refreshing: false,
            itemsource: ["General","Fault Log"]
        };
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });


    componentDidMount() {
     //   this._onRefresh();
    }

   // _onRefresh() {
    //    this.setState({ refreshing: true });

      //  this.props.onRefresh((response) => {
      //      this.setState({
      //          itemsource: response,
        //        refreshing: false
       //     });
      //      console.log(this.state.itemsource);
     //   });
  //  }

    fetchData() {
        return this.props.onRefresh();
    }

    pressItem(item) {
        if (this.state.refreshing)
            return;
        const { navigate } = this.props.navigation;
		if ("General" == item)
			navigate('CR30GeneralPage', {data: this.props.navigation.state.params.data});
		else if ("Fault Log" == item)
			navigate('CR30FaultPage', {data: this.props.navigation.state.params.data});
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={_ => this.pressItem(item)}>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderColor: '#D7D7D7', borderBottomWidth: 1 }}>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>
                        {item}
                    </Text>
                  
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        //const item = this.props.navigation.state.params.data;
        return (
            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>         
                <AnimatedFlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                           // onRefresh={this._onRefresh.bind(this)}
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

});

module.exports = MainPageCR30;