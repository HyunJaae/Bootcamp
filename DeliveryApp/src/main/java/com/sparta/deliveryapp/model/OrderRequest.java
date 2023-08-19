package com.sparta.deliveryapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class OrderRequest {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    private String restaurantName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "FOOOD_ORDER")
    private List<FoodOrder> foods;

    @Column
    private int deliveryFee;

    @Column
    private int totalPrice;

    public OrderRequest(Restaurant restaurant, List<FoodOrder> foodOrderList, int totalPrice) {
        if(totalPrice < 5000) {
            throw new NullPointerException("최소 주문 가격을 지켜주세요.");
        }

        this.restaurantName = restaurant.getName();
        this.foods = foodOrderList;
        this.deliveryFee = restaurant.getDeliveryFee();
        this.totalPrice = totalPrice + deliveryFee;
    }
}
