package com.sparta.devleeblog.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
public class SignupRequestDto {

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{3,}", message = "비밀번호는 3자 이상 및 영문 대 소문자, 숫자를 사용하세요.")
    private String password;

    @NotBlank(message = "비밀번호 확인은 필수 입력 값입니다.")
    private String checkPassword;

    @AssertTrue(message = "비밀번호가 일치하지 않습니다.")
    public boolean isCheckPassword() {
        return checkPassword.equals(password);
    }

    @AssertTrue(message = "비밀번호에 ID를 포함할 수 없습니다.")
    public boolean isCheckPasswordContaind() {
        return !password.contains(username);
    }


    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    private boolean admin = false;

    private String adminToken = "";
}
