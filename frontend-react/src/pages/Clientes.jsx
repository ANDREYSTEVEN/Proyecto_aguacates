import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    axios.get("http://localhost:8080/api/clientes")
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  const crearCliente = () => {
    const nuevo = { nombre, direccion, telefono };
    axios.post("http://localhost:8080/api/clientes", nuevo)
      .then(() => {
        setNombre(""); setDireccion(""); setTelefono("");
        cargarClientes();
      })
      .catch(err => console.error(err));
  };

  const eliminarCliente = (id) => {
    axios.delete("http://localhost:8080/api/clientes/" + id)
      .then(() => cargarClientes())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Clientes</h2>
      <div>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /><br />
        <input placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} /><br />
        <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} /><br />
        <button onClick={crearCliente}>Agregar Cliente</button>
      </div>

      <hr />
      <h3>Clientes Registrados</h3>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            {c.nombre} - {c.telefono} ({c.direccion}){" "}
            <button onClick={() => eliminarCliente(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
