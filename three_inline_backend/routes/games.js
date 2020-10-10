var express = require('express');
var router = express.Router();

/* GET games listing. */
router.get('/', function(req, res, next) {
  res.send('Lista de juegos');
});

/* GET game reload. */
router.get('/:id', function(req, res, next) {
    const {id} = req.params;
    res.send('Mostrar la información del juego ' + id);
  });

/* POST new game. */
router.post('/', function(req, res, next) {
    res.send('Creación del juego');
});

/* POST new move. */
router.post('/move', function(req, res, next) {
    const {id} = req.params;
    res.send('Movimiento de un usuario');
});

/* POST pause game. */
router.post('/:id', function(req, res, next) {
    const postGameData = req.body;
    res.send('Movimiento de un usuario');
});

module.exports = router;