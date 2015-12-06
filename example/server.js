var http = require("http");
var express = require("express");
var logger = require("winston");
var winstonWS = require("winston-websocket");

var app = express()
  .use(express.static("."));

var server = http.createServer(app);

logger.add(
  winstonWS.WSTransport,
  {
    wsoptions: {
      server: server,
      path: '/logs'
      }
    }
);

server.listen(3000);
console.log("Server is listening on port 3000");

setInterval(function() {
  logger.info(JSON.stringify({
    type: 'point',
    name: 'rand-num-1',
    value: parseInt(Math.random()*1000000)
  }));
}, 500);

setInterval(function() {
  logger.info(JSON.stringify({
    type: 'point',
    name: 'rand-str-1',
    value: Math.random().toString(36).substring(7)
  }));
}, 5000);

setInterval(function() {
  var a;
  try {
    console.log(a[100]);
  } catch (e) {
    logger.error(JSON.stringify({
      type: 'error',
      message: e.message,
      stack: e.stack
    }));
  }
}, 10000);
