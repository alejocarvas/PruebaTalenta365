const Sequelize = require('sequelize');
const { model } = require('../config/database');
const db = require('../config/database');

const game = db.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    date_start: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    status: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

module.exports = game;