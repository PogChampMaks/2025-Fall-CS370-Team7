package com.example.lostandfound.repository;

import com.example.lostandfound.model.Item;
import com.example.lostandfound.model.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStatus(ItemStatus status);
    List<Item> findByCreatedBy(String username);
}
