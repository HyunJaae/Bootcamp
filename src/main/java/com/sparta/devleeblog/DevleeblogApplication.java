package com.sparta.devleeblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.sql.SQLOutput;
import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class DevleeblogApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevleeblogApplication.class, args);
    }

}
