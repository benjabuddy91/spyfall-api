const _ = require('lodash');
const cryptoRandomString = require('crypto-random-string');

const Location = require('../location/locationModel');
const Game = require('./gameModel');

exports.params = (req, res, next, accessCode) => {
  Game.findOne({ accessCode })
    .populate('location')
    .populate('locations')
    .exec()
    .then((game) => {
      req.game = game;
      next();
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res) => res.send(req.game);

exports.createGame = (req, res) => {
  Game.create({
    players: [req.body.player],
    host: [req.body.player],
    accessCode: cryptoRandomString(6).toUpperCase(),
  })
    .then(game => res.send(game));
};

exports.joinGame = (req, res, next) => {
  req.game.players.push(req.body.player);
  req.game.save()
    .then(game => res.send(game), err => next(err));
};

exports.startGame = (req, res, next) => {
  Location.find({}).select('name')
    .then((locations) => {
      req.game.startTime = Date.now();
      req.game.locations = locations;
      req.game.location = _.sample(locations);
      req.game.spy = _.sample(req.game.players);
      return req.game.save();
    })
    .then(game => res.send(game), err => next(err));
};
