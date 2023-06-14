package pl.chatnovoacademy.ChatNovoacademy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;
import pl.chatnovoacademy.ChatNovoacademy.model.User;
import pl.chatnovoacademy.ChatNovoacademy.repository.ChatRepository;
import pl.chatnovoacademy.ChatNovoacademy.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    ObjectMapper objectMapper;


    @GetMapping("")
    public ResponseEntity getAllUsers() throws JsonProcessingException {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(users));
    }

    @GetMapping("/{id}")
    public ResponseEntity getAllUserChats(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<User> user = userRepository.findById(id);
        List<Long> allUserChats = user.get().getChats();
        return ResponseEntity.ok(objectMapper.writeValueAsString(allUserChats));
    }

    @PostMapping("/")
    public ResponseEntity addUser(@RequestBody User user) {
        Optional<User> userFromDatabase = userRepository.findByUsername(user.getUsername());
        if (userFromDatabase.isPresent()) return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        Optional<Chat> chat = chatRepository.findById(0L);
        List<Long> defaultChat = user.getChats();
        defaultChat.add(chat.get().getId());
        User addedUser = userRepository.save(user);
        return ResponseEntity.ok(addedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

}
