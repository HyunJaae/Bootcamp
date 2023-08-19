package com.sparta.devleeblog.validator;

import com.sparta.devleeblog.dto.SignupRequestDto;
import com.sparta.devleeblog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@RequiredArgsConstructor
@Component
public class CheckUsernameValidator extends AbstractValidator<SignupRequestDto> {

    private final UserRepository userRepository;

    @Override
    protected void doValidate(SignupRequestDto dto, Errors errors) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            errors.rejectValue("username", "아이디 중복 오류", "이미 사용중인 아이디 입니다.");
        }
    }
}


