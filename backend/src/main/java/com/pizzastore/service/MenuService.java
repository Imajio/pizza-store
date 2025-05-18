package com.pizzastore.service;

import com.pizzastore.entity.Pizza;
import com.pizzastore.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MenuService {
    @Autowired
    private PizzaRepository pizzaRepository;

    public List<Pizza> getAllPizzas() {
        return pizzaRepository.findAll();
    }

    public Pizza createPizza(Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

    public Pizza updatePizza(UUID id, Pizza pizza) {
        Pizza existing = pizzaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pizza not found"));
        existing.setName(pizza.getName());
        existing.setDescription(pizza.getDescription());
        existing.setPrice(pizza.getPrice());
        existing.setImageUrl(pizza.getImageUrl());
        existing.setAvailable(pizza.isAvailable());
        return pizzaRepository.save(existing);
    }

    public void deletePizza(UUID id) {
        pizzaRepository.deleteById(id);
    }
}
