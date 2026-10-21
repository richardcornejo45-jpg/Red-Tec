'use strict';

const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {

 class Prestamo extends Model {

  static associate(models) {

   // Un préstamo pertenece a un único Usuario y a un único Equipo

   Prestamo.belongsTo(models.Usuario, {

    foreignKey: 'usuarioId',

    as: 'usuario'

   });

   Prestamo.belongsTo(models.Equipo, {

    foreignKey: 'equipoId',

    as: 'equipo'

   });

  }

 }

 Prestamo.init({

  usuarioId: DataTypes.INTEGER,

  equipoId: DataTypes.INTEGER,

  fechaPrestamo: DataTypes.DATE,

  fechaDevolucionPrevista: DataTypes.DATE,

  fechaDevolucionReal: DataTypes.DATE,

  estado: DataTypes.STRING

 }, {

  sequelize,

  modelName: 'Prestamo',

  tableName: 'Prestamos'

 });

 return Prestamo;

};