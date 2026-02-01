package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void createCategory(Category category) {
        String name = category.getName();
        String description = category.getDescription();
        String url = category.getUrl();
        String type = category.getType();
        long userId = category.getUserId();

        categoryRepository.createCategory(userId, name, description, url, type);
    }

    public List<Category> getCategories() {
        return categoryRepository.getCategories();
    }

    public Category getCategoriesById(int id) {
        return categoryRepository.getCategoryById(id);
    }

    public void updateCategory(int id, Category category) {
        long userId = category.getUserId();
        String name = category.getName();
        String description = category.getDescription();
        String url = category.getUrl();
        String type = category.getType();

        categoryRepository.updateCategory(id, userId, name, description, url, type);
    }
}
