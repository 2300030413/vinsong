package com.raaga.backend.config;

import com.raaga.backend.model.Song;
import com.raaga.backend.repository.SongRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    
    @Bean
    public CommandLineRunner initData(SongRepository songRepository) {
        return args -> {
            // Only insert if the table is empty
            if (songRepository.count() == 0) {
                // Populate Telugu songs
                songRepository.save(new Song(
                    null, 
                    "Samajavaragamana", 
                    "Sid Sriram",
                    "Ala Vaikunthapurramuloo", 
                    "4:30", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    "https://picsum.photos/seed/telugu1/300", 
                    true));
                
                songRepository.save(new Song(
                    null, 
                    "Butta Bomma", 
                    "Armaan Malik",
                    "Ala Vaikunthapurramuloo", 
                    "3:27", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                    "https://picsum.photos/seed/telugu2/300", 
                    false));
                
                songRepository.save(new Song(
                    null, 
                    "Naatu Naatu", 
                    "Rahul Sipligunj, Kaala Bhairava",
                    "RRR", 
                    "4:35", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    "https://picsum.photos/seed/telugu3/300", 
                    true));
                
                songRepository.save(new Song(
                    null, 
                    "Saranga Dariya", 
                    "Mangli",
                    "Love Story", 
                    "3:58", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    "https://picsum.photos/seed/telugu4/300", 
                    false));
                
                songRepository.save(new Song(
                    null, 
                    "Srivalli", 
                    "Sid Sriram",
                    "Pushpa", 
                    "3:32", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    "https://picsum.photos/seed/telugu5/300", 
                    true));
                
                songRepository.save(new Song(
                    null, 
                    "Oo Antava", 
                    "Indravathi Chauhan",
                    "Pushpa", 
                    "3:58", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    "https://picsum.photos/seed/telugu6/300", 
                    false));
                
                songRepository.save(new Song(
                    null, 
                    "Adiga Adiga", 
                    "Sid Sriram",
                    "Ninnu Kori", 
                    "4:35", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    "https://picsum.photos/seed/telugu7/300", 
                    true));
                
                songRepository.save(new Song(
                    null, 
                    "Inkem Inkem", 
                    "Sid Sriram",
                    "Geetha Govindam", 
                    "4:29", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                    
                    "4:29", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                    "https://picsum.photos/seed/telugu8/300", 
                    false));
                
                songRepository.save(new Song(
                    null, 
                    "Ramulo Ramula", 
                    "Anurag Kulkarni",
                    "Ala Vaikunthapurramuloo", 
                    "3:42", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
                    "https://picsum.photos/seed/telugu9/300", 
                    true));
                
                songRepository.save(new Song(
                    null, 
                    "Buttabomma", 
                    "Armaan Malik",
                    "Ala Vaikunthapurramuloo", 
                    "3:27", 
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
                    "https://picsum.photos/seed/telugu10/300", 
                    false));
            }
        };
    }
}
