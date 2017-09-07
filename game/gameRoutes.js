const router = require('express').Router();
const controller = require('./gameController');

router.param('accessCode', controller.params);

router.route('/:accessCode')
  .get(controller.getOne);

router.route('/')
  .post(controller.createGame);

router.put('/:accessCode/join', controller.joinGame);

router.put('/:accessCode/start', controller.startGame);

module.exports = router;
