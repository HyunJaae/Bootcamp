package com.sparta.deliveryapp.service;

import com.sparta.deliveryapp.dto.RestaurantDto;
import com.sparta.deliveryapp.model.Restaurant;
import com.sparta.deliveryapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Restaurant createRestaurant(RestaurantDto restaurantDto, Long restaurantId) {
        Restaurant restaurant = new Restaurant(restaurantDto, restaurantId);

        restaurantRepository.save(restaurant);

        return restaurant;
    }

    public Restaurant[] getAllRestaurants() {
        int arrSize = restaurantRepository.findAll().size();
        return restaurantRepository.findAll().toArray(new Restaurant[arrSize]);
    }
}
