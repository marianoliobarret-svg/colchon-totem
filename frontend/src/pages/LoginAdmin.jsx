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
      await login(user, pass);
      onSuccess();
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={submit} className="admin-login">
      <h2>Login Admin</h2>

      <input
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
  );
}
