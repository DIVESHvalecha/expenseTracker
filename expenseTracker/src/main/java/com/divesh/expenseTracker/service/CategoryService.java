package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.exceptions.CategoryDoesntExists;
import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.models.User;
import com.divesh.expenseTracker.repository.AuthRepository;
import com.divesh.expenseTracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthRepository authRepository;

    public void createCategory(Category category, String userEmail) {
        String name = category.getName();
        String description = category.getDescription();
        String url = category.getUrl();
        String type = category.getType();
        User user = authRepository.findByEmail(userEmail);
        long userId = user.getId();
        category.setUserId(userId);

        categoryRepository.createCategory(userId, name, description, url, type);
    }

    public List<Category> getCategories(String userEmail) {
        User user = authRepository.findByEmail(userEmail);
        long userId = user.getId();
        return categoryRepository.getCategories(userId);
    }

    public Category getCategoriesById(int id, String userEmail) throws CategoryDoesntExists {
        User user = authRepository.findByEmail(userEmail);
        long userId = user.getId();
        Category category = categoryRepository.getCategoryById(id, userId);
        if(category == null){
            throw new CategoryDoesntExists();
        }else{
            return category;
        }
    }

    public void updateCategory(int id, Category category, String userEmail) {
//        long userId = category.getUserId();
        String name = category.getName();
        String description = category.getDescription();
        String url = category.getUrl();
        String type = category.getType();
        User user = authRepository.findByEmail(userEmail);
        long userId = user.getId();

        categoryRepository.updateCategory(id, userId, name, description, url, type);
    }

    public void deleteCategory(int id, String userEmail) {
        User user = authRepository.findByEmail(userEmail);
        long userId = user.getId();

        categoryRepository.deleteCategory(id, userId);
    }
}
