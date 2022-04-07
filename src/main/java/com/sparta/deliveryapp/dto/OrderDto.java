package com.sparta.deliveryapp.dto;

import com.sparta.deliveryapp.model.FoodOrder;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderDto {
    private String restaurantName;
    private List<FoodOrder> foods;
    private int deliveryFee;
    private int totalPrice;

    public OrderDto(String restaurantName, List<FoodOrder> foods, int deliveryFee, int totalPrice) {

        this.restaurantName = restaurantName;
        this.foods = foods;
        this.deliveryFee = deliveryFee;
        this.totalPrice = totalPrice;
    }
}
