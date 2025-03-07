package com.bbomanso.em.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Table
@Entity(name = "employees")
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", columnDefinition = "varchar(50)")
    private String firstName;

    @Column(name = "last_name", columnDefinition = "varchar(50)")
    private String lastName;

    @Column(name = "email_id", columnDefinition = "varchar(100)", nullable = false, unique = true)
    private String email;

    // FetchType.LAZY is used to avoid loading the department entity when an employee is fetched
    // JoinColumn - specifies the column name in the employees table that is used to join with the department table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;
}
