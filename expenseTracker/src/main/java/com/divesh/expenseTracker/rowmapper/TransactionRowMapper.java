package com.divesh.expenseTracker.rowmapper;

import com.divesh.expenseTracker.models.Transaction;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class TransactionRowMapper implements RowMapper<Transaction> {
    @Override
    public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
        Transaction transaction = new Transaction();

        Long transactionId = rs.getLong("transaction_id");
        Long categoryId = rs.getLong("category_id");
        Long userId = rs.getLong("user_id");
        Double amount = rs.getDouble("amount");
        String note = rs.getString("notes");
        LocalDate date = LocalDate.parse(rs.getString("transaction_date"));
        Integer activeYn = rs.getInt("active_yn");
        String categoryName = rs.getString("name");
        String categoryType = rs.getString("type");

        transaction.setTransactionId(transactionId);
        transaction.setUserId(userId);
        transaction.setCategoryId(categoryId);
        transaction.setAmount(amount);
        transaction.setNote(note);
        transaction.setDate(date);
        transaction.setActiveYn(activeYn);
        transaction.setCategoryName(categoryName);
        transaction.setCategoryType(categoryType);

        return transaction;
    }
}
