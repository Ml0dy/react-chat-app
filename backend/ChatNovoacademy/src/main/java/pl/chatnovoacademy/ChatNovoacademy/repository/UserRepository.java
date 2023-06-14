package pl.chatnovoacademy.ChatNovoacademy.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;
import pl.chatnovoacademy.ChatNovoacademy.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    //@Query("SELECT u FROM user_chat WHERE id = 1")
    //List<Chat> getUserChats();

   // Set<Chat> findAllById(Long id);


}
