import express from 'express';
import userRoutes from './routes/user.routes.js'
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

import './connection/dbconfig.js';
// Configurar CORS para permitir solicitudes desde cualquier origen (*)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
app.use('/api', userRoutes);
app.use(express.json());
// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor API REST2 en ejecución en http://localhost:${port}`);
});
