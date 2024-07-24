"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("eimportaciones_", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_Franquicia: {
        type: Sequelize.INTEGER,
      },
      franquicia: {
        type: Sequelize.STRING,
      },
      nros_shein: {
        type: Sequelize.STRING,
      },
      detalle_compra: {
        type: Sequelize.STRING,
      },
      tarjeta: {
        type: Sequelize.STRING,
      },
      tracking_1: {
        type: Sequelize.STRING,
      },
      emp_tr_1: {
        type: Sequelize.STRING,
      },
      estado_tracking_1: {
        type: Sequelize.STRING,
      },
      tracking_2: {
        type: Sequelize.STRING,
      },
      emp_tr_2: {
        type: Sequelize.STRING,
      },
      estado_tracking_2: {
        type: Sequelize.STRING,
      },
      tracking_3: {
        type: Sequelize.STRING,
      },
      emp_tr_3: {
        type: Sequelize.STRING,
      },
      estado_tracking_3: {
        type: Sequelize.STRING,
      },
      tracking_4: {
        type: Sequelize.STRING,
      },
      emp_tr_4: {
        type: Sequelize.STRING,
      },
      estado_tracking_4: {
        type: Sequelize.STRING,
      },
      tracking_5: {
        type: Sequelize.STRING,
      },
      emp_tr_5: {
        type: Sequelize.STRING,
      },
      estado_tracking_5: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("eimportaciones_");
  },
};
