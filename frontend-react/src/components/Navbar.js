import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#eee", marginBottom: 20 }}>
      <Link to="/" style={{ marginRight: 10 }}>Login</Link>
      <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/productos" style={{ marginRight: 10 }}>Productos</Link>
      <Link to="/pedidos" style={{ marginRight: 10 }}>Pedidos</Link>
      <Link to="/clientes" style={{ marginRight: 10 }}>Clientes</Link>
      <Link to="/repartidores" style={{ marginRight: 10 }}>Repartidores</Link>
    </nav>
  );
}
