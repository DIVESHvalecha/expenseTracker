package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.exceptions.EmailAlreadyExists;
import com.divesh.expenseTracker.exceptions.InvalidEmailException;
import com.divesh.expenseTracker.exceptions.UserNameAlreadyTakenException;
import com.divesh.expenseTracker.models.User;
import com.divesh.expenseTracker.repository.AuthRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService {

    @Autowired
    AuthRepository authRepository;

//    Logger logger = LoggerFactory.getLogger(AuthService.class);
    Logger logger = LoggerFactory.getLogger(AuthService.class);
    public void register(User user) throws EmailAlreadyExists, InvalidEmailException, UserNameAlreadyTakenException {
        String name = user.getName();
        String userName = user.getUsername();
        String phoneNo = user.getPhoneNo();
        String password = user.getPassword();
        String email = user.getEmail();

        if(authRepository.findByEmail(email) != null){
            throw new EmailAlreadyExists();
        }

        if(authRepository.findByUsername(userName) != null){
            throw new UserNameAlreadyTakenException();
        }

        if(!isEmailValid(email)){
            throw new InvalidEmailException();
        }
        System.out.println("Reached to service");
        authRepository.register(name, userName, phoneNo, email, password);
    }

    private boolean isEmailValid(String email){
        if(email == null)   return false;
        String REGEX = "^[A-Za-z0-9.+-_]+@[A-Za-z0-9.+-_]+\\.[a-z]{2,}$";
        Pattern pattern = Pattern.compile(REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
