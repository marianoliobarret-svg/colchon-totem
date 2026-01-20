import { calcularPrecio } from "../utils/precio";
import { crearPedido } from "../utils/api";
import React from "react";


export default function StepResumen({
  config,
  precios,
  onPrev,
  onFinish,
}) {
  if (!precios) return <p>Cargando precios...</p>;

  const fecha = new Date().toLocaleDateString("es-AR");
  const detalle = calcularPrecio(config, precios);

  if (!detalle) return null;

  const { base, altura, nucleo, capa, tela, total } =
    detalle;

  return (
    <div className="step resumen-step">
      <h2>Presupuesto Colchón Totem</h2>
      <p>Fecha: {fecha}</p>

      <h3>Resumen de tu colchón</h3>
      <ul>
        <li>Altura: {config.altura} cm</li>
        <li>Núcleo: {config.nucleo}</li>
        <li>Capa: {config.capas?.[0]}</li>
        <li>Tela: {config.tela}</li>
      </ul>

      <h3>Detalle de precio</h3>
      <ul>
        <li>Precio base: ${base.toLocaleString("es-AR")}</li>
        {altura > 0 && (
          <li>
            Altura: ${altura.toLocaleString("es-AR")}
          </li>
        )}
        {nucleo > 0 && (
          <li>
            Núcleo: ${nucleo.toLocaleString("es-AR")}
          </li>
        )}
        {capa > 0 && (
          <li>
            Capa: ${capa.toLocaleString("es-AR")}
          </li>
        )}
        {tela > 0 && (
          <li>
            Tela: ${tela.toLocaleString("es-AR")}
          </li>
        )}
      </ul>

      <h3>
        Total: ${total.toLocaleString("es-AR")}
      </h3>

      <div className="resumen-actions">
        <button onClick={onPrev}>Atrás</button>

        <button
          onClick={async () => {
            await crearPedido({
              producto: config,
              precio: { total },
            });
            alert("Pedido guardado correctamente");
            onFinish();
          }}
        >
          Guardar pedido
        </button>
      </div>
    </div>
  );
}
