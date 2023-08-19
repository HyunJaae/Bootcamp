package com.sparta.deliveryapp.validator;

import com.sparta.deliveryapp.dto.FoodDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FoodValidator {
    public static void validateFoodResister(FoodDto foodDtoObject) {

        if(foodDtoObject.getPrice() < 100) {
            throw new NullPointerException("가격은 100원 이상이어야 합니다.");
        }
        if(foodDtoObject.getPrice() > 1000000) {
            throw new NullPointerException("가격은 100만원을 넘을 수 없습니다.");
        }
        if(foodDtoObject.getPrice()%100 != 0) {
            throw new NullPointerException("가격은 100원 단위로 입력해야 합니다.");
        }
    }
}
