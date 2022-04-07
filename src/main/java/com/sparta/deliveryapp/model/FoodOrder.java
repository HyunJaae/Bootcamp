package com.sparta.deliveryapp.model;


import com.sparta.deliveryapp.validator.FoodOrderValidator;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@RequiredArgsConstructor
@Entity
public class FoodOrder {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int price;

    public FoodOrder(String name, int quantity, int price) {

        FoodOrderValidator.validateFoodorder(quantity);

        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}
