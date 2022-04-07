package com.sparta.deliveryapp.model;

import com.sparta.deliveryapp.dto.FoodDto;
import com.sparta.deliveryapp.validator.FoodValidator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Food {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    @ManyToOne
    @JoinColumn(name = "RESTAURANT_ID", nullable = false)
    private Restaurant restaurants;

    public Food(FoodDto foodDtoObject, Restaurant restaurants) {

         FoodValidator.validateFoodResister(foodDtoObject);

        this.name = foodDtoObject.getName();
        this.price = foodDtoObject.getPrice();
        this.restaurants = restaurants;
    }
}
