package com.divesh.expenseTracker.exceptions;

public class InvalidToken extends Exception{
    public InvalidToken() {
        super("Your token has been expired");
    }
}
