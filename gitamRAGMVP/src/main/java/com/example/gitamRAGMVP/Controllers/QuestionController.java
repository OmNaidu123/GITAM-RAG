package com.example.gitamRAGMVP.Controllers;

import com.example.gitamRAGMVP.Models.Question;
import com.example.gitamRAGMVP.Models.wrappers.OptimizedHistory;
import com.example.gitamRAGMVP.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionService service;

    @PostMapping("question")
    public ResponseEntity<String> callAI(@RequestBody Question question){
        return service.generateResponse(question);
    }

    @GetMapping("fetch/{chatId}")
    public ResponseEntity<List<OptimizedHistory>> getHis(@PathVariable int chatId){
        return service.getChatHis(chatId);
    }
}
