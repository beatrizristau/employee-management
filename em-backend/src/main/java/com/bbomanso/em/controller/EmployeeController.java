package com.bbomanso.em.controller;

import com.bbomanso.em.dto.EmployeeDto;
import com.bbomanso.em.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping(path = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto request) {
        log.info("Request arrived to CREATE employee: {}", request);
        EmployeeDto response = employeeService.createEmployee(request);
        log.info("Created employee with id: {}", response.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        log.info("Request arrived to GET employee by id: {}", id);
        EmployeeDto response = employeeService.getEmployeeById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "", produces = "application/json")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        log.info("Request arrived to GET all employees");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping(path = "/update/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto request) {
        log.info("Request arrived to UPDATE employee by id: {}", id);
        EmployeeDto response = employeeService.updateEmployee(id, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        log.info("Request arrived to DELETE employee by id: {}", id);
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
