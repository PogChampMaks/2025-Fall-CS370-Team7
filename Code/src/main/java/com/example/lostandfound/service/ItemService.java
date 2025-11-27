package com.example.lostandfound.service;

import com.example.lostandfound.model.Item;
import com.example.lostandfound.model.ItemStatus;
import com.example.lostandfound.repository.ItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByStatus(ItemStatus status) {
        return itemRepository.findByStatus(status);
    }

    public List<Item> getItemsByCreatedBy(String username) {
        return itemRepository.findByCreatedBy(username);
    }

    public Item updateItem(Long id, Item updatedItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setTitle(updatedItem.getTitle());
                    item.setDescription(updatedItem.getDescription());
                    item.setStatus(updatedItem.getStatus());
                    item.setLocation(updatedItem.getLocation());
                    item.setDate(updatedItem.getDate());
                    item.setContactInfo(updatedItem.getContactInfo());
                    item.setImageRef(updatedItem.getImageRef());
                    return itemRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
