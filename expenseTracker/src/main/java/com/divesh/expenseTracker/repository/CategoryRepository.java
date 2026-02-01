package com.divesh.expenseTracker.repository;

import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.rowmapper.CategoryRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Category> getCategories() {
        String query = "SELECT category_id, user_id, name, description, icon_url, type, active_yn from categories";
        return jdbcTemplate.query(query, new CategoryRowMapper());
    }

    public Category getCategoryById(int id) {
        String query = "SELECT category_id, user_id, name, description, icon_url, type, active_yn from categories WHERE category_id = ?";
        return jdbcTemplate.queryForObject(query,  new CategoryRowMapper(), id);
    }

    public void updateCategory(int id, long userId, String name, String description, String url, String type) {
        String query = "update categories set user_id = ?, name = ?, description = ?, icon_url = ?, type = ? where category_id = ?;";
        jdbcTemplate.update(query, userId, name, description, url, type, id);
    }
}
