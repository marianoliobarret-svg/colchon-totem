const API_URL = "https://colchon-totem-backend.onrender.com";


/* ======================
   AUTH
====================== */
export async function login(user, pass) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
  });

  if (!res.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return res.json();
}

/* ======================
   PRECIOS
====================== */

export async function obtenerPrecios() {
  const res = await fetch(`${API_URL}/precios`);
  if (!res.ok) throw new Error("Error al obtener precios");
  return res.json();
}


export async function guardarPrecios(precios) {
  const res = await fetch(`${API_URL}/precios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(precios),
  });

  if (!res.ok) throw new Error("Error al guardar precios");
  return res.json();
}

/* ======================
   PEDIDOS
====================== */
export async function crearPedido(pedido) {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) throw new Error("Error al crear pedido");
  return res.json();
}

export async function obtenerPedidos() {
  const res = await fetch(`${API_URL}/pedidos`);
  if (!res.ok) throw new Error("Error al obtener pedidos");
  return res.json();
}

export async function actualizarEstadoPedido(id, estado) {
  const res = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  return res.json();
}
export function isAuth() {
  return Boolean(localStorage.getItem("token"));
}
export function logout() {
  localStorage.removeItem("token");
}


