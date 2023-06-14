package pl.chatnovoacademy.ChatNovoacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;

import java.util.List;
import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findAllById(Long id);

}
