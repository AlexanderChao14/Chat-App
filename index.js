//heroku link : https://chat-app-chao.herokuapp.com/

var app = require('express')();
const port = process.env.PORT || 3000;
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// app.get(`/user/:link/:id`, function(req, res){
//   res.send(req.params);
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
  console.log(`Server listening on port ${port}.`);
});