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
        log.info("Request arrived to CREATE employee");
        EmployeeDto response = employeeService.createEmployee(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{employeeId}", produces = "application/json")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long employeeId) {
        log.info("Request arrived to GET employee by id: {}", employeeId);
        EmployeeDto response = employeeService.getEmployeeById(employeeId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "", produces = "application/json")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        log.info("Request arrived to GET all employees");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping(path = "/{employee_id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("employee_id") Long employeeId, @RequestBody EmployeeDto request) {
        log.info("Request arrived to UPDATE employee by id: {}", employeeId);
        EmployeeDto response = employeeService.updateEmployee(employeeId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{employee_id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("employee_id") Long employeeId) {
        log.info("Request arrived to DELETE employee by id: {}", employeeId);
        employeeService.deleteEmployee(employeeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
