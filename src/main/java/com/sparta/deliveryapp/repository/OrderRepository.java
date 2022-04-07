package com.sparta.deliveryapp.repository;

import com.sparta.deliveryapp.model.OrderRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderRequest, Long> {
}
