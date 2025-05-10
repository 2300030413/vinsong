package com.raaga.backend.service;

import com.raaga.backend.model.Song;
import com.raaga.backend.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    
    private final SongRepository songRepository;
    
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }
    
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }
    
    public Optional<Song> getSongById(Long id) {
        return songRepository.findById(id);
    }
    
    public List<Song> searchSongs(String query) {
        List<Song> byTitle = songRepository.findByTitleContainingIgnoreCase(query);
        List<Song> byArtist = songRepository.findByArtistContainingIgnoreCase(query);
        List<Song> byAlbum = songRepository.findByAlbumContainingIgnoreCase(query);
        
        // Combine results (avoiding duplicates)
        byTitle.removeAll(byArtist);
        byTitle.addAll(byArtist);
        byTitle.removeAll(byAlbum);
        byTitle.addAll(byAlbum);
        
        return byTitle;
    }
    
    public Song saveSong(Song song) {
        return songRepository.save(song);
    }
    
    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }
    
    public boolean toggleLikeSong(Long id) {
        Optional<Song> songOpt = songRepository.findById(id);
        if (songOpt.isPresent()) {
            Song song = songOpt.get();
            song.setLiked(!song.isLiked());
            songRepository.save(song);
            return song.isLiked();
        }
        return false;
    }
}
