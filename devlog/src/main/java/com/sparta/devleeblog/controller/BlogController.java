package com.sparta.devleeblog.controller;

import com.sparta.devleeblog.model.Blog;
import com.sparta.devleeblog.dto.PostDto;
import com.sparta.devleeblog.repository.PostRepository;
import com.sparta.devleeblog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BlogController {
    private final PostRepository postRepository;
    private final BlogService blogService;

    @PostMapping("/api/posts")
    public Blog creatPost(@RequestBody PostDto postDto) {
        Blog post = new Blog(postDto);
        return postRepository.save(post);
    }

    @GetMapping("/api/posts")
    public List<Blog> readPost() {
        return postRepository.findAllByOrderByModifiedAtDesc();
    }

    @GetMapping("/api/posts/{id}")
    public List<Blog> selectMyPost(@PathVariable Long id) {
        return postRepository.findByIdOrderByModifiedAtDesc(id);
    }

    @PutMapping("/api/posts/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostDto postDto){
        blogService.update(id, postDto);
        return id;
    }

    @DeleteMapping("/api/posts/{id}")
    public Long deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return id;
    }
}
