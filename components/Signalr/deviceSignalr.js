import signalr from 'react-native-signalr';

const signalrUrl = 'http://******************.api.net/';
var proxy;
var connection;

class DeviceSignalr {    
    connect(catalog, ip, cb) {
        //This is the server under /example/server published on azure.
        this.connection = signalr.hubConnection(signalrUrl);
        this.connection.logging = true;
    
        this.proxy = this.connection.createHubProxy('DeviceAdpterHub');
        this.proxy.on('AddMessage', (name, message) => {
          console.log('message-from-server', name, message);
        });
        this.proxy.on('Uploaded', (data) => {
            console.log('uploaded-from-adapter', data);
            return cb(data);
          });

          this.proxy.on('ConnectedToAdapter', (result) => {
            console.log('message-from-server', result);
          });
    
        // atempt connection, and handle errors
        this.connection.start().done(() => {
          console.log('Now connected, connection ID=' + this.connection.id);
          this.ConnectToAdapter(catalog.trim(), ip.trim());
        //   this.sendMsg('Send', 'Hello Server, how are you?')           
        }).fail(() => {
          console.log('Failed');
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

      disconnect(){
        this.connection.disconnect();
      }

      ConnectToAdapter(catalog, ip){
        this.proxy.invoke('ConnectToAdapter', 'CCW')
        .done((response) => {
          if (response){          
            console.log('connected-to-adapter');
            console.log('before upload');
            this.proxy.invoke('Upload', catalog, ip).done(() =>{
              console.log('after upload');                
            });            
          }
          else{
            console.log('connected-to-adapter failed');
          }  
          return response;
        }).fail(() => {
          console.warn('Something went wrong when calling server, it might not be up and running?')
        });
  
      }
}

module.exports = new DeviceSignalr();

