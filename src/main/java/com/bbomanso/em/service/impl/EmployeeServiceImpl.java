package com.bbomanso.em.service.impl;

import com.bbomanso.em.dto.EmployeeDto;
import com.bbomanso.em.entity.Employee;
import com.bbomanso.em.exception.ResourceNotFoundException;
import com.bbomanso.em.repository.EmployeeRepository;
import com.bbomanso.em.service.EmployeeService;
import com.bbomanso.em.utils.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        /* convert EmployeeDto to Employee entity */
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        log.info("Converted EmployeeDto to Employee entity.");

        /* save the employee entity to the database */
        Employee savedEmployee = employeeRepository.save(employee);
        log.info("Saved Employee entity to the database.");

        /* convert the saved Employee entity to EmployeeDto and return */
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        /* find the employee by id */
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        log.info("Found Employee entity with id: {}", employeeId);

        /* convert the found Employee entity to EmployeeDto and return */
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        /* find all employees */
        List<Employee> employees = employeeRepository.findAll();

        /* convert the found Employee entities to EmployeeDtos and return */
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        /* find the employee by id */
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        log.info("Found Employee entity with id: {}", employeeId);

        /* update the employee entity with the new values */
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        log.info("Updated Employee entity with new values.");

        /* save the updated employee entity to the database */
        Employee updatedEmployee = employeeRepository.save(employee);
        log.info("Saved updated Employee entity to the database.");

        /* convert the updated Employee entity to EmployeeDto and return */
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }
}
