package com.sparta.demo.repository;

import com.sparta.demo.model.Reply;
import com.sparta.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findAllByDebate_DebateId(Long debateId);

    Optional<Reply> findByReplyId(Long replyId);

    List<Reply> findAllByUser_Email(String email);
}
