package pl.chatnovoacademy.ChatNovoacademy;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ObjectMapper objectMapper;


    @GetMapping("/users")
    public ResponseEntity getAllUsers() throws JsonProcessingException {
        List<User> users = userRepository.findAll();

        return ResponseEntity.ok(objectMapper.writeValueAsString(users));
    }

    @PostMapping("/users")
    public ResponseEntity addUser(@RequestBody User user) {
        Optional<User> userFromDatabase = userRepository.findByUsername(user.getUsername());

        if (userFromDatabase.isPresent()) return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();


        User addedUser = userRepository.save(user);
        return ResponseEntity.ok(addedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

}
