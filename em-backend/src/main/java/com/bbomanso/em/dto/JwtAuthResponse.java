package com.bbomanso.em.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private String role;
}
