require('dotenv').config();

const express = require('express');

const { sequelize } = require('./models'); // Importa la conexión de Sequelize



const app = express();

const PORT = process.env.PORT || 3000;



// Middlewares básicos

app.use(express.json()); // Permite a la API entender formato JSON



// Prueba de conexión a la Base de Datos y arranque del servidor

app.listen(PORT, async () => {

 console.log(`Servidor corriendo en http://localhost:${PORT}`);

 try {

  // Autenticamos que Sequelize logre conectar con MySQL

  await sequelize.authenticate();

  console.log('Conexión a la base de datos MySQL establecida con éxito.');

 } catch (error) {

  console.error('Error al conectar con la base de datos:', error);

 }

});