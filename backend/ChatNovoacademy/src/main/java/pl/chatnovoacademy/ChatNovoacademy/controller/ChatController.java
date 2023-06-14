package pl.chatnovoacademy.ChatNovoacademy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;
import pl.chatnovoacademy.ChatNovoacademy.repository.ChatRepository;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("/chats")
    public ResponseEntity getAllChats() throws JsonProcessingException {
        List<Chat> chats = chatRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(chats));
    }

    @PostMapping("/chats/{id}")
    public ResponseEntity addNewChat(@PathVariable Long id, @RequestBody Chat chat) {
        List<Long> userInChat = chat.getUsers();
        userInChat.add(id);
        Chat newChat = chatRepository.save(chat);

        return ResponseEntity.ok(newChat);
    }
}
