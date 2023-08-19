package com.sparta.devleeblog.model;

import com.sparta.devleeblog.dto.CommentDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Long uid;

    @Column
    private String username;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private int likeCount;

    public Comment(Long uid, String username, String contents) {
        this.uid = uid;
        this.username = username;
        this.contents = contents;
        this.likeCount = 0;
    }

    public Comment(CommentDto commentDto) {
        this.uid = commentDto.getUid();
        this.username = commentDto.getUsername();
        this.contents = commentDto.getContents();
    }

    public void commentUpdate(CommentDto requestDto) {
        this.uid = requestDto.getUid();
        this.username = requestDto.getUsername();
        this.contents = requestDto.getContents();
    }

    public void addCount() {
        likeCount++;
    }



}