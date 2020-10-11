var express = require('express');
var router = express.Router();
const db = require('../config/database')
const Game = require('../models/game')
const Move = require('../models/move')

/* GET games listing. */
router.get('/', function (req, res, next) {
  //Get all games
  Game.findAll()
    .then(games => {
      console.log(games);
      res.send(games);
    })
    .catch(err => console.log(err));
});

/* GET game by id to reload. */
router.get('/:id', function (req, res, next) {
  //Get parameter id
  const { id } = req.params;
  //Get game by id
  Game.findAll({
    where: {
      id: id
    }
  })
    .then(games => {
      console.log(games);
      res.send(games);
    })
    .catch(err => console.log(err));
});

/* POST new game. */
router.post('/', function (req, res, next) {
  //Create a new game and return new object
  Game.create({
    id: '',
    date_start: new Date(),
    status: 'Init'
  }).then(game => {
      console.log(game)
      res.send(game)
    })
    .catch(err => console.log(err));
});

/* POST new move in a game by id. */
router.post('/:id/move', function (req, res, next) {
  const postGameData = req.body;
  Move.create({
    id: '',
    game_id: postGameData.game_id,
    sell: postGameData.sell,
    user: postGameData.user
  }).then(game => {
    console.log(game)
    res.send(game)
  })
  .catch(err => console.log(err));
});

/* POST pause game. */
router.post('/:id', function (req, res, next) {
  const postGameData = req.body;
  res.send('Movimiento de un usuario');
});

module.exports = router;