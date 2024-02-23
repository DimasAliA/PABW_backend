'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      barang_id: {
        type: Sequelize.INTEGER,
        references: { model: 'barang', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      total_harga: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status_pengiriman: {
        type: Sequelize.ENUM('menunggu pembayaran', 'dikirim', 'selesai')
      },
      metode_pengiriman: {
        type: Sequelize.ENUM('diambil sendiri', 'diantar')
      },
      lokasi_pengambilan: {
        type: Sequelize.STRING
      },
      batas_waktu_pengambilan: {
        type: Sequelize.DATE
      },
      alamat_pengiriman: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksi');
  }
};
