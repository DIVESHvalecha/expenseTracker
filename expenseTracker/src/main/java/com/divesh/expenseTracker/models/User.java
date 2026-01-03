package com.divesh.expenseTracker.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    long id;
    String name;
    String username;
    String password;
    String email;
    String phoneNo;
    int activeYn;
}
