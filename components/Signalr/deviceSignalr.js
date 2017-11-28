import signalr from 'react-native-signalr';

const signalrUrl = 'http://mobileservices20171019105016.azurewebsites.net/';
var proxy;
var connection;

class DeviceSignalr {
  connect(cb) {
    //This is the server under /example/server published on azure.
    this.connection = signalr.hubConnection(signalrUrl);
    this.connection.logging = true;

    this.proxy = this.connection.createHubProxy('DeviceAdpterHub');
    this.proxy.on('AddMessage', (name, message) => {
      console.log('message-from-server', name, message);
    });

    this.proxy.on('ConnectedToAdapter', (result) => {
      console.log('message-from-server', result);
    });

    // atempt connection, and handle errors
    this.connection.start().done(() => {
      console.log('Now connected, connection ID=' + this.connection.id);
      cb(this.proxy, this.connection.id);
      this.ConnectToAdapter();
    }).fail(() => {
      console.log('Failed');
      cb(null);
    });

    //connection-handling
    this.connection.connectionSlow(() => {
      console.log('We are currently experiencing difficulties with the connection.')
    });

    this.connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
      }
      console.log('SignalR error: ' + errorMessage, detailedError)
    });
  }

  disconnect() {
    this.connection.disconnect();
  }

  ConnectToAdapter() {
    this.proxy.invoke('ConnectToAdapter', 'CCW')
      .done((response) => {
        if (response) {
          console.log('connected-to-adapter');
          console.log('before upload');
        }
        else {
          console.log('connected-to-adapter failed');
        }
        return response;
      }).fail(() => {
        console.warn('Something went wrong when calling server, it might not be up and running?')
      });
  }

  Upload(proxy, catalog, ip, cb) {
    proxy.on('Uploaded', (data) => {
      console.log('uploaded-from-adapter', data);
      return cb(data);
    });

    proxy.invoke('Upload', catalog, ip).done(() => {
      console.log('after upload');
    });
  }

  StartDiagnostic(proxy, catalog, ip, cb) {
    proxy.on('Diagnostic', (data) => {
      console.log('Diagnostic', data);
      return cb(data);
    });

    proxy.invoke('StartDiagnostic', catalog, ip).done(() => {
      console.log('StartDiagnostic');
    });
  }

  StopDiagnostic(proxy, catalog, ip, cb) {
    proxy.invoke('StopDiagnostic', catalog, ip).done(() => {
      console.log('StopDiagnostic');
      proxy.off('Diagnostic', () => { });
    });
  }

  DeleteDevice(proxy, clientId, catalog, ip, cb) {
    proxy.on('DeletedDevice', (data) => {
      console.log('DeletedDevice', data);
      return cb();
    });

    proxy.invoke('DeleteDevice', clientId, catalog, ip).done(() => {
      console.log('DeleteDevice');
    });
  }

  DisconnectDevice(proxy, catalog, ip, cb) {
    proxy.invoke('DisconnectDevice', catalog, ip).done(() => {
      console.log('DisconnectDevice');
    });
  }
}

module.exports = new DeviceSignalr();

