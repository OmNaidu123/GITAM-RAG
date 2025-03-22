package com.example.gitamRAGMVP.Models.wrappers;

public class OptimizedHistory {
    private String message;
    private boolean isUser;

    public boolean isUser() {
        return isUser;
    }

    public void setUser(boolean user) {
        isUser = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "OptimizedHistory{" +
                "isUser=" + isUser +
                ", message='" + message + '\'' +
                '}';
    }
}
