package com.sparta.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class OneClick {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long oneClickId;

    @Column(nullable = false)
    private String oneClickTopic;

    @Column
    private int agreeNum;

    @Column
    private int oppoNum;

    @OneToMany
    @JsonIgnore
    private List<OneClickUser> oneClickUsers;
}
