package com.divesh.expenseTracker.service;

import com.divesh.expenseTracker.controller.CategoryController;
import com.divesh.expenseTracker.exceptions.TransactionDoesntExist;
import com.divesh.expenseTracker.models.Category;
import com.divesh.expenseTracker.models.Transaction;
import com.divesh.expenseTracker.models.User;
import com.divesh.expenseTracker.repository.AuthRepository;
import com.divesh.expenseTracker.repository.CategoryRepository;
import com.divesh.expenseTracker.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import static com.divesh.expenseTracker.constants.Constants.DEFAULT_CATEGORY_DESCRIPTION;
import static com.divesh.expenseTracker.constants.Constants.DEFAULT_ICON_URL;

@Service
@Slf4j
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    AuthRepository authRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryController categoryController;
    @Autowired
    CategoryService categoryService;

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

    public List<List<String>> read(MultipartFile file, String email) throws IOException {
        List<List<String>> exceptions = new ArrayList<>();

        User user = authRepository.findByEmail(email);
        Long userId = user.getId();

        Scanner scanner = new Scanner(file.getInputStream());
        scanner.nextLine();
        while(scanner.hasNext()){
            List<String> list = new ArrayList<>();
            String row = scanner.nextLine();
            String[] rowData = row.split(",");
            if (rowData.length < 5){
                list.add("Some of the fields are empty");
            }
            Double amount = 0.0;
            try{
                amount = Double.valueOf(rowData[0]);
            }catch (NumberFormatException e){
                list.add("please enter amount in correct format");
            }
            String note = rowData[1];
            String categoryName = rowData[2].toLowerCase().trim();
            if (categoryName.isEmpty()){
                list.add("Category is not defined");
            }
            LocalDate date = LocalDate.now();
            try {
                date = LocalDate.parse(rowData[3]);
            }catch (DateTimeParseException e){
                list.add("Please add date in correct format");
            }
            String type = rowData[4].toUpperCase().trim();

            log.info("Row is {}, {}, {}, {}, {}", amount, note, categoryName, date, type);
            if(!list.isEmpty()){
                exceptions.add(list);
                continue;
            }
            Category result = categoryRepository.getCategoryByName(categoryName, userId, type);
            if(result != null){
                log.info(result.toString());
            }else{
                Category temp = new Category();
                temp.setName(categoryName);
                temp.setDescription(DEFAULT_CATEGORY_DESCRIPTION);
                temp.setUrl(DEFAULT_ICON_URL);
                temp.setType(type);
                categoryService.createCategory(temp, email);
                result = categoryRepository.getCategoryByName(categoryName, userId, type);
            }

            Transaction transaction = new Transaction();
            transaction.setNote(note);
            transaction.setCategoryId(result.getId());
            transaction.setDate(date);
            transaction.setAmount(amount);

            this.createTransaction(email, transaction);
            exceptions.add(list);
        }
        return exceptions;
    }
}
