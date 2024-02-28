'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    static associate(models) {
      Barang.belongsTo(models.Kategori, { foreignKey: 'kategori_id' });
    }
  }
  Barang.init({
    nama: DataTypes.STRING,
    harga: DataTypes.DECIMAL(10, 2),
    stok: DataTypes.INTEGER,
    status: DataTypes.STRING,
    kategori_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Barang',
    tableName: 'barang',
    timestamps: false,
  });
  return Barang;
};
