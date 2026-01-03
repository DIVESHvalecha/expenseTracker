package com.divesh.expenseTracker.repository;

import com.divesh.expenseTracker.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;

@Repository
public class AuthRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void register(String name, String userName, String phoneNo, String email, String password){
        String query = "INSERT INTO users (name, username, password, email, phone_no) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query,name, userName, password, email, phoneNo );
    }

    public User findByEmail(String email){
        String query = "SELECT user_id, name, username, password, email, phone_no, active_yn FROM users WHERE email = ?";
        try{
            return jdbcTemplate.queryForObject(query,(rs, rowNum) -> {
                User user = new User();
                user.setId(rs.getLong("user_id"));
                user.setName(rs.getString("name"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setEmail(rs.getString("email"));
                user.setPhoneNo(rs.getString("phone_no"));
                user.setActiveYn(rs.getInt("active_yn"));
                return user;
            }, email);
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    public User findByUsername(String userName){
        String query = "SELECT user_id, name, username, password, email, phone_no, active_yn FROM users WHERE username = ?";
        try{
            return jdbcTemplate.queryForObject(query,(rs, rowNum) -> {
                User user = new User();
                user.setId(rs.getLong("user_id"));
                user.setName(rs.getString("name"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setEmail(rs.getString("email"));
                user.setPhoneNo(rs.getString("phone_no"));
                user.setActiveYn(rs.getInt("active_yn"));
                return user;
            }, userName);
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }
}
