var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var mongoose = require('mongoose');
var Location = require('./locationModel')

require('./seed.js');

var app = express();

mongoose.connect('mongodb://localhost/spyfallApi', {
  useMongoClient: true
});

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const games = [];

let gameIdCounter = 1;

app.get('/games/:id', (req, res) => {
  res.send(req.params.id);
})

app.post('/games', (req, res) => {
  const game = {
    players: [req.body.player],
    id: gameIdCounter.toString()
  }
  gameIdCounter++;
  games.push(game);
  res.send(req.body);
})

app.put('/games/:id/addPlayer', (req, res) => {
  let updatedGame = games[_.findIndex(games, { id: req.params.id })];
  updatedGame.players.push(req.body.player);
  res.send();
})

app.put('/games/:id/start', (req,res) => {
  Location.find({})
    .then((allLocations) => {
      let updatedGame = games[_.findIndex(games, { id: req.params.id })];
      updatedGame.startTime = new Date;
      updatedGame.location = _.sample(allLocations).name
      res.send();
    });
})

app.listen(3000);
console.log('Listening on port 3000');
