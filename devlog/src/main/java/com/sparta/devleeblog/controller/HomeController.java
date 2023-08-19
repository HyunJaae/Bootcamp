package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@RequiredArgsConstructor
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        model.addAttribute("username", userDetails.getUsername());

        return "index";
    }

    @GetMapping("/user")
    public String guestHome(Model model, Principal principal) {  // Principal interface라서 구현체를 써야함
        if(principal != null) {
            return "index";
        }
        model.addAttribute("guest", true);
        return "index";
    }
}
