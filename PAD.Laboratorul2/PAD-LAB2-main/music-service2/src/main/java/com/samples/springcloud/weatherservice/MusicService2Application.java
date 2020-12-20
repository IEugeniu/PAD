package com.samples.springcloud.weatherservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MusicService2Application {

    public static void main(String[] args) {
        SpringApplication.run(MusicService2Application.class, args);
    }

}
