# Taller IV — Programación Web

Solución con Vite + React + Reactstrap en el frontend y una API REST en Express.

## Requisitos

Node.js y npm instalados.

## Instalación

Desde la raíz del proyecto:

```bash
npm run install:all
```

## Ejecución

```bash
npm run dev
```

Abre la URL que muestra Vite (normalmente http://localhost:5173). El frontend usa el proxy de Vite para llamar a la API Express en el puerto 3000.

## Endpoints

- `GET /api/health`: estado de la API y mensaje de funcionamiento.
- `GET /api/info`: integrantes con nombre, edad, carrera y cantidad de materias aprobadas.

También puedes iniciar cada parte por separado con `npm run dev --prefix server` y `npm run dev --prefix client`.

## Datos del equipo

Edita el arreglo `integrantes` en `server/index.js` y sustituye los valores de ejemplo por los nombres y datos reales del grupo antes de entregar.
