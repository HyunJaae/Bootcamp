package com.sparta.deliveryapp.controller;

import com.sparta.deliveryapp.dto.RestaurantDto;
import com.sparta.deliveryapp.model.Restaurant;
import com.sparta.deliveryapp.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController {

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping("/restaurant/register")
    public Restaurant createRestaurant(@RequestBody RestaurantDto restaurantDto) {

        Long restaurantId = restaurantDto.getId();

        return restaurantService.createRestaurant(restaurantDto, restaurantId);
    }

    @GetMapping("/restaurants")
    public Restaurant[] getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }
}
