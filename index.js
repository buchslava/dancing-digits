var adapter = require('./winston-adapter');
var Task = require('./task');

var t = new Task({
  url: 'ws://localhost:3000/logs',
  transportAdapter: adapter
});
t.connect(function (data) {
  console.log(data);
});
