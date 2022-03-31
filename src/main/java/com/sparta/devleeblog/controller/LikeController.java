package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.dto.LikeDto;
import com.sparta.devleeblog.model.LikeHeart;
import com.sparta.devleeblog.repository.LikeRepository;
import com.sparta.devleeblog.security.UserDetailsImpl;
import com.sparta.devleeblog.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class LikeController {
    @Autowired
    private LikeService likeService;

    @Autowired
    private LikeRepository likeRepository;

    @PostMapping("/api/comments/like/{id}")
    public String addLike(Model model, @RequestBody LikeDto likeDto, @PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        System.out.println("ajax로 post 요청까진 확인됨");
        if(userDetails == null) {
            model.addAttribute("msg", "로그인 해주세요.");
            return "index";
        } else if(likeDto.getUsername().equals(userDetails.getUsername())) {

        }
        likeService.addLike(id);
        LikeHeart likeHeart = new LikeHeart(likeDto);
        likeRepository.save(likeHeart);
        return "좋아요 성공!";
    }
}
