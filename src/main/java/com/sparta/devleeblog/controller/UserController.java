package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.dto.SignupRequestDto;
import com.sparta.devleeblog.service.UserService;
import com.sparta.devleeblog.validator.CheckEmailValidator;
import com.sparta.devleeblog.validator.CheckUsernameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.lang.reflect.Member;
import java.util.Map;

@Controller
public class UserController {

    private final UserService userService;
    private final CheckUsernameValidator checkUsernameValidator;
    private final CheckEmailValidator checkEmailValidator;
    private final SessionManager sessionManager;

    @Autowired
    public UserController(UserService userService, CheckUsernameValidator checkUsernameValidator, CheckEmailValidator checkEmailValidator, SessionManager sessionManager) {
        this.userService = userService;
        this.checkUsernameValidator = checkUsernameValidator;
        this.checkEmailValidator = checkEmailValidator;
        this.sessionManager = sessionManager;
    }

    // 회원 로그인 페이지
    @GetMapping("/user/login")
    public String login(HttpServletRequest request) {
        Member member = (Member) sessionManager.getSession(request);

        if(member == null){
            return "login";
        }
        return "index";
    }

    // 회원 가입 페이지
    @GetMapping("/user/signup")
    public String signup() {
        return "signup";
    }

    /* 커스텀 유효성 검증을 위해 추가 */
    @InitBinder  // 특정 컨트롤러에서 바인딩 또는 검증 설정을 변경하고 싶을 때 사용한다.
    public void validatorBinder(WebDataBinder binder) {  // HTTP 요청 정보를 컨트롤러 메소드의 파라미터나 모델에 바인딩할 때 사용되는 바인딩 객체
        binder.addValidators(checkUsernameValidator);
        binder.addValidators(checkEmailValidator);
    }


    // 회원 가입 요청 처리
    @PostMapping("/user/signup")
    public String registerUser(@Valid SignupRequestDto requestDto, Errors errors, Model model) {

        System.out.println("hello" + requestDto.getEmail());
        if(errors.hasErrors()) {
            /* 회원가입 실패 시 입력 데이터 값을 유지 */
            model.addAttribute("requestDto", requestDto);
            System.out.println(errors);

            /* 유효성 통과 못한 필드와 메세지를 핸들링 */
            Map<String, String> validatorResult = userService.validateHandling(errors);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }

            System.out.println(validatorResult);
            /* 회원가입 페이지로 다시 리턴 */
            return "signup";
        }

        userService.registerUser(requestDto);
        return "redirect:/user/login";
    }
}