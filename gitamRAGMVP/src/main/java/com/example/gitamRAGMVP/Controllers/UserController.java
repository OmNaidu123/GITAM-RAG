package com.example.gitamRAGMVP.Controllers;

import com.example.gitamRAGMVP.Models.User;
import com.example.gitamRAGMVP.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.gitamRAGMVP.Service.securityService.jwtService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private jwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("register")
	public ResponseEntity<String> register(@RequestBody User user) {
		return service.saveUser(user);
	}

	@PostMapping("login")
	public  ResponseEntity<String> login(@RequestBody User user){
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
		);
		if(authentication.isAuthenticated())
			return new ResponseEntity<>(jwtService.generateToken(user.getUsername()), HttpStatus.OK);
		else
			return new ResponseEntity<>("failure",HttpStatus.UNAUTHORIZED);
	}
}
