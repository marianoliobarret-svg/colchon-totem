export default function StepNucleo({
  options,
  config,
  setConfig,
  onNext,
  onPrev,
}) {
  return (
    <div className="step">
      <h2>Núcleo del colchón</h2>

      <div className="options-grid">
        {options.map((nucleo) => (
          <button
            key={nucleo.id}
            type="button"
            className={`option-card ${
              config.nucleo === nucleo.id ? "selected" : ""
            }`}
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                nucleo: nucleo.id,
              }))
            }
          >
            {nucleo.nombre}
          </button>
        ))}
      </div>

      < div className="step-actions">
        <button type="button" onClick={onPrev}>
          Atrás
        </button>

        <button
          type="button"
          disabled={config.nucleo === null}
          onClick={onNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}



