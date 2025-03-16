import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/auth";

export const register = (user) => axios.post(
    REST_API_BASE_URL + "/register",
    user,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const login = (user) => axios.post(
    REST_API_BASE_URL + "/login",
    user,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const storeToken = (token) => {
    localStorage
        .setItem("token", token);
};

export const getToken = () => {
    return localStorage
        .getItem("token");
};