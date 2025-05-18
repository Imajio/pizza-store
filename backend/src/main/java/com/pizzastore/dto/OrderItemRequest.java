package com.pizzastore.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class OrderItemRequest {
    private UUID pizzaId;
    private int quantity;
}
