import React from "react";

export default function ColchonPreview({ config }) {
  return (
    <div className="colchon-preview">
      <img src="/colchon/base.png" className="layer" />

      {config.nucleo && (
        <img
          key={`nucleo-${config.nucleo}`}
          src={`/colchon/nucleo_${config.nucleo}.png`}
          className="layer"
        />
      )}

      {Array.isArray(config.capas) &&
        config.capas.map((capa) => (
          <img
            key={`capa-${capa}`}
            src={`/colchon/capa_${capa}.png`}
            className="layer"
          />
        ))}

      {config.tela && (
        <img
          key={`tela-${config.tela}`}
          src={`/colchon/tela_${config.tela}.png`}
          className="layer"
        />
      )}
    </div>
  );
}
