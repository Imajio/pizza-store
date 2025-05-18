package com.pizzastore.service;

import com.pizzastore.dto.OrderRequest;
import com.pizzastore.entity.Order;
import com.pizzastore.entity.OrderItem;
import com.pizzastore.entity.Pizza;
import com.pizzastore.repository.OrderRepository;
import com.pizzastore.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pizzastore.dto.OrderItemRequest;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PizzaRepository pizzaRepository;

    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setStatus(Order.Status.CREATED);
        double total = 0;
        for (OrderRequest.OrderItemRequest item : request.getItems()) {
            Pizza pizza = pizzaRepository.findById(item.getPizzaId())
                    .orElseThrow(() -> new RuntimeException("Pizza not found"));
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setPizza(pizza);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUnitPrice(pizza.getPrice());
            order.getOrderItems().add(orderItem);
            total += pizza.getPrice() * item.getQuantity();
        }
        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(UUID id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.Status.valueOf(status));
        return orderRepository.save(order);
    }
}
