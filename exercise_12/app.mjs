import express from 'express';
import bodyParser from 'body-parser';
import planetRouter from '../exercise_14/routes/planetRouter.mjs';
import pgp from 'pg-promise';

const app = express();
const PORT = process.env.PORT || 3000;

// Configura la conexión a PostgreSQL
const dbConfig = {
  host: 'postgres',
  port: '3500',
  database: 'base_de_datos',
  user: 'usuario',
  password: 'contraseña',
};

const db = pgp(dbConfig);

app.use(bodyParser.json());

// Configura las rutas
app.use('/api/planets', planetRouter(db)); // Pasa la conexión de PostgreSQL al router

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
