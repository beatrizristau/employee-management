package com.bbomanso.em.service.impl;

import com.bbomanso.em.dto.JwtAuthResponse;
import com.bbomanso.em.dto.LoginDto;
import com.bbomanso.em.dto.RegisterDto;
import com.bbomanso.em.entity.Role;
import com.bbomanso.em.entity.User;
import com.bbomanso.em.exception.EmployeeManagementAPIException;
import com.bbomanso.em.repository.RoleRepository;
import com.bbomanso.em.repository.UserRepository;
import com.bbomanso.em.security.JwtTokenProvider;
import com.bbomanso.em.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {

        /* check username already exists in the database */
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            log.error("Username already exists");
            throw new EmployeeManagementAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        /* check email already exists in the database */
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            log.error("Email already exists");
            throw new EmployeeManagementAPIException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return "User registered successfully!";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String role = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail())
                .orElseThrow(() -> new EmployeeManagementAPIException(HttpStatus.BAD_REQUEST, "User not found"))
                .getRoles()
                .stream()
                .findFirst()
                .map(Role::getName)
                .get();

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(jwtTokenProvider.generateToken(authentication));
        jwtAuthResponse.setRole(role);

        return jwtAuthResponse;
    }
}
