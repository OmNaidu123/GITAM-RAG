package com.example.gitamRAGMVP.Service;

import com.example.gitamRAGMVP.Models.Chat;
import com.example.gitamRAGMVP.Models.Question;
import com.example.gitamRAGMVP.Models.QuestionHistory;
import com.example.gitamRAGMVP.Models.wrappers.OptimizedHistory;
import com.example.gitamRAGMVP.dao.ChatRepo;
import com.example.gitamRAGMVP.dao.QuestionHistoryRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY;

@Service
public class QuestionService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    @Value("classpath:/prompts/rag-prompt.st")
    private Resource sbPromptTemplate;
    @Autowired
    private QuestionHistoryRepo qhRepo;
    @Autowired
    private ChatRepo chatRepo;

    public QuestionService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory()))
                .build();
        this.vectorStore = vectorStore;
    }

    public ResponseEntity<String> generateResponse(Question question) {
        try{
            String message;
            String res;
            String error;
            Chat ch = chatRepo.findById(question.getChatId()).orElse(null);
            if(ch == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            if(question != null && question.getQuestion() != null){
                message = question.getQuestion();
                if(!question.isRagMode()){
                    res = /*"AI access is closed for now to preserve usage costs NON RAG";*/
                            chatClient.prompt(message)
                                    .advisors(advisorSpec -> advisorSpec.param(CHAT_MEMORY_CONVERSATION_ID_KEY, String.valueOf(question.getChatId())))
                                    .call().content();
                    error = save(message, res, ch);
                    if(error.equals("error"))
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    return new ResponseEntity<>(res, HttpStatus.OK);
                }
                List<String> contentList = findSimilarDocuments(message);
                PromptTemplate promptTemplate = new PromptTemplate(sbPromptTemplate);
                Map<String, Object> promptParameters = new HashMap<>();
                promptParameters.put("input", message);
                promptParameters.put("documents", String.join("\n",contentList));
                Prompt prompt = promptTemplate.create(promptParameters);
                System.out.println(prompt.toString());
                res = /*"AI access is closed for now to preserve usage costs RAG";*/
                chatClient.prompt(prompt)
                        .advisors(advisorSpec -> advisorSpec.param(CHAT_MEMORY_CONVERSATION_ID_KEY, String.valueOf(question.getChatId())))
                        .call().content();
                error = save(message, res, ch);
                if(error.equals("error"))
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<String> findSimilarDocuments(String message) {

        List<Document> similarDocuments =
                vectorStore.similaritySearch(
                        SearchRequest.builder()
                                .query(message)
                                .topK(2)
                                .build());
        return similarDocuments.stream().map(Document::getText).toList();
    }

    private String save(String message, String res, Chat ch) {
        QuestionHistory qU = new QuestionHistory();
        QuestionHistory qAI = new QuestionHistory();
        try {
            qU.setChat(ch);
            qU.setMessage(message);
            qU.setUser(true);
            qAI.setChat(ch);
            qAI.setMessage(res);
            qAI.setUser(false);
            qhRepo.save(qU);
            qhRepo.save(qAI);
            return "";
        }
        catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }

    public ResponseEntity<List<OptimizedHistory>> getChatHis(int chatId) {
        try {
            List<QuestionHistory> qH = qhRepo.findByChat_Id(chatId);
            List<OptimizedHistory> oH = new ArrayList<>();
            for(QuestionHistory q : qH){
                OptimizedHistory o = new OptimizedHistory();
                o.setMessage(q.getMessage());
                o.setUser(q.isUser());
                oH.add(o);
            }
            return new ResponseEntity<>(oH, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
