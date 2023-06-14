package pl.chatnovoacademy.ChatNovoacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.chatnovoacademy.ChatNovoacademy.model.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllById(Long id);

    @Query("SELECT u FROM message_list u WHERE u.chat_id = :id")
    List<Message> findAllByChatId(Long id);
}
