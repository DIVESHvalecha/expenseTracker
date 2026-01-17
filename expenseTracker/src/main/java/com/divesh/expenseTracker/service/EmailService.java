package com.divesh.expenseTracker.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(String to, String token){
        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper messageHelper = new MimeMessageHelper(message);

        try {
            String html = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<body style=\"font-family:Arial; background:#f4f4f4; padding:20px;\">\n" +
                    "  <div style=\"max-width:400px; background:#fff; padding:20px; margin:auto;\">\n" +
                    "    <p>Hi,</p>\n" +
                    "    <p>Your request was successful.</p>\n" +
                    "    <p>– Team</p>\n" +
                    "  </div>\n" +
                    "</body>\n" +
                    "</html>\n";
            messageHelper.setTo(to);
//            messageHelper.setText(token);
            messageHelper.setSubject("Reset password - Expense Tracker");
            messageHelper.setText(html, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        javaMailSender.send(message);
    }
}
