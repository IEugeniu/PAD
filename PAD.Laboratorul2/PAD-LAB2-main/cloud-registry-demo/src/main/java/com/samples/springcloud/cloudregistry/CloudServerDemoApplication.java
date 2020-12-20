package com.samples.springcloud.cloudregistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class CloudServerDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudServerDemoApplication.class, args);
    }

}
