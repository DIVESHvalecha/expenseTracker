package com.divesh.expenseTracker.exceptions;

public class UserNameAlreadyTakenException extends Exception{
    public UserNameAlreadyTakenException(){
        super("Username already taken!");
    }
}
