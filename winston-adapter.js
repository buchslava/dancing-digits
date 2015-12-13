var _ = require('lodash');

module.exports = function (data) {
  var content = JSON.parse(data.utf8Data);
  if (_.isArray(content)) {
    _.each(content, function (item) {
      if (item.message) {
        item.message = JSON.parse(item.message);
      }
    });
  }

  return content;
};
