package com.bbomanso.em.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    @JsonProperty(value = "username")
    private String usernameOrEmail;
    private String password;
}
