package com.samples.springcloud.weatherservice.repo;

import com.samples.springcloud.weatherservice.model.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SongRepository extends MongoRepository<Song, String> {

    List<Song> findByArtist(String artist);

    List<Song> findByNameContaining(String name);
}
