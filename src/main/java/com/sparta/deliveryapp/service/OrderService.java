package com.sparta.deliveryapp.service;

import com.sparta.deliveryapp.dto.FoodOrderRequestDto;
import com.sparta.deliveryapp.dto.OrderRequestDto;
import com.sparta.deliveryapp.model.Food;
import com.sparta.deliveryapp.model.FoodOrder;
import com.sparta.deliveryapp.model.OrderRequest;
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
    public OrderRequest createOrder(OrderRequestDto orderRequestDto) {
        System.out.println("service 도착!");
        Long restaurantId = orderRequestDto.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(
                () -> new NullPointerException("음식점이 없습니다.")
        );
        List<FoodOrder> foodOrderList = new ArrayList<>();
        int totalPrice = 0;
        for(FoodOrderRequestDto foodOrderRequestDto : orderRequestDto.getFoods()){
            Food food = foodRepository.findById(foodOrderRequestDto.getId()).orElseThrow(
                    () -> new NullPointerException("찾으시는 음식이 없습니다.")
            );
            FoodOrder foodOrder = new FoodOrder(food.getName(), foodOrderRequestDto.getQuantity(), food.getPrice());
            totalPrice += food.getPrice() * foodOrderRequestDto.getQuantity();
            foodOrderList.add(foodOrder);
        }
        OrderRequest orderRequest = new OrderRequest(restaurant, foodOrderList, totalPrice);
        orderRepository.save(orderRequest);

        return orderRequest;
    }

    public OrderRequest[] getOrders() {
        List<OrderRequest> orderRequest = orderRepository.findAll();
        int arrSize = orderRequest.size();

        return orderRequest.toArray(new OrderRequest[arrSize]);
    }
}
