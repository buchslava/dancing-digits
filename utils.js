var blessed = require('blessed');

var screen, box;

function init() {
  screen = blessed.screen({
    smartCSR: true
  });


  box = blessed.box({
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

  screen.title = 'DancingDigits';
  screen.append(box);

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  box.focus();
  screen.render();
}

if (!screen && !box) {
  init();
}

module.exports = {
  getMainScreen: function getMainScreen() {
    return screen;
  },
  getMainBox: function getMainBox() {
    return box;
  }
};
