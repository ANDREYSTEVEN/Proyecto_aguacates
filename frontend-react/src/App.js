import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Repartidores from "./pages/Repartidores";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/repartidores" element={<Repartidores />} />
      </Routes>
    </Router>
  );
}

export default App;