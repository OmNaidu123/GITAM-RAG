package com.example.gitamRAGMVP.Service;
import com.example.gitamRAGMVP.Models.User;
import com.example.gitamRAGMVP.dao.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepo repo;
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

	public ResponseEntity<String> saveUser(User user) {
		try {
			user.setPassword(encoder.encode(user.getPassword()));
			if (repo.findById(user.getUsername()).orElse(null) == null) {
				repo.save(user);
			} else {
				return new ResponseEntity<>("user already exists", HttpStatus.CONFLICT);
			}
			return new ResponseEntity<>("succuss", HttpStatus.CREATED);
		}
		catch (Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
