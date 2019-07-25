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
    socket.on('start-chat', (toUser, fromUser) => {
    
      if (toUser) {
        users.in(toUser.email).emit('start-chat', fromUser);
      }
    });
    // TODO: add listener for starting chat

    // TODO: add listener to chat message
    socket.on('message', (msg, toUser) => {
      if(toUser){
        users.in(toUser.email).emit('new message', msg);
      }
    });

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
    socket.on('search', (textSearch, fn) => {
      let criteria = {};
      if (textSearch) {
        const textCriteria = { $text: { $search: params.search } };
        const learningTargetCriteria = { learningTargets: params.search };
        criteria = {$or: [textCriteria, learningTargetCriteria]};
      }
      db.getClient().collection("students").find(criteria).sort({loggedIn: -1}).toArray(function(err, results) {
        if (err) {
          console.log('err', err);
          socket.emit('list error', err);
        } else {
          console.log('results', results);
          fn(results);
        }
      });
    });
  });
}

module.exports = {
  connect,
}
