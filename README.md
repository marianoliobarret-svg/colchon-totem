🛏️ Colchón Totem – Configurador de Colchones

Aplicación web para configurar colchones personalizados, calcular precios dinámicos y gestionar pedidos desde un panel de administración.

Proyecto full-stack con frontend en React + Vite y backend en Node + Express, deployado en producción.

📂 Estructura del proyecto
colchon-totem/
├── frontend/               # Frontend Vite + React
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── dist/               # Build de producción
│
├── backend/                # Backend Node + Express
│   ├── server.js
│   ├── precios.json
│   ├── pedidos.json
│   ├── package.json
│   └── .env
│
└── README.md

🚀 Tecnologías usadas
Frontend

React

Vite

CSS puro (estilo deco / minimal)

Fetch API

Backend

Node.js

Express

CORS

Persistencia en archivos JSON

Deploy

Frontend: Vercel

Backend: Render

⚙️ Cómo correr el proyecto en local
1️⃣ Backend
cd backend
npm install
npm run dev


El backend corre en:

http://localhost:3001


Endpoints importantes:

/precios

/pedidos

/login

2️⃣ Frontend
cd frontend
npm install
npm run dev


El frontend corre en:

http://localhost:5173

🌐 Variables de entorno
Backend (backend/.env)
PORT=3001

Frontend (Vercel o local)
VITE_API_URL=https://TU_BACKEND.onrender.com


⚠️ IMPORTANTE

Cambiar variables en Vercel requiere redeploy

Si queda en “Cargando precios…”, revisar esta variable primero

🧠 Problemas comunes y soluciones
🔴 Página en blanco en producción

Error:

React is not defined


Solución:
Agregar en TODOS los archivos con JSX:

import React from "react";

🔴 Vercel falla con exit code 126

Causa: permisos al ejecutar Vite

Solución definitiva (en Vercel):

Build Command

node ./node_modules/vite/bin/vite.js build

🔴 “Unexpected token <” o error JSON

Causa: frontend llamando mal al backend

Solución:

Revisar VITE_API_URL

Verificar que /precios devuelva JSON

🔴 Backend tarda o no responde

Causa: Render (plan free) duerme el servicio

Solución:

Abrir manualmente /precios

Esperar el primer request

🧑‍💼 Panel de administración

Funcionalidades:

Ver pedidos (último primero)

Cambiar estado del pedido

Gestionar precios:

base

altura

núcleo

capas

telas

Credenciales (hardcodeadas):

user: admin
pass: 1234

🛏️ Configurador de colchón

Flujo:

Welcome screen (nombre del cliente)

Altura

Núcleo

Capas

Tela

Resumen

Guardar pedido

Incluye:

Preview visual del colchón por capas (imágenes superpuestas)

Precio dinámico

Reiniciar armado

Volver al inicio

🔄 Deploy
Frontend (Vercel)

Root Directory: frontend

Install Command: npm install

Build Command:

node ./node_modules/vite/bin/vite.js build


Output Directory: dist

Backend (Render)

Root Directory: backend

Start Command:

npm start

🧭 Nota personal (importante)

Este proyecto tuvo:

separación frontend / backend

deploy real

debugging de producción

problemas reales de permisos, envs y build

👉 No borrar ni reestructurar sin revisar este README primero.

📌 Próximos posibles pasos

Autenticación real (JWT)

Base de datos (Mongo / Postgres)

Historial de precios

Exportar presupuesto en PDF

Roles de usuario

Animaciones más avanzadas

❤️ Estado actual

✅ Producción funcionando
✅ Deploy completo
✅ Proyecto estable
✅ Listo para iterar y mejorar

Si querés, en el próximo mensaje podemos:

pulir texto del README

hacerlo más “presentable” para cliente

o volver a mejoras de backend con calma y sin estrés

De verdad: excelente trabajo 💪