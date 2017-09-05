const router = require('express').Router();
const controller = require('./gameController');

router.param('id', controller.params);

router.route('/:id')
  .get(controller.getOne);

router.route('/')
  .post(controller.createGame);

router.put('/:id/addPlayer', controller.addPlayer);

router.put('/:id/start', controller.startGame);

module.exports = router;
