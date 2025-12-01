package com.example.lostandfound.repository;

import com.example.lostandfound.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverUsernameOrderBySentAtDesc(String receiverUsername);
    List<Message> findBySenderUsernameOrderBySentAtDesc(String senderUsername);
    List<Message> findByItemIdOrderBySentAtAsc(Long itemId);
    List<Message> findByReceiverUsernameAndIsReadFalse(String receiverUsername);
    List<Message> findByItemIdAndSenderUsernameOrItemIdAndReceiverUsernameOrderBySentAtAsc(
        Long itemId1, String sender, Long itemId2, String receiver);
}
