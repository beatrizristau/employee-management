import React from 'react'
import { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [firstNameClass, setFirstNameClass] = useState('form-control')
    const [lastNameClass, setLastNameClass] = useState('form-control')
    const [emailClass, setEmailClass] = useState('form-control')
    
    // initialize the state variable to hold the validation error messages
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate();

    function saveEmployee(event) {
        event.preventDefault();

        if (validateForm()) {
            const employee = {firstName, lastName, email}
            console.log(employee);

            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigate('/employees');
            })
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
        ];
    
        // Validate each field and update the errors and classNames objects
        fields.forEach(({ name, value }) => {
            if (value.trim()) {
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
    
        return valid;
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Add Employee</h2>
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

                            {/* Submit New Employee Button */}
                            <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent