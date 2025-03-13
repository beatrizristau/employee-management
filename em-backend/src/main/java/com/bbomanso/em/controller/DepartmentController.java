package com.bbomanso.em.controller;

import com.bbomanso.em.dto.DepartmentDto;
import com.bbomanso.em.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto request) {
        log.info("Received request to CREATE a department: {}", request);
        DepartmentDto createdDepartment = departmentService.createDepartment(request);
        log.info("Created department with id: {}", createdDepartment.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Long id) {
        log.info("Received request to GET department by id: {}", id);
        DepartmentDto department = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(department);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping(path = "", produces = "application/json")
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        log.info("Received request to GET all departments");
        List<DepartmentDto> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path = "/update/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDto request) {
        log.info("Received request to UPDATE department with id: {}", id);
        DepartmentDto updatedDepartment = departmentService.updateDepartment(id, request);
        log.info("Updated department with id: {}", updatedDepartment.getId());
        return ResponseEntity.ok(updatedDepartment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        log.info("Received request to DELETE department with id: {}", id);
        departmentService.deleteDepartmentById(id);
        return ResponseEntity.noContent().build();
    }
}
