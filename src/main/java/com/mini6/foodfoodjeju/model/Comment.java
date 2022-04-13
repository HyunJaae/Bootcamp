package com.mini6.foodfoodjeju.model;

import com.mini6.foodfoodjeju.dto.CommentDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter // get 함수를 일괄적으로 만들어줍니다.
@NoArgsConstructor // 기본 생성자를 만들어줍니다.
@Entity
public class Comment {
    // ID가 자동으로 생성 및 증가합니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long commentId;

    @Column
    private Long storeId;

    @Column
    private Long userId;

    @Column
    private String userName;

    @Column
    private String comment;

    public Comment(Long storeId, Long userId, String nickName, String comment) {
        this.storeId = storeId;
        this.userId = userId;
        this.userName = nickName;
        this.comment = comment;
    }

    public void update(CommentDto commentDto) {
        this.userId = commentDto.getUserId();
        this.userName = commentDto.getUserName();
        this.comment = commentDto.getComment();
    }
}
