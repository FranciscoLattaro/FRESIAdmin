'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bimportaciones_', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_shein: {
        type: Sequelize.STRING
      },
      pass_shein: {
        type: Sequelize.STRING
      },
      email_google: {
        type: Sequelize.STRING
      },
      pass_google: {
        type: Sequelize.STRING
      },
      nro_shein: {
        type: Sequelize.STRING
      },
      procesado: {
        type: Sequelize.BOOLEAN
      },
      id_EImportacion: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('bimportaciones_');
  }
};