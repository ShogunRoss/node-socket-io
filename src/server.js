const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server);

server.listen(process.env.port || 8081);
console.log('Server listening on port 8081');
console.log('Point your browser to http://localhost:8081');

app.use(bodyParser.json());
app.use('/', express.static('./client'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (arg1, arg2) {
    console.log('I received a private message by', arg1.from, 'saying', arg2.msg);
  });

  socket.on('disconnect', function () {
    console.log("user disconnected");
    io.emit('user disconnected');
  });
});