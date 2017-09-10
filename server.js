const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gameRouter = require('./game/gameRoutes');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect('mongodb://localhost/spyfallApi', {
  useMongoClient: true,
});

// require('./util/seed.js');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/games', gameRouter);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('player-joined', (message) => {
    io.emit('player-joined', message);
    console.log(message);
  });

  socket.on('game-started', (message) => {
    io.emit('game-started', message);
    console.log(message);
  });

  socket.on('message', (message) => {
    io.emit('message', message);
    console.log(message);
  });
});

http.listen(3000);
console.log('Listening on port 3000');
