package com.samples.springcloud.weatherservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "songs")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Song {

    @Id
    private String id;
    private String artist;
    private String name;
    private int year;
}

