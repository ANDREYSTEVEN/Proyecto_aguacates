package com.avocado.service;

import com.avocado.model.Repartidor;
import com.avocado.repository.RepartidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepartidorService {

    @Autowired
    private RepartidorRepository repartidorRepository;

    public List<Repartidor> getAllRepartidores() {
        return repartidorRepository.findAll();
    }

    public Optional<Repartidor> getRepartidorById(Long id) {
        return repartidorRepository.findById(id);
    }

    public Repartidor saveRepartidor(Repartidor repartidor) {
        return repartidorRepository.save(repartidor);
    }

    public void deleteRepartidor(Long id) {
        repartidorRepository.deleteById(id);
    }
}
