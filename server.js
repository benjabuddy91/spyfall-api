const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const Location = require('./locationModel');
const Game = require('./gameModel');

require('./seed.js');

const app = express();

mongoose.connect('mongodb://localhost/spyfallApi', {
  useMongoClient: true,
});

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const games = [];

let gameIdCounter = 1;

app.get('/games/:id', (req, res) => {
  res.send(req.params.id);
});

app.post('/games', (req, res) => {
  const game = {
    id: gameIdCounter.toString(),
    players: [req.body.player],
  };
  gameIdCounter += 1;
  games.push(game);
  res.send(req.body);
});

app.put('/games/:id/addPlayer', (req, res) => {
  const updatedGame = games[_.findIndex(games, { id: req.params.id })];
  updatedGame.players.push(req.body.player);
  res.send();
});

app.put('/games/:id/start', (req, res) => {
  Location.find({})
    .then((allLocations) => {
      const updatedGame = games[_.findIndex(games, { id: req.params.id })];
      updatedGame.startTime = new Date();
      updatedGame.location = _.sample(allLocations).name;
      res.send();
    });
});

app.listen(3000);
console.log('Listening on port 3000');
