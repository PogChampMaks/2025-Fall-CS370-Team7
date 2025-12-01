package com.example.lostandfound.service;

import com.example.lostandfound.model.Message;
import com.example.lostandfound.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getReceivedMessages(String username) {
        return messageRepository.findByReceiverUsernameOrderBySentAtDesc(username);
    }

    public List<Message> getSentMessages(String username) {
        return messageRepository.findBySenderUsernameOrderBySentAtDesc(username);
    }

    public List<Message> getConversationForItem(Long itemId, String username) {
        return messageRepository.findByItemIdAndSenderUsernameOrItemIdAndReceiverUsernameOrderBySentAtAsc(
            itemId, username, itemId, username);
    }

    public List<Message> getUnreadMessages(String username) {
        return messageRepository.findByReceiverUsernameAndIsReadFalse(username);
    }

    public void markAsRead(Long messageId) {
        Optional<Message> message = messageRepository.findById(messageId);
        message.ifPresent(m -> {
            m.setRead(true);
            messageRepository.save(m);
        });
    }

    public void markAllAsRead(String username) {
        List<Message> unreadMessages = getUnreadMessages(username);
        unreadMessages.forEach(m -> m.setRead(true));
        messageRepository.saveAll(unreadMessages);
    }
}
