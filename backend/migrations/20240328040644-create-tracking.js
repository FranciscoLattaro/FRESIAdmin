"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tracking_", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      emp_trans: {
        type: Sequelize.STRING,
      },
      tracking_ext: {
        type: Sequelize.STRING,
      },
      tracking_unique: {
        type: Sequelize.STRING,
      },
      id_Franquicia: {
        type: Sequelize.INTEGER,
      },
      id_EImportacion: {
        type: Sequelize.INTEGER,
      },
      id_estado: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tracking_");
  },
};
