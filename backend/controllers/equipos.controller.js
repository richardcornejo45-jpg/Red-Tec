const { Equipo } = require('../models');

// Listar todo el inventario
const listarEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.findAll();
    res.status(200).json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
};

// Agregar un nuevo equipo
const crearEquipo = async (req, res) => {
  try {
    const { nombre, codigo, descripcion } = req.body;
    const nuevoEquipo = await Equipo.create({ nombre, codigo, descripcion });
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el equipo' });
  }
};

module.exports = { listarEquipos, crearEquipo };