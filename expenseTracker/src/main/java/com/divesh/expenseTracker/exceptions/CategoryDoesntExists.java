package com.divesh.expenseTracker.exceptions;

public class CategoryDoesntExists extends Exception{
    public CategoryDoesntExists(){
        super("Category Doesn't exists with id");
    }
}
