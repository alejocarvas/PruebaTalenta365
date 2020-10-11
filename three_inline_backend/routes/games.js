var express = require('express');
const { move } = require('../app');
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
    //Create a new move in a game
    Move.create({
      id: '',
      game_id: game.id,
      obj: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
      }
    }).then(move => {
      console.log(move)
      res.send(game)
    })
      .catch(err => console.log(err));
  })
    .catch(err => console.log(err));
});

/* POST new move in a game by id. */
router.post('/move', function (req, res, next) {
  const postGameData = req.body;

  Move.findAll({
    where: {
      game_id: postGameData.game_id
    }
  })
    .then(move => {
      console.log(move);
      if (move.length > 0) {
        move[0].obj[postGameData.cell] = postGameData.user
        Move.update({
          obj: move[0].obj
        }, { where: { id: move[0].id } })
          .then(moveUpdate => {
            console.log(moveUpdate)
            var winner = false
            var user = ''
            var mov = move[0].obj
            if (mov[1] != '') {
              if ((mov[1] == mov[2] && mov[1] == mov[3]) ||
                (mov[1] == mov[4] && mov[1] == mov[7]) ||
                (mov[1] == mov[5] && mov[1] == mov[9])) {
                winner = true
                user = mov[1]
              }
            }
            if (mov[2] != '') {
              if ((mov[2] == mov[1] && mov[2] == mov[3]) ||
                (mov[2] == mov[5] && mov[2] == mov[8])) {
                winner = true
                user = mov[2]
              }
            }
            if (mov[3] != '') {
              if ((mov[3] == mov[2] && mov[3] == mov[1]) ||
                (mov[3] == mov[6] && mov[3] == mov[9]) ||
                (mov[3] == mov[5] && mov[3] == mov[7])) {
                winner = true
                user = mov[3]
              }
            }
            if (mov[4] != '') {
              if ((mov[4] == mov[5] && mov[4] == mov[6])) {
                winner = true
                user = mov[4]
              }
            }
            if (mov[7] != '') {
              if ((mov[7] == mov[8] && mov[7] == mov[9])) {
                winner = true
                user = mov[7]
              }
            }
            
            res.send(200, { "result": winner, "winner": user })
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

/* POST pause game. */
router.post('/:id/pause', function (req, res, next) {
  //Get parameter id
  const { id } = req.params;
  Game.update({
    status: 'Paused'
  }, { where: { id: id } })
    .then(game => {
      console.log(game)
      res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

module.exports = router;