import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Pedidos() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [lineas, setLineas] = useState([{ productoId: "", cantidad: 1 }]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/clientes").then(res => setClientes(res.data));
    axios.get("http://localhost:8080/api/productos").then(res => setProductos(res.data));
    axios.get("http://localhost:8080/api/pedidos").then(res => setPedidos(res.data));
  }, []);

  const handleLineaChange = (index, field, value) => {
    const updated = [...lineas];
    updated[index][field] = value;
    setLineas(updated);
  };

  const addLinea = () => {
    setLineas([...lineas, { productoId: "", cantidad: 1 }]);
  };

  const crearPedido = () => {
    const pedido = {
      cliente: { id: clienteId },
      lineas: lineas.map(l => ({
        producto: { id: l.productoId },
        cantidad: parseInt(l.cantidad)
      }))
    };
    axios.post("http://localhost:8080/api/pedidos", pedido)
      .then(() => {
        alert("Pedido creado");
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear Pedido</h2>
      <label>Cliente:</label>
      <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
        <option value="">Seleccione</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>

      {lineas.map((linea, index) => (
        <div key={index}>
          <label>Producto:</label>
          <select value={linea.productoId} onChange={e => handleLineaChange(index, "productoId", e.target.value)}>
            <option value="">Seleccione</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <label>Cantidad:</label>
          <input type="number" value={linea.cantidad} min="1"
            onChange={e => handleLineaChange(index, "cantidad", e.target.value)} />
        </div>
      ))}
      <button onClick={addLinea}>Agregar Producto</button>
      <button onClick={crearPedido}>Crear Pedido</button>

      <hr />
      <h2>Lista de Pedidos</h2>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <strong>Cliente:</strong> {p.cliente?.nombre || "-"}<br />
          <strong>Estado:</strong> {p.estado}<br />
          <ul>
            {p.lineas.map(l => (
              <li key={l.id}>{l.producto?.nombre} - {l.cantidad}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
