package com.sparta.deliveryapp.controller;

import com.sparta.deliveryapp.dto.OrderRequestDto;
import com.sparta.deliveryapp.model.OrderRequest;
import com.sparta.deliveryapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/order/request")
    public OrderRequest createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        System.out.println("order controller 도착!" + orderRequestDto.getRestaurantId());

        return orderService.createOrder(orderRequestDto);
    }

    @GetMapping("/orders")
    public OrderRequest[] getOrders() {
        return orderService.getOrders();
    }
}
