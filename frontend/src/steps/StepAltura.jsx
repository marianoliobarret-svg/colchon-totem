import React from "react";

export default function StepAltura({
  options,
  config,
  setConfig,
  onNext,
}) {
  return (
    <div className="step">
      <h2>Altura del colchón</h2>

      <div className="options-grid">
        {options.map((altura) => (
          <button
            key={altura}
            className={`option-card ${
              config.altura === altura ? "selected" : ""
            }`}
            type="button"
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                altura,
              }))
            }
          >
            {altura} cm
          </button>
        ))}
      </div>
      < div className="step-actions">
      <button
        type="button"
        disabled={config.altura === null}
        onClick={onNext}
      >
        Siguiente
      </button>
      </div>
    </div>
  );
}

