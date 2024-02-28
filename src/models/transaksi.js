'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      Transaksi.belongsTo(models.User, { foreignKey: 'user_id' });
      Transaksi.belongsTo(models.Barang, { foreignKey: 'barang_id' });
    }
  }
  Transaksi.init({
    userId: DataTypes.INTEGER,
    barangId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    totalHarga: DataTypes.DECIMAL(10, 2),
    statusPengiriman: DataTypes.STRING,
    metodePengiriman: DataTypes.STRING,
    lokasiPengambilan: DataTypes.STRING,
    batasWaktuPengambilan: DataTypes.DATE,
    alamatPengiriman: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaksi',
    tableName: 'transaksi',
    timestamps: false
  });
  return Transaksi;
};
