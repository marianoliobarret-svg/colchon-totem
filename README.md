🧠 TOTEM – Admin Panel Progress
📌 Estado actual del proyecto
✅ Backend (Node + Express)

Deployado en Render

Autenticación con:

ADMIN_USER

ADMIN_PASS

ADMIN_TOKEN

Middleware de protección funcionando

Endpoints:

POST /login

GET /pedidos (protegido)

POST /pedidos

PATCH /pedidos/:id (protegido)

DELETE /pedidos/:id (protegido)

GET /precios

POST /precios (protegido)

⚠️ Persistencia con JSON (filesystem efímero en Render – solo demo)

✅ Frontend (React + Vite)
🔐 Login

Guarda token en localStorage

Protege acceso al panel

📦 Gestión de pedidos

Ver pedidos

Cambiar estado (nuevo / contactado / cerrado)

Eliminar pedido

Ordenados por fecha descendente

📊 Estadísticas implementadas

Total pedidos

Nuevos

Contactados

Cerrados

Facturación total

🎯 Filtro por estado

Todos

Nuevos

Contactados

Cerrados

🚀 Próximo paso (Roadmap)

Seguimos con:

3️⃣ Ordenar por monto

Objetivo:

Permitir ordenar pedidos por:

Mayor monto

Menor monto

Mantener orden dinámico en frontend

Después:
4️⃣ Auto-logout si no hay token
5️⃣ Mejorar UI del admin (look SaaS)

🧩 Recordatorios importantes

Siempre git push frontend y backend por separado.

Si aparece 401 → falta header Authorization.

Si aparece 403 → token inválido o no guardado.

Hooks (useState, useEffect) solo dentro del componente.

Si desaparecen datos → es por filesystem efímero de Render.

🏗 Arquitectura actual

Frontend (React)
⬇ fetch
Backend (Express)
⬇
JSON file (demo storage)

🧠 Conceptos que ya dominás

Deploy separado frontend/backend

Variables de entorno en producción

Middleware de autenticación

Status codes 401 vs 403

CRUD real

Debug de build (Rollup/Vite)

Git flow básico

Cuando vuelvas mañana:

👉 Abrí PanelAdmin.jsx
👉 Vamos directo a implementar orden por monto