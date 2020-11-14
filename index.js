//heroku link : https://chat-app-chao.herokuapp.com/

const { stringify } = require('querystring');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const log = [];

const user = [];

app.use(require('express').static('assets'));
app.use(require('express').static('script'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  const n = Date.now();
  const username = n.toString();
  user.push(username);

  socket.emit('connection', log,username, user);
  socket.on('chat message', (msg) => {
    
    const current = new Date();
    const time = current.toTimeString().substring(0,5);
    const who = {username, msg, time};

    if(log.length <  200){
      log.push(who);
    }else{
      log.shift();
      log.push(who);
    }
    io.emit('chat message', log);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});