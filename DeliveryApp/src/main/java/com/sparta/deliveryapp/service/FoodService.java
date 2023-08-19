package com.sparta.deliveryapp.service;

import com.sparta.deliveryapp.dto.FoodDto;
import com.sparta.deliveryapp.model.Food;
import com.sparta.deliveryapp.model.Restaurant;
import com.sparta.deliveryapp.repository.FoodRepository;
import com.sparta.deliveryapp.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FoodService {
    private final FoodRepository foodRepository;
    private final RestaurantRepository restaurantRepository;

    @Transactional
    public void createFood(List<FoodDto> foodDto, Long restaurantId) {
        Optional<Restaurant> restaurants = restaurantRepository.findById(restaurantId);
        Restaurant restaurant = restaurants.get();
        for(FoodDto foodDtoObject : foodDto) {
            System.out.println(foodDtoObject.getName());
            List<Food> foods = foodRepository.findAllByNameAndRestaurants(foodDtoObject.getName(), restaurant);
            if(foods.size() != 0){
                System.out.println(foodDtoObject.getName());
                throw new NullPointerException("이미 등록된 음식입니다.");
            }
            Food food = new Food(foodDtoObject, restaurant);
            System.out.println(food.getRestaurants() + "하이염");
            System.out.println(food.getName());
            foodRepository.save(food);
        }
    }

    public Food[] getAllFoods(Long restaurantId) {
        Optional<Restaurant> restaurants = restaurantRepository.findById(restaurantId);
        Restaurant restaurant = restaurants.get();
        List<Food> foodList = foodRepository.findByRestaurants(restaurant);
        for(int i = 0; i < foodList.size(); i++){
            System.out.println(foodList.get(i).getName());
        }
        int arrSize = foodList.size();
        System.out.println(arrSize);
        return foodList.toArray(new Food[arrSize]);
    }
}
