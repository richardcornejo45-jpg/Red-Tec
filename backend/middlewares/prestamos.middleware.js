const { Equipo, Prestamo } = require('../models');
const { Op } = require('sequelize');

const validarPrestamo = async (req, res, next) => {
  try {
    const { usuarioId, equipoId } = req.body;

    // 1. Verificar que el equipo exista y esté disponible
    const equipo = await Equipo.findByPk(equipoId);
    if (!equipo) {
      return res.status(404).json({ error: 'El equipo solicitado no existe.' });
    }
    if (equipo.estado !== 'Disponible') {
      return res.status(400).json({ error: `El equipo no se puede prestar. Estado actual: ${equipo.estado}` });
    }

    // 2. Verificar límite de préstamos del usuario (Máximo 2 activos)
    const prestamosActivos = await Prestamo.count({
      where: {
        usuarioId,
        estado: 'Activo'
      }
    });

    if (prestamosActivos >= 2) {
      return res.status(400).json({ error: 'El usuario ya ha alcanzado el límite máximo de 2 equipos prestados.' });
    }

    // 3. Verificar si el usuario tiene préstamos vencidos (Morosidad)
    const prestamosVencidos = await Prestamo.findOne({
      where: {
        usuarioId,
        estado: 'Activo',
        fechaDevolucionPrevista: {
          [Op.lt]: new Date() // Si la fecha prevista es menor a la fecha de hoy
        }
      }
    });

    if (prestamosVencidos) {
      return res.status(400).json({ error: 'El usuario tiene equipos en mora y no puede realizar nuevos préstamos.' });
    }

    // Si pasa todas las validaciones, continúa hacia el controlador
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error interno al validar el préstamo.' });
  }
};

module.exports = { validarPrestamo };