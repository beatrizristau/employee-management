import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/employees";

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(
    REST_API_BASE_URL + "/create",
    employee,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const updateEmployee = (id, employee) => axios.put(
    REST_API_BASE_URL + "/update/" + id,
    employee,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const getEmployee = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const deleteEmployee = (id) => axios.delete(REST_API_BASE_URL + "/delete/" + id);

// add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});