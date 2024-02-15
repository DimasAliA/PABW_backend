const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaksi extends Model {}

Transaksi.init({
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
    allowNull: false
  },
  total_harga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status_pengiriman: {
    type: DataTypes.ENUM('menunggu pegawai', 'akan dikirim', 'sudah dibooking', 'diterima pembeli', 'transaksi dibatalkan'),
    defaultValue: 'menunggu pegawai',
    allowNull: false
  },
  metode_pengiriman: {
    type: DataTypes.ENUM('diambil sendiri', 'diantar ke'),
    allowNull: false
  },
  lokasi_pengambilan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  batas_waktu_pengambilan: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  alamat_pengiriman: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Transaksi',
  tableName: 'transaksi',
  timestamps: false,
});

module.exports = Transaksi;
