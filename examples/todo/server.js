var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);
