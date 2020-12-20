package com.samples.springcloud.weatherclient;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;

@RestController
@RequiredArgsConstructor
public class MusicController {

    private final RestTemplate restTemplate;
    private static final String GET_ALL_SONGS_URL = "http://localhost:8081/songs";

    @GetMapping("/forecast")
    @HystrixCommand(fallbackMethod = "getLastYearForecast")
    public String getForecast() {

        ResponseEntity<String> response = restTemplate.getForEntity("http://weather-service/forecast", String.class);

        return response.getBody();
    }

    public String getLastYearForecast() {
        return "Probably it is warm";
    }

//    @GetMapping("/songs")
//    public ResponseEntity<String> getAllSongs() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
//        HttpEntity < String > entity = new HttpEntity< String >("parameters", headers);
//        ResponseEntity <String> songs = restTemplate.exchange(GET_ALL_SONGS_URL, HttpMethod.GET, entity,
//                String.class);
//        return new ResponseEntity<>(songs, HttpStatus.OK);
//    }
}
