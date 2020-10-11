var express = require('express');
var router = express.Router();
const db = require('../config/database')
const Game = require('../models/game')

/* GET games listing. */
router.get('/', function (req, res, next) {
  Game.findAll()
    .then(games => {
      console.log(games);
      res.send(games);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

/* GET game reload. */
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  res.send('Mostrar la información del juego ' + id);
});

/* POST new game. */
router.post('/', function (req, res, next) {
  
  Game.create({
    id: '',
    date_start: new Date(),
    status: 'Init'
  })
    .then(game => {
      console.log(game)
      res.send(game)
    })
    .catch(err => console.log(err));
});

/* POST new move. */
router.post('/move', function (req, res, next) {
  const { id } = req.params;
  res.send('Movimiento de un usuario');
});

/* POST pause game. */
router.post('/:id', function (req, res, next) {
  const postGameData = req.body;
  res.send('Movimiento de un usuario');
});

module.exports = router;