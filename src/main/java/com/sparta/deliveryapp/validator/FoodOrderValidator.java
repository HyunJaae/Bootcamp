package com.sparta.deliveryapp.validator;

import org.springframework.stereotype.Component;

@Component
public class FoodOrderValidator {
    public static void validateFoodorder(int quantity) {
        if(quantity < 1) {
            throw new NullPointerException("음식은 1개 이상 주문해야 합니다.");
        }
        if(quantity > 100) {
            throw new NullPointerException("음식은 100개 이하로 주문하셔야 합니다.");
        }
    }
}
