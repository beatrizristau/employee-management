package com.bbomanso.em.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table
@Entity(name = "employees")
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
}
