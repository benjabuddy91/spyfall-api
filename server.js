const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const Location = require('./locationModel');
const Game = require('./gameModel');

const app = express();

mongoose.connect('mongodb://localhost/spyfallApi', {
  useMongoClient: true,
});

require('./seed.js');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/games/:id', (req, res, next) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) next(err);
    else res.send(game);
  });
});

app.post('/games', (req, res) => {
  Game.create({ players: [req.body.player] })
    .then((game) => {
      res.send(game);
    });
});

app.put('/games/:id/addPlayer', (req, res, next) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) next(err);
    else {
      game.players.push(req.body.player);
      game.save((error, updatedGame) => {
        if (error) next(error);
        else {
          res.send(updatedGame);
        }
      });
    }
  });
});

app.put('/games/:id/start', (req, res, next) => {
  Location.find({}, 'name')
    .then(allLocations => _.sample(allLocations))
    .then((randomLocation) => {
      Game.findByIdAndUpdate(
        req.params.id,
        {
          startTime: new Date(),
          location: randomLocation,
        },
        { new: true }
      )
        .populate('location')
        .exec((err, game) => {
          if (err) next(err);
          else {
            console.log(game);
            res.send(game);
          }
        });
    });
});

app.listen(3000);
console.log('Listening on port 3000');
