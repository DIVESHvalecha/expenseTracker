package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.exceptions.TransactionDoesntExist;
import com.divesh.expenseTracker.models.Transaction;
import com.divesh.expenseTracker.models.User;
import com.divesh.expenseTracker.repository.AuthRepository;
import com.divesh.expenseTracker.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

@Service
@Slf4j
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    AuthRepository authRepository;

    public void createTransaction(String email, Transaction transaction) {
        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        Long categoryId = transaction.getCategoryId();
        Double amount = transaction.getAmount();
        String note = transaction.getNote();
        LocalDate date = transaction.getDate();
        transaction.setUserId(userId);

        transactionRepository.createTransaction(categoryId, amount, note, date, userId);
    }

    public List<Transaction> getTransactions(String email, String category, LocalDate start, LocalDate end, String type, String sortBy, String orderBy, Integer pageNo, Integer itemSize) {
        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        return transactionRepository.getTransactions(userId, category, start, end, type, sortBy, orderBy, pageNo, itemSize);
    }

    public Transaction getTransactionById(String email, int id) throws TransactionDoesntExist {
        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        return transactionRepository.getTransactionById(userId, id);
    }

    public void updateTransaction(Transaction transaction, Long id, String email) {
        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        Long categoryId = transaction.getCategoryId();
        Double amount = transaction.getAmount();
        String note = transaction.getNote();
        LocalDate date = transaction.getDate();

        transactionRepository.updateTransaction(id, categoryId, amount, note, date, userId);
    }

    public void deleteTransaction(Long id, String email) {
        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        transactionRepository.deleteTransaction(id, userId);
    }

    public void read(MultipartFile file) throws IOException {
        Scanner scanner = new Scanner(file.getInputStream());
        while(scanner.hasNext()){
            log.info(scanner.nextLine());
        }
    }
}
