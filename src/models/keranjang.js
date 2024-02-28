'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Keranjang extends Model {
    static associate(models) {
      Keranjang.belongsTo(models.User, { foreignKey: 'user_id' });
      Keranjang.belongsTo(models.Barang, { foreignKey: 'barang_id' });
    }
  }
  Keranjang.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    barangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Barang',
        key: 'id',
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
  return Keranjang;
};
