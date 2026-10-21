'use strict';

module.exports = {

 async up(queryInterface, Sequelize) {

  await queryInterface.createTable('Prestamos', {

   id: {

    allowNull: false,

    autoIncrement: true,

    primaryKey: true,

    type: Sequelize.INTEGER

   },

   usuarioId: {

    type: Sequelize.INTEGER,

    references: {

     model: 'Usuarios',

     key: 'id'

    },

    onUpdate: 'CASCADE',

    onDelete: 'CASCADE'

   },

   equipoId: {

    type: Sequelize.INTEGER,

    references: {

     model: 'Equipos',

     key: 'id'

    },

    onUpdate: 'CASCADE',

    onDelete: 'CASCADE'

   },

   fechaPrestamo: {

    type: Sequelize.DATE,

    allowNull: false

   },

   fechaDevolucionPrevista: {

    type: Sequelize.DATE,

    allowNull: false

   },

   fechaDevolucionReal: {

    type: Sequelize.DATE,

    allowNull: true

   },

   estado: {

    type: Sequelize.STRING,

    defaultValue: 'Activo'

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

  await queryInterface.dropTable('Prestamos');

 }

};