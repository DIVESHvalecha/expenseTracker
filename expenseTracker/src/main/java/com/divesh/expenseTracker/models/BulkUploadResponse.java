package com.divesh.expenseTracker.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BulkUploadResponse {
    String amount;
    String note;
    String categoryName;
    String date;
    String type;

    List<String> errors;
}
