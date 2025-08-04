import React from "react";

export default function LoginPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input placeholder="Usuario" /><br /><br />
      <input type="password" placeholder="Contraseña" /><br /><br />
      <button>Entrar</button>
    </div>
  );
}
