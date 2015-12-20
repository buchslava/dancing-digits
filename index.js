var _ = require('lodash');
var async = require('async');
var blessed = require('blessed');

var adapter = require('./winston-adapter');
var config = _.clone(require('./config.json'));
var utils = require('./utils');
var Task = require('./task');

var screen = utils.getMainScreen();
var box = utils.getMainBox();

var model = [];
config.forEach(function (setting) {
  if (setting.box) {
    setting.box.parent = box;
    setting.inst = blessed.box(setting.box);
  }

  if (setting.list) {
    setting.list.parent = box;
    setting.inst = blessed.list(setting.list);
  }

  if (setting.text) {
    setting.text.parent = box;
    setting.inst = blessed.scrollabletext(setting.text);
  }

  model.push(setting);
});

var task = new Task({
  url: 'ws://localhost:3000/logs',
  transportAdapter: adapter
});

task.connect(function (data) {
  var setting, content;
  _.each(data, function(detail) {
    if (detail && detail.message && detail.message.name) {
      setting = _.findWhere(model, {name: detail.message.name});
      if (setting) {
        content = setting.template
          .replace(/#T/, detail.createdAt)
          .replace(/#V/, detail.message.value);

        if (setting.box) {
          setting.inst.setContent(content);
        }

        if (setting.list) {
          setting.items = [content].concat(setting.items);
          setting.inst.setItems(setting.items);
          setting.inst.select(0);
        }

        if (setting.text) {
          setting.inst.content = content + setting.inst.content;
          setting.inst.setContent(setting.inst.content);
        }
      }
    }
  });
  screen.render();
});
