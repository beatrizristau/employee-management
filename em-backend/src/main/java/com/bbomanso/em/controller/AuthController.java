package com.bbomanso.em.controller;

import com.bbomanso.em.dto.JwtAuthResponse;
import com.bbomanso.em.dto.LoginDto;
import com.bbomanso.em.dto.RegisterDto;
import com.bbomanso.em.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        log.info("Registering user: {}", registerDto);
        String response = authService.register(registerDto);
        log.info("User registered!");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        log.info("Logging in user: {}", loginDto);
        JwtAuthResponse response = authService.login(loginDto);

        log.info("User logged in!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
