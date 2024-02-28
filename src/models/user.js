'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaksi, { foreignKey: 'user_id' });
      User.hasMany(models.Keranjang, { foreignKey: 'user_id' });
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    status_keanggotaan: DataTypes.ENUM('aktif', 'tidak aktif', 'bukan anggota'),
    saldo_iuran_wajib: DataTypes.DECIMAL(10, 2),
    saldo_iuran_sukarela: DataTypes.DECIMAL(10, 2),
    saldo_penjualan: DataTypes.DECIMAL(10, 2),
    role: DataTypes.ENUM('pengguna', 'pegawai', 'penitip', 'admin'),
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};
