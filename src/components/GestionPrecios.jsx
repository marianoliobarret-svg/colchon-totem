import { useEffect, useState } from "react";
import {
  obtenerPrecios,
  guardarPrecios,
} from "../utils/api";

export default function GestionPrecios() {
  const [precios, setPrecios] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar precios al entrar
  useEffect(() => {
    cargarPrecios();
  }, []);

  const cargarPrecios = async () => {
    setLoading(true);
    const data = await obtenerPrecios();
    setPrecios(data);
    setDraft(data);
    setLoading(false);
  };

  const handleChange = (grupo, key, value) => {
    setDraft((prev) => ({
      ...prev,
      [grupo]: {
        ...prev[grupo],
        [key]: Number(value),
      },
    }));
  };

  const guardar = async () => {
    if (!window.confirm("¿Guardar cambios de precios?")) {
      return;
    }

    await guardarPrecios(draft);
    setPrecios(draft);
    alert("Precios guardados correctamente");
  };

  const cancelar = () => {
    if (!window.confirm("¿Descartar cambios?")) {
      return;
    }
    setDraft(precios);
  };

  if (loading || !draft) {
    return <p>Cargando precios...</p>;
  }

  return (
    <div className="gestion-precios">
      <h2>Gestión de precios</h2>

      {/* PRECIO BASE */}
      <section>
        <h3>Precio base</h3>
        <input
          type="number"
          value={draft.base}
          onChange={(e) =>
            setDraft({
              ...draft,
              base: Number(e.target.value),
            })
          }
        />
      </section>

      {/* ALTURAS */}
      <section>
        <h3>Alturas</h3>

        <label>
          20 cm
          <input
            type="number"
            value={draft.altura["20"]}
            onChange={(e) =>
              handleChange(
                "altura",
                "20",
                e.target.value
              )
            }
          />
        </label>

        <label>
          25 cm
          <input
            type="number"
            value={draft.altura["25"]}
            onChange={(e) =>
              handleChange(
                "altura",
                "25",
                e.target.value
              )
            }
          />
        </label>

        <label>
          30 cm
          <input
            type="number"
            value={draft.altura["30"]}
            onChange={(e) =>
              handleChange(
                "altura",
                "30",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* NÚCLEO */}
      <section>
        <h3>Núcleo</h3>

        <label>
          Espuma
          <input
            type="number"
            value={draft.nucleo.espuma}
            onChange={(e) =>
              handleChange(
                "nucleo",
                "espuma",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Resortes
          <input
            type="number"
            value={draft.nucleo.resortes}
            onChange={(e) =>
              handleChange(
                "nucleo",
                "resortes",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* CAPAS */}
      <section>
        <h3>Capas</h3>

        <label>
          Memory Foam
          <input
            type="number"
            value={draft.capas.memory}
            onChange={(e) =>
              handleChange(
                "capas",
                "memory",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Látex
          <input
            type="number"
            value={draft.capas.latex}
            onChange={(e) =>
              handleChange(
                "capas",
                "latex",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* TELAS */}
      <section>
        <h3>Telas</h3>

        <label>
          Algodón
          <input
            type="number"
            value={draft.telas.algodon}
            onChange={(e) =>
              handleChange(
                "telas",
                "algodon",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Premium
          <input
            type="number"
            value={draft.telas.premium}
            onChange={(e) =>
              handleChange(
                "telas",
                "premium",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* ACCIONES */}
      <div className="acciones-precios">
        <button onClick={guardar}>
          Guardar precios
        </button>
        <button onClick={cancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
