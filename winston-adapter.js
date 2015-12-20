var _ = require('lodash');

module.exports = function (data) {
  var content = JSON.parse(data.utf8Data);
  if (_.isArray(content)) {
    _.each(content, function (item) {
      if (item.message) {
        var splitted = item.message.split('=');

        if (splitted && splitted.length > 1) {
          item.message = {
            name: splitted[0],
            value: splitted[1]
          };
        }
      }
    });
  }

  return content;
};
