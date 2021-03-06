import React, { Component } from 'react';
import { Text, View, StyleSheet,Alert,ScrollView } from 'react-native';

class FaultPage extends Component {
	constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            fault: props.navigation.state.params.fault
        };
    }
	
	static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.data.Catalog.trim(),
        headerStyle: { backgroundColor: '#960000', },
        headerTitleStyle: { color: '#fff' },
        
    });
	
  render() {
    // Parse Json data to string data
	let display = "";
	if (this.props.navigation.state.params.configData.FaultLog != null)
	{
    display = this.props.navigation.state.params.configData.FaultLog.FaultLogContent.toString();
		//display = this.state.responseData.FaultLog.FaultLogContent.toString();
	}
	
    return (
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
            <Text style={styles.paragraph}>
            Fault
            </Text>
        </View>
        <View style={styles.textcontainer}>
          <ScrollView>
            <Text style={styles.paragraph}>
                {display}
            </Text>
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titlecontainer: {
    marginLeft: 24,
    marginTop: 24,
    width: 75,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderColor: '#000000',
	borderRadius: 4,
  },
  textcontainer: {
    marginLeft: 24,
    marginTop: 24,
	marginRight: 24,
    height: 400,
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderColor: '#000000',
	borderRadius: 8,
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
});

module.exports = FaultPage;