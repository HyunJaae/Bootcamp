package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Member;

@RequiredArgsConstructor
@Controller
public class HomeController {

    private final SessionManager sessionManager;

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails, HttpServletResponse response) {

        model.addAttribute("username", userDetails.getUsername());
        // 세션 매니저를 통해 세션 생성 및 회원 정보 보관
        sessionManager.createSession(userDetails.getUser(), response);

        return "index";
    }

    @GetMapping("/user")
    public String guestHome(HttpServletRequest request, Model model) {
        Member member = (Member) sessionManager.getSession(request);

        if(member == null) {
            model.addAttribute("guest", true);
            return "index";
        }

        model.addAttribute("member", member);
        return "index";
    }

    @PostMapping("/user/logout")
    public String deleteSession(HttpServletResponse response, HttpServletRequest request) {
        sessionManager.expire(request);
        return "redirect:/user";
    }
}
