package com.example.lostandfound.controller;

import com.example.lostandfound.model.Item;
import com.example.lostandfound.model.ItemStatus;
import com.example.lostandfound.service.ItemService;
import com.example.lostandfound.service.FileStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;
    private final FileStorageService fileStorageService;

    public ItemController(ItemService itemService, FileStorageService fileStorageService) {
        this.itemService = itemService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);
            return ResponseEntity.ok(Map.of(
                "fileName", fileName,
                "fileUrl", "/uploads/" + fileName
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody Item item, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        item.setCreatedBy(principal.getName());
        Item created = itemService.createItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Item>> getItemsByStatus(@PathVariable ItemStatus status) {
        List<Item> items = itemService.getItemsByStatus(status);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Item>> getItemsByUser(@PathVariable String username) {
        List<Item> items = itemService.getItemsByCreatedBy(username);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Item updatedItem, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        try {
            Item item = itemService.updateItem(id, updatedItem);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/claim")
    public ResponseEntity<?> markAsClaimed(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        try {
            Item item = itemService.getItemById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
            
            // Only the creator can mark as claimed
            if (!item.getCreatedBy().equals(principal.getName())) {
                return ResponseEntity.status(403).body(Map.of("error", "Only the item owner can mark it as claimed"));
            }

            item.setClaimed(true);
            item.setClaimedAt(java.time.LocalDateTime.now());
            Item updated = itemService.updateItem(id, item);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/unclaim")
    public ResponseEntity<?> markAsUnclaimed(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        try {
            Item item = itemService.getItemById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
            
            // Only the creator can unmark as claimed
            if (!item.getCreatedBy().equals(principal.getName())) {
                return ResponseEntity.status(403).body(Map.of("error", "Only the item owner can unmark it"));
            }

            item.setClaimed(false);
            item.setClaimedBy(null);
            item.setClaimedAt(null);
            Item updated = itemService.updateItem(id, item);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
