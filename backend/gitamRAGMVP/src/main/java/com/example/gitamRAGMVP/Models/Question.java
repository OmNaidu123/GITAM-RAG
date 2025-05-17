package com.example.gitamRAGMVP.Models;

import org.springframework.stereotype.Component;

@Component
public class Question {
    private String username;
    private int chatId;
    private boolean ragMode;
    private String question;

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public boolean isRagMode() {
        return ragMode;
    }

    public void setRagMode(boolean ragMode) {
        this.ragMode = ragMode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Question{" +
                "chatId=" + chatId +
                ", username='" + username + '\'' +
                ", ragMode=" + ragMode +
                ", question='" + question + '\'' +
                '}';
    }
}
