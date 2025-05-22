package com.pizzastore.controller;

import com.pizzastore.dto.PaymentRequest;
import com.pizzastore.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest request) {
        try {
            return ResponseEntity.ok(paymentService.createCheckoutSession(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating checkout session: " + e.getMessage());
        }
    }
}
