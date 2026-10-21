const { Prestamo, Equipo, Usuario } = require('../models');

// Listar todos los préstamos con sus relaciones
const listarPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      include: [
        { model: Usuario, as: 'usuario', attributes: ['nombre', 'email'] },
        { model: Equipo, as: 'equipo', attributes: ['nombre', 'codigo'] }
      ]
    });
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los préstamos' });
  }
};

// Registrar un nuevo préstamo
const crearPrestamo = async (req, res) => {
  try {
    const { usuarioId, equipoId, fechaDevolucionPrevista } = req.body;

    // 1. Crear el registro del préstamo
    const nuevoPrestamo = await Prestamo.create({
      usuarioId,
      equipoId,
      fechaPrestamo: new Date(), // Toma la fecha y hora actual
      fechaDevolucionPrevista,
      estado: 'Activo'
    });

    // 2. Cambiar el estado del equipo a "Prestado"
    await Equipo.update(
      { estado: 'Prestado' },
      { where: { id: equipoId } }
    );

    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el préstamo' });
  }
};

const devolverPrestamo = async (req, res) => {
  try {
    const { id } = req.params; // ID del préstamo que viene en la URL

    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });
    if (prestamo.estado === 'Finalizado') return res.status(400).json({ error: 'Este equipo ya fue devuelto.' });

    // 1. Marcar el préstamo como finalizado
    await prestamo.update({ estado: 'Finalizado' });

    // 2. Liberar el equipo para que vuelva a estar Disponible
    await Equipo.update(
      { estado: 'Disponible' },
      { where: { id: prestamo.equipoId } }
    );

    res.status(200).json({ mensaje: 'Equipo devuelto con éxito. Inventario liberado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la devolución' });
  }
};

module.exports = { listarPrestamos, crearPrestamo, devolverPrestamo };