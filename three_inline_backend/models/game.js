const Sequelize = require('sequelize');
const { model } = require('../config/database');
const db = require('../config/database');

const game = db.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    date_start: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

module.exports = game;