const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Keranjang extends Model {}

Keranjang.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  barang_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'barang',
      key: 'id'
    }
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, {
  sequelize,
  modelName: 'Keranjang',
  tableName: 'keranjang',
  timestamps: false
});

module.exports = Keranjang;
