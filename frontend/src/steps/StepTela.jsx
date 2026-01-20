import React from "react";

export default function StepTela({
  options,
  config,
  setConfig,
  onNext,
  onPrev,
}) {
  return (
    <div className="step">
      <h2>Tela exterior</h2>

      <div className="options-grid">
        {options.map((tela) => (
          <button
            key={tela.id}
            type="button"
            className={`option-card ${
              config.tela === tela.id ? "selected" : ""
            }`}
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                tela: tela.id,
              }))
            }
          >
            <strong>{tela.nombre}</strong>
          </button>
        ))}
      </div>

      <div className="step-actions">
        <button type="button" onClick={onPrev}>
          Atrás
        </button>

        <button
          type="button"
          disabled={config.tela === null}
          onClick={onNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
