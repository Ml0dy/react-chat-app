package pl.chatnovoacademy.ChatNovoacademy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;
import pl.chatnovoacademy.ChatNovoacademy.model.Message;
import pl.chatnovoacademy.ChatNovoacademy.repository.ChatRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("")
    public ResponseEntity getAllChats() throws JsonProcessingException {
        List<Chat> chats = chatRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(chats));
    }
    @GetMapping("/{id}")
    public ResponseEntity getSingleChat(@PathVariable Long id){
        Optional<Chat> singleChat = chatRepository.findById(id);
        return ResponseEntity.ok(singleChat);
    }

    @PostMapping("/{id}")
    public ResponseEntity addNewChat(@PathVariable Long id, @RequestBody Chat chat) {
        List<Long> userInChat = chat.getUsers();
        userInChat.add(id);
        Chat newChat = chatRepository.save(chat);

        return ResponseEntity.ok(newChat);
    }

    @PutMapping("/{id}")
    public ResponseEntity changeChatName(@PathVariable("id") Long id, @RequestBody Chat updatedChat) {
        Optional<Chat> chat = chatRepository.findById(id);
        if (chat.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        chat.get().setChat_name(updatedChat.getChat_name());
        chatRepository.update(chat.get().getChat_name(), id);

        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }
}
