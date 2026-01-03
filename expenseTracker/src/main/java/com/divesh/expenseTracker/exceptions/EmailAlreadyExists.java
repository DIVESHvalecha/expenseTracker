package com.divesh.expenseTracker.exceptions;

public class EmailAlreadyExists extends Exception{
    public EmailAlreadyExists(){
        super("Email already exists!");
    }
}
