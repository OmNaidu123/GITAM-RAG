package com.example.gitamRAGMVP.dao;
import com.example.gitamRAGMVP.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

	User findByUsername(String username);
}
