'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    static associate(models) {
      Kategori.hasMany(models.Barang, { foreignKey: 'kategori_id' });
    }
  }
  Kategori.init({
    nama: DataTypes.STRING,
    potongan_penjualan: { type: DataTypes.DECIMAL(10, 2), fieldName: 'potongan_penjualan' }
  }, {
    sequelize,
    modelName: 'Kategori',
    tableName: 'kategori',
    timestamps: false
  });
  return Kategori;
};
