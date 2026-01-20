import React from "react";

import { useEffect, useState } from "react";
import { obtenerPrecios, guardarPrecios } from "../utils/api";

const DEFAULT_PRECIOS = {
  base: 0,
  altura: { "20": 0, "25": 0, "30": 0 },
  nucleo: { espuma: 0, resortes: 0 },
  capas: { memory: 0, latex: 0 },
  telas: { algodon: 0, premium: 0 },
};

export default function PrecioAdmin() {
  const [precios, setPrecios] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await obtenerPrecios();

    // 🔒 BLINDAJE TOTAL
    const normalizado = {
      ...DEFAULT_PRECIOS,
      ...data,
      altura: { ...DEFAULT_PRECIOS.altura, ...data?.altura },
      nucleo: { ...DEFAULT_PRECIOS.nucleo, ...data?.nucleo },
      capas: { ...DEFAULT_PRECIOS.capas, ...data?.capas },
      telas: { ...DEFAULT_PRECIOS.telas, ...data?.telas },
    };

    setPrecios(normalizado);
    setDraft(normalizado);
  };

  const actualizar = (grupo, key, valor) => {
    setDraft((prev) => ({
      ...prev,
      [grupo]: {
        ...prev[grupo],
        [key]: Number(valor),
      },
    }));
  };

  const guardar = async () => {
    if (!window.confirm("¿Guardar cambios de precios?")) return;
    await guardarPrecios(draft);
    setPrecios(draft);
    alert("Precios guardados correctamente");
  };

  const cancelar = () => {
    if (!window.confirm("¿Cancelar cambios?")) return;
    setDraft(precios);
  };

  if (!draft) return <p>Cargando precios...</p>;

  return (
    <div className="precio-admin">
      <h2>Gestión de precios</h2>

      <label>
        Precio base
        <input
          type="number"
          value={draft.base}
          onChange={(e) =>
            setDraft({ ...draft, base: Number(e.target.value) })
          }
        />
      </label>

      <h3>Alturas</h3>
      {Object.entries(draft.altura).map(([k, v]) => (
        <label key={k}>
          {k} cm
          <input
            type="number"
            value={v}
            onChange={(e) =>
              actualizar("altura", k, e.target.value)
            }
          />
        </label>
      ))}

      <h3>Núcleo</h3>
      {Object.entries(draft.nucleo).map(([k, v]) => (
        <label key={k}>
          {k}
          <input
            type="number"
            value={v}
            onChange={(e) =>
              actualizar("nucleo", k, e.target.value)
            }
          />
        </label>
      ))}

      <h3>Capas</h3>
      {Object.entries(draft.capas).map(([k, v]) => (
        <label key={k}>
          {k}
          <input
            type="number"
            value={v}
            onChange={(e) =>
              actualizar("capas", k, e.target.value)
            }
          />
        </label>
      ))}

      <h3>Telas</h3>
      {Object.entries(draft.telas).map(([k, v]) => (
        <label key={k}>
          {k}
          <input
            type="number"
            value={v}
            onChange={(e) =>
              actualizar("telas", k, e.target.value)
            }
          />
        </label>
      ))}

      <div className="acciones-precios">
        <button onClick={guardar}>Guardar</button>
        <button onClick={cancelar}>Cancelar</button>
      </div>
    </div>
  );
}

