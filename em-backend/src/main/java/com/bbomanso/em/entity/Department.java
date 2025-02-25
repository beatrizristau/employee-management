package com.bbomanso.em.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "departments")
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", columnDefinition = "varchar(50)")
    private String departmentName;

    @Column(name = "department_description", columnDefinition = "varchar(100)")
    private String departmentDescription;
}
