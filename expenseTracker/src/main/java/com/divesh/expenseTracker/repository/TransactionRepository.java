package com.divesh.expenseTracker.repository;

import com.divesh.expenseTracker.exceptions.TransactionDoesntExist;
import com.divesh.expenseTracker.models.Transaction;
import com.divesh.expenseTracker.rowmapper.TransactionRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
@Slf4j
public class TransactionRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public void createTransaction(Long categoryId, Double amount, String note, LocalDate date, Long userId) {
        String query = "INSERT INTO transactions (category_id, user_id, amount, transaction_date, notes) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query, categoryId, userId, amount, date, note);
    }

    public List<Transaction> getTransactions(Long userId, String category, LocalDate start, LocalDate end, String type, String sortBy, String orderBy, Integer pageNo, Integer itemSize) {
        StringBuilder query = new StringBuilder("SELECT t.transaction_id, t.user_id, t.category_id, t.amount, t.notes, t.transaction_date, t.active_yn, c.name, c.type\n" +
                "from transactions t\n" +
                "inner join  categories c\n" +
                "on t.category_id = c.category_id\n" +
                "where t.active_yn = 1 and t.user_id = ?");

        ArrayList<Object> params = new ArrayList<>();
        params.add(userId);

        if (category != null) {
            query.append(" and c.name = ?");
            params.add(category);
        }
        if (type != null) {
            query.append(" and c.type = ?");
            params.add(type);
        }

        if (start != null && end != null) {
            query.append(" and t.transaction_date between ? and ?");
            params.add(start);
            params.add(end);
        }else if(start == null && end != null){
            LocalDate startDate = end.minusDays(30);
            query.append(" and t.transaction_date between ? and ?");
            params.add(startDate);
            params.add(end);
        }else if(start != null && end == null){
            LocalDate endDate = LocalDate.now();
            query.append(" and t.transaction_date between ? and ?");
            params.add(start);
            params.add(endDate);
        } else {
            LocalDate endDate = LocalDate.now();
            LocalDate startDate = LocalDate.now().minusDays(30);
            query.append(" and t.transaction_date between ? and ?");
            params.add(startDate);
            params.add(endDate);
        }

        if("transaction_date".equals(sortBy)){
            sortBy = "t.transaction_date";
        } else if ("amount".equals(sortBy)) {
            sortBy = "t.amount";
        }else {
            sortBy = "t.transaction_date";
        }

        if(orderBy.compareToIgnoreCase("ASC")==0){
            orderBy = "ASC";
        } else if (orderBy.compareToIgnoreCase("DESC")==0) {
            orderBy = "DESC";
        }else{
            orderBy = "DESC";
        }

        query.append(" order by ");
        query.append(sortBy);
        query.append(" ");
        query.append(orderBy);

        if(pageNo != null && itemSize != null){
            query.append(" limit ?");
            params.add(itemSize);
            query.append(" offset ?");
            params.add(((pageNo-1)*itemSize));
        }

//        log.info(query.toString());
//        log.info(params.toString());
        return jdbcTemplate.query(query.toString(), new TransactionRowMapper(), params.toArray());
    }


    public Transaction getTransactionById (Long userId,int id) throws TransactionDoesntExist {
        String query = "SELECT t.transaction_id, t.user_id, t.category_id, t.amount, t.notes, t.transaction_date, t.active_yn, c.name, c.type\n" +
                "from transactions t\n" +
                "inner join  categories c\n" +
                "on t.category_id = c.category_id\n" +
                "where t.active_yn = 1 and t.user_id = ? and t.transaction_id = ?";

        try {
            return jdbcTemplate.queryForObject(query, new TransactionRowMapper(), userId, id);
        } catch (EmptyResultDataAccessException e) {
            throw new TransactionDoesntExist("transaction with this id doesn't exist");
        }
    }

    public void updateTransaction (Long id, Long categoryId, Double amount, String note, LocalDate date, Long userId) {
        String query = "update transactions set category_id = ?, amount = ?, transaction_date = ?, notes = ? where transaction_id = ? and active_yn = 1 and user_id = ?";

        jdbcTemplate.update(query, categoryId, amount, date, note, id, userId);
    }

    public void deleteTransaction (Long id, Long userId){
        String query = "update transactions set active_yn = 0 where transaction_id = ? and user_id = ?";

        jdbcTemplate.update(query, id, userId);
    }
}