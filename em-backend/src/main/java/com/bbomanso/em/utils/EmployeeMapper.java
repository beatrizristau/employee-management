package com.bbomanso.em.utils;

import com.bbomanso.em.dto.EmployeeDto;
import com.bbomanso.em.entity.Employee;

public class EmployeeMapper {

    /* Prevents instantiation */
    private EmployeeMapper() {
        throw new IllegalStateException("Utility class");
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }
}



