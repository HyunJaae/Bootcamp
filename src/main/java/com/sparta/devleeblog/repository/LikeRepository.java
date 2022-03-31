package com.sparta.devleeblog.repository;

import com.sparta.devleeblog.model.LikeHeart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<LikeHeart, Long> {
}
