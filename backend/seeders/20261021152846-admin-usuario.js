'use strict';

const bcrypt = require('bcrypt');



module.exports = {

 async up (queryInterface, Sequelize) {

  // Encriptamos la contraseña "admin123" antes de insertarla

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash('admin123', salt);



  await queryInterface.bulkInsert('Usuarios', [{

   nombre: 'Administrador RedTec',

   email: 'admin@redtec.com',

   passwordHash: hashedPassword,

   rol: 'Administrador',

   createdAt: new Date(),

   updatedAt: new Date()

  }], {});

 },



 async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('Usuarios', { email: 'admin@redtec.com' }, {});

 }

};