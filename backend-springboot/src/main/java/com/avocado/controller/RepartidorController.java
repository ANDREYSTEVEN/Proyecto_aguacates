package com.avocado.controller;

import com.avocado.model.Repartidor;
import com.avocado.service.RepartidorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/repartidores")
@CrossOrigin(origins = "*")
public class RepartidorController {

    @Autowired
    private RepartidorService repartidorService;

    @GetMapping
    public List<Repartidor> getAllRepartidores() {
        return repartidorService.getAllRepartidores();
    }

    @GetMapping("/{id}")
    public Optional<Repartidor> getRepartidorById(@PathVariable Long id) {
        return repartidorService.getRepartidorById(id);
    }

    @PostMapping
    public Repartidor createRepartidor(@RequestBody Repartidor repartidor) {
        return repartidorService.saveRepartidor(repartidor);
    }

    @DeleteMapping("/{id}")
    public void deleteRepartidor(@PathVariable Long id) {
        repartidorService.deleteRepartidor(id);
    }
}
