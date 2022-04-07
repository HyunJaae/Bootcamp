package com.sparta.deliveryapp.repository;

import com.sparta.deliveryapp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
