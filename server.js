const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gameRouter = require('./game/gameRoutes');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/spyfallApi';

mongoose.connect(MONGODB_URI, {
  useMongoClient: true,
});

// require('./util/seed.js');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/games', gameRouter);

io.sockets.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('create-game', (gameAccessCode) => {
    socket.join(gameAccessCode);
    console.log("Group created: " + gameAccessCode);

    socket.on('player-joined', (player) => {
      io.sockets.in(gameAccessCode).emit('player-joined', player);
      console.log("Player joined: " + player);
    });

    socket.on('game-started', (message) => {
      io.sockets.in(gameAccessCode).emit('game-started', message);
      console.log('Game Started');
    });
  })

  socket.on('join-game', (data) => {
    socket.join(data['gameAccessCode']);
    console.log("Group joined: " + data['gameAccessCode']);
    io.sockets.in(data['gameAccessCode']).emit('player-joined', data['player']);
    console.log("Player sent: " + data['player']);
  })

  socket.on('message', (message) => {
    io.emit('message', message);
    console.log(message);
  });
});

http.listen(3000);
console.log('Listening on port 3000');
