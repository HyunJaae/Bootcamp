package com.sparta.devleeblog.service;

import com.sparta.devleeblog.dto.CommentDto;
import com.sparta.devleeblog.model.Comment;
import com.sparta.devleeblog.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public Long update(Long id, CommentDto commentDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        comment.commentUpdate(commentDto);
        System.out.println("서비스까지 넘어옴");
        return comment.getId();
    }
}
