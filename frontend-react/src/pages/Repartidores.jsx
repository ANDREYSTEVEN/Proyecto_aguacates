import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Repartidores() {
  const [repartidores, setRepartidores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    cargarRepartidores();
  }, []);

  const cargarRepartidores = () => {
    axios.get("http://localhost:8080/api/repartidores")
      .then(res => setRepartidores(res.data))
      .catch(err => console.error(err));
  };

  const crearRepartidor = () => {
    const nuevo = { nombre, telefono };
    axios.post("http://localhost:8080/api/repartidores", nuevo)
      .then(() => {
        setNombre(""); setTelefono("");
        cargarRepartidores();
      })
      .catch(err => console.error(err));
  };

  const eliminarRepartidor = (id) => {
    axios.delete("http://localhost:8080/api/repartidores/" + id)
      .then(() => cargarRepartidores())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Repartidores</h2>
      <div>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /><br />
        <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} /><br />
        <button onClick={crearRepartidor}>Agregar Repartidor</button>
      </div>

      <hr />
      <h3>Repartidores Registrados</h3>
      <ul>
        {repartidores.map(r => (
          <li key={r.id}>
            {r.nombre} - {r.telefono}{" "}
            <button onClick={() => eliminarRepartidor(r.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
