package com.sparta.deliveryapp.dto;


import com.sparta.deliveryapp.model.Restaurant;
import lombok.Getter;

@Getter
public class FoodDto {
    private Long id;
    private String name;
    private int price;
    private Restaurant restaurant;
}
