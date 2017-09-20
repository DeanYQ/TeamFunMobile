// var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'token';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                return cb(err);
            }

            if (!val) {
                return cb();
            }
            var authInfo = val[1][1];
            // var authInfo = {
            //     header: {
            //         Authorization: 'Bearer ' + val[1][1]
            //     },
            //     user: JSON.parse(val[0][1])
            // }
            // var zippedObj = _.zipObject(val);
            // val.map((result, i, store)=>{
            //     let key = store[i][0];
            //     let value = store[i][1];
            // })

            // if (!zippedObj[authKey]) {
            //     return cb();
            // }

            // var authInfo = {
            //     header: {
            //         Authorization: 'Basic ' + zippedObj[authKey]
            //     },
            //     user: JSON.parse(zippedObj[userKey])
            // }

            return cb(null, authInfo);
        });
    }

    login(creds, cb) {
        // var b = new buffer.Buffer(creds.username +
        //     ':' + creds.password);
        // var encodedAuth = b.toString('base64');

        // fetch('https://api.github.com/user',{
        //     headers: {
        //         'Authorization' : 'Basic ' + encodedAuth
        //     }
        // })
        var params = {
            username: creds.username,
            password: creds.password,
            grant_type: 'password'
        };
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log('login');
        fetch('http://api.net/Token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error)
                    return cb(response);
                else {
                    console.log('response: ' + JSON.stringify(response))
                    AsyncStorage.multiSet([[authKey, formBody],
                    [userKey, JSON.stringify(response)]],
                        (err) => {
                            if (err) {
                                throw err;
                            }
                            return cb(response);
                        });
                }
            })

        // .then((response)=> {
        //     console.log('response.status: ' + response.status);
        //     console.log('response.message: ' + response.message);
        //     if(response.status >= 200 && response.status < 300){                
        //         return response;
        //     }
        //     throw {                
        //         badCredentials: response.status == 401,
        //         unknownError: response.status != 401
        //     }
        // })
        // .then((response)=> {
        //     var responseJson = response.json();
        //     console.log('response.json(): ' + JSON.stringify(responseJson));            
        //     return responseJson;
        // })
        // .then((results)=> {
        //     AsyncStorage.multiSet([
        //         [authKey, formBody],
        //         [userKey, JSON.stringify(results)]
        //     ], (err)=> {
        //         if(err){
        //             throw err;
        //         }

        //         return cb({success: true});
        //     })
        // })
        // .catch((err)=> {
        //     console.log('catch:'+ err);
        //     return cb(err);
        // });
    }
}

module.exports = new AuthService();