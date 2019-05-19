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
      console.log('user disconnected - 1');
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
    
    // When a user logs in 
    socket.on('login', user => {
      db.getClient().collection("students").findOneAndUpdate(
        {email:  user.email},
        {$set: {'loggedIn': true}},
        {returnOriginal: false},
        function(err, results) {
          if (err) {
            socket.emit('list error', err);
          } else if(results.value == null) {
            socket.emit('list error', {error: "Student with email " + user.email  + " does not exist."});
          } else {
            list.emit('logged in', results.value);
          }
        });
    });

    socket.on('disconnect', user => {
      db.getClient().collection("students").findOneAndUpdate(
        {$set: {'loggedIn': false}},
        {returnOriginal: false},
        function(err, results) {
          if (err) {
            socket.emit('list error', err);
          } else if(results.value == null) {
            socket.emit('list error', {error: "Socket ID " + socket.id  + " does not exist."});
          } else {
            list.emit('logged out', results.value);
          }
        });
    });

    socket.on('logout', user => {
      db.getClient().collection("students").findOneAndUpdate(
        {$set: {'loggedIn': false}},
        {returnOriginal: false},
        function(err, results) {
          if (err) {
            socket.emit('list error', err);
          } else if(results.value == null) {
            socket.emit('list error', {error: "Socket ID " + socket.id  + " does not exist."});
          } else {
            list.emit('logged out', results.value);
          }
        });
    });

    socket.on('query', (params, fn) => {
      // For a given search params, return student list
      let criteria = {};
      if (params.search) {
        const textCriteria = { $text: { $search: params.search } };
        const learningTargetCriteria = { learningTargets: params.search };
        criteria = {$or: [textCriteria, learningTargetCriteria]};
      };
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

// TODO: Collaboration namespace for communicating between users
function collaboration(io) {}

module.exports = {
  connect,
}
