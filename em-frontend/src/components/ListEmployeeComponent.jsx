import React, { useEffect } from 'react'
import { useState } from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

function ListEmployeeComponents() {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }
    , [])

    /* in order to navigate user from one page to another page, we need to use the useNavigate hook from react-router-dom */
    function addNewEmployee() {
        navigate('/employees/add')
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponents