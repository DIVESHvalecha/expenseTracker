package com.divesh.expenseTracker.controller;

import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/categories")
    public ResponseEntity<Map<String, String>> createCategory(@RequestBody Category category){
        categoryService.createCategory(category);
        return ResponseEntity.ok().body(Map.of("body", "category inserted successfully"));
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryService.getCategories();
    }

    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable(name = "id") int id){
        return categoryService.getCategoriesById(id);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Map<String, String>> updateCategory(@PathVariable(name = "id") int id, @RequestBody Category category){
        categoryService.updateCategory(id, category);
        return ResponseEntity.ok().body(Map.of("body", "Updated successfully"));
    }
}
