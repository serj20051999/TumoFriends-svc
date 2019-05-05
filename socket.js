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
function studentList(io) {
  const list = io.of('/list');
  list.on('connection', socket => {
    
    socket.on('hello', user => {
      // Update user db with student socket id

      // Tell everyone this user logged in
      list.emit('logged-in', user);
    });

    socket.on('query', (params) => {
      // For a given search params, return student list
      db.getClient().collection("students").find(query).toArray(function(err, results) {
        if (err) {
          socket.emit('error', err);
        } else {
          socket.emit('results', results);
        }
      });
    });
  });
}

// TODO: Collaboration namespace for communicating between users
function collaboration(io) {}

module.exports = {
  connect,
}
