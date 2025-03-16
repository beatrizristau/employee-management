import React, { useEffect } from 'react'
import { useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { getDepartmentById } from '../services/DepartmentService'
import { isAdminUser } from '../services/AuthService'

function ListEmployeeComponents() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        // it is called twice, once when the component is rendered and once when the component is updated
        // In production, it is called only once
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
                fetchDepartmentNames(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    /* in order to navigate user from one page to another page, we need to use the useNavigate hook from react-router-dom */
    function addNewEmployee() {
        navigate('/employees/add')
    }

    function updateEmployee(id) {
        navigate(`/employees/update/${id}`)
    }

    function removeEmployee(id) {
        console.log(`Delete employee with id: ${id}`);

        deleteEmployee(id).then(() => {
            getAllEmployees();
        }
        ).catch((error) => {
            console.error(error);
        });
    }

    function fetchDepartmentNames(employeeList) {
        const departmentPromises = employeeList.map((employee) => 
            getDepartmentById(employee.departmentId)
                .then(response => ({ id: employee.departmentId, name: response.data.departmentName }))
                .catch(error => {
                    console.error(`Error fetching department for ID ${employee.departmentId}`, error);
                    return { id: employee.departmentId, name: "Unknown" };
                })
        );

        // Promise.all() waits for all department API calls to complete
        Promise.all(departmentPromises).then((departmentsArray) => {
            const departmentMap = {};
            departmentsArray.forEach(dep => {
                departmentMap[dep.id] = dep.name;
            });
            setDepartments(departmentMap);
        });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            {
                isAdmin && 
                <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            }
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Department</th>
                        {
                            isAdmin &&
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{departments[employee.departmentId] || "Loading..."}</td>
                                {
                                    isAdmin &&
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
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
    )
}

export default ListEmployeeComponents