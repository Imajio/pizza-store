package com.pizzastore.dto;

import lombok.Data;
import java.util.List;

@Data
public class PaymentRequest {
    private List<PaymentItem> items;
}
