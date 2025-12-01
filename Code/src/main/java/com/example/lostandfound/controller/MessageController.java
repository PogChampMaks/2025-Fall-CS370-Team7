package com.example.lostandfound.controller;

import com.example.lostandfound.model.Message;
import com.example.lostandfound.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> payload, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }

        try {
            String receiverUsername = (String) payload.get("receiverUsername");
            Long itemId = Long.valueOf(payload.get("itemId").toString());
            String content = (String) payload.get("content");

            Message message = new Message(
                principal.getName(),
                receiverUsername,
                itemId,
                content
            );

            Message sent = messageService.sendMessage(message);
            return ResponseEntity.status(HttpStatus.CREATED).body(sent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid message data"));
        }
    }

    @GetMapping("/received")
    public ResponseEntity<?> getReceivedMessages(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        List<Message> messages = messageService.getReceivedMessages(principal.getName());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/sent")
    public ResponseEntity<?> getSentMessages(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        List<Message> messages = messageService.getSentMessages(principal.getName());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<?> getConversationForItem(@PathVariable Long itemId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        List<Message> messages = messageService.getConversationForItem(itemId, principal.getName());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/unread")
    public ResponseEntity<?> getUnreadMessages(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        List<Message> messages = messageService.getUnreadMessages(principal.getName());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadCount(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        int count = messageService.getUnreadMessages(principal.getName()).size();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        messageService.markAsRead(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        messageService.markAllAsRead(principal.getName());
        return ResponseEntity.ok(Map.of("success", true));
    }
}
