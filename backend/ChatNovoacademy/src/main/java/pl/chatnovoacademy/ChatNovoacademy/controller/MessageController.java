package pl.chatnovoacademy.ChatNovoacademy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.chatnovoacademy.ChatNovoacademy.model.Message;
import pl.chatnovoacademy.ChatNovoacademy.repository.MessageRepository;

import java.util.List;

@RestController
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("chat/{id}/messages")
    public ResponseEntity getAllChatMessages(@PathVariable("id") Long id) throws JsonProcessingException {
        List<Message> allChatMessages = messageRepository.findAllByChatId(id);
        return ResponseEntity.ok(objectMapper.writeValueAsString(allChatMessages));
    }

    @PostMapping("chat/message")
    public ResponseEntity addMessageToChat( @RequestBody Message message){
        Message newMessage = messageRepository.save(message);

        return ResponseEntity.ok(newMessage);
    }
}
