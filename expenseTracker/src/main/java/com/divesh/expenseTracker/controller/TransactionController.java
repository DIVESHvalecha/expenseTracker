package com.divesh.expenseTracker.controller;

import com.divesh.expenseTracker.exceptions.TransactionDoesntExist;
import com.divesh.expenseTracker.models.BulkUploadResponse;
import com.divesh.expenseTracker.models.Transaction;
import com.divesh.expenseTracker.service.AiService;
import com.divesh.expenseTracker.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;
    @Autowired
    AiService aiService;

    @PostMapping
    public ResponseEntity<Map<String, String>> createTransaction(Authentication auth, @RequestBody Transaction transaction){
        log.info(transaction.toString());
        try{
            transactionService.createTransaction(auth.getName(), transaction);
            return ResponseEntity.ok().body(Map.of("body", "Created Successfully"));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(Map.of("body", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getTransactions(Authentication auth, @RequestParam(name = "category" , required = false) String category, @RequestParam(name = "start" , required = false) LocalDate start, @RequestParam(name = "end" , required = false) LocalDate end, @RequestParam(name = "type" , required = false) String type, @RequestParam(name = "sortBy", defaultValue = "transaction_date") String sortBy, @RequestParam(name = "orderBy", defaultValue = "DESC") String orderBy, @RequestParam(name = "pageNo", required = false) Integer pageNo, @RequestParam(name = "itemSize", required = false) Integer itemSize){
        try{
            List<Transaction> result = transactionService.getTransactions(auth.getName(), category, start, end, type, sortBy, orderBy, pageNo, itemSize);
            log.info("Getting transactions {}", result);
            return ResponseEntity.ok().body(Map.of("body", result));
        }catch (Exception e){
            return  ResponseEntity.badRequest().body(Map.of("body", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getTransactionById(Authentication auth, @PathVariable("id") int id ){
        try{
            Transaction result = transactionService.getTransactionById(auth.getName(), id);
            return ResponseEntity.ok().body(Map.of("body", result));
        }catch (TransactionDoesntExist  e){
            return  ResponseEntity.badRequest().body(Map.of("body", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public  ResponseEntity<Map<String, String>> updateTransaction(Authentication auth, @PathVariable("id") Long id, @RequestBody Transaction transaction){
        transactionService.updateTransaction(transaction, id, auth.getName());
        return ResponseEntity.ok().body(Map.of("body", "updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTransaction(Authentication auth, @PathVariable("id") Long id){
        transactionService.deleteTransaction(id, auth.getName());
        return ResponseEntity.ok().body(Map.of("body", "deleted successfully"));
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<Map<String, Object>> bulkUpload(@RequestParam(name = "file") MultipartFile file, Authentication auth){
        try {
            List<BulkUploadResponse> exceptions = transactionService.read(file, auth.getName());
            return ResponseEntity.ok().body(Map.of("body", exceptions));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

//    @GetMapping("/prompt/{note}")
//    public String suggestCategories(@PathVariable(name = "note") String note){
//        return aiService.suggestCategory(note, List.of("sports", "education", "business", "food"));
//    }
}
