const { Sequelize } = require('sequelize');

module.exports = new Sequelize('three_inline', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});