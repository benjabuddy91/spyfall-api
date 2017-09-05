const _ = require('lodash');

const Location = require('../location/locationModel');
const Game = require('./gameModel');

const getRandomLocation = () => Location.count()
  .then(count => Location.findOne().skip(_.random(0, count)));

exports.params = (req, res, next, id) => {
  Game.findById(id)
    .then((game) => {
      req.game = game;
      next();
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res) => res.send(req.game);

exports.createGame = (req, res) => {
  Game.create({ players: [req.body.player] })
    .then(game => res.send(game));
};

exports.addPlayer = (req, res, next) => {
  req.game.players.push(req.body.player);
  req.game.save()
    .then(game => res.send(game), err => next(err));
};

exports.startGame = (req, res, next) => {
  getRandomLocation()
    .then((location) => {
      req.game.startTime = new Date();
      req.game.location = location;
      req.game.spy = _.sample(req.game.players);
      return req.game.save();
    })
    .then(game => res.send(game), err => next(err));
};
