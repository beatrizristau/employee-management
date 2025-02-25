package com.bbomanso.em.utils;

import com.bbomanso.em.dto.DepartmentDto;
import com.bbomanso.em.entity.Department;

public class DepartmentMapper {

    /* prevents instantiation */
    private DepartmentMapper() {
        throw new IllegalStateException("Utility class");
    }

    /* converts a DepartmentDto to a Department entity */
    public static Department mapToDepartment(DepartmentDto departmentDto) {
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }

    /* converts a Department entity to a DepartmentDto */
    public static DepartmentDto mapToDepartmentDto(Department department) {
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }
}
