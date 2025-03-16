import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDepartment, listDepartments } from "../services/DepartmentService";
import { isAdminUser } from "../services/AuthService";

function ListDepartmentComponent() {
    const [departments, setDepartments] = useState([]); // state variable to hold the list of departments
    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        // it is called twice, once when the component is rendered and once when the component is updated
        // In production, it is called only once
        getAllDepartments();
    }, []);

    function getAllDepartments() {
        // fetch the list of departments from the server
        // and update the state variable
        listDepartments()
            .then((response) => {
                setDepartments(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function updateDepartment(id) {
        // navigate user to the EmployeeComponent
        navigate(`/departments/update/${id}`)
    }

    function removeDepartment(id) {
        console.log(`Delete department with id: ${id}`);

        deleteDepartment(id).then((response) => {
            console.log(response.data);
            getAllDepartments();
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Departments</h2>
            {
                isAdmin &&
                <Link to='/departments/add' className='btn btn-primary mb-2'>Add Department</Link>
            }
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Department Descritpion</th>
                        {
                            isAdmin &&
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(
                            department =>
                            <tr key = {department.id}>
                                <td>{department.id}</td>
                                <td>{department.departmentName}</td>
                                <td>{department.departmentDescription}</td>
                                {
                                    isAdmin &&
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeDepartment(department.id)}
                                        style={{ marginLeft: '10px' }}
                                        >Delete</button>
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListDepartmentComponent;