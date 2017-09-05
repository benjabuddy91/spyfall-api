const _ = require('lodash');
const gameRouter = require('express').Router();
const Location = require('./locationModel');
const Game = require('./gameModel');

const getRandomLocation = () => Location.count()
  .then(count => Location.findOne().skip(_.random(0, count)));

gameRouter.param('id', (req, res, next, id) => {
  Game.findById(id)
    .then((game) => {
      req.game = game;
      next();
    }, (err) => {
      next(err);
    });
});

gameRouter.get('/:id', (req, res) => {
  res.send(req.game);
});

gameRouter.post('/', (req, res) => {
  Game.create({ players: [req.body.player] })
    .then(game => res.send(game));
});

gameRouter.put('/:id/addPlayer', (req, res, next) => {
  req.game.players.push(req.body.player);
  req.game.save()
    .then(game => res.send(game), err => next(err));
});

gameRouter.put('/:id/start', (req, res, next) => {
  getRandomLocation()
    .then(location => Game.findByIdAndUpdate(
      req.params.id,
      {
        startTime: new Date(),
        location,
      },
      { new: true }
    )
      .populate('location'))
    .then(game => res.send(game), err => next(err));
});

module.exports = gameRouter;
