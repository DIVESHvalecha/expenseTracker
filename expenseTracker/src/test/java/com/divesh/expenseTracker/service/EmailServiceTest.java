package com.divesh.expenseTracker.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmailServiceTest {

    @Autowired
    EmailService emailService;

    @Test
    public void testsendEmail(){
        emailService.sendEmail("valechadivesh33@gmail.com", "abcdefg");
    }
}