import React ,{Component} from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator} from 'react-native';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            showProgress: false
        }
    }

    render(){
        let errorCtrl = <View/>;
        if(!this.state.success &&
            this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>
        }
        if(!this.state.success &&
            this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>
        }
        return(
            <View style={styles.container}>
                <View style={styles.center}>
                    <Image style={styles.logo} source={require('../../img/CCW.png')}/>
                    <Text style={styles.heading} >
                        Connected Components Workbench
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text)=> this.setState({username:text})}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Username" />
                <TextInput
                    onChangeText={(text)=> this.setState({password:text})}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Password"
                    secureTextEntry={true} />
                <TouchableHighlight style={styles.button}
                                    onPress={this.onLinginPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Log in
                    </Text>
                </TouchableHighlight>
                {errorCtrl}

                <ActivityIndicator animating={this.state.showProgress}
                                   size="large"
                                   style={styles.loader}>
                </ActivityIndicator>
            </View>
        )
    }

    onLinginPressed(){
        console.log('Attempting to log in with username ' + this.state.username);
        this.setState({showProgress:true});
        const authService = require('../../AuthService');
        authService.login({
            username:this.state.username,
            password:this.state.password
        }, (response) =>{
            this.setState({showProgress: false});
			if (response.error && !response.error.success){
                Alert.alert('Error', response.error_description);
			}
            if (!response.error && this.props.onLogin){
                this.props.onLogin();
            }
        });
    }
}

let styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 20,
        padding:10,
        alignItems: 'stretch',
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width:100,
        height: 80
    },
    heading:{
        fontSize:20,
        marginTop:10,
    },
    input:{
        height:50,
        marginTop:10,
        padding:4,
        fontSize:18,
        borderWidth:1,
        borderColor:'#b8b894',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button:{
        height:50,
        backgroundColor:'#960000',
        marginTop:10,
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 5
    },
    buttonText:{
        fontSize:22,
        color:'#fff',
        alignSelf:'center'
    },
    loader:{
        marginTop: 20,
    },
    error:{
        color: 'red',
        paddingTop: 10
    }
});

module.exports = Login;