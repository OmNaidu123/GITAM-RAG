package com.example.gitamRAGMVP.dao;

import com.example.gitamRAGMVP.Models.QuestionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionHistoryRepo extends JpaRepository<QuestionHistory, Integer> {

    List<QuestionHistory> findByChat_Id(int id);
}
