package com.sparta.devleeblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DevleeblogApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevleeblogApplication.class, args);
    }
}