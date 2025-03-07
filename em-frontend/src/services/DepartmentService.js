import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/departments";

export const listDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (department) => axios.post(
    REST_API_BASE_URL + "/create",
    department,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const updateDepartment = (id, department) => axios.put(
    REST_API_BASE_URL + "/update/" + id,
    department,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const getDepartmentById = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const deleteDepartment = (id) => axios.delete(REST_API_BASE_URL + "/delete/" + id);