var socketIO = require('socket.io');
var db = require('./db');

function connect(server) {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    socket.emit('welcome', 'you are connected');
    socket.on('chat', (msg) => {
      socket.emit('reply', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // TODO: Create namespaces
  studentList(io);
  collaboration(io);
}

// TODO: List namespace will provide list of logged in users
function studentList(io) {}

// TODO: Collaboration namespace for communicating between users
function collaboration(io) {}

module.exports = {
  connect,
}
