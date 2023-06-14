package pl.chatnovoacademy.ChatNovoacademy.model;

import jakarta.persistence.*;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Entity(name = "user_list")
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String password;
    private boolean isadmin;

    @ElementCollection
    @CollectionTable(name = "user_chat", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "chat_id")
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Long> chats = new ArrayList<>();

    public User() {

    }
}
