package com.sparta.deliveryapp.validator;

import com.sparta.deliveryapp.dto.RestaurantDto;
import org.springframework.stereotype.Component;

@Component
public class RestaurantValidator {
    public static void validateRestaurantResister(RestaurantDto restaurantDto) {
        // 최소 주문 가격 최저가 기준
        if(restaurantDto.getMinOrderPrice() < 1000) {
            throw new NullPointerException("최소 주문 가격은 1000원 이상이어야 합니다.");
        }
        // 최소 주문 가격 상한가 기준
        if(restaurantDto.getMinOrderPrice() > 100000) {
            throw new NullPointerException("최소 주문 가격은 100000원을 초과할 수 없습니다.");
        }
        // 최소 주문 가격 입력 단위
        if(restaurantDto.getMinOrderPrice()%100 != 0) {
            throw new NullPointerException("최소 주문 가격은 100원 단위로 입력해야 합니다.");
        }
        // 배달비 최저가 기준
        if(restaurantDto.getDeliveryFee() < 0) {
            throw new NullPointerException("배달비는 0원 이하일 수 없습니다.");
        }
        // 배달비 상한가 기준
        if(restaurantDto.getDeliveryFee() > 10000) {
            throw new NullPointerException("배달비는 10000원을 초과할 수 없습니다.");
        }
        // 배달비 입력 단위
        if(restaurantDto.getDeliveryFee()%500 != 0) {
            throw new NullPointerException("배달비는 500원 단위로 입력해야 합니다.");
        }
    }
}
