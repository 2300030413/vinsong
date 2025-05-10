package com.raaga.backend.dto;

import com.raaga.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    
    public static UserDto fromUser(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}
