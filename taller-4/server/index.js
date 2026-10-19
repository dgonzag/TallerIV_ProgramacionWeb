import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'El API está funcionando correctamente.' });
});

app.get('/api/info', (_req, res) => {
  res.json({
    message: 'Información académica del equipo.',
    integrantes: [
      { nombre: 'Juan Manuel Flores Crisóstomo', edad: 21, carrera: 'Ingeniería informática', materiasAprobadas: 12 },
        { nombre: 'Diego ALejandro González García', edad: 19, carrera: 'Ingeniería informática', materiasAprobadas: 12 },
    ],
  });
});

app.listen(port, () => console.log(`API REST lista en http://localhost:${port}`));
