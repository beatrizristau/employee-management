package com.bbomanso.em.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class EmployeeManagementAPIException extends RuntimeException {

    private final HttpStatus status;
    private final String message;
}
