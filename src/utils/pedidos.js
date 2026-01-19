export function guardarPedido(pedido) {
  const pedidosGuardados =
    JSON.parse(localStorage.getItem("pedidos")) || [];

  pedidosGuardados.push(pedido);

  localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidosGuardados)
  );

  return pedido;
}

export function obtenerPedidos() {
  return JSON.parse(localStorage.getItem("pedidos")) || [];
}
