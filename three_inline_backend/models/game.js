const Sequelize = require('sequelize');
const { model } = require('../config/database');
const db = require('../config/database');

const game = db.define('game', {
    id: {
        type: Sequelize.INTEGER
    },
    date_start: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.STRING
    }
})

module.exports = game;