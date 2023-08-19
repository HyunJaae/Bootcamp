package com.sparta.devleeblog.validator;

import com.sparta.devleeblog.dto.SignupRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@RequiredArgsConstructor
@Component
public class CheckPasswordValidator extends AbstractValidator<SignupRequestDto> {

    @Override
    protected void doValidate(SignupRequestDto dto, Errors errors) {
        if (!dto.getPassword().equals(dto.getCheckPassword())) {
            errors.rejectValue("checkPassword", "비밀번호 일치 오류", "비밀번호가 일치하지 않습니다.");
        }
    }
}
