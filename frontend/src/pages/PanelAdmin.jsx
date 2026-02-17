import React from "react";
import { eliminarPedido } from "../utils/api";

import { useEffect, useState } from "react";
import {
  obtenerPedidos,
  actualizarEstadoPedido,
} from "../utils/api";
import PrecioAdmin from "../components/PrecioAdmin";

const ESTADOS = ["nuevo", "contactado", "cerrado"];

export default function PanelAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await obtenerPedidos();
      setPedidos(data);
    } catch {
      alert("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      await actualizarEstadoPedido(id, estado);
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado } : p
        )
      );
    } catch {
      alert("Error al actualizar estado");
    }
  };

    const borrarPedido = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este pedido?")) return;

    try {
      await eliminarPedido(id);
      setPedidos(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Error al eliminar pedido");
    }
};


  if (loading) return <p>Cargando panel...</p>;

    const totalPedidos = pedidos.length;

    const nuevos = pedidos.filter(p => p.estado === "nuevo").length;
    const contactados = pedidos.filter(p => p.estado === "contactado").length;
    const cerrados = pedidos.filter(p => p.estado === "cerrado").length;

    const facturacionTotal = pedidos.reduce(
      (acc, p) => acc + (p.precio?.total || 0),
      0
    );


  return (
    <div className="admin-container">
      <h1>Panel de administración</h1>

        <div className="stats">
        <div className="stat-card">
          <h3>Total pedidos</h3>
          <p>{totalPedidos}</p>
        </div>

        <div className="stat-card">
          <h3>Nuevos</h3>
          <p>{nuevos}</p>
        </div>

        <div className="stat-card">
          <h3>Contactados</h3>
          <p>{contactados}</p>
        </div>

        <div className="stat-card">
          <h3>Cerrados</h3>
          <p>{cerrados}</p>
        </div>

        <div className="stat-card">
          <h3>Facturación total</h3>
          <p>
            ${facturacionTotal.toLocaleString("es-AR")}
          </p>
        </div>
      </div>


      <div className="admin-grid">
        {/* PEDIDOS */}
        <div className="admin-column">
          <h2>Gestión de pedidos</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {[...pedidos]
                .sort(
                  (a, b) =>
                    new Date(b.fecha) -
                    new Date(a.fecha)
                )
                .map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      {new Date(
                        pedido.fecha
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {pedido.producto?.cliente ||
                        "-"}
                    </td>

                    <td>
                      {pedido.producto.altura}cm ·{" "}
                      {pedido.producto.nucleo} ·{" "}
                      {pedido.producto.capa} ·{" "}
                      {pedido.producto.tela}
                    </td>

                    <td>
                      $
                      {pedido.precio.total.toLocaleString(
                        "es-AR"
                      )}
                    </td>

                    <td>
                      <select
                        value={pedido.estado}
                        onChange={(e) =>
                          cambiarEstado(
                            pedido.id,
                            e.target.value
                          )
                        }
                      >
                        {ESTADOS.map((estado) => (
                          <option
                            key={estado}
                            value={estado}
                          >
                            {estado}
                          </option>
                        ))}
                      </select>
                    </td>
                     <td>
                  <button
                    onClick={() => borrarPedido(pedido.id)}
                  >
                    Eliminar
                  </button>
                </td>
                  </tr>
                ))}
               
            </tbody>
          </table>
        </div>

        {/* PRECIOS */}
        <div className="admin-column">
          <PrecioAdmin />
        </div>
      </div>
    </div>
  );
}

