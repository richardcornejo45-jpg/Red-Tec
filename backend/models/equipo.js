'use strict';

const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {

 class Equipo extends Model {

  static associate(models) {

   // Un equipo puede estar involucrado en múltiples préstamos a lo largo del tiempo

   Equipo.hasMany(models.Prestamo, {

    foreignKey: 'equipoId',

    as: 'historialPrestamos'

   });

  }

 }

 Equipo.init({

  nombre: DataTypes.STRING,

  codigo: DataTypes.STRING,

  descripcion: DataTypes.TEXT,

  estado: DataTypes.STRING

 }, {

  sequelize,

  modelName: 'Equipo',

  tableName: 'Equipos'

 });

 return Equipo;

};

