package com.mini6.foodfoodjeju.model;

import com.mini6.foodfoodjeju.validator.OpenApiValidator;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter // get 함수를 일괄적으로 만들어줍니다.
@NoArgsConstructor // 기본 생성자를 만들어줍니다.
@Entity
public class OpenApi {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long Id; // 이거 현규가 추가한거같은데

    @Column
    private String storeName;  // 이거는 원래 있었던거 같고

    @Column
    private String regionName;

    @Column
    private String address;

    @Column
    private String phone;

    @Column
    private String image;

    public OpenApi(String title, String regionName, String address, String phoneno, String photoUrl) {
        this.storeName = title;
        this.regionName = regionName;
        this.address = address;
        this.phone = phoneno;
        this.image = photoUrl;
    }
}
