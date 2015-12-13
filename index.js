var _ = require('lodash');
var async = require('async');
var blessed = require('blessed');

var adapter = require('./winston-adapter');
var config = _.clone(require('./config.json'));
var Task = require('./task');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'DancingDigits';

var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  tags: true,
  style: {
    fg: 'white',
    bg: 'gray',
    border: {
      fg: '#f0f0f0'
    }
  }
});


var model = [];
config.forEach(function (setting) {
  setting.box.parent = box;
  setting.boxInst = blessed.box(setting.box);
  model.push(setting);
});


screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

box.focus();
screen.render();

var task = new Task({
  url: 'ws://localhost:3000/logs',
  transportAdapter: adapter
});

task.connect(function (data) {
  var setting, content;
  _.each(data, function(detail) {
    if (detail && detail.level === 'info' && detail.message && detail.message.name) {
      setting = _.findWhere(model, {name: detail.message.name});
      if (setting) {
        content = setting.template
          .replace(/#T/, detail.createdAt)
          .replace(/#V/, detail.message.value);
        setting.boxInst.setContent(content);
      }
    }
  });
  screen.render();
});
