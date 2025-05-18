package com.pizzastore.repository;

import com.pizzastore.entity.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PizzaRepository extends JpaRepository<Pizza, UUID> {
}
