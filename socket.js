var socketIO = require('socket.io');
var db = require('./db');

function connect(server) {
  const io = socketIO(server);

  // TODO: Create namespaces
  usersNamespace(io);
}

// TODO: List namespace will provide list of logged in users
function usersNamespace(io) {
  const users = io.of('/users');
  users.on('connection', socket => {
    // TODO: add listener for starting chat

    // TODO: add listener to chat message

    // TODO: add listener for editor message WYSIWIG

    // TODO: add listener for drawing

    // TODO: add listener for logging in, update flag loggedIn in Database, join room
    socket.on('login', user => {
      socket.join(user.email);
      db.getClient().collection('students').findOneAndUpdate(
        { email: user.email },
        { $set: { 'loggedIn': true } },
        { returnOriginal: false },
        function (err, result) {
          if (err) {
            socket.emit('list errors', err);
          } else if (!result.value) {
            socket.emit('list errors', `Student with email ${user.email} not found`);
          } else {
            socket.emit('user_login', result.value);
          }
        }
      );
    });
    socket.on('logout', user => {
      socket.join(user.email);

      db.getClient().collection("students").findOneAndUpdate(
        {email: user.email},
        {$set: {'loggedIn' : false}},
        {returnOriginal: false},
        function(err, results){
          if(err) {
            socket.emit('list error', err);
          }else if(results.value == null){
            socket.emit('list error',{error:"Students with email"})
          }else{
            users.emit('logged out',results.value);
          }
        });
    })
    // TODO: add listener on 'disconnect' to log out user, and emit

    // TODO: add listener for logout message, update db, emit

    // TODO: add listener to search query
    socket.on('search', (query, fn) => {
      const obj = query ? {email: query} : {};
      db.getClient().collection('students').find(obj).toArray(function(err, result){
        console.log(err, result);
        if(err){
          socket.emit('list errors', err);
        }else{
          fn(result);
        }
      });
    });
  });
}

module.exports = {
  connect,
}
