export function generarMensajeWhatsApp(config, precioData) {
  const { total, detalle } = precioData;

  let mensaje = `🛏️ *Presupuesto Colchón Totem*%0A%0A`;

  mensaje += `• Altura: ${config.altura} cm%0A`;
  mensaje += `• Núcleo: ${config.nucleo}%0A`;
  mensaje += `• Capa: ${config.capas[0] ?? "-"}%0A`;
  mensaje += `• Tela: ${config.tela}%0A%0A`;

  mensaje += `💰 *Detalle de precio*%0A`;

  detalle.forEach((item) => {
    mensaje += `- ${item.label}: $${item.valor.toLocaleString(
      "es-AR"
    )}%0A`;
  });

  mensaje += `%0A*Total: $${total.toLocaleString("es-AR")}*%0A%0A`;
  mensaje += `Quiero avanzar con este colchón 🙌`;

  return `https://wa.me/?text=${mensaje}`;
}
