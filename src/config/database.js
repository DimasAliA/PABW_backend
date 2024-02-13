const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('koperasi_itk', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
