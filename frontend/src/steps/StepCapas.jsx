import React from "react";

export default function StepCapas({
  options,
  config,
  setConfig,
  onNext,
  onPrev,
}) {
  const capaSeleccionada = config.capas?.[0] ?? null;

  const selectCapa = (id) => {
    setConfig((prev) => ({
      ...prev,
      capas: [id], // 👈 SOLO UNA CAPA
    }));
  };

  return (
    <div className="step">
      <h2>Capas de confort</h2>

      <div className="options-grid">
        {options.map((capa) => {
          const isSelected = capaSeleccionada === capa.id;

          return (
            <button
              key={capa.id}
              type="button"
              className={`option-card ${isSelected ? "selected" : ""}`}
              onClick={() => selectCapa(capa.id)}
            >
              {capa.nombre}
            </button>
          );
        })}
      </div>

      <div className="step-actions">
        <button type="button" onClick={onPrev}>
          Atrás
        </button>

        <button
          type="button"
          disabled={!capaSeleccionada}
          onClick={onNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

