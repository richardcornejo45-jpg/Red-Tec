'use strict';

const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {

 class Usuario extends Model {

  static associate(models) {

   // Un usuario puede tener múltiples préstamos

   Usuario.hasMany(models.Prestamo, {

    foreignKey: 'usuarioId',

    as: 'prestamos'

   });

  }

 }

 Usuario.init({

  nombre: DataTypes.STRING,

  email: DataTypes.STRING,

  passwordHash: DataTypes.STRING,

  rol: DataTypes.STRING

 }, {

  sequelize,

  modelName: 'Usuario',

  tableName: 'Usuarios'

 });

 return Usuario;

};