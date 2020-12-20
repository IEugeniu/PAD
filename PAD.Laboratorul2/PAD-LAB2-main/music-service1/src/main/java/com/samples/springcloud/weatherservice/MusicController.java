package com.samples.springcloud.weatherservice;

import com.samples.springcloud.weatherservice.model.Song;
import com.samples.springcloud.weatherservice.repo.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.netflix.eureka.EurekaInstanceConfigBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MusicController {

    private final EurekaInstanceConfigBean eurekaInstanceConfigBean;
    private final SongRepository songRepository;

    @GetMapping("/forecast")
    public String getForecast() {

        return "Service " + eurekaInstanceConfigBean.getInstanceId() + " says warm";
    }

    @PostMapping("/songs")
    public ResponseEntity<Song> saveSong(@RequestBody Song song) {
        try {
            Song savedSong = Song.builder().artist(song.getArtist())
                    .name(song.getName())
                    .year(song.getYear())
                    .build();
            log.info("Service instance id: " + eurekaInstanceConfigBean.getInstanceId());
            return new ResponseEntity<>(songRepository.save(savedSong), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/songs")
    public ResponseEntity<List<Song>> getAllSongs(@RequestParam(required = false) String name) {
        try {
            List<Song> songs = new ArrayList<Song>();

            if (name == null)
                songs.addAll(songRepository.findAll());
            else
                songs.addAll(songRepository.findByNameContaining(name));

            if (songs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            log.info("Service instance id: " + eurekaInstanceConfigBean.getInstanceId());
            return new ResponseEntity<>(songs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getTutorialById(@PathVariable("id") String id) {
        Optional<Song> tutorialData = songRepository.findById(id);

        return tutorialData.map(song -> new ResponseEntity<>(song, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/songs/{id}")
    public ResponseEntity<Song> updateTutorial(@PathVariable("id") String id, @RequestBody Song song) {
        Optional<Song> songData = songRepository.findById(id);

        if (songData.isPresent()) {
            Song updatedSong = songData.get();
            updatedSong.setArtist(song.getArtist());
            updatedSong.setName(song.getName());
            updatedSong.setYear(song.getYear());
            return new ResponseEntity<>(songRepository.save(updatedSong), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/songs/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") String id) {
        try {
            songRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
