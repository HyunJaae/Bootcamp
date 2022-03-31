package com.sparta.devleeblog.model;

import com.sparta.devleeblog.dto.LikeDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class LikeHeart {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column
    private String username;

    @Column
    private Integer commentNum;

    public LikeHeart(String username, Integer commentNum) {
        this.username = username;
        this.commentNum = commentNum;
    }

    public LikeHeart(LikeDto likeDto) {
        this.username = likeDto.getUsername();
        this.commentNum = likeDto.getCommentNum();
    }
}
