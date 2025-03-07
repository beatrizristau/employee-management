package com.bbomanso.em.utils;

import com.bbomanso.em.dto.EmployeeDto;
import com.bbomanso.em.entity.Employee;

public class EmployeeMapper {

    /* Prevents instantiation */
    private EmployeeMapper() {
        throw new IllegalStateException("Utility class");
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        return employee;
    }

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment().getId()
        );
    }
}



