import { useState, useEffect } from "react";
import React from "react";


import StepAltura from "./steps/StepAltura";
import StepNucleo from "./steps/StepNucleo";
import StepCapas from "./steps/StepCapas";
import StepTela from "./steps/StepTela";
import StepResumen from "./steps/StepResumen";

import WelcomeScreen from "./components/WelcomeScreen";
import ColchonPreview from "./components/ColchonPreview";
import PrecioPreview from "./components/PrecioPreview";

import PanelAdmin from "./pages/PanelAdmin";
import LoginAdmin from "./pages/LoginAdmin";

import { obtenerPrecios, isAuth, logout } from "./utils/api";

const STEPS = [
  { component: StepAltura, options: [20, 25, 30] },
  {
    component: StepNucleo,
    options: [
      { id: "espuma", nombre: "Espuma" },
      { id: "resortes", nombre: "Resortes" },
    ],
  },
  {
    component: StepCapas,
    options: [
      { id: "memory", nombre: "Memory Foam" },
      { id: "latex", nombre: "Látex" },
    ],
  },
  {
    component: StepTela,
    options: [
      { id: "algodon", nombre: "Algodón" },
      { id: "premium", nombre: "Tela Premium" },
    ],
  },
  { component: StepResumen },
];

export default function App() {
  /* ======================
     ESTADOS
  ====================== */
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(isAuth());

  const [config, setConfig] = useState({
    cliente: "",
    altura: null,
    nucleo: null,
    capas: [],
    tela: null,
  });

  const [precios, setPrecios] = useState(null);

  /* ======================
     useEffect CORRECTO
     (DENTRO del componente)
  ====================== */
  useEffect(() => {
    obtenerPrecios().then(setPrecios);
  }, []);

  /* ======================
     WELCOME
  ====================== */
  if (!started && !mostrarAdmin) {
    return (
      <WelcomeScreen
        onStart={(nombre) => {
          setConfig((prev) => ({
            ...prev,
            cliente: nombre,
          }));
          setStarted(true);
          setStepIndex(0);
        }}
        onAdmin={() => setMostrarAdmin(true)}
      />
    );
  }

  /* ======================
     PANEL ADMIN
  ====================== */
  if (mostrarAdmin) {
    return (
      <div className="admin-wrapper">
        <div className="admin-header">
          <button onClick={() => setMostrarAdmin(false)}>
            ← Volver
          </button>

          <button
            onClick={() => {
              logout();
              setAdminAuth(false);
              setMostrarAdmin(false);
              setStarted(false);
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {!adminAuth ? (
          <LoginAdmin onSuccess={() => setAdminAuth(true)} />
        ) : (
          <PanelAdmin />
        )}
      </div>
    );
  }

  /* ======================
     CONFIGURADOR
  ====================== */
  const StepComponent = STEPS[stepIndex].component;
  const options = STEPS[stepIndex].options;

  return (
    <div className="app-layout">
      <div className="step-container">
        <h1>Colchón Totem</h1>

        <StepComponent
          key={resetKey}
          options={options}
          config={config}
          setConfig={setConfig}
          precios={precios}
          onNext={() =>
            setStepIndex((i) =>
              i + 1 < STEPS.length ? i + 1 : i
            )
          }
          onPrev={() =>
            setStepIndex((i) => (i > 0 ? i - 1 : i))
          }
          onFinish={() => {
            setConfig({
              cliente: "",
              altura: null,
              nucleo: null,
              capas: [],
              tela: null,
            });
            setStepIndex(0);
            setResetKey((k) => k + 1);
            setStarted(false);
          }}
        />
      </div>

      <div className="preview-container">
        <ColchonPreview config={config} />
        <PrecioPreview config={config} precios={precios} />
                  <div className="step-header">
        <button
          onClick={() => {
            if (
              !window.confirm(
                "¿Seguro que querés reiniciar el armado del colchón?"
              )
            )
              return;

            setConfig({
              cliente: "",
              altura: null,
              nucleo: null,
              capas: [],
              tela: null,
            });

            setStepIndex(0);
            setStarted(false);
          }}
        >
          Reiniciar armado
        </button>
      </div>


      </div>
    </div>
  );
}
