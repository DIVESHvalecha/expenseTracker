package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.models.Category;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    @Autowired
    ChatModel chatModel;

    public String suggestCategory(String description, List<Category> categories){
        String prompt = """
                Categorize this description : {description}.
                Available categories : {categories}
                
                the category has the fields id, userId, name, description, url, type(income || expense) and active_yn
                
                Rules:
                1. From the category list try to get the name or description and even type and active yn and give me only the name of any one category that matches the given description.
                2. If not give me a new valid category
                3. Answer must be exactly in one word.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(prompt);
        Map<String, Object> params = Map.of(
                "description" , description,
                "categories", categories
        );
        return chatModel.call(promptTemplate.create(params)).getResult().getOutput().getText();
    }
}
