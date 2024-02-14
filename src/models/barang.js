const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barang = sequelize.define('Barang', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('stok kosong', 'stok tersedia'),
    allowNull: false,
    defaultValue: 'stok kosong'
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'kategori',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'barang'
});

module.exports = Barang;
