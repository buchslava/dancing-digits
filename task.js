var WebSocketClient = require('websocket').client;

function connect(options, dataCaller) {
  var client = new WebSocketClient();

  client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    setTimeout(function () {
      connect(options, dataCaller);
    }, 1000);
  });

  client.on('connect', function(connection) {
      connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function() {
        console.log('Connection Closed');
        setTimeout(function () {
          connect(options, dataCaller);
        }, 1000);
      });
      connection.on('message', function(message) {
        dataCaller(options.transportAdapter(message));
      });
  });

  client.connect(options.url);
};


function Task(options) {
  this.options = options;
}

Task.prototype.connect = function (dataCaller) {
  connect(this.options, function (data) {
    dataCaller(data);
  });
}

module.exports = Task;
