const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/koperasi_itk');

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
  }
}, {
    timestamps: false,
});

module.exports = User;
