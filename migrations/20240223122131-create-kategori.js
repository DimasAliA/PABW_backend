'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kategori', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      potongan_penjualan: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kategori');
  }
};
