package com.example.gitamRAGMVP.Controllers;

import com.example.gitamRAGMVP.Models.wrappers.ChatWrapper;
import com.example.gitamRAGMVP.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService service;

    @PostMapping("chat/create")
    public ResponseEntity<String> create(@RequestBody ChatWrapper chat){
        return service.create(chat);
    }

    @GetMapping("chat/get/account/{username}")
    public ResponseEntity<List<ChatWrapper>> getUser(@PathVariable String username){
        return service.getUser(username);
    }

    @GetMapping("chat/get/single/{id}")
    public ResponseEntity<ChatWrapper> get(@PathVariable int id){
        return service.get(id);
    }

    @PostMapping("chat/edit/{id}/{name}")
    public ResponseEntity<String> edit(@PathVariable int id, @PathVariable String name){
        return service.edit(id, name);
    }

    @GetMapping("chat/search/{username}/{keyword}")
    public ResponseEntity<List<ChatWrapper>> search(@PathVariable String username, @PathVariable String keyword){
        return service.search(username, keyword);
    }

    @DeleteMapping("chat/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return service.delete(id);
    }
}
