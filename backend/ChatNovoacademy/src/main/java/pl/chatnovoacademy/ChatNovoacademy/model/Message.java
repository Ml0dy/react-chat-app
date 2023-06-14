package pl.chatnovoacademy.ChatNovoacademy.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "message_list")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String message_text;
    @NonNull
    private LocalDateTime message_date;
    @NonNull
    private Long sender_id;
    @NonNull
    private Long chat_id;

    public Message() {
    }

    @PrePersist
    void prePersist() {
        message_date = LocalDateTime.now();
    }
}
