import React from "react";

import { useState } from "react";
import { login } from "../utils/api";

export default function LoginAdmin({ onSuccess }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(user, pass);

      localStorage.setItem("token", data.token);

      onSuccess();
    } catch {
      setError("Credenciales incorrectas");
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Login Admin</h1>
    <form onSubmit={submit} className="admin-login">
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Ingresar</button>
    </form>
    </div>
    </div>
  );
}
