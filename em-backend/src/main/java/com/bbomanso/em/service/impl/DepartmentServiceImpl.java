package com.bbomanso.em.service.impl;

import com.bbomanso.em.dto.DepartmentDto;
import com.bbomanso.em.entity.Department;
import com.bbomanso.em.exception.ResourceNotFoundException;
import com.bbomanso.em.repository.DepartmentRepository;
import com.bbomanso.em.service.DepartmentService;
import com.bbomanso.em.utils.DepartmentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        /* convert DepartmentDto to Department entity */
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        log.info("Converted DepartmentDto to Department entity.");

        /* save the department entity to the database */
        Department savedDepartment = departmentRepository.save(department);
        log.info("Saved Department entity to the database.");

        /* convert the saved Department entity to DepartmentDto and return */
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto) {
        /* find the department by id */
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + departmentDto.getId()));
        log.info("Found Department entity with id: {}", departmentDto.getId());

        /* update the department entity with the new values */
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        log.info("Updated Department entity with new values.");

        /* save the updated department entity to the database */
        Department updatedDepartment = departmentRepository.save(department);
        log.info("Saved updated Department entity to the database.");

        /* convert the updated Department entity to DepartmentDto and return */
        return DepartmentMapper.mapToDepartmentDto(updatedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {
        /* find the department by id */
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        log.info("Found Department entity with id: {}", id);

        /* convert the found Department entity to DepartmentDto and return */
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        /* find all departments */
        List<Department> departments = departmentRepository.findAll();

        /* convert the found Department entities to DepartmentDtos and return */
        return departments.stream()
                .map(DepartmentMapper::mapToDepartmentDto)
                .toList();
    }

    @Override
    public void deleteDepartmentById(Long id) {
        /* find the department by id */
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Department not found with id: {}", id);
                    return new ResourceNotFoundException("Department not found with id: " + id);
                });
        log.info("Found Department entity with id: {}", id);

        /* delete the department entity from the database */
        departmentRepository.delete(department);
        log.info("Deleted Department entity with id: {}", id);
    }
}
