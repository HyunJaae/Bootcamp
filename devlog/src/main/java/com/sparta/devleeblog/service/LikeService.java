package com.sparta.devleeblog.service;

import com.sparta.devleeblog.model.Comment;
import com.sparta.devleeblog.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LikeService {
    @Autowired
    private CommentRepository commentRepository;
    
    public void addLike(Long id) {

        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("게시글이 존재하지 않습니다.")
        );
        comment.addCount();
    }

}
