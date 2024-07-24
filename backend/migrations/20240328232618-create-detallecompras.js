'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detallecompras_', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      talla: {
        type: Sequelize.STRING
      },
      nro_shein: {
        type: Sequelize.STRING
      },
      pedido_shopify: {
        type: Sequelize.STRING
      },
      id_EstadoTraking: {
        type: Sequelize.INTEGER
      },
      id_EImpotacion: {
        type: Sequelize.INTEGER
      },
      comprado: {
        type: Sequelize.BOOLEAN
      },
      reembolsado: {
        type: Sequelize.BOOLEAN
      },
      comprado2: {
        type: Sequelize.BOOLEAN
      },
      reembolsado2: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detallecompras_');
  }
};