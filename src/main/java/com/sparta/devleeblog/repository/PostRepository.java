package com.sparta.devleeblog.repository;

import com.sparta.devleeblog.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Blog, Long> {
    //JpaRepository에서 가져다 쓰는건 findAll, delete, save 등 같은 메소드들
    List<Blog> findAllByOrderByModifiedAtDesc();
    List<Blog> findByIdOrderByModifiedAtDesc(Long id);
    // findAll By OrderBy(order가 순서라는 뜻이니까 정렬해달라는 뜻, 쓸 때는 꼭 ByOderBy로 기재할 것) ModifiedAt(수정된 날짜) Desc(내림차순)
    // 최신순으로 정렬해달라는 뜻이다. ModifiedAt은 Timestamped 클래스에 있다.
}
