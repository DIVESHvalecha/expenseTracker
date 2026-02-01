package com.divesh.expenseTracker.rowmapper;

import com.divesh.expenseTracker.models.Category;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoryRowMapper implements RowMapper<Category> {

    @Override
    public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
        Category category = new Category();
        Long id = rs.getLong("category_id");
        Long userId = rs.getLong("user_id");
        String name = rs.getString("name");
        String description = rs.getString("description");
        String url = rs.getString("icon_url");
        String type = rs.getString("type");
        Integer activeYn = rs.getInt("active_yn");

        category.setActiveYn(activeYn);
        category.setId(id);
        category.setUserId(userId);
        category.setName(name);
        category.setDescription(description);
        category.setType(type);
        category.setUrl(url);

        return category;
    }
}
