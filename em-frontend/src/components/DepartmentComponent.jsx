import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';

function DepartmentComponent() {

  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const { id } = useParams(); // params hook fetches the id from the URL
  const navigate = useNavigate();

  // self-triggered after the component is rendered
  useEffect(() => {
    // if the id is present in the URL, then fetch the employee details
    if (id) {
      // fetch the employee details from the server
      // and update the state variables
      getDepartmentById(id).then((response) => {
        setDepartmentName(response.data.departmentName);
        setDepartmentDescription(response.data.departmentDescription);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [id]);

  function saveOrUpdateDepartment(event) {
    event.preventDefault();

    const department = {departmentName, departmentDescription};
    console.log(department);

    if (id) {
      updateDepartment(id, department).then((response) => {
        console.log(response.data);
        navigate('/departments');
      }).catch((error) => {
        console.error(error);
      });
    } else {
      createDepartment(department).then((response) => {
        console.log(response.data);
        navigate('/departments');
      }
      ).catch((error) => {
        console.error(error);
      });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Department</h2>
    }
    return <h2 className='text-center'>Add Department</h2>
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className='form-group mb-2'>
                <label className='form-lable'>Department Name:</label>
                <input
                  type='text'
                  placeholder='Enter Department Name' 
                  name='departmentName' 
                  className='form-control'
                  value={departmentName} 
                  onChange={(event) => setDepartmentName(event.target.value)} 
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Department Description:</label>
                <input
                  type='text'
                  placeholder='Enter Department Description' 
                  name='departmentDescription' 
                  className='form-control'
                  value={departmentDescription} 
                  onChange={(event) => setDepartmentDescription(event.target.value)} />
              </div>
              <button className='btn btn-success mb-2' onClick={saveOrUpdateDepartment}>Submit</button>
            </form>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default DepartmentComponent;