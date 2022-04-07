package com.sparta.deliveryapp.service;

import com.sparta.deliveryapp.dto.FoodOrderRequestDto;
import com.sparta.deliveryapp.dto.OrderRequestDto;
import com.sparta.deliveryapp.model.Food;
import com.sparta.deliveryapp.model.FoodOrder;
import com.sparta.deliveryapp.model.Order;
import com.sparta.deliveryapp.model.Restaurant;
import com.sparta.deliveryapp.repository.FoodRepository;
import com.sparta.deliveryapp.repository.OrderRepository;
import com.sparta.deliveryapp.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final RestaurantRepository restaurantRepository;
    private final FoodRepository foodRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Order createOrder(OrderRequestDto orderRequestDto) {
        System.out.println("service 도착!");
        Long restaurantId = orderRequestDto.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(
                () -> new NullPointerException("음식점이 업습니다.")
        );
        List<FoodOrder> foodOrderList = new ArrayList<>();
        int totalPrice = 0;
        for(FoodOrderRequestDto foodOrderRequestDto : orderRequestDto.getFoods()){
            Food food = foodRepository.findById(foodOrderRequestDto.getId()).orElseThrow(
                    () -> new NullPointerException("찾으시는 음식이 없습니다.")
            );
            FoodOrder foodOrder = new FoodOrder(food.getName(), foodOrderRequestDto.getQuantity(), food.getPrice());
            foodOrderList.add(foodOrder);
            totalPrice += food.getPrice();
        }
        Order order = new Order(restaurant, foodOrderList, totalPrice);
        orderRepository.save(order);
        if(order == null) {
            throw new NullPointerException("order 객체가 null입니다.");
        }
        return order;
    }
}
