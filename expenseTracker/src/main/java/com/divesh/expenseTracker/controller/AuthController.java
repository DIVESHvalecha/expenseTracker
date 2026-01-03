package com.divesh.expenseTracker.controller;

import com.divesh.expenseTracker.exceptions.EmailAlreadyExists;
import com.divesh.expenseTracker.exceptions.InvalidEmailException;
import com.divesh.expenseTracker.exceptions.UserNameAlreadyTakenException;
import com.divesh.expenseTracker.models.User;
import com.divesh.expenseTracker.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    AuthService authService;

    Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user){
        try{
            authService.register(user);
            logger.info("Registered successfully");
            return ResponseEntity.ok().body(Map.of("body", "Inserted successfully!"));
        }catch(InvalidEmailException | EmailAlreadyExists | UserNameAlreadyTakenException e){
            logger.error(e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("body", e.getMessage()));
        }
    }

    //    check email validity
    //    email already exists
    //    username already exists
    //    Hash Pwd before register
    //    if all passed then call repository
}
