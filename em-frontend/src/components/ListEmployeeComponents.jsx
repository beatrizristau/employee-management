import React from 'react'

function ListEmployeeComponents() {

    const dummyData = [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@gmail.com"
        },
        {
            "id": 2,
            "first_name": "Jenna",
            "last_name": "Ortega",
            "email": "jennaortega@gmail.com"
        },
        {
            "id": 3,
            "first_name": "Jenny",
            "last_name": "Smith",
            "email": "jennysmith@gmail.com"
        }
    ]


    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
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
                        dummyData.map(
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