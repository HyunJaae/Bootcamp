package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.dto.CommentDto;
import com.sparta.devleeblog.dto.PostDto;
import com.sparta.devleeblog.model.Comment;
import com.sparta.devleeblog.repository.CommentRepository;
import com.sparta.devleeblog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentController {

    CommentRepository commentRepository;
    CommentService commentService;

    @Autowired
    public CommentController(CommentRepository commentRepository, CommentService commentService) {
        this.commentRepository = commentRepository;
        this.commentService = commentService;
    }

    @PostMapping("/api/comments")
    public Comment creatComment(@RequestBody CommentDto commentDto) {
        Comment comment = new Comment(commentDto);
        System.out.println(commentDto.getUsername());
        System.out.println(comment.getUsername());

        return commentRepository.save(comment);
    }

    @GetMapping("/api/comments/{id}")
    public List<Comment> readComment(@PathVariable Long id) {
        System.out.println("포스트별 댓글 불러오기");
        return commentRepository.findByuidOrderByModifiedAtDesc(id);
    }

    @PutMapping("/api/comments/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody CommentDto commentDto){
        commentService.update(id, commentDto);
        return id;
    }


    @DeleteMapping("/api/comments/{id}")
    public Long deletePost(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return id;
    }
}