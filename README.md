🧠 TOTEM – Admin Panel

Sistema de gestión de pedidos para tótem personalizado.
Incluye backend con autenticación y panel admin estilo dashboard.

🚀 Estado Actual del Proyecto
🔙 Backend (Node + Express)

Deployado en Render.

Autenticación

ADMIN_USER

ADMIN_PASS

ADMIN_TOKEN

Middleware de protección activo

Endpoints

POST /login

GET /pedidos (protegido)

POST /pedidos

PATCH /pedidos/:id (protegido)

DELETE /pedidos/:id (protegido)

GET /precios

POST /precios (protegido)

⚠ Persistencia actual en JSON (filesystem efímero – solo demo).

💻 Frontend (React + Vite)
🔐 Login

Guarda token en localStorage

Protege acceso al panel

📦 Gestión de pedidos

Ver pedidos

Cambiar estado

Eliminar pedido

Orden por fecha

Orden por monto (mayor / menor)

Filtro por estado

📊 Dashboard

Total pedidos

Nuevos

Contactados

Cerrados

Facturación total

🧩 Render dinámico de producto

Altura

Núcleo

Capas (array dinámico)

Tela

🏗 Arquitectura

Frontend (React)
⬇ fetch
Backend (Express)
⬇
JSON (demo storage)

🧠 Conceptos Aplicados

Deploy separado frontend/backend

Variables de entorno

Middleware de autenticación

Manejo de status codes (401 / 403)

CRUD completo

Ordenamiento dinámico

Limpieza de datos monetarios

Render dinámico de arrays

Debug estructural JSX

UI estilo SaaS básico

🔜 Roadmap Próximos Pasos
Nivel Seguridad

 Auto-logout si no hay token

 Expiración de sesión

 Refresh token (futuro)

Nivel Producto

 Sidebar layout tipo SaaS

 Buscador por cliente

 Confirmación visual al cambiar estado

 Modal para detalles del pedido

 Indicadores de tendencia (↑ ↓)

Nivel Escalabilidad

 Migrar JSON a base de datos (Mongo / Postgres)

 Paginación en pedidos

 Filtros combinados

 Roles de usuario

Nivel Comercial

 UI completamente SaaS

 Versión demo pública

 Landing explicativa del sistema

⚠ Recordatorios Importantes

Siempre hacer git push frontend y backend por separado.

Si aparece 401 → falta Authorization header.

Si aparece 403 → token inválido.

Si desaparecen datos → Render usa filesystem efímero.

Hooks (useState, useEffect) solo dentro del componente.

🎯 Decisión Estratégica

Este proyecto puede evolucionar hacia:

Proyecto de aprendizaje

Demo comercial

Producto real escalable

Definir esto cambia las decisiones técnicas futuras.