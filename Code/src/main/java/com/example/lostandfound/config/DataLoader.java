package com.example.lostandfound.config;

import com.example.lostandfound.model.User;
import com.example.lostandfound.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    @Bean
    CommandLineRunner load(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("user1").isEmpty()) {
                User user1 = new User("user1", passwordEncoder.encode("userpass"), "ROLE_USER", "user1@example.com");
                userRepository.save(user1);
                logger.info("Created temp user: username=user1 password=userpass");
            }

            if (userRepository.findByUsername("user2").isEmpty()) {
                User user2 = new User("user2", passwordEncoder.encode("userpass"), "ROLE_USER", "user2@example.com");
                userRepository.save(user2);
                logger.info("Created temp user: username=user2 password=userpass");
            }
        };
    }
}
