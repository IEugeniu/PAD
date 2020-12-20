package com.samples.springcloud.weatherclient;

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
public class SongResponse {

    @Id
    private String id;
    private String artist;
    private String name;
    private int year;
}