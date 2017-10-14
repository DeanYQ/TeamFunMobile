import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    Alert,
    FlatList
} from 'react-native';



class GeneralPage extends React.Component{

  constructor(props) {
        super(props);
         this.state= {
             item: this.props.data
         };
    }
       static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
    });

     render() {
       
        return (
            <View style={{ flexDirection: 'column' }}>
                  <View style={{flexDirection:'row',margin:10}}>
                    <Text style={styles.textStyle}>Name:</Text>
                    <TextInput underlineColorAndroid='transparent'  style={styles.input} />
                  </View>
                  <View style={{flexDirection:'row',margin:10}}>
                    <Text style={styles.textStyle}>
                         Description:
                    </Text>
                    <TextInput style={styles.descriptionInput}  underlineColorAndroid='transparent' />
                   </View>
                  <View style={{flexDirection:'row',margin:10}}>
                      <Text style={styles.textStyle}>
                          Vendor:
                      </Text>
                       <Text style={styles.textStyle}>
                        Allen-Bradley
                        </Text>
                   </View>
                   <View style={{flexDirection:'row',margin:10}}>
                      <Text style={styles.textStyle}>
                        Catalog ID:
                      </Text>
                       <Text style={styles.textStyle}>
                        {this.state.item.Catalog}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10}}>
                      <Text style={styles.textStyle}>
                        Firmware revision:
                      </Text>
                      <Text style={styles.textStyle}>
                        10
                        </Text>
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
    textStyle:{
       width:170,
       height:40,
       paddingTop:10,
       
    },
 input:{
        height:40,
        padding:4,
        fontSize:18,
        borderWidth:1,
        borderColor:'#b8b894',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex:2,
        backgroundColor:'white'

    },
    descriptionInput:{
        height:80,
        fontSize:18,
        borderWidth:1,
        borderColor:'#b8b894',
        borderRadius: 5,
        backgroundColor:'white',
        flex:2
    }
});

module.exports = GeneralPage;