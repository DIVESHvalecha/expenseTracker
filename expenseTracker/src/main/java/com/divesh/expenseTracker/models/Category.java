package com.divesh.expenseTracker.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    Long id;
    Long userId;
    String name;
    String description;
    String url;
    String type;
    Integer activeYn;
}
