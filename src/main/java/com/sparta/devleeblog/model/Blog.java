package com.sparta.devleeblog.model;


import com.sparta.devleeblog.dto.PostDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Blog extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String username;

    @Column(nullable = false)
    private String contents;

    public Blog(String username, String contents) {
        this.username = username;
        this.contents = contents;
    }

    public Blog(PostDto postDto) {
        this.username = postDto.getUsername();
        this.contents = postDto.getContents();
    }

    public void update(PostDto requestDto) {
        this.username = requestDto.getUsername();
        this.contents = requestDto.getContents();
    }



}
