'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('franquicias_', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_completo: {
        type: Sequelize.STRING
      },
      cedula_identidad: {
        type: Sequelize.STRING
      },
      fecha_nac: {
        type: Sequelize.STRING
      },
      email_fr: {
        type: Sequelize.STRING
      },
      pass_fr: {
        type: Sequelize.STRING
      },
      suite_fr: {
        type: Sequelize.STRING
      },
      activa: {
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
    await queryInterface.dropTable('franquicias_');
  }
};