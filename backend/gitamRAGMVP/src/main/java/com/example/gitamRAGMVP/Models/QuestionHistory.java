package com.example.gitamRAGMVP.Models;

import jakarta.persistence.*;

@Entity
public class QuestionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
    @Column(columnDefinition = "TEXT")
    private String message;
    private boolean isUser;

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isUser() {
        return isUser;
    }

    public void setUser(boolean user) {
        isUser = user;
    }

    @Override
    public String toString() {
        return "QuestionHistory{" +
                "chat=" + chat +
                ", id=" + id +
                ", message='" + message + '\'' +
                ", isUser=" + isUser +
                '}';
    }
}
