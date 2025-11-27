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
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User("admin", passwordEncoder.encode("adminpass"), "ROLE_ADMIN", "admin@example.com");
                userRepository.save(admin);
                logger.info("Created temp admin: username=admin password=adminpass");
            }

            if (userRepository.findByUsername("user").isEmpty()) {
                User user = new User("user", passwordEncoder.encode("userpass"), "ROLE_USER", "user@example.com");
                userRepository.save(user);
                logger.info("Created temp user: username=user password=userpass");
            }
        };
    }
}
