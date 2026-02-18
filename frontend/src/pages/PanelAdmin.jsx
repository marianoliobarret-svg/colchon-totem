import React from "react";
import { eliminarPedido } from "../utils/api";
import { useEffect, useState } from "react";
import { obtenerPedidos, actualizarEstadoPedido,}
from "../utils/api";
import PrecioAdmin from "../components/PrecioAdmin";

const ESTADOS = ["nuevo", "contactado", "cerrado"];

export default function PanelAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");

const [ordenMonto, setOrdenMonto] = useState("fecha");
  
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

    const limpiarNumero = (valor) => {
      if (!valor) return 0;

      return parseFloat(
        valor
          .toString()
          .replace(/\./g, "")   // quita puntos de miles
          .replace(",", ".")    // convierte coma decimal a punto
          .replace(/[^0-9.-]+/g, "") // quita $ u otros símbolos
          ) || 0;
        };

    const pedidosProcesados = [...pedidos]
      .filter((pedido) => {
        if (filtro === "todos") return true;
        return pedido.estado === filtro;
      })
      .sort((a, b) => {
        const totalA = limpiarNumero(a.precio?.total);
        const totalB = limpiarNumero(b.precio?.total);

        if (ordenMonto === "mayor") {
          return totalB - totalA;
        }

        if (ordenMonto === "menor") {
          return totalA - totalB;
        }

        return new Date(b.fecha) - new Date(a.fecha);
      });


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
          <h2>Total pedidos</h2>
          <p>{totalPedidos}</p>
        </div>

        <div className="stat-card">
          <h2>Nuevos</h2>
          <p>{nuevos}</p>
        </div>

        <div className="stat-card">
          <h2>Contactados</h2>
          <p>{contactados}</p>
        </div>

        <div className="stat-card">
          <h2>Cerrados</h2>
          <p>{cerrados}</p>
        </div>

        <div className="stat-card">
          <h2>Facturación total</h2>
          <p>
            ${facturacionTotal.toLocaleString("es-AR")}
          </p>
        </div>
      </div>


      <div className="admin-grid">
        {/* PEDIDOS */}
        <div className="admin-column">
          <h2>Gestión de pedidos</h2>

            <h3>Filtros</h3>
            <div className="filtros">
            <button className={`btn-filter ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}>
              Todos
            </button>

            <button className={`btn-filter ${filtro === "nuevo" ? "active" : ""}`}
            onClick={() => setFiltro("nuevo")}>
              Nuevos
            </button>

            <button className={`btn-filter ${filtro === "contactado" ? "active" : ""}`}
            onClick={() => setFiltro("contactado")}>
              Contactados
            </button>

            <button className={`btn-filter ${filtro === "cerrado" ? "active" : ""}`}
            onClick={() => setFiltro("cerrado")}>
              Cerrados
            </button>
            </div>

              <select
                value={ordenMonto}
                onChange={(e) => setOrdenMonto(e.target.value)}>
                  <option value="fecha">Más recientes</option>
                  <option value="mayor">Mayor monto</option>
                  <option value="menor">Menor monto</option>
              </select>
          </div>

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
             {pedidosProcesados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      {new Date(
                        pedido.fecha
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {pedido.producto?.cliente || pedido.cliente || "-"}
                    </td>
                   <td>
                    {[
                      `${pedido.producto.altura}cm`,
                      pedido.producto.nucleo,
                      ...(pedido.producto.capas || []),
                      pedido.producto.tela
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                    </td>
                    <td>
                      $
                      {pedido.precio.total.toLocaleString(
                        "es-AR"
                      )}
                    </td>

                    <td>
                      <div className={`estado-badge estado-${pedido.estado}`}>
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
                      </div>
                    </td>
                     <td>
                  <button
                    className="btn-delete"
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
  );
}

