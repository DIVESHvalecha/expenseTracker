package com.divesh.expenseTracker.automation;

import com.divesh.expenseTracker.models.Transaction;
import com.divesh.expenseTracker.repository.AuthRepository;
import com.divesh.expenseTracker.service.EmailService;
import com.divesh.expenseTracker.service.TransactionService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.openpdf.text.Document;
import org.openpdf.text.Paragraph;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
public class WeeklyReportScheduler {

    @Autowired
    EmailService emailService;
    @Autowired
    AuthRepository authRepository;
    @Autowired
    TransactionService transactionService;

    @Scheduled(cron = "0 */2 * * * *")
    public void sendReport() throws MessagingException {
        log.info("Sending weekly report");
        List<String> emails = authRepository.findAllEmails();
        LocalDate today = LocalDate.now();
        LocalDate before = today.minusDays(7);

        String subject = "Your weekly report from " + before + " to " + today;

        for(String email : emails){
            byte[] report = getReport(email, before, today);
//            log.info(transactions.toString());
//
            emailService.sendReport(email, report, subject);
        }
    }

    private byte[] getReport(String email, LocalDate start, LocalDate end){
        List<Transaction> transactions = transactionService.getTransactions(email, null, start, end, null, null, null, null, null);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);
        document.open();

        document.add(new Paragraph("Your weekly report is here!"));

        PdfPTable table = new PdfPTable(5);
        table.addCell("Amount");
        table.addCell("note");
        table.addCell("Transaction date");
        table.addCell("Transaction Category");
        table.addCell("Transaction type");

        for(Transaction t: transactions){
            table.addCell(String.valueOf(t.getAmount()));
            table.addCell(t.getNote());
            table.addCell(t.getDate().toString());
            table.addCell(t.getCategoryName());
            table.addCell(t.getCategoryType());
        }

        document.add(table);
        document.close();

        return out.toByteArray();

    }

 }
