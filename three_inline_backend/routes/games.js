var express = require('express');
const { use } = require('.');
const { move } = require('../app');
var router = express.Router();
const db = require('../config/database');
const Game = require('../models/game');
const Move = require('../models/move');

/* GET games listing. */
router.get('/', function (req, res, next) {
  //Get all games
  Game.findAll()
    .then((games) => {
      console.log(games);
      res.send(games);
    })
    .catch((err) => console.log(err));
});

/* GET game by id to reload. */
router.get('/:id', function (req, res, next) {
  //Get parameter id
  const { id } = req.params;
  //Get game by id
  Game.findAll({
    where: {
      id: id,
    },
  })
    .then((game) => {
      console.log(game);
      //Check if found game
      if (game.length > 0) {
        //Get the game moves
        Move.findAll({
          where: {
            game_id: game[0].id,
          },
        })
          .then((move) => {
            var moves = {};
            if (move.length > 0) {
              moves = move[0].obj;
            }
            res.send({
              id: game[0].id,
              date_start: game[0].date_start,
              status: game[0].status,
              moves: moves,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => console.log(err));
});

/* POST new game. */
router.post('/', function (req, res, next) {
  //Change status all games open and not finished
  Game.update(
    {
      status: 'Pausado',
    },
    { where: { status: 'Iniciado' } },
  )
    .then((games) => {
      console.log(games);
      //Create a new game and return new object
      Game.create({
        id: '',
        date_start: new Date(),
        status: 'Iniciado',
      })
        .then((game) => {
          console.log(game);
          //Create a new move in a game
          Move.create({
            id: '',
            game_id: game.id,
            obj: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
          })
            .then((move) => {
              console.log(move);
              res.send(game);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/* POST new move in a game by id. */
router.post('/move', function (req, res, next) {
  //Get the body request
  const postGameData = req.body;
  //Get the game moves
  Move.findAll({
    where: {
      game_id: postGameData.game_id,
    },
  })
    .then((move) => {
      console.log(move);
      //Check if have moves
      if (move.length > 0) {
        //Update the user in the cell selected
        move[0].obj[postGameData.cell] = postGameData.user;
        //Update the move
        Move.update(
          {
            obj: move[0].obj,
          },
          { where: { id: move[0].id } },
        )
          .then((moveUpdate) => {
            console.log(moveUpdate);
            var winner = false;
            var user = postGameData.user;
            var mov = move[0].obj;
            if (mov[1] != '') {
              if (
                (mov[1] == mov[2] && mov[1] == mov[3]) ||
                (mov[1] == mov[4] && mov[1] == mov[7]) ||
                (mov[1] == mov[5] && mov[1] == mov[9])
              ) {
                winner = true;
                user = mov[1];
              }
            }
            if (mov[2] != '' && !winner) {
              if (
                (mov[2] == mov[1] && mov[2] == mov[3]) ||
                (mov[2] == mov[5] && mov[2] == mov[8])
              ) {
                winner = true;
                user = mov[2];
              }
            }
            if (mov[3] != '' && !winner) {
              if (
                (mov[3] == mov[2] && mov[3] == mov[1]) ||
                (mov[3] == mov[6] && mov[3] == mov[9]) ||
                (mov[3] == mov[5] && mov[3] == mov[7])
              ) {
                winner = true;
                user = mov[3];
              }
            }
            if (mov[4] != '' && !winner) {
              if (mov[4] == mov[5] && mov[4] == mov[6]) {
                winner = true;
                user = mov[4];
              }
            }
            if (mov[7] != '' && !winner) {
              if (mov[7] == mov[8] && mov[7] == mov[9]) {
                winner = true;
                user = mov[7];
              }
            }
            if (!winner && !Object.values(mov).some((x) => x == '')) {
              winner = true;
              user = 'Empate';
            }
            res.status(200).send({ result: winner, winner: user });
          })
          .catch((err) => console.log(err));
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => console.log(err));
});

/* POST pause game. */
router.post('/:id/pause', function (req, res, next) {
  //Get parameter id
  const { id } = req.params;
  Game.update(
    {
      status: 'Pausado',
    },
    { where: { id: id } },
  )
    .then((game) => {
      console.log(game);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
});

/* POST finish game. */
router.post('/winner', function (req, res, next) {
  //Get the body request
  const postGameData = req.body;
  //Update game
  Game.update(
    {
      status: postGameData.status,
    },
    { where: { id: postGameData.game_id } },
  )
    .then((game) => {
      console.log(game);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
