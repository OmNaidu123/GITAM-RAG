package com.example.gitamRAGMVP.dao;

import com.example.gitamRAGMVP.Models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer> {
    List<Chat> findByUser_Username(String username);

    @Query("FROM Chat c WHERE c.user.username = :username AND c.chatName LIKE %:keyword%")
    List<Chat> searchChatByChatNameAndUser(String username, String keyword);
}
