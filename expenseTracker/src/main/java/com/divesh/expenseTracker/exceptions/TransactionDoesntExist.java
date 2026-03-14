package com.divesh.expenseTracker.exceptions;

public class TransactionDoesntExist extends Exception{
    public TransactionDoesntExist(String message) {
        super(message);
    }
}
