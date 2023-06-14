package pl.chatnovoacademy.ChatNovoacademy.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.chatnovoacademy.ChatNovoacademy.model.Chat;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findAllById(Long id);
    @Modifying
    @Transactional
    @Query("Update chat_list u SET u.chat_name = :chat_name WHERE u.id = :id")
    void update(@Param("chat_name")String chat_name ,@Param("id") Long id);
}
