package com.divesh.expenseTracker.repository;

import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.rowmapper.CategoryRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class CategoryRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createCategory(long userId, String name, String description, String url, String type) {
        String query = "INSERT INTO categories (user_id, name, description, icon_url, type) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query, userId, name, description, url, type);
        log.info("reached repository");
    }

    public List<Category> getCategories(long userId) {
        String query = "SELECT category_id, user_id, name, description, icon_url, type, active_yn from categories where user_id = ? AND active_yn = 1";
        return jdbcTemplate.query(query, new CategoryRowMapper(), userId);
    }

    public Category getCategoryById(int id, long userId) {
        String query = "SELECT category_id, user_id, name, description, icon_url, type, active_yn from categories WHERE category_id = ? AND user_id = ? AND active_yn = 1";
        try{
            return jdbcTemplate.queryForObject(query,  new CategoryRowMapper(), id, userId);
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    public Category getCategoryByName(String name, long userId, String type){
        String query = "SELECT category_id, user_id, name, description, icon_url, type, active_yn from categories WHERE name = ? AND user_id = ? AND type = ? AND active_yn = 1";
        try{
            return jdbcTemplate.queryForObject(query,  new CategoryRowMapper(), name, userId, type);
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    public void updateCategory(int id, long userId, String name, String description, String url, String type) {
        String query = "update categories set name = ?, description = ?, icon_url = ?, type = ? where category_id = ? and user_id = ? and active_yn = 1";
        jdbcTemplate.update(query, name, description, url, type, id, userId);
    }

    public void deleteCategory(int id, long userId) {
        String query = "update categories set active_yn = 0 where category_id = ? and user_id = ?";
        jdbcTemplate.update(query, id, userId);
    }
}
