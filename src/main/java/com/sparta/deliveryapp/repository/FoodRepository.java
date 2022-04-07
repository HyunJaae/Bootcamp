package com.sparta.deliveryapp.repository;

import com.sparta.deliveryapp.model.Food;
import com.sparta.deliveryapp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByRestaurants(Restaurant restaurant);

    List<Food> findAllByNameAndRestaurants(String name, Restaurant restaurant);
}
