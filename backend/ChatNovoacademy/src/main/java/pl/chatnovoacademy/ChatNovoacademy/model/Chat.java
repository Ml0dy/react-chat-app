package pl.chatnovoacademy.ChatNovoacademy.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@Entity(name = "chat_list")
@AllArgsConstructor
@RequiredArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String chat_name;
    private boolean is_group_chat;

    @CollectionTable(name = "user_chat", joinColumns = @JoinColumn(name = "chat_id"))
    @Column(name = "user_id")
    @JoinColumn(name = "chat_id")
    @ElementCollection
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Long> users = new ArrayList<>();

    public Chat() {
    }
}
