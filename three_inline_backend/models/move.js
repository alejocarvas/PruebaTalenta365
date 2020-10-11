const Sequelize = require('sequelize');
const { model } = require('../config/database');
const db = require('../config/database');

const move = db.define('move', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    game_id: {
        type: Sequelize.INTEGER
    },
    obj: {
        type: Sequelize.JSON
    }
}, {
    timestamps: false
})

module.exports = move;