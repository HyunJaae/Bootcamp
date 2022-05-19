package com.sparta.demo.repository;

import com.sparta.demo.enumeration.CategoryEnum;
import com.sparta.demo.model.Debate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface  DebateRepository extends JpaRepository<Debate, Long> {
    Optional<Debate> findByRoomId(String roomId);

    Optional<Debate> findByDebateId(Long debateId);

    List<Debate> findAllByCategoryEnum(CategoryEnum categoryName);

    List<Debate> findAllByOrderByCreatedAtDesc();

    Optional<Debate> findByRoomIdAndProsName(String roomId, String username);
    Optional<Debate> findByRoomIdAndConsName(String roomId, String username);

    List<Debate> findAllByProsNameOrConsName(String userEmailPros, String userEmailCons);
}
