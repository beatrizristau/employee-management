import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { listDepartments } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    const [firstNameClass, setFirstNameClass] = useState('form-control')
    const [lastNameClass, setLastNameClass] = useState('form-control')
    const [emailClass, setEmailClass] = useState('form-control')
    const [departmentClass, setDepartmentClass] = useState('form-control')

    const { id } = useParams(); // params hook fetches the id from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // fetch the list of departments from the server
        // and update the state variable
        listDepartments().then((response) => {
            setDepartments(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    // self-triggered after the component is rendered
    useEffect(() => {
        // if the id is present in the URL, then fetch the employee details
        if (id) {
            // fetch the employee details from the server
            // and update the state variables
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);
    
    // initialize the state variable to hold the validation error messages
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });

    function saveOrUpdateEmployee(event) {
        event.preventDefault();

        if (validateForm()) {
            const employee = {firstName, lastName, email, departmentId}
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
    }
    
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
        const classNames = {};
    
        // Define the fields to validate
        const fields = [
            { name: 'firstName', value: firstName },
            { name: 'lastName', value: lastName },
            { name: 'email', value: email },
            { name: 'department', value: departmentId }
        ];
    
        // Validate each field and update the errors and classNames objects
        fields.forEach(({ name, value }) => {
            if (value.trim() && (name !== 'department' || value !== 'Select Department')) {
                errorsCopy[name] = '';
                classNames[name] = 'form-control is-valid';
            } else {
                errorsCopy[name] = 'Field is required';
                classNames[name] = 'form-control is-invalid';
                valid = false;
            }
        });
    
        setErrors(errorsCopy);
        setFirstNameClass(classNames.firstName);
        setLastNameClass(classNames.lastName);
        setEmailClass(classNames.email);
        setDepartmentClass(classNames.department);
    
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        return <h2 className='text-center'>Add Employee</h2>
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            {/* Add First Name Field */}
                            <div className="form-group mb-2">
                                <label className="form-label">First Name:</label>
                                <input 
                                    type="text"
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={firstNameClass}
                                    onChange={(event) => setFirstName(event.target.value)}
                                >
                                </input>
                                {/* Display the error message */}
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            {/* Add Last Name Field */}
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name:</label>
                                <input 
                                    type="text"
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={lastNameClass}
                                    onChange={(event) => setLastName(event.target.value)}
                                >
                                </input>
                                {/* Display the error message */}
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            {/* Add Email Field */}
                            <div className="form-group mb-2">
                                <label className="form-label">Email:</label>
                                <input 
                                    type="text"
                                    placeholder='Enter Email'
                                    name='email'
                                    value={email}
                                    className={emailClass}
                                    onChange={(event) => setEmail(event.target.value)}
                                >
                                </input>
                                {/* Display the error message */}
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            {/* Add Department */}
                            <div className="form-group mb-2">
                                <label className="form-label">Select Department:</label>
                                <select
                                    className={departmentClass}
                                    value={departmentId}
                                    onChange={(event) => setDepartmentId(event.target.value)}
                                >
                                    <option value=''>Select Department</option>
                                    {
                                        departments.map(
                                            department =>
                                                <option key={department.id} value={department.id}>{department.departmentName}</option>
                                        )
                                    }
                                </select>

                                {/* Display the error message */}
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>

                            {/* Submit New Employee Button */}
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent