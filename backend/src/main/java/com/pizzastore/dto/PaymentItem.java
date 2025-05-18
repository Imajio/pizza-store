package com.pizzastore.dto;

import lombok.Data;

@Data
public class PaymentItem {
    private String name;
    private double price;
    private int quantity;
}
