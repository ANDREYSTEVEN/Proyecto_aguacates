package com.avocado.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "repartidores")
public class Repartidor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String telefono;

    @OneToMany(mappedBy = "repartidor")
    private List<Pedido> pedidos;

    public Repartidor() {}

    public Repartidor(String nombre, String telefono) {
        this.nombre = nombre;
        this.telefono = telefono;
    }

    public Long getId() { return id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public List<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(List<Pedido> pedidos) { this.pedidos = pedidos; }
}
