import React from "react";

import { calcularPrecio } from "../utils/precio";

export default function PrecioPreview({ config, precios }) {
  if (!precios) return null;

  const detalle = calcularPrecio(config, precios);

  // 🔒 BLINDAJE TOTAL
  if (!detalle) return null;

  const { total } = detalle;

  return (
    <div className="precio-preview">
      <h3>Total estimado</h3>
      <p>
        ${total.toLocaleString("es-AR")}
      </p>
    </div>
  );
}

