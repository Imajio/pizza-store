package com.pizzastore.controller;

import com.pizzastore.entity.Pizza;
import com.pizzastore.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<Pizza> getAllPizzas() {
        return menuService.getAllPizzas();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pizza> createPizza(@RequestBody Pizza pizza) {
        return ResponseEntity.ok(menuService.createPizza(pizza));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pizza> updatePizza(@PathVariable UUID id, @RequestBody Pizza pizza) {
        return ResponseEntity.ok(menuService.updatePizza(id, pizza));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePizza(@PathVariable UUID id) {
        menuService.deletePizza(id);
        return ResponseEntity.ok().build();
    }
}
