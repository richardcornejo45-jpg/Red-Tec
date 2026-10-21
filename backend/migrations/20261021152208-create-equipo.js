'use strict';

module.exports = {

 async up(queryInterface, Sequelize) {

  await queryInterface.createTable('Equipos', {

   id: {

    allowNull: false,

    autoIncrement: true,

    primaryKey: true,

    type: Sequelize.INTEGER

   },

   nombre: {

    type: Sequelize.STRING,

    allowNull: false

   },

   codigo: {

    type: Sequelize.STRING,

    allowNull: false,

    unique: true

   },

   descripcion: {

    type: Sequelize.TEXT

   },

   estado: {

    type: Sequelize.STRING,

    defaultValue: 'Disponible'

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

  await queryInterface.dropTable('Equipos');

 }

};