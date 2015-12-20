var _ = require('lodash');

module.exports = function (data) {
  var content = JSON.parse(data.utf8Data);
  if (_.isArray(content)) {
    _.each(content, function (item) {
      if (item.message) {
        var pos = item.message.indexOf('@');

        if (pos >= 0) {
          item.message = {
            name: item.message.substr(0, pos),
            value: item.message.substr(pos + 1)
          };
        }
      }
    });
  }

  return content;
};
