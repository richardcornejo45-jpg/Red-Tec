'use strict';



module.exports = {

 async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('Equipos', [

   {

    nombre: 'Laptop Lenovo ThinkPad',

    codigo: 'LT-001',

    descripcion: 'Equipo repotenciado para desarrollo y pruebas de estrés térmico',

    estado: 'Disponible',

    createdAt: new Date(),

    updatedAt: new Date()

   },

   {

    nombre: 'Impresora Epson EcoTank',

    codigo: 'IMP-001',

    descripcion: 'Impresora a color, rodillos y caja de mantenimiento T04D1 recién cambiados',

    estado: 'Disponible',

    createdAt: new Date(),

    updatedAt: new Date()

   },

   {

    nombre: 'Impresora multifuncional Canon PIXMA',

    codigo: 'IMP-002',

    descripcion: 'Equipo en revisión de sensores ópticos',

    estado: 'En mantenimiento',

    createdAt: new Date(),

    updatedAt: new Date()

   }

  ], {});

 },



 async down (queryInterface, Sequelize) {

  // Borra todos los registros insertados en caso de deshacer el seed

  await queryInterface.bulkDelete('Equipos', null, {});

 }

};