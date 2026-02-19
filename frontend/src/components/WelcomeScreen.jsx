import React from "react";

export default function WelcomeScreen({ onStart, onAdmin }) {
  const iniciar = (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value.trim();
    if (!nombre) {
      alert("Por favor ingresá tu nombre");
      return;
    }

    onStart(nombre);
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="logo-placeholder" >
          LOGO
        </div>

        <h1>Bienvenido al configurador de colchones</h1>

        <p>
          Armá tu colchón ideal en pocos pasos y obtené
          tu presupuesto al instante.
        </p>

        <form onSubmit={iniciar}>
          <input
            name="nombre"
            placeholder="Ingresá tu nombre"
          />
          <button type="submit" className="welcome-start">
            Iniciar armado
          </button>
          <button type="button" onClick={onAdmin}
          className="welcome-admin">
          Ver panel admin
         </button>
        </form>
      </div>
    </div>
  );
}
