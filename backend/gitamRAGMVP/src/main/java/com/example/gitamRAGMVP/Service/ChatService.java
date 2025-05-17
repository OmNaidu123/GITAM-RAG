package com.example.gitamRAGMVP.Service;

import com.example.gitamRAGMVP.Models.Chat;
import com.example.gitamRAGMVP.Models.Question;
import com.example.gitamRAGMVP.Models.QuestionHistory;
import com.example.gitamRAGMVP.Models.User;
import com.example.gitamRAGMVP.Models.wrappers.ChatWrapper;
import com.example.gitamRAGMVP.dao.ChatRepo;
import com.example.gitamRAGMVP.dao.QuestionHistoryRepo;
import com.example.gitamRAGMVP.dao.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private QuestionHistoryRepo historyRepo;

    public ResponseEntity<String> create(ChatWrapper chatWrapper) {
        try{
            Chat chat = new Chat();
            User user = userRepo.findById(chatWrapper.getUsername()).orElse(null);
            if(user == null)
                return new ResponseEntity<>("no such user", HttpStatus.NOT_FOUND);
            chat.setUser(user);
            chat.setChatName(chatWrapper.getChatName());
            chatRepo.save(chat);
            return new ResponseEntity<>("created", HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ChatWrapper>> getUser(String username) {
        try{
           List<Chat> chats = chatRepo.findByUser_Username(username);
           List<ChatWrapper> wrappers = new ArrayList<>();
           for(Chat chat: chats)
               wrappers.add(wrapper(chat));
           return new ResponseEntity<>(wrappers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ChatWrapper> get(int id) {
        try {
            Chat chat = chatRepo.findById(id).orElse(null);
            if(chat == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(wrapper(chat), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> edit(int id, String name) {
        try {
            Chat chat = chatRepo.findById(id).orElse(null);
            if(chat == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            chat.setChatName(name);
            chatRepo.save(chat);
            return new ResponseEntity<>("edited successfully", HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ChatWrapper>> search(String username, String keyword) {
        try {
            List<Chat> chats = chatRepo.searchChatByChatNameAndUser(username, keyword);
            List<ChatWrapper> wrappers = new ArrayList<>();
            for(Chat chat: chats)
                wrappers.add(wrapper(chat));
            return new ResponseEntity<>(wrappers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> delete(int id) {
        try{
            List<QuestionHistory> history = historyRepo.findByChat_Id(id);
            historyRepo.deleteAll(history);
            chatRepo.deleteById(id);
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ChatWrapper wrapper(Chat chat){
        ChatWrapper wrapper = new ChatWrapper();
        wrapper.setId(chat.getId());
        wrapper.setChatName(chat.getChatName());
        wrapper.setUsername(chat.getUser().getUsername());
        return wrapper;
    }

}
