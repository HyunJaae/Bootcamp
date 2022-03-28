package com.sparta.devleeblog.service;

import com.sparta.devleeblog.model.Blog;
import com.sparta.devleeblog.dto.PostDto;
import com.sparta.devleeblog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BlogService {

    private final PostRepository postRepository;

    @Transactional
    public Long update(Long id, PostDto postDto) {
        Blog post = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        post.update(postDto);
        return post.getId();
    }
}
