package com.bbomanso.em.service;

import com.bbomanso.em.dto.JwtAuthResponse;
import com.bbomanso.em.dto.LoginDto;
import com.bbomanso.em.dto.RegisterDto;

public interface AuthService {

    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
