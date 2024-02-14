const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_keanggotaan: {
    type: DataTypes.ENUM('aktif', 'tidak aktif', 'bukan anggota'),
    allowNull: false
  },
  saldo_iuran_wajib: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  saldo_iuran_sukarela: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  saldo_penjualan: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  role: {
    type: DataTypes.ENUM('pengguna', 'pegawai', 'penitip', 'admin'),
    allowNull: false,
    defaultValue: 'pengguna'
  },
}, {
    timestamps: false,
});

module.exports = User;
