require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models'); 
// Importar rutas (agrégalo debajo de las otras)
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');


// Importar rutas (Solo deben estar declaradas una vez)
const equiposRoutes = require('./routes/equipos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 


// Justo debajo de const app = express();
app.use(cors());

// Definir los endpoints base de la API
app.use('/api/equipos', equiposRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/auth', authRoutes);
// ... (Aquí continúa tu app.listen)

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos MySQL establecida con éxito.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
});
