package com.sparta.deliveryapp.model;

import com.sparta.deliveryapp.dto.FoodOrderDto;
import com.sparta.deliveryapp.dto.FoodOrderRequestDto;
import com.sparta.deliveryapp.dto.OrderRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Order {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    private String restaurantName;

    @OneToMany
    @JoinColumn(name = "FOOOD_ORDER")
    private List<FoodOrder> foods;

    @Column
    private int deliveryFee;

    @Column
    private int totalPrice;

    public Order(Restaurant restaurant, List<FoodOrder> foodOrderList, int totalPrice) {
        this.restaurantName = restaurant.getName();
        this.foods = foodOrderList;
        this.deliveryFee = restaurant.getDeliveryFee();
        this.totalPrice = totalPrice;
    }
}
