package com.example.gitamRAGMVP.Models.wrappers;

import org.springframework.stereotype.Component;


@Component
public class ChatWrapper {
    private int id;
    private String username;
    private String chatName;

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "ChatWrapper{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", chatName='" + chatName + '\'' +
                '}';
    }
}
