package com.raaga.backend.controller;

import com.raaga.backend.model.Song;
import com.raaga.backend.service.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    
    private final SongService songService;
    
    public SongController(SongService songService) {
        this.songService = songService;
    }
    
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getSongById(@PathVariable Long id) {
        return songService.getSongById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Song>> searchSongs(@RequestParam String query) {
        List<Song> songs = songService.searchSongs(query);
        return ResponseEntity.ok(songs);
    }
    
    @GetMapping("/public/telugu")
    public ResponseEntity<List<Song>> getTeluguSongs() {
        // This is typically where you'd use a repository method like songRepository.findByGenre("Telugu")
        // But for now, we'll just return all songs since we're focused on Telugu music
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }
    
    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song) {
        Song savedSong = songService.saveSong(song);
        return ResponseEntity.ok(savedSong);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSong(@PathVariable Long id, @RequestBody Song song) {
        return songService.getSongById(id)
                .map(existingSong -> {
                    song.setId(id);
                    Song updatedSong = songService.saveSong(song);
                    return ResponseEntity.ok(updatedSong);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable Long id) {
        return songService.getSongById(id)
                .map(song -> {
                    songService.deleteSong(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{id}/like")
    public ResponseEntity<Map<String, Boolean>> toggleLikeSong(@PathVariable Long id) {
        boolean isLiked = songService.toggleLikeSong(id);
        return ResponseEntity.ok(Map.of("liked", isLiked));
    }
}
