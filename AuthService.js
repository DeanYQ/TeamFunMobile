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
            return cb(null, authInfo);
        });
    }

    login(creds, cb) {
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
        fetch('http://mobileservices20170819084039.azurewebsites.net/Token', {
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
    }
}

module.exports = new AuthService();