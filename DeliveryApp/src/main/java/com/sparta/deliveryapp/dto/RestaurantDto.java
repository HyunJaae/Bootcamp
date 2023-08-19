package com.sparta.deliveryapp.dto;

import com.sparta.deliveryapp.model.Food;
import lombok.Getter;

@Getter
public class RestaurantDto {
    private Long id;
    private String name;
    private int minOrderPrice;
    private int deliveryFee;
    private Food food;
}
