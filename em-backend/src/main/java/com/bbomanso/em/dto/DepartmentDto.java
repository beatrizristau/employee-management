package com.bbomanso.em.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DepartmentDto {

    private Long id;
    private String departmentName;
    private String departmentDescription;
}
