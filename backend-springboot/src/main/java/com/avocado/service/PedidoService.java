package com.avocado.service;

import com.avocado.model.Cliente;
import com.avocado.model.LineaPedido;
import com.avocado.model.Pedido;
import com.avocado.model.Producto;
import com.avocado.model.Repartidor;
import com.avocado.repository.ClienteRepository;
import com.avocado.repository.PedidoRepository;
import com.avocado.repository.ProductoRepository;
import com.avocado.repository.RepartidorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private RepartidorRepository repartidorRepository;

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> getPedidosByClienteId(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }

    public Optional<Pedido> getPedidoById(Long id) {
        return pedidoRepository.findById(id);
    }

    @Transactional
    public Pedido savePedido(Pedido pedido) {
        if (pedido.getCliente() == null || pedido.getCliente().getId() == null) {
            throw new IllegalArgumentException("Cliente no válido.");
        }

        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado."));

        pedido.setCliente(cliente);

        // Asignar repartidor si viene en el payload
        if (pedido.getRepartidor() != null && pedido.getRepartidor().getId() != null) {
            Repartidor repartidor = repartidorRepository.findById(pedido.getRepartidor().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Repartidor no encontrado."));
            pedido.setRepartidor(repartidor);
        }

        // Asegurar relaciones en LineaPedido
        if (pedido.getLineas() != null) {
            for (LineaPedido lp : pedido.getLineas()) {
                Producto producto = productoRepository.findById(lp.getProducto().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + lp.getProducto().getId()));
                lp.setProducto(producto);
                lp.setPedido(pedido);
            }
        }

        return pedidoRepository.save(pedido);
    }

    public void deletePedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}
