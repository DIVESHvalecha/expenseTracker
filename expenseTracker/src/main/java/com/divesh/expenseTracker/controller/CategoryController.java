package com.divesh.expenseTracker.controller;

import com.divesh.expenseTracker.exceptions.CategoryDoesntExists;
import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/categories")
    public ResponseEntity<Map<String, String>> createCategory(@RequestBody Category category, Authentication auth){
        log.info(auth.getName());
        categoryService.createCategory(category, auth.getName());
        return ResponseEntity.ok().body(Map.of("body", "category inserted successfully"));
    }

    @GetMapping("/categories")
    public List<Category> getCategories(Authentication auth){
        return categoryService.getCategories(auth.getName());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable(name = "id") int id, Authentication auth){
        try{
            return ResponseEntity.ok().body(Map.of("body", categoryService.getCategoriesById(id, auth.getName())));
        }catch(CategoryDoesntExists e){
            return ResponseEntity.badRequest().body(Map.of("body", e.getMessage()));
        }

    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Map<String, String>> updateCategory(@PathVariable(name = "id") int id, @RequestBody Category category, Authentication auth){
        categoryService.updateCategory(id, category, auth.getName());
        return ResponseEntity.ok().body(Map.of("body", "Updated successfully"));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable(name = "id") int id,  Authentication auth){
        categoryService.deleteCategory(id, auth.getName());
        return ResponseEntity.ok().body(Map.of("body", "deleted successfully"));
    }
}
