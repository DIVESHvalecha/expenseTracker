package com.divesh.expenseTracker.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    Long transactionId;
    Long CategoryId;
    Long UserId;
    Double amount;
    String note;
    LocalDate date;
    Integer activeYn;

    String categoryName;
    String categoryType;

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId=" + transactionId +
                ", CategoryId=" + CategoryId +
                ", UserId=" + UserId +
                ", amount=" + amount +
                ", note='" + note + '\'' +
                ", date=" + date +
                ", activeYn=" + activeYn +
                ", categoryName='" + categoryName + '\'' +
                ", categoryType='" + categoryType + '\'' +
                '}';
    }
}