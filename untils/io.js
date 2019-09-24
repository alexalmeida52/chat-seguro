const io  = require('socket.io');

module.exports = {
  getInstance: () => {
    return this.io;
  },
  init: (http) => {
    this.io = io(http)
    return this.io;
  }
};
