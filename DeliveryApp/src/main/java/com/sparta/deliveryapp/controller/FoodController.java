package com.sparta.deliveryapp.controller;

import com.sparta.deliveryapp.dto.FoodDto;
import com.sparta.deliveryapp.model.Food;
import com.sparta.deliveryapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/restaurant/{restaurantId}/food/register")
    public void createFood(@RequestBody List<FoodDto> foodDto, @PathVariable Long restaurantId) {
        foodService.createFood(foodDto, restaurantId);
    }

    @GetMapping("/restaurant/{restaurantId}/foods")
    public Food[] getFood(@PathVariable Long restaurantId){
        System.out.println(restaurantId);
        return foodService.getAllFoods(restaurantId);
    }
}
