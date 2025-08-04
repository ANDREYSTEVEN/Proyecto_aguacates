package com.avocado.controller;

import com.avocado.model.Pedido;
import com.avocado.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> getPedidoById(@PathVariable Long id) {
        return pedidoService.getPedidoById(id);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Pedido> getPedidosByCliente(@PathVariable Long clienteId) {
        return pedidoService.getPedidosByClienteId(clienteId);
    }

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return pedidoService.savePedido(pedido);
    }

    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable Long id) {
        pedidoService.deletePedido(id);
    }
}
