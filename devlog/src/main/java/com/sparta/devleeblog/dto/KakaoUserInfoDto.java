package com.sparta.devleeblog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KakaoUserInfoDto {
    private Long id;
    private String nickname;
    private String email;


//    @AllArgsConstructor 가 아래 코드를 대신해준다. lombok 기능
//    public KakaoUserInfoDto(Long id, String nickname, String email) {
//        this.id = id;
//        this.nickname = nickname;
//        this.email = email;
//    }
}
