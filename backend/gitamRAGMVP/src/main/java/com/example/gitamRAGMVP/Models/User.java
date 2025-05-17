package com.example.gitamRAGMVP.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Table(name = "users")
@Entity
public class User {
	
	@Id
	private String username;
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "User{" +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				'}';
	}
}
