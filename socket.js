var socketIO = require('socket.io');
var db = require('./db');

function connect(server) {
  const io = socketIO(server);
  
  // TODO: Create namespaces
  studentList(io);
}

// TODO: List namespace will provide list of logged in users
function studentList(io) {
  const users = io.of('/users');
  users.on('connection', socket => {
    // TODO: add listener for starting chat
    
    // TODO: add listener to chat message

    // TODO: add listener for editor message WYSIWIG

    // TODO: add listener for drawing

    // TODO: add listener for logging in, update flag loggedIn in Database, join room

    // TODO: add listener on 'disconnect' to log out user, and emit

    // TODO: add listener for logout message, update db, emit
    
    // TODO: add listener to search query
  });
}

module.exports = {
  connect,
}
